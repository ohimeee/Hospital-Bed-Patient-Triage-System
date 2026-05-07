import { CriticalBed } from "./CriticalBed.ts";

export class EmergencyBed extends CriticalBed {
  constructor(bedId: string, wardName: string, monitoringLevel: string) {
    super(bedId, wardName, monitoringLevel);
  }

  public admitPatient(patientName: string): string {
    const admitted = this.baseAdmit(patientName);
    if (!admitted) return `Emergency Bed ${this.alreadyOccupiedMsg()}`;
    return `Emergency Bed ${this.bedId} admitted. Fast-tracked admission, no prior paperwork needed.`;
  }

  public dischargePatient(): string {
    const discharged = this.baseDischarge();
    if (!discharged) return `Emergency Bed ${this.alreadyVacantMsg()}`;
    return `Emergency Bed ${this.bedId} released. Patient auto-moved to regular ward if stable.`;
  }
}


