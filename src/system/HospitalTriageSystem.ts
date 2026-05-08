import { HospitalBed } from "../classes/HospitalBed.ts";
import { ICUBed } from "../classes/ICUBed.ts";
import { EmergencyBed } from "../classes/EmergencyBed.ts";
import { PediatricBed } from "../classes/PediatricBed.ts";
import { MaternityBed } from "../classes/MaternityBed.ts";

export type BedType = "ICU" | "Emergency" | "Pediatric" | "Maternity";
export type BedDefaults = {
  wardName: string;
  detail: string;
};

export const BED_DEFAULTS: Record<BedType, BedDefaults> = {
  ICU: { wardName: "ICU Ward", detail: "Medium" },
  Emergency: { wardName: "Emergency Ward", detail: "Medium" },
  Pediatric: { wardName: "Pediatric Ward", detail: "3rd Floor" },
  Maternity: { wardName: "Maternity Ward", detail: "2nd Floor" },
};

export const BED_TYPE_MAP: Record<BedType, Function> = {
  ICU: ICUBed,
  Emergency: EmergencyBed,
  Pediatric: PediatricBed,
  Maternity: MaternityBed,
};

export class HospitalTriageSystem {
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

  public assignDoctor(bedId: string, doctorName: string): string {
    const bed = this.findBedById(bedId);
    if (!bed) return `[ERROR] Bed ID ${bedId} not found.`;
    if (bed.hasAssignedDoctor) return `[INFO] Bed ${bedId} already has a doctor assigned.`;
    return `[ASSIGN] ${bed.assignDoctor(doctorName)}`;
  }

  public unassignDoctor(bedId: string): string {
    const bed = this.findBedById(bedId);
    if (!bed) return `[ERROR] Bed ID ${bedId} not found.`;
    if (!bed.hasAssignedDoctor) return `[INFO] Bed ${bedId} has no doctor assigned.`;
    return `[UNASSIGN] ${bed.unassignDoctor()}`;
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

  public passOneDay(): string[] {
  const messages: string[] = [];

  for (let bed of this._bedsList) {
    if (bed.isOccupied) {
      messages.push(bed.chargeOneDay());
    }
  }

  if (messages.length === 0) {
    messages.push("[BILLING] One day passed. No occupied beds to charge.");
  }

  return messages;
  }


}