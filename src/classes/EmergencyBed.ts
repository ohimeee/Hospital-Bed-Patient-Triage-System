import { CriticalBed } from "./CriticalBed.ts";

export class EmergencyBed extends CriticalBed {
  constructor(bedId: string, wardName: string, monitoringLevel: string) {
    super(bedId, wardName, monitoringLevel, 3000);
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

  public assignDoctor(doctorName: string): string {
    const assigned = this.baseAssignDoctor(doctorName);
    if (!assigned) return `Emergency Bed ${this.alreadyHasDoctorMsg()}`;
    return `Dr. ${doctorName} assigned to Emergency Bed ${this.bedId}.`;
  }

  public unassignDoctor(): string {
    const unassigned = this.baseUnassignDoctor();
    if (!unassigned) return `Emergency Bed ${this.noDoctorAssignedMsg()}`;
    return `Doctor unassigned from Emergency Bed ${this.bedId}.`;
  }
}


