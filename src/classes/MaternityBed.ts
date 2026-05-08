import { GeneralBed } from "./GeneralBed.ts";

export class MaternityBed extends GeneralBed {
  constructor(bedId: string, wardName: string, wardFloor: string) {
    super(bedId, wardName, wardFloor, 2500);
    this.admitMessage = `Maternity Bed ${this.bedId} admitted. Expected delivery date logged.`;
    this.dischargeMessage = `Maternity Bed ${this.bedId} released. Newborn record required before release.`;
    this.assignDoctorMessage = `Dr. ${doctorName} assigned to Maternity Bed ${this.bedId}.`;
    this.unassignDoctorMessage = `Dr. ${doctorName} unassigned from Maternity Bed ${this.bedId}.`;
  }
}
