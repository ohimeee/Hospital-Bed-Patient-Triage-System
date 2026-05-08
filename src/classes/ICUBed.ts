import { CriticalBed } from "./CriticalBed.ts";

export class ICUBed extends CriticalBed {
  constructor(bedId: string, wardName: string, monitoringLevel: string) {
    super(bedId, wardName, monitoringLevel, 5000);
  }

  public admitPatient(patientName: string): string {
    const admitted = this.baseAdmit(patientName);
    if (!admitted) return `ICU Bed ${this.alreadyOccupiedMsg()}`;
    return `ICU Bed ${this.bedId} admitted. Check if patient needs ventilator and flag staff.`;
  }

  public dischargePatient(): string {
    const discharged = this.baseDischarge();
    if (!discharged) return `ICU Bed ${this.alreadyVacantMsg()}`;
    return `ICU Bed ${this.bedId} released. Requires doctor approval before freeing bed.`;
  }

  public setDoctor(doctorName: string): string {
    const doctorSet = this.baseSetDoctor(doctorName);
    if (doctorSet) {
      return `Dr. ${doctorName} assigned to ICU Bed ${this.bedId}.`;
    } else {
      return `Dr. ${doctorName} unassigned from ICU Bed ${this.bedId}.`;
    }
  }
}
