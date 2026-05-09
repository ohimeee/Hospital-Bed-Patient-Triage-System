import { CriticalBed } from "./CriticalBed.ts";

export class EmergencyBed extends CriticalBed {
  public temperature: number = 0;

  constructor(bedId: string, wardName: string, monitoringLevel: string) {
  super(bedId, wardName, monitoringLevel, 3000);

  this.bedType = "Emergency Bed";
  this.admitMessage = `Emergency Bed ${this.bedId} admitted. Fast-tracked admission, no prior paperwork needed.`;
  this.dischargeMessage = `Emergency Bed ${this.bedId} released. Patient auto-moved to regular ward if stable.`;
  }

  public checkSepsisRisk(tempCelsius: number, heartRateBpm: number): string {
  this.temperature = tempCelsius;
  let riskFactors = 0;

  if (tempCelsius > 38.3 || tempCelsius < 36.0) {
    riskFactors++;
  }

  if (heartRateBpm > 90) {
    riskFactors++;
  }

  if (riskFactors >= 2) {
    return `[CRITICAL] Bed ${this.bedId}: Multiple SIRS criteria met. High SEPSIS risk!`;
  }

  if (riskFactors === 1) {
    return `[WARNING] Bed ${this.bedId}: Monitor closely. 1 risk factor detected.`;
  }

  return `[OK] Bed ${this.bedId}: Vitals stable.`;    
  }
}