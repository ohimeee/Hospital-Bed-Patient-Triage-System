import { GeneralBed } from "./GeneralBed.ts";

export class PediatricBed extends GeneralBed {
  constructor(bedId: string, wardName: string, wardFloor: string) {
    super(bedId, wardName, wardFloor);
  }

  public admitPatient(patientName: string): string {
    const admitted = this.baseAdmit(patientName);
    if (!admitted) return `Pediatric Bed ${this.alreadyOccupiedMsg()}`;
    return `Pediatric Bed ${this.bedId} admitted. Requires guardian info before admission.`;
  }

  public dischargePatient(): string {
    const discharged = this.baseDischarge();
    if (!discharged) return `Pediatric Bed ${this.alreadyVacantMsg()}`;
    return `Pediatric Bed ${this.bedId} released. Discharge summary sent to guardian.`;
  }
}


