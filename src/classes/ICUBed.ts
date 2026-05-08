import { CriticalBed } from "./CriticalBed.ts";

export class ICUBed extends CriticalBed {
  constructor(bedId: string, wardName: string, monitoringLevel: string) {
    super(bedId, wardName, monitoringLevel, 5000);
    this.admitMessage = `ICU Bed ${this.bedId} admitted. Check if patient needs ventilator and flag staff.`;
    this.dischargeMessage = `ICU Bed ${this.bedId} released. Requires doctor approval before freeing bed.`;
  }

  public assignDoctor(doctorName: string): string {
    const assigned = this.baseAssignDoctor(doctorName);
    if (!assigned) return `ICU Bed ${this.alreadyHasDoctorMsg()}`;
    return `Dr. ${doctorName} assigned to ICU Bed ${this.bedId}.`;
  }

  public unassignDoctor(): string {
    const unassigned = this.baseUnassignDoctor();
    if (!unassigned) return `ICU Bed ${this.noDoctorAssignedMsg()}`;
    return `Doctor unassigned from ICU Bed ${this.bedId}.`;
  }
}

