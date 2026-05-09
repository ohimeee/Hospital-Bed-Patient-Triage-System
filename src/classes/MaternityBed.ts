import { GeneralBed } from "./GeneralBed.ts";

export class MaternityBed extends GeneralBed {
  private _hasDelivered: boolean;
  private _deliveryDate: string;
  private _newbornName: string;

  constructor(bedId: string, wardName: string, wardFloor: string) {
    super(bedId, wardName, wardFloor, 2500);
    this._hasDelivered = false;
    this._deliveryDate = "Unknown";
    this._newbornName = "None";

    this.admitMessage = `Maternity Bed ${this.bedId} admitted. Expected delivery date logged.`;
    this.dischargeMessage = `Maternity Bed ${this.bedId} released. Newborn record required before release.`;
    this.bedType = "Maternity Bed";
  }

  public get hasDelivered(): boolean {
    return this._hasDelivered;
  }
  
  public get deliveryDate(): string {
    return this._deliveryDate;
  }

  public get newbornName(): string {
    return this._newbornName;
  }

  // Records delivery details for the maternity patient
  public recordDelivery(deliveryDate: string, newbornName: string): string {
    if (!this.isOccupied) {
      return `Maternity Bed ${this.bedId} has no patient to record delivery for.`;
    }

    this._hasDelivered = true;
    this._deliveryDate = deliveryDate;
    this._newbornName = newbornName;

    return `Delivery recorded for patient in Maternity Bed ${this.bedId}. Newborn: ${newbornName}, Delivery Date: ${deliveryDate}.`;
  }

  // Clear delivery info upon discharge
  public dischargePatient(): string {
    const message = super.dischargePatient();
    this._hasDelivered = false;
    this._deliveryDate = "Unknown";
    this._newbornName = "None";
    return message;
  }
}
