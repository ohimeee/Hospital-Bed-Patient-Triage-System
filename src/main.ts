import { HospitalTriageSystem } from "./system/HospitalTriageSystem.ts";
import type { BedType } from "./system/HospitalTriageSystem.ts";
import "./style.css";

function mountHospitalSystem() {
  const system = new HospitalTriageSystem();

  const patientName = document.getElementById("patientName") as HTMLInputElement;
  const bedType = document.getElementById("bedType") as HTMLSelectElement;
  const newBedId = document.getElementById("newBedId") as HTMLInputElement;
  const newBedType = document.getElementById("newBedType") as HTMLSelectElement;
  const bedsGrid = document.getElementById("bedsGrid") as HTMLDivElement;
  const log = document.getElementById("activityLog") as HTMLDivElement;
  const totalBeds = document.getElementById("totalBeds") as HTMLSpanElement;
  const occupiedBeds = document.getElementById("occupiedBeds") as HTMLSpanElement;
  const availableBeds = document.getElementById("availableBeds") as HTMLSpanElement;
  const percent = document.getElementById("capacity-percent") as HTMLSpanElement;
  const pillText = document.getElementById("capacity-text") as HTMLSpanElement;
  const pill = document.getElementById("capacity-pill") as HTMLDivElement;

  const fromBedIdInput = document.getElementById("fromBedId") as HTMLInputElement;
  const toBedIdInput = document.getElementById("toBedId") as HTMLInputElement;
  const transferBtn = document.getElementById("transferBtn") as HTMLButtonElement;

  const admitBtn = document.getElementById("admitButton") as HTMLButtonElement;
  const addBedBtn = document.getElementById("addBedButton") as HTMLButtonElement;
  const clearLogBtn = document.getElementById("clearLogButton") as HTMLButtonElement;

  const logMsg = (msg: string) => {
    const p = document.createElement("p");
    p.textContent = msg;
    log.prepend(p);
  };

  const refresh = () => {
    const data = system.getCapacitySummary();
    const beds = system.getBedsList();

    totalBeds.textContent = String(data.total);
    occupiedBeds.textContent = String(data.occupied);
    availableBeds.textContent = String(data.total - data.occupied);

    percent.textContent = `${data.percent}%`;
    pillText.textContent = data.percent >= 80 ? "Critical capacity" : "Capacity normal";
    pill.className = `capacity-pill ${data.percent >= 80 ? "critical" : "normal"}`;

    bedsGrid.innerHTML = beds
      .map(
        (bed) => `
            <div class="bed-card">
                <strong>${bed.bedId}</strong>
                <p>${bed.wardName}</p>
                <p>${bed.getBedInfo()}</p>
                <strong>
                    <p>${bed.isOccupied ? `Occupied (${bed.patientName})` : "Unoccupied"}</p>
                </strong>
                <strong>
                  <p>${bed.hasAssignedDoctor ? `Doctor: ${bed.doctorName}` : "No doctor assigned"}</p>
                </strong>
                <strong>
                  <p>Billing: ${bed.totalBill}</p>
                </strong>
                ${bed.isOccupied ? `<button data-id="${bed.bedId}" class="dischargeButton"> Discharge </button>` : ""}
                <button data-id="${bed.bedId}" class="assignDoctorButton">
                    ${bed.hasAssignedDoctor ? "Unassign Doctor" : "Assign Doctor"}
                </button>
                <button data-id="${bed.bedId}" class="deleteButton"> Delete Bed </button>
            </div>
        `,
      )
      .join("");

    bedsGrid.querySelectorAll("button.dischargeButton").forEach((button) => {
      button.addEventListener("click", () => {
        const id = (button as HTMLButtonElement).dataset.id!;
        logMsg(system.dischargePatient(id));
        refresh();
      });
    });

    bedsGrid.querySelectorAll("button.deleteButton").forEach((button) => {
      button.addEventListener("click", () => {
        const id = (button as HTMLButtonElement).dataset.id!;
        const bed = system.getBedsList().find((b) => b.bedId === id);
        if (bed?.isOccupied) {
          logMsg('[INFO] You cannot delete a bed while a patient is still admitted.');
        } else {
          logMsg(system.deleteBed(id));
          refresh();
        }
      });
    });

    bedsGrid.querySelectorAll("button.assignDoctorButton").forEach((button) => {
      button.addEventListener("click", () => {
        const id = (button as HTMLButtonElement).dataset.id!;
        const bed = system.getBedsList().find((b) => b.bedId === id);
        if (bed?.hasAssignedDoctor) {
          logMsg(system.unassignDoctor(id));
        } else {
          const doc = prompt("Enter doctor's name:");
          if (doc) logMsg(system.assignDoctor(id, doc));
        }
        refresh();
      });
    });
  };

  admitBtn.addEventListener("click", () => {
    const name = patientName.value.trim();
    if (!name) {
      logMsg("[INFO] Enter a patient name first.");
      return;
    }
    logMsg(system.admitPatient(bedType.value as BedType, name));
    patientName.value = "";
    refresh();
  });

  addBedBtn.addEventListener("click", () => {
    const bedId = newBedId.value.trim();
    const result = system.addBed(newBedType.value as BedType, bedId);
    logMsg(result);
    if (result.startsWith("[ADDED]")) newBedId.value = "";
    refresh();
  });

  transferBtn?.addEventListener("click", () => {
    const fromId = fromBedIdInput.value.trim();
    const toId = toBedIdInput.value.trim();

    if (!fromId || !toId) {
      logMsg("[INFO] Please provide both From and To Bed IDs.");
      return;
    }

    const result = system.movePatient(fromId, toId);
    logMsg(result);
    
    fromBedIdInput.value = "";
    toBedIdInput.value = "";
    refresh();
  });

  clearLogBtn.addEventListener("click", () => { log.innerHTML = ""; });

  refresh();

  setInterval(() => {
    const messages = system.passOneDay();
    for (let msg of messages) logMsg(msg);
    refresh();
  }, 24000);
}

document.addEventListener("DOMContentLoaded", mountHospitalSystem);