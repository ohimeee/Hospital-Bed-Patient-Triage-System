import { HospitalBed } from "./HospitalBed.ts";

export abstract class GeneralBed extends HospitalBed {
  private _wardFloor: string;

  constructor(bedId: string, wardName: string, wardFloor: string, dailyRate: number) {
    super(bedId, wardName, dailyRate);
    this._wardFloor = wardFloor;
  }

  public getWardFloor(): string {
    return this._wardFloor;
  }

  public getBedInfo(): string {
    return `${this.bedId} - Floor: ${this._wardFloor}`;
  }

  public setWardFloor(value: string) {
    this._wardFloor = value;
  }

}

