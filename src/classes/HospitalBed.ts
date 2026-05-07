export abstract class HospitalBed {
  private _bedId: string;
  private _wardName: string;
  private _isOccupied: boolean;
  private _patientName: string;

  constructor(_bedId: string, _wardName: string) {
    this._bedId = _bedId;
    this._wardName = _wardName;
    this._isOccupied = false;
    this._patientName = "None";
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
  public get patientName(): string {
    return this._patientName;
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
  public set patientName(value: string) {
    this._patientName = value;
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

  protected alreadyOccupiedMsg(): string {
    return `${this._bedId} is already occupied by ${this._patientName}.`;
  }

  protected alreadyVacantMsg(): string {
    return `${this._bedId} is already vacant.`;
  }

  public abstract admitPatient(patientName: string): string;
  public abstract dischargePatient(): string;
  public abstract getBedInfo(): string;
}