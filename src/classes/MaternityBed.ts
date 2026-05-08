import { GeneralBed } from "./GeneralBed.ts";

export class MaternityBed extends GeneralBed {
  constructor(bedId: string, wardName: string, wardFloor: string) {
    super(bedId, wardName, wardFloor, 2500);
    this.admitMessage = `Maternity Bed ${this.bedId} admitted. Expected delivery date logged.`;
    this.dischargeMessage = `Maternity Bed ${this.bedId} released. Newborn record required before release.`;
  }

  public assignDoctor(doctorName: string): string {
    const assigned = this.baseAssignDoctor(doctorName);
    if (!assigned) return `Maternity Bed ${this.alreadyHasDoctorMsg()}`;
    return `Dr. ${doctorName} assigned to Maternity Bed ${this.bedId}.`;
  }

  public unassignDoctor(): string {
    const unassigned = this.baseUnassignDoctor();
    if (!unassigned) return `Maternity Bed ${this.noDoctorAssignedMsg()}`;
    return `Doctor unassigned from Maternity Bed ${this.bedId}.`;
  }
}
