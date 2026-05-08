import { GeneralBed } from "./GeneralBed.ts";

export class PediatricBed extends GeneralBed {
  constructor(bedId: string, wardName: string, wardFloor: string) {
    super(bedId, wardName, wardFloor, 2000);
  }

  public admitPatient(patientName: string): string {
    const admitted = this.baseAdmit(patientName);
    if (!admitted) return `Pediatric Bed ${this.alreadyOccupiedMsg()}`;
    return `Pediatric Bed ${this.bedId} admitted. Requires guardian info before admission.`;
  }

  public dischargePatient(): string {
    const discharged = this.baseDischarge();
    if (!discharged) return `Pediatric Bed ${this.alreadyVacantMsg()}`;
    return `Pediatric Bed ${this.bedId} released. Discharge summary sent to guardian.`;
  }

  public setDoctor(doctorName: string): string {
    const doctorSet = this.baseSetDoctor(doctorName);
    if (!doctorSet) {
      return `Dr. ${doctorName} assigned to Pediatric Bed ${this.bedId}.`;
    } else {
      return `Dr. ${doctorName} unassigned from Pediatric Bed ${this.bedId}.`;
    }
  }
}
