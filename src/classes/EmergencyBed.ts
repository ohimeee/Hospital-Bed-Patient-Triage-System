import { CriticalBed } from "./CriticalBed.ts";

export class EmergencyBed extends CriticalBed {
  constructor(bedId: string, wardName: string, monitoringLevel: string) {
    super(bedId, wardName, monitoringLevel, 3000);
    this.admitMessage = `Emergency Bed ${this.bedId} admitted. Fast-tracked admission, no prior paperwork needed.`;
    this.dischargeMessage = `Emergency Bed ${this.bedId} released. Patient auto-moved to regular ward if stable.`;
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


