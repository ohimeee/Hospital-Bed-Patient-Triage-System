import { GeneralBed } from "./GeneralBed.ts";

export class MaternityBed extends GeneralBed {
  constructor(bedId: string, wardName: string, wardFloor: string) {
    super(bedId, wardName, wardFloor);
  }

  public admitPatient(patientName: string): string {
    const admitted = this.baseAdmit(patientName);
    if (!admitted) return `Maternity Bed ${this.alreadyOccupiedMsg()}`;
    return `Maternity Bed ${this.bedId} admitted. Expected delivery date logged.`;
  }

  public dischargePatient(): string {
    const discharged = this.baseDischarge();
    if (!discharged) return `Maternity Bed ${this.alreadyVacantMsg()}`;
    return `Maternity Bed ${this.bedId} released. Newborn record required before release.`;
  }
}


