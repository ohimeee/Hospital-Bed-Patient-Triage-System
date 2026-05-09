import { HospitalTriageSystem } from "../system/HospitalTriageSystem.ts";
import type { BedType } from "../system/HospitalTriageSystem.ts";
import { PediatricBed } from "../classes/PediatricBed.ts";
import { MaternityBed } from "../classes/MaternityBed.ts";
import { EmergencyBed } from "../classes/EmergencyBed.ts";
import { ICUBed } from "../classes/ICUBed.ts";

export class UIManager {
  private system: HospitalTriageSystem;
  private bedsGrid: HTMLDivElement;
  private log: HTMLDivElement;
  private modal: HTMLDivElement;
  private operationType: HTMLSelectElement;

  constructor(system: HospitalTriageSystem) {
    this.system = system;
    this.bedsGrid = this.getElement("bedsGrid") as HTMLDivElement;
    this.log = this.getElement("activityLog") as HTMLDivElement;
    this.modal = this.getElement("modal") as HTMLDivElement;
    this.operationType = this.getElement("operationType") as HTMLSelectElement;

    this.setupEventListeners();
    this.showForm();
    this.refresh();
  }

  private setupEventListeners() {
    this.getButton("openMenuBtn")?.addEventListener("click", () => this.openModal());
    this.getButton("closeModalBtn")?.addEventListener("click", () => this.closeModal());
    this.getButton("clearLogButton")?.addEventListener("click", () => (this.log.innerHTML = ""));
    this.getButton("admitButton")?.addEventListener("click", () => this.admitPatient());
    this.getButton("addBedButton")?.addEventListener("click", () => this.addBed());
    this.getButton("transferBtn")?.addEventListener("click", () => this.transferPatient());
    this.getButton("monitorBtn")?.addEventListener("click", () => this.changeMonitoringLevel());
    this.operationType?.addEventListener("change", () => this.showForm());
    this.modal?.addEventListener("click", (event) => {
      if (event.target === this.modal) this.closeModal();
    });
  }

  private openModal() {
    this.modal.classList.add("show");
    this.showForm();
  }

  private closeModal() {
    this.modal.classList.remove("show");
  }

  private showForm() {
    const formMap: Record<string, string> = {
      admit: "admitForm",
      add: "addBedForm",
      monitor: "monitorForm",
      transfer: "transferForm",
    };
    ["admitForm", "addBedForm", "transferForm", "monitorForm"].forEach((id) =>
      document.getElementById(id)?.classList.add("hidden"),
    );
    const activeForm = formMap[this.operationType.value] || "transferForm";
    document.getElementById(activeForm)?.classList.remove("hidden");
  }

  changeMonitoringLevel() {
    const bedId = this.getInputValue("monitorBedId").toUpperCase();
    const level = this.getSelectValue("monitorLevel");

    if (!bedId) {
      this.addLog("[INFO] Please enter a bed ID first.");
      return;
    }

    this.addLog(this.system.setMonitoringLevel(bedId, level));
    this.setInputValue("monitorBedId", "");
    this.refresh();
    this.closeModal();
  }

  admitPatient() {
    const name = this.getInputValue("patientName");
    const type = this.getSelectValue("bedType") as BedType;

    if (!name) {
      this.addLog("[INFO] Enter a patient name first.");
      return;
    }

    this.addLog(this.system.admitPatient(type, name));
    this.setInputValue("patientName", "");
    this.refresh();
    this.closeModal();
  }

  addBed() {
    const bedId = this.getInputValue("newBedId");
    const type = this.getSelectValue("newBedType") as BedType;

    this.addLog(this.system.addBed(type, bedId));
    this.setInputValue("newBedId", "");
    this.refresh();
    this.closeModal();
  }

  transferPatient() {
    const fromId = this.getInputValue("fromBedId");
    const toId = this.getInputValue("toBedId");

    if (!fromId || !toId) {
      this.addLog("[INFO] Please provide both From and To Bed IDs.");
      return;
    }

    this.addLog(this.system.movePatient(fromId, toId));
    this.setInputValue("fromBedId", "");
    this.setInputValue("toBedId", "");
    this.refresh();
    this.closeModal();
  }

  refresh() {
    this.updateCapacitySummary();
    this.renderBedCards();
  }

  private updateCapacitySummary() {
    const data = this.system.getCapacitySummary();
    this.getElement("totalBeds").textContent = String(data.total);
    this.getElement("occupiedBeds").textContent = String(data.occupied);
    this.getElement("availableBeds").textContent = String(data.total - data.occupied);
    this.getElement("capacity-percent").textContent = `${data.percent}%`;
    const isCritical = data.percent >= 80;
    this.getElement("capacity-text").textContent = isCritical
      ? "Critical capacity"
      : "Capacity normal";
    this.getElement("capacity-pill").className =
      `capacity-pill ${isCritical ? "critical" : "normal"}`;
  }

  private renderBedCards() {
    this.bedsGrid.innerHTML = "";
    this.system.getBedsList().forEach((bed) => this.renderBedCard(bed));
  }

  private renderBedCard(bed: any) {
    const card = document.createElement("div");
    card.className = `bed-card ${this.getBedColorClass(bed.wardName)}`;
    
    card.innerHTML = `
      <strong>${bed.bedId}</strong>
      <p>${bed.wardName}</p>
      <p>${bed.getBedInfo()}</p>
      <p>${bed.isOccupied ? `Occupied (${bed.patientName})` : "Unoccupied"}</p>
      <p>${bed.hasAssignedDoctor ? `Doctor: ${bed.doctorName}` : "No doctor assigned"}</p>
      <p>Monitoring: ${bed.getMonitoringLevel()}</p>
      <p>Bill: ₱${bed.totalBill}</p>
      ${bed instanceof EmergencyBed ? `<p>Temperature: ${bed.temperature.toFixed(1)} °C</p><p>BPM: ${bed.heartRate}</p>` : ""}
      ${bed instanceof ICUBed ? `<p>SpO2: ${bed.oxygenLevel}%</p><p>Systolic BP: ${bed.bloodPressure} mmHg</p>` : ""}
      ${bed instanceof PediatricBed ? `<p>Guardian: ${bed.guardianName}</p>` : ""}
      ${bed instanceof MaternityBed ? `<p>Delivery: ${bed.hasDelivered ? `${bed.deliveryDate} - ${bed.newbornName}` : "Not delivered"}</p>` : ""}
      ${bed.isOccupied ? `<button class="discharge-btn" type="button">Discharge</button>` : ""}
      ${bed.isOccupied ? `<button class="doctor-btn" type="button"> ${bed.hasAssignedDoctor ? "Unassign Doctor" : "Assign Doctor"}</button>` : ""}
      ${bed instanceof PediatricBed && bed.isOccupied ? `<button class="guardian-btn" type="button">Add Guardian</button>` : ""}
      ${bed instanceof MaternityBed && bed.isOccupied ? `<button class="record-delivery-btn" type="button">Record Delivery</button>` : ""}
      ${bed instanceof EmergencyBed && bed.isOccupied ? `<button class="triage-btn" type="button">Sepsis Triage</button>` : ""}
      ${bed instanceof ICUBed && bed.isOccupied ? `<button class="icu-status-btn" type="button">ICU Status</button>` : ""}
      <button class="delete-btn" type="button">Delete Bed</button>
    `;

    this.bedsGrid.appendChild(card);

    card.querySelector(".discharge-btn")?.addEventListener("click", () => this.handleDischarge(bed));
    card.querySelector(".doctor-btn")?.addEventListener("click", () => this.handleDoctor(bed));
    card.querySelector(".guardian-btn")?.addEventListener("click", () => this.handleGuardian(bed));
    card.querySelector(".record-delivery-btn")?.addEventListener("click", () => this.handleRecordDelivery(bed));
    card.querySelector(".delete-btn")?.addEventListener("click", () => this.handleDelete(bed));
    
    const triageBtn = card.querySelector(".triage-btn");
    if (triageBtn) {
        triageBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.handleTriage(bed);
        });
    }

    const icuStatusBtn = card.querySelector(".icu-status-btn");
    if (icuStatusBtn) {
        icuStatusBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.handleICUCheck(bed);
        });
    }
  }

  private handleICUCheck(bed: any) {
    const spo2Str = prompt(`Enter SpO2 (%) for Bed ${bed.bedId}:`, "95");
    const bpStr = prompt(`Enter Systolic BP (mmHg) for Bed ${bed.bedId}:`, "120");

    if (spo2Str === null || bpStr === null) return;

    const spo2 = parseFloat(spo2Str);
    const bp = parseFloat(bpStr);

    if (isNaN(spo2) || isNaN(bp)) {
      this.addLog("[ERROR] Invalid vital signs format for ICU.");
      return;
    }

    this.addLog(this.system.checkCriticalStatus(bed.bedId, spo2, bp));
    this.refresh();
  }

  private handleTriage(bed: any) {
    const tempStr = prompt(`Enter Temp (°C) for Bed ${bed.bedId}:`, "37.0");
    const hrStr = prompt(`Enter Heart Rate (BPM) for Bed ${bed.bedId}:`, "80");

    if (tempStr === null || hrStr === null) return;

    const temp = parseFloat(tempStr);
    const hr = parseInt(hrStr, 10);

    if (isNaN(temp) || isNaN(hr)) {
      this.addLog("[ERROR] Invalid vital signs format.");
      return;
    }

    this.addLog(this.system.triage(bed.bedId, temp, hr));
    this.refresh();
  }

  private handleDischarge(bed: any) {
    this.addLog(this.system.dischargePatient(bed.bedId));
    this.refresh();
  }

  private handleDoctor(bed: any) {
    if (bed.hasAssignedDoctor) {
      this.addLog(this.system.setDoctor(bed.bedId, "None"));
    } else {
      const doctorName = prompt("Enter the doctor's name:");
      if (doctorName) this.addLog(this.system.setDoctor(bed.bedId, doctorName.trim()));
    }
    this.refresh();
  }

  private handleGuardian(bed: PediatricBed) {
    const guardianName = prompt("Enter guardian name:");

    if (!guardianName) {
      this.addLog("[INFO] Enter guardian name first.");
      return;
    }

    this.addLog(this.system.addGuardianToBed(bed.bedId, guardianName.trim()));
    this.refresh();
  }

  private handleRecordDelivery(bed: any) {
    const deliveryDate = prompt("Enter delivery date (e.g., May 5, 2007):");
    const newbornName = prompt("Enter newborn's name:");

    if (!deliveryDate || !newbornName) {
      this.addLog("[INFO] Please enter both delivery date and newborn's name.");
      return;
    }

    this.addLog(this.system.setRecordDelivery(bed.bedId, deliveryDate.trim(), newbornName.trim()));
    this.refresh();
  }

  private handleDelete(bed: any) {
    if (bed.isOccupied) {
      this.addLog("[INFO] You cannot delete a bed while a patient is still admitted to it.");
      return;
    }
    this.addLog(this.system.deleteBed(bed.bedId));
    this.refresh();
  }

  private getBedColorClass(wardName: string) {
    if (wardName.includes("ICU")) return "critical-bed";
    if (wardName.includes("Emergency")) return "warning-bed";
    if (wardName.includes("Pediatric")) return "pediatric-bed";
    if (wardName.includes("Maternity")) return "maternity-bed";
    return "normal-bed";
  }

  private addLog(msg: string) {
    const p = document.createElement("p");
    p.textContent = msg;
    this.log.prepend(p);
  }

  private getElement(id: string) {
    return document.getElementById(id) as HTMLElement;
  }

  private getButton(id: string) {
    return document.getElementById(id) as HTMLButtonElement;
  }

  private getInputValue(id: string) {
    return (document.getElementById(id) as HTMLInputElement).value.trim();
  }

  private setInputValue(id: string, value: string) {
    (document.getElementById(id) as HTMLInputElement).value = value;
  }

  private getSelectValue(id: string) {
    return (document.getElementById(id) as HTMLSelectElement).value;
  }

  public simulateDay() {
    this.system.passOneDay().forEach((msg) => this.addLog(msg));
    this.refresh();
  }
}