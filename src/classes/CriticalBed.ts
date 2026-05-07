import { HospitalBed } from "./HospitalBed.ts";

export abstract class CriticalBed extends HospitalBed {
  private _monitoringLevel: string;

  constructor(_bedId: string, _wardName: string, _monitoringLevel: string) {
    super(_bedId, _wardName);
    this._monitoringLevel = _monitoringLevel;
  }

  public getMonitoringLevel(): string {
    return this._monitoringLevel;
  }

  public getBedInfo(): string {
    return `${this.bedId} - Monitoring level: ${this._monitoringLevel}`;
  }

  public setMonitoringLevel(value: string) {
    this._monitoringLevel = value;
  }
}

