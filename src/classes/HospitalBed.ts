export abstract class HospitalBed {
  private _bedId: string;
  private _wardName: string;
  private _isOccupied: boolean;
  private _hasAssignedDoctor: boolean;
  private _patientName: string;
  private _doctorName: string;
  private _dailyRate: number;
  private _totalBill: number;
  private _daysAdmitted: number;


  constructor(_bedId: string, _wardName: string, _dailyRate: number) {
    this._bedId = _bedId;
    this._wardName = _wardName;
    this._dailyRate = _dailyRate;
    this._isOccupied = false;
    this._hasAssignedDoctor = false;
    this._patientName = "None";
    this._doctorName = "None";
    this._totalBill = 0;
    this._daysAdmitted = 0;
  }

  // getters
  public get bedId(): string {
    return this._bedId;
  }
  public get wardName(): string {
    return this._wardName;
  }
  public get isOccupied(): boolean {
    return this._isOccupied;
  }
  public get hasAssignedDoctor(): boolean {
    return this._hasAssignedDoctor;
  }
  public get patientName(): string {
    return this._patientName;
  }
  public get doctorName(): string {
    return this._doctorName;
  }
  public get dailyRate(): number {
    return this._dailyRate;
  }
  public get totalBill(): number {
    return this._totalBill;
  }
  public get daysAdmitted(): number {
    return this._daysAdmitted;
  }


  // setters
  public set bedId(value: string) {
    this._bedId = value;
  }
  public set wardName(value: string) {
    this._wardName = value;
  }
  public set isOccupied(value: boolean) {
    this._isOccupied = value;
  }
  public set hasAssignedDoctor(value: boolean) {
    this._hasAssignedDoctor = value;
  }
  public set patientName(value: string) {
    this._patientName = value;
  }
  public set doctorName(value: string) {
    this._doctorName = value;
  }
  public set totalBill(value: number) {
    this._totalBill = value;
  }


  public chargeOneDay(): string {
    if (!this._isOccupied) {
      return `${this._bedId} is vacant. no charge.`;
    }

    this._daysAdmitted += 1;
    this._totalBill += this._dailyRate;

    return `${this._bedId} Charged ₱${this._dailyRate}. Total Bill: ₱${this._totalBill}.`;
  }



  // protected methods
  protected baseAdmit(patientName: string): boolean {
    if (this._isOccupied) {
      return false;
    } else {
      this._isOccupied = true;
      this._patientName = patientName;
      return true;
    }
  }

  protected baseDischarge(): boolean {
    if (!this._isOccupied) {
      return false;
    } else {
      this._isOccupied = false;
      this._patientName = "None";
      return true;
    }
  }

  protected baseAssignDoctor(doctorName: string): boolean {
    if (this._hasAssignedDoctor) {
      return false;
    } else {
      this._hasAssignedDoctor = true;
      this._doctorName = doctorName;
      return true;
    }
  }

  protected baseUnassignDoctor(): boolean {
    if (!this._hasAssignedDoctor) {
      return false;
    } else {
      this._hasAssignedDoctor = false;
      this._doctorName = "None";
      return true;
    }
  }

  protected alreadyOccupiedMsg(): string {
    return `${this._bedId} is already occupied by ${this._patientName}.`;
  }

  protected alreadyVacantMsg(): string {
    return `${this._bedId} is already vacant.`;
  }

  protected alreadyHasDoctorMsg(): string {
    return `${this._bedId} already has Dr. ${this._doctorName} assigned.`;
  }

  protected noDoctorAssignedMsg(): string {
    return `${this._bedId} has no doctor assigned.`;
  }

  public abstract admitPatient(patientName: string): string;
  public abstract dischargePatient(): string;
  public abstract assignDoctor(doctorName: string): string;
  public abstract unassignDoctor(): string;
  public abstract getBedInfo(): string;
}
