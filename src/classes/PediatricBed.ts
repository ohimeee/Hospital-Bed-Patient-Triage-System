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

  public assignDoctor(doctorName: string): string {
    const assigned = this.baseAssignDoctor(doctorName);
    if (!assigned) return `Pediatric Bed ${this.alreadyHasDoctorMsg()}`;
    return `Dr. ${doctorName} assigned to Pediatric Bed ${this.bedId}.`;
  }

  public unassignDoctor(): string {
    const unassigned = this.baseUnassignDoctor();
    if (!unassigned) return `Pediatric Bed ${this.noDoctorAssignedMsg()}`;
    return `Doctor unassigned from Pediatric Bed ${this.bedId}.`;
  }
}
