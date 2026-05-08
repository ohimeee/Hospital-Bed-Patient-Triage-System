import { HospitalTriageSystem } from "../system/HospitalTriageSystem.ts";
import type { BedType } from "../system/HospitalTriageSystem.ts";

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

    this.showForm();
    this.refresh();
  }

  openModal() {
    this.modal.classList.add("show");
    this.showForm();
  }

  closeModal() {
    this.modal.classList.remove("show");
  }

  showForm() {
    const admitForm = document.getElementById("admitForm") as HTMLDivElement;
    const addBedForm = document.getElementById("addBedForm") as HTMLDivElement;
    const transferForm = document.getElementById("transferForm") as HTMLDivElement;
    const monitorForm = document.getElementById("monitorForm") as HTMLDivElement;

    admitForm.classList.add("hidden");
    addBedForm.classList.add("hidden");
    transferForm.classList.add("hidden");
    monitorForm.classList.add("hidden");

    if (this.operationType.value === "admit") {
      admitForm.classList.remove("hidden");
    } else if (this.operationType.value === "add") {
      addBedForm.classList.remove("hidden");
    } else if (this.operationType.value === "monitor") {
      monitorForm.classList.remove("hidden");
    } else {
      transferForm.classList.remove("hidden");
    }
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
    const data = this.system.getCapacitySummary();
    const beds = this.system.getBedsList();

    this.getElement("totalBeds").textContent = String(data.total);
    this.getElement("occupiedBeds").textContent = String(data.occupied);
    this.getElement("availableBeds").textContent = String(data.total - data.occupied);
    this.getElement("capacity-percent").textContent = `${data.percent}%`;
    this.getElement("capacity-text").textContent = data.percent >= 80 ? "Critical capacity" : "Capacity normal";
    this.getElement("capacity-pill").className = `capacity-pill ${data.percent >= 80 ? "critical" : "normal"}`;

    this.bedsGrid.innerHTML = "";

    beds.forEach((bed) => {
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
        ${bed.isOccupied ? `<button class="discharge-btn" type="button">Discharge</button>` : ""}
        <button class="doctor-btn" type="button">${bed.hasAssignedDoctor ? "Unassign Doctor" : "Assign Doctor"}</button>
        <button class="delete-btn" type="button">Delete Bed</button>
      `;

      this.bedsGrid.appendChild(card);

      card.querySelector(".discharge-btn")?.addEventListener("click", () => {
        this.addLog(this.system.dischargePatient(bed.bedId));
        this.refresh();
      });

      card.querySelector(".doctor-btn")?.addEventListener("click", () => {
        if (bed.hasAssignedDoctor) {
          this.addLog(this.system.setDoctor(bed.bedId, "None"));
        } else {
          const doctorName = prompt("Enter the doctor's name:");
          if (!doctorName) return;
          this.addLog(this.system.setDoctor(bed.bedId, doctorName.trim()));
        }

        this.refresh();
      });

      card.querySelector(".delete-btn")?.addEventListener("click", () => {
        if (bed.isOccupied) {
          this.addLog("[INFO] You cannot delete a bed while a patient is still admitted to it.");
          return;
        }

        this.addLog(this.system.deleteBed(bed.bedId));
        this.refresh();
      });
    });
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

