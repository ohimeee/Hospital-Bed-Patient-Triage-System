import { CriticalBed } from "./CriticalBed.ts";

export class EmergencyBed extends CriticalBed {
  constructor(bedId: string, wardName: string, monitoringLevel: string) {
    super(bedId, wardName, monitoringLevel, 3000);
    this.admitMessage = `Emergency Bed ${this.bedId} admitted. Fast-tracked admission, no prior paperwork needed.`;
    this.dischargeMessage = `Emergency Bed ${this.bedId} released. Patient auto-moved to regular ward if stable.`;
  }

  public setDoctor(doctorName: string): string {
    const doctorSet = this.baseSetDoctor(doctorName);
    if (!doctorSet) {
      return `Dr. ${doctorName} assigned to Emergency Bed ${this.bedId}.`;
    } else {
      return `Dr. ${doctorName} unassigned from Emergency Bed ${this.bedId}.`;
    }
  }
}


