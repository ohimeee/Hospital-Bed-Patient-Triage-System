import { HospitalBed } from "./HospitalBed.ts";

export abstract class CriticalBed extends HospitalBed {
  constructor(_bedId: string, _wardName: string, _monitoringLevel: string, _dailyRate: number) {
    super(_bedId, _wardName, _dailyRate);
    this.setMonitoringLevel(_monitoringLevel);
  }

  public getMonitoringLevel(): string {
    return super.getMonitoringLevel();
  }

  public getBedInfo(): string {
    return `${this.bedId} - Monitoring level: ${this.getMonitoringLevel()}`;
  }

  public setMonitoringLevel(value: string) {
    super.setMonitoringLevel(value);
  }
}

