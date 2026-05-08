import { CriticalBed } from "./CriticalBed.ts";

export class ICUBed extends CriticalBed {
  constructor(bedId: string, wardName: string, monitoringLevel: string) {
    super(bedId, wardName, monitoringLevel, 5000);
    this.admitMessage = `ICU Bed ${this.bedId} admitted. Check if patient needs ventilator and flag staff.`;
    this.dischargeMessage = `ICU Bed ${this.bedId} released. Requires doctor approval before freeing bed.`;
    this.assignDoctorMessage = `Dr. ${doctorName} assigned to ICU Bed ${this.bedId}.`;
    this.unassignDoctorMessage = `Dr. ${doctorName} unassigned from ICU Bed ${this.bedId}.`;
  }
}

