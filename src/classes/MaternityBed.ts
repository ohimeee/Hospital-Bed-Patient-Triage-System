import { GeneralBed } from "./GeneralBed.ts";

export class MaternityBed extends GeneralBed {
  constructor(bedId: string, wardName: string, wardFloor: string) {
    super(bedId, wardName, wardFloor, 2500);
    this.admitMessage = `Maternity Bed ${this.bedId} admitted. Expected delivery date logged.`;
    this.dischargeMessage = `Maternity Bed ${this.bedId} released. Newborn record required before release.`;
  }

  public setDoctor(doctorName: string): string {
    const doctorSet = this.baseSetDoctor(doctorName);
    if (!doctorSet) {
      return `Dr. ${doctorName} assigned to Maternity Bed ${this.bedId}.`;
    } else {
      return `Dr. ${doctorName} unassigned from Maternity Bed ${this.bedId}.`;
    }
  }
}
