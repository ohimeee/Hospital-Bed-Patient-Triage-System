import { CriticalBed } from "./CriticalBed.ts";

export class ICUBed extends CriticalBed {
  constructor(bedId: string, wardName: string, monitoringLevel: string) {
    super(bedId, wardName, monitoringLevel);
  }

  public admitPatient(patientName: string): string {
    const admitted = this.baseAdmit(patientName);
    if (!admitted) return `ICU Bed ${this.alreadyOccupiedMsg()}`;
    return `ICU Bed ${this.bedId} admitted. Check if patient needs ventilator and flag staff.`;
  }

  public dischargePatient(): string {
    const discharged = this.baseDischarge();
    if (!discharged) return `ICU Bed ${this.alreadyVacantMsg()}`;
    return `ICU Bed ${this.bedId} released. Requires doctor approval before freeing bed.`;
  }
}

