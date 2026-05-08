import { GeneralBed } from "./GeneralBed.ts";

export class PediatricBed extends GeneralBed {
  private _guardianName: string;

  constructor(bedId: string, wardName: string, wardFloor: string) {
    super(bedId, wardName, wardFloor, 2000);
    this._guardianName = "None";

    this.admitMessage = `Pediatric Bed ${this.bedId} admitted. Guardian info should be added.`;
    this.dischargeMessage = `Pediatric Bed ${this.bedId} released. Discharge summary sent to guardian.`;
    this.bedType = "Pediatric Bed";
  }

  public get guardianName(): string {
    return this._guardianName;
  }

  public addGuardianInfo(guardianName: string): string {
    if (!this.isOccupied) {
      return `Pediatric Bed ${this.bedId} has no patient for guardian info.`;
    }

    if (!guardianName) {
      return `Enter guardian name first.`;
    }

    this._guardianName = guardianName;

    return `Guardian ${guardianName} added for Pediatric Bed ${this.bedId}.`;
  }

  public dischargePatient(): string {
    const message = super.dischargePatient();
    this._guardianName = "None";
    return message;
  }

}
