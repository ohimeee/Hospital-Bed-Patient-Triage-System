import { HospitalBed } from "./classes/HospitalBed.ts";
import { ICUBed } from "./classes/ICUBed.ts";
import { EmergencyBed } from "./classes/EmergencyBed.ts";
import { PediatricBed } from "./classes/PediatricBed.ts";
import { MaternityBed } from "./classes/MaternityBed.ts";

type BedType = "ICU" | "Emergency" | "Pediatric" | "Maternity";
type BedDefaults = {
  wardName: string;
  detail: string;
};

const BED_DEFAULTS: Record<BedType, BedDefaults> = {
  ICU: { wardName: "ICU Ward", detail: "Medium" },
  Emergency: { wardName: "Emergency Ward", detail: "Medium" },
  Pediatric: { wardName: "Pediatric Ward", detail: "3rd Floor" },
  Maternity: { wardName: "Maternity Ward", detail: "2nd Floor" },
};

const BED_TYPE_MAP: Record<BedType, Function> = {
  ICU: ICUBed,
  Emergency: EmergencyBed,
  Pediatric: PediatricBed,
  Maternity: MaternityBed,
};

class HospitalTriageSystem {
  private _bedsList: HospitalBed[] = [];

  constructor() {
    this._bedsList = [
      new ICUBed("ICU-01", "ICU Ward", "High"),
      new ICUBed("ICU-02", "ICU Ward", "Medium"),
      new EmergencyBed("EM-01", "Emergency Ward", "High"),
      new PediatricBed("PED-01", "Pediatric Ward", "3rd Floor"),
      new MaternityBed("MAT-01", "Maternity Ward", "2nd Floor"),
    ];
  }

  private findAvailableBed(bedType: BedType): HospitalBed | undefined {
    const BedClass = BED_TYPE_MAP[bedType];
    return this._bedsList.find((bed) => bed instanceof BedClass && !bed.isOccupied);
  }

  private findBedById(bedId: string): HospitalBed | undefined {
    return this._bedsList.find((bed) => bed.bedId === bedId);
  }

  private createBed(bedType: BedType, bedId: string): HospitalBed {
    const defaults = BED_DEFAULTS[bedType];
    const ward = defaults.wardName;

    switch (bedType) {
      case "ICU":
        return new ICUBed(bedId, ward, defaults.detail);
      case "Emergency":
        return new EmergencyBed(bedId, ward, defaults.detail);
      case "Pediatric":
        return new PediatricBed(bedId, ward, defaults.detail);
      case "Maternity":
        return new MaternityBed(bedId, ward, defaults.detail);
    }
  }

  public addBed(bedType: BedType, bedId: string): string {
    const cleanedBedId = bedId.trim().toUpperCase();

    if (!cleanedBedId) {
      return "[ERROR] Enter a bed ID before adding a bed.";
    }

    if (this.findBedById(cleanedBedId)) {
      return `[ERROR] Bed ID ${cleanedBedId} already exists.`;
    }

    const bed = this.createBed(bedType, cleanedBedId);
    this._bedsList.push(bed);

    return `[ADDED] ${bedType} Bed ${cleanedBedId} added to ${bed.wardName}.`;
  }

  public admitPatient(bedType: BedType, patientName: string): string {
    const bed = this.findAvailableBed(bedType);
    if (!bed) return `[FAILED] No available ${bedType} beds found.`;
    return `[ADMIT] ${bed.admitPatient(patientName)}`;
  }

  public dischargePatient(bedId: string): string {
    const bed = this.findBedById(bedId);
    if (!bed) return `[ERROR] Bed ID ${bedId} not found.`;
    if (!bed.isOccupied) return `[INFO] Bed ${bedId} is already vacant.`;
    return `[DISCHARGE] ${bed.dischargePatient()}`;
  }

  public getBedsList(): HospitalBed[] {
    return [...this._bedsList];
  }

  public getCapacitySummary(): { occupied: number; total: number; percent: number } {
    const total = this._bedsList.length;
    const occupied = this._bedsList.filter((bed) => bed.isOccupied).length;
    const percent = Math.round((occupied / total) * 100);
    return { occupied, total, percent };
  }
}

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

                <button data-id="${bed.bedId}">
                    ${bed.isOccupied ? "Discharge" : "Available"}
                </button>

                <button data-id="${bed.bedId}" class="deleteButton">
                   Delete Bed 
                </button>
            </div>
        `,
      )
      .join("");

    bedsGrid.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        const id = (button as HTMLButtonElement).dataset.id!;
        const bed = system.getBedsList().find((b) => b.bedId === id);

        if (!bed) return;

        if (bed.isOccupied) {
          logMsg(system.dischargePatient(id));
        } else {
          logMsg(`[INFO] Selected ${id}`);
        }

        refresh();
      });
    });

    //bedsGrid.querySelectorAll("deleteButton").forEach((button) => {
    //button.addEventListener("click", () => {
    //if (bed) {
    //delete bed
    //}
    //});
    //});
  };

  //Admit button clicked
  admitBtn.addEventListener("click", () => {
    const name = patientName.value.trim();

    if (!name) {
      logMsg("[INFO] Enter a patient name first.");
      return;
    }

    logMsg(system.admitPatient(bedType.value as any, name));
    patientName.value = "";
    refresh();
  });

  addBedBtn.addEventListener("click", () => {
    const bedId = newBedId.value.trim();

    const result = system.addBed(newBedType.value as BedType, bedId);
    logMsg(result);

    if (result.startsWith("[ADDED]")) {
      newBedId.value = "";
    }

    refresh();
  });

  clearLogBtn.addEventListener("click", () => {
    log.innerHTML = "";
  });

  refresh();
}

document.addEventListener("DOMContentLoaded", mountHospitalSystem);
