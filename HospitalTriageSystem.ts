
abstract class HospitalBed {

    private bedId: string;
    private wardName: string;
    private isOccupied: boolean;
    private patientName: string;

    constructor(bedId: string, wardName: string) {
        this.bedId = bedId;
        this.wardName = wardName;
        this.isOccupied = false;
        this.patientName = "None";
    }

    
    public getBedId(): string {
        return this.bedId;
    }

    public setBedId(bedId: string): void {
        this.bedId = bedId;
    }

    public getWardName(): string {
        return this.wardName;
    }

    public setWardName(wardName: string): void {
        this.wardName = wardName;
    }

    public getIsOccupied(): boolean {
        return this.isOccupied;
    }

    public setIsOccupied(occupied: boolean): void {
        this.isOccupied = occupied;
    }

    public getPatientName(): string {
        return this.patientName;
    }

    public setPatientName(patientName: string): void {
        this.patientName = patientName;
    }

   
    public abstract admitPatient(pName: string): string;
    public abstract dischargePatient(): string;
    public abstract getBedInfo(): string;
}


abstract class CriticalBed extends HospitalBed {
    private monitoringLevel: string;

    constructor(bedId: string, wardName: string, monitoringLevel: string) {
        super(bedId, wardName);
        this.monitoringLevel = monitoringLevel;
    }

    public getMonitoringLevel(): string {
        return this.monitoringLevel;
    }

    public setMonitoringLevel(monitoringLevel: string): void {
        this.monitoringLevel = monitoringLevel;
    }
}


class ICUBed extends CriticalBed {
    constructor(bedId: string, wardName: string, monitoringLevel: string) {
        super(bedId, wardName, monitoringLevel);
    }

    public admitPatient(pName: string): string {
        if (this.getIsOccupied()) {
            return `ICU Bed ${this.getBedId()} is already occupied by ${this.getPatientName()}.`;
        }

        this.setIsOccupied(true);
        this.setPatientName(pName);
        return `ICU Bed ${this.getBedId()} admitted. Check if patient needs ventilator, and flag staff.`;
    }

    public dischargePatient(): string {
        if (!this.getIsOccupied()) {
            return `ICU Bed ${this.getBedId()} is already vacant.`;
        }

        this.setIsOccupied(false);
        this.setPatientName("None");
        return `ICU Bed ${this.getBedId()} released. Requires doctor approval before freeing bed.`;
    }

    public getBedInfo(): string {
        return `ICU Bed [${this.getBedId()}] - Level: ${this.getMonitoringLevel()}`;
    }
}

class EmergencyBed extends CriticalBed {
    constructor(bedId: string, wardName: string, monitoringLevel: string) {
        super(bedId, wardName, monitoringLevel);
    }

    public admitPatient(pName: string): string {
        if (this.getIsOccupied()) {
            return `Emergency Bed ${this.getBedId()} is already occupied by ${this.getPatientName()}.`;
        }

        this.setIsOccupied(true);
        this.setPatientName(pName);
        return `Emergency Bed ${this.getBedId()} admitted. Fast-tracked admission (no prior paperwork).`;
    }

    public dischargePatient(): string {
        if (!this.getIsOccupied()) {
            return `Emergency Bed ${this.getBedId()} is already vacant.`;
        }

        this.setIsOccupied(false);
        this.setPatientName("None");
        return `Emergency Bed ${this.getBedId()} released. Auto-moved patient to regular ward if stable.`;
    }

    public getBedInfo(): string {
        return `Emergency Bed [${this.getBedId()}] - Level: ${this.getMonitoringLevel()}`;
    }
}


abstract class GeneralBed extends HospitalBed {
    private wardFloor: string;

    constructor(bedId: string, wardName: string, wardFloor: string) {
        super(bedId, wardName);
        this.wardFloor = wardFloor;
    }

    public getWardFloor(): string {
        return this.wardFloor;
    }

    public setWardFloor(wardFloor: string): void {
        this.wardFloor = wardFloor;
    }
}


class PediatricBed extends GeneralBed {
    constructor(bedId: string, wardName: string, wardFloor: string) {
        super(bedId, wardName, wardFloor);
    }

    public admitPatient(pName: string): string {
        if (this.getIsOccupied()) {
            return `Pediatric Bed ${this.getBedId()} is already occupied by ${this.getPatientName()}.`;
        }

        this.setIsOccupied(true);
        this.setPatientName(pName);
        return `Pediatric Bed ${this.getBedId()} admitted. Requires guardian info before admission.`;
    }

    public dischargePatient(): string {
        if (!this.getIsOccupied()) {
            return `Pediatric Bed ${this.getBedId()} is already vacant.`;
        }

        this.setIsOccupied(false);
        this.setPatientName("None");
        return `Pediatric Bed ${this.getBedId()} released. Sends discharge summary to guardian.`;
    }

    public getBedInfo(): string {
        return `Pediatric Bed [${this.getBedId()}] - Floor: ${this.getWardFloor()}`;
    }
}

class MaternityBed extends GeneralBed {
    constructor(bedId: string, wardName: string, wardFloor: string) {
        super(bedId, wardName, wardFloor);
    }

    public admitPatient(pName: string): string {
        if (this.getIsOccupied()) {
            return `Maternity Bed ${this.getBedId()} is already occupied by ${this.getPatientName()}.`;
        }

        this.setIsOccupied(true);
        this.setPatientName(pName);
        return `Maternity Bed ${this.getBedId()} admitted. Logs expected delivery date.`;
    }

    public dischargePatient(): string {
        if (!this.getIsOccupied()) {
            return `Maternity Bed ${this.getBedId()} is already vacant.`;
        }

        this.setIsOccupied(false);
        this.setPatientName("None");
        return `Maternity Bed ${this.getBedId()} released. Requires newborn record before release.`;
    }

    public getBedInfo(): string {
        return `Maternity Bed [${this.getBedId()}] - Floor: ${this.getWardFloor()}`;
    }
}

type BedType = "ICU" | "Emergency" | "Pediatric" | "Maternity";


class HospitalTriageSystem {
    private bedsList: HospitalBed[] = [];

    constructor() {
        this.initializeData();
    }

    private initializeData(): void {
        this.bedsList.push(new ICUBed("ICU-01", "ICU Ward", "High"));
        this.bedsList.push(new ICUBed("ICU-02", "ICU Ward", "Medium"));
        this.bedsList.push(new EmergencyBed("EM-01", "Emergency Ward", "High"));
        this.bedsList.push(new PediatricBed("PED-01", "Pediatric Ward", "3rd Floor"));
        this.bedsList.push(new MaternityBed("MAT-01", "Maternity Ward", "2nd Floor"));
    }

    public admitPatient(bedType: BedType, patientName: string): void {
        const bed = this.bedsList.find((b) => {
            if (bedType === "ICU" && b instanceof ICUBed && !b.getIsOccupied()) return true;
            if (bedType === "Emergency" && b instanceof EmergencyBed && !b.getIsOccupied()) return true;
            if (bedType === "Pediatric" && b instanceof PediatricBed && !b.getIsOccupied()) return true;
            if (bedType === "Maternity" && b instanceof MaternityBed && !b.getIsOccupied()) return true;
            return false;
        });

        if (bed) {
            console.log(`[ADMIT] ${bed.admitPatient(patientName)}`);
        } else {
            console.log(`[FAILED] No available ${bedType} beds found.`);
        }
    }

    public dischargePatient(bedId: string): void {
        const bed = this.bedsList.find((b) => b.getBedId() === bedId);

        if (bed) {
            if (bed.getIsOccupied()) {
                console.log(`[DISCHARGE] ${bed.dischargePatient()}`);
            } else {
                console.log(`[INFO] Bed ${bedId} is already vacant.`);
            }
        } else {
            console.log(`[ERROR] Bed ID ${bedId} not found.`);
        }
    }

    public printWardSummary(): void {
        let occupied = 0;
        console.log("\n--- Ward Summary ---");

        this.bedsList.forEach((b) => {
            console.log(
                `ID: ${b.getBedId()} | Ward: ${b.getWardName()} | Bed Info: ${b.getBedInfo()} | Status: ${
                    b.getIsOccupied() ? "Occupied (" + b.getPatientName() + ")" : "Available"
                }`
            );

            if (b.getIsOccupied()) {
                occupied++;
            }
        });

        const capacityRatio = occupied / this.bedsList.length;
        if (capacityRatio >= 0.8) {
            console.log(`\x1b[31m[CRITICAL CAPACITY ALERT] ${Math.round(capacityRatio * 100)}% full!\x1b[0m`);
        } else {
            console.log(`\x1b[32m[STATUS NORMAL] ${Math.round(capacityRatio * 100)}% capacity utilized.\x1b[0m`);
        }

        console.log("---------------------\n");
    }
}
