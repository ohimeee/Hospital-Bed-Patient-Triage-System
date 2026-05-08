import { GeneralBed } from "./GeneralBed.ts";

export class MaternityBed extends GeneralBed {
  constructor(bedId: string, wardName: string, wardFloor: string) {
    super(bedId, wardName, wardFloor, 2500);
  }

  public admitPatient(patientName: string): string {
    const admitted = this.baseAdmit(patientName);
    if (!admitted) return `Maternity Bed ${this.alreadyOccupiedMsg()}`;
    return `Maternity Bed ${this.bedId} admitted. Expected delivery date logged.`;
  }

  public dischargePatient(): string {
    const discharged = this.baseDischarge();
    if (!discharged) return `Maternity Bed ${this.alreadyVacantMsg()}`;
    return `Maternity Bed ${this.bedId} released. Newborn record required before release.`;
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
