import { CriticalBed } from "./CriticalBed.ts";

export class ICUBed extends CriticalBed {
  public oxygenLevel: number = 0;
  public bloodPressure: number = 0;

  constructor(bedId: string, wardName: string, monitoringLevel: string) {
    super(bedId, wardName, monitoringLevel, 5000);

    this.admitMessage = `ICU Bed ${this.bedId} admitted. Check if patient needs ventilator and flag staff.`;
    this.dischargeMessage = `ICU Bed ${this.bedId} released. Requires doctor approval before freeing bed.`;
    this.bedType = "ICU Bed";
  }

  public checkCriticalStatus(spo2: number, systolicBP: number): string {
    this.oxygenLevel = spo2;
    this.bloodPressure = systolicBP;
    let criticalIssues = 0;

    if (spo2 < 90) {
      criticalIssues = criticalIssues + 1;
    }

    if (systolicBP < 90 || systolicBP > 180) {
      criticalIssues = criticalIssues + 1;
    }

    if (criticalIssues >= 2) {
      return `[EMERGENCY] Bed ${this.bedId}: Organ failure risk. Notify Doctor!`;
    } else if (criticalIssues === 1) {
      return `[WARNING] Bed ${this.bedId}: Unstable vitals. Increase monitoring.`;
    }

    return `[STABLE] Bed ${this.bedId}: Vitals within ICU limits.`;
  }
}