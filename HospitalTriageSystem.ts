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

    public getBedId(): string          { return this.bedId; }
    public setBedId(v: string): void   { this.bedId = v; }

    public getWardName(): string       { return this.wardName; }
    public setWardName(v: string): void { this.wardName = v; }

    public getIsOccupied(): boolean        { return this.isOccupied; }
    public setIsOccupied(v: boolean): void { this.isOccupied = v; }

    public getPatientName(): string      { return this.patientName; }
    public setPatientName(v: string): void { this.patientName = v; }

    protected baseAdmit(patientName: string): boolean {
        if (this.isOccupied) return false;
        this.isOccupied = true;
        this.patientName = patientName;
        return true;
    }

    protected baseDischarge(): boolean {
        if (!this.isOccupied) return false;
        this.isOccupied = false;
        this.patientName = "None";
        return true;
    }

    protected alreadyOccupiedMsg(): string {
        return `${this.bedId} is already occupied by ${this.patientName}.`;
    }

    protected alreadyVacantMsg(): string {
        return `${this.bedId} is already vacant.`;
    }

    public abstract admitPatient(patientName: string): string;
    public abstract dischargePatient(): string;
    public abstract getBedInfo(): string;
}


abstract class CriticalBed extends HospitalBed {
    private monitoringLevel: string;

    constructor(bedId: string, wardName: string, monitoringLevel: string) {
        super(bedId, wardName);
        this.monitoringLevel = monitoringLevel;
    }

    public getMonitoringLevel(): string       { return this.monitoringLevel; }
    public setMonitoringLevel(v: string): void { this.monitoringLevel = v; }

    public getBedInfo(): string {
        return `${this.getBedId()} - Monitoring level: ${this.monitoringLevel}`;
    }
}


abstract class GeneralBed extends HospitalBed {
    private wardFloor: string;

    constructor(bedId: string, wardName: string, wardFloor: string) {
        super(bedId, wardName);
        this.wardFloor = wardFloor;
    }

    public getWardFloor(): string       { return this.wardFloor; }
    public setWardFloor(v: string): void { this.wardFloor = v; }

    public getBedInfo(): string {
        return `${this.getBedId()} - Floor: ${this.wardFloor}`;
    }
}


class ICUBed extends CriticalBed {
    constructor(bedId: string, wardName: string, monitoringLevel: string) {
        super(bedId, wardName, monitoringLevel);
    }

    public admitPatient(patientName: string): string {
        const admitted = this.baseAdmit(patientName);
        if (!admitted) return `ICU Bed ${this.alreadyOccupiedMsg()}`;
        return `ICU Bed ${this.getBedId()} admitted. Check if patient needs ventilator and flag staff.`;
    }

    public dischargePatient(): string {
        const discharged = this.baseDischarge();
        if (!discharged) return `ICU Bed ${this.alreadyVacantMsg()}`;
        return `ICU Bed ${this.getBedId()} released. Requires doctor approval before freeing bed.`;
    }
}


class EmergencyBed extends CriticalBed {
    constructor(bedId: string, wardName: string, monitoringLevel: string) {
        super(bedId, wardName, monitoringLevel);
    }

    public admitPatient(patientName: string): string {
        const admitted = this.baseAdmit(patientName);
        if (!admitted) return `Emergency Bed ${this.alreadyOccupiedMsg()}`;
        return `Emergency Bed ${this.getBedId()} admitted. Fast-tracked admission, no prior paperwork needed.`;
    }

    public dischargePatient(): string {
        const discharged = this.baseDischarge();
        if (!discharged) return `Emergency Bed ${this.alreadyVacantMsg()}`;
        return `Emergency Bed ${this.getBedId()} released. Patient auto-moved to regular ward if stable.`;
    }
}


class PediatricBed extends GeneralBed {
    constructor(bedId: string, wardName: string, wardFloor: string) {
        super(bedId, wardName, wardFloor);
    }

    public admitPatient(patientName: string): string {
        const admitted = this.baseAdmit(patientName);
        if (!admitted) return `Pediatric Bed ${this.alreadyOccupiedMsg()}`;
        return `Pediatric Bed ${this.getBedId()} admitted. Requires guardian info before admission.`;
    }

    public dischargePatient(): string {
        const discharged = this.baseDischarge();
        if (!discharged) return `Pediatric Bed ${this.alreadyVacantMsg()}`;
        return `Pediatric Bed ${this.getBedId()} released. Discharge summary sent to guardian.`;
    }
}


class MaternityBed extends GeneralBed {
    constructor(bedId: string, wardName: string, wardFloor: string) {
        super(bedId, wardName, wardFloor);
    }

    public admitPatient(patientName: string): string {
        const admitted = this.baseAdmit(patientName);
        if (!admitted) return `Maternity Bed ${this.alreadyOccupiedMsg()}`;
        return `Maternity Bed ${this.getBedId()} admitted. Expected delivery date logged.`;
    }

    public dischargePatient(): string {
        const discharged = this.baseDischarge();
        if (!discharged) return `Maternity Bed ${this.alreadyVacantMsg()}`;
        return `Maternity Bed ${this.getBedId()} released. Newborn record required before release.`;
    }
}

type BedType = "ICU" | "Emergency" | "Pediatric" | "Maternity";
type BedDefaults = {
    wardName: string;
    detail: string;
};

const BED_TYPE_LABELS = new Map<Function, string>([
    [ICUBed,       "ICU Bed"],
    [EmergencyBed, "Emergency Bed"],
    [PediatricBed, "Pediatric Bed"],
    [MaternityBed, "Maternity Bed"],
]);

const BED_DEFAULTS: Record<BedType, BedDefaults> = {
    ICU:       { wardName: "ICU Ward",       detail: "Medium" },
    Emergency: { wardName: "Emergency Ward", detail: "Medium" },
    Pediatric: { wardName: "Pediatric Ward", detail: "3rd Floor" },
    Maternity: { wardName: "Maternity Ward", detail: "2nd Floor" },
};


class HospitalTriageSystem {
    private bedsList: HospitalBed[] = [];

    constructor() {
        this.initializeData();
    }

    private initializeData(): void {
        this.bedsList.push(new ICUBed("ICU-01", "ICU Ward",        "High"));
        this.bedsList.push(new ICUBed("ICU-02", "ICU Ward",        "Medium"));
        this.bedsList.push(new EmergencyBed("EM-01",  "Emergency Ward", "High"));
        this.bedsList.push(new PediatricBed("PED-01", "Pediatric Ward", "3rd Floor"));
        this.bedsList.push(new MaternityBed("MAT-01", "Maternity Ward", "2nd Floor"));
    }

    private findAvailableBed(bedType: BedType): HospitalBed | undefined {
        const typeMap: Record<BedType, Function> = {
            ICU:       ICUBed,
            Emergency: EmergencyBed,
            Pediatric: PediatricBed,
            Maternity: MaternityBed,
        };
        const BedClass = typeMap[bedType];
        return this.bedsList.find((bed) => bed instanceof BedClass && !bed.getIsOccupied());
    }

    private findBedById(bedId: string): HospitalBed | undefined {
        return this.bedsList.find((bed) => bed.getBedId() === bedId);
    }

    private createBed(bedType: BedType, bedId: string): HospitalBed {
        const defaults = BED_DEFAULTS[bedType];
        const ward = defaults.wardName;

        switch (bedType) {
            case "ICU":
                return new ICUBed(bedId, ward, defaults.detail);
            case "Emergency":
                return new EmergencyBed(bedId, ward, defaults.detail);
            case "Pediatric":
                return new PediatricBed(bedId, ward, defaults.detail);
            case "Maternity":
                return new MaternityBed(bedId, ward, defaults.detail);
        }
    }

    public addBed(bedType: BedType, bedId: string): string {
        const cleanedBedId = bedId.trim().toUpperCase();

        if (!cleanedBedId) {
            return "[ERROR] Enter a bed ID before adding a bed.";
        }

        if (this.findBedById(cleanedBedId)) {
            return `[ERROR] Bed ID ${cleanedBedId} already exists.`;
        }

        const bed = this.createBed(bedType, cleanedBedId);
        this.bedsList.push(bed);

        return `[ADDED] ${this.getBedTypeLabel(bed)} ${cleanedBedId} added to ${bed.getWardName()}.`;
    }

    public admitPatient(bedType: BedType, patientName: string): string {
        const bed = this.findAvailableBed(bedType);
        if (!bed) return `[FAILED] No available ${bedType} beds found.`;
        return `[ADMIT] ${bed.admitPatient(patientName)}`;
    }

    public dischargePatient(bedId: string): string {
        const bed = this.findBedById(bedId);
        if (!bed)               return `[ERROR] Bed ID ${bedId} not found.`;
        if (!bed.getIsOccupied()) return `[INFO] Bed ${bedId} is already vacant.`;
        return `[DISCHARGE] ${bed.dischargePatient()}`;
    }

    public printWardSummary(): void {
        console.log("\n--- Ward Summary ---");

        let occupiedCount = 0;
        this.bedsList.forEach((bed) => {
            const status = bed.getIsOccupied()
                ? `Occupied by ${bed.getPatientName()}`
                : "Available";
            console.log(`${bed.getBedId()} | ${bed.getWardName()} | ${bed.getBedInfo()} | ${status}`);
            if (bed.getIsOccupied()) occupiedCount++;
        });

        const capacityPercent = Math.round((occupiedCount / this.bedsList.length) * 100);
        const isCritical      = capacityPercent >= 80;
        const statusColor     = isCritical ? "\x1b[31m" : "\x1b[32m";
        const statusMessage   = isCritical
            ? `[CRITICAL CAPACITY ALERT] ${capacityPercent}% full!`
            : `[STATUS NORMAL] ${capacityPercent}% capacity utilized.`;

        console.log(`${statusColor}${statusMessage}\x1b[0m`);
        console.log("---------------------\n");
    }

    public getBedsList(): HospitalBed[] {
        return [...this.bedsList];
    }

    public getCapacitySummary(): { occupied: number; total: number; percent: number } {
        const total    = this.bedsList.length;
        const occupied = this.bedsList.filter((bed) => bed.getIsOccupied()).length;
        const percent  = Math.round((occupied / total) * 100);
        return { occupied, total, percent };
    }

    public getBedTypeLabel(bed: HospitalBed): string {
        return BED_TYPE_LABELS.get(bed.constructor) ?? "Hospital Bed";
    }

}

function mountHospitalSystem() {
    const system = new HospitalTriageSystem();
    let selectedBedId: string | null = null;

    const patientName = document.getElementById("patientName") as HTMLInputElement;
    const bedType = document.getElementById("bedType") as HTMLSelectElement;
    const newBedId = document.getElementById("newBedId") as HTMLInputElement;
    const newBedType = document.getElementById("newBedType") as HTMLSelectElement;
    const bedsGrid = document.getElementById("bedsGrid")!;
    const log = document.getElementById("activityLog")!;

    const totalBeds = document.getElementById("totalBeds")!;
    const occupiedBeds = document.getElementById("occupiedBeds")!;
    const availableBeds = document.getElementById("availableBeds")!;

    const percent = document.getElementById("capacity-percent")!;
    const pillText = document.getElementById("capacity-text")!;
    const pill = document.getElementById("capacity-pill")!;

    const logMsg = (msg: string) => {
        const p = document.createElement("p");
        p.textContent = msg;
        log.prepend(p);
    };

    const escapeHtml = (value: string): string =>
        value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    const refresh = () => {
        const data = system.getCapacitySummary();
        const beds = system.getBedsList();

        totalBeds.textContent = String(data.total);
        occupiedBeds.textContent = String(data.occupied);
        availableBeds.textContent = String(data.total - data.occupied);

        percent.textContent = `${data.percent}%`;
        pillText.textContent = data.percent >= 80 ? "Critical capacity" : "Capacity normal";
        pill.className = `capacity-pill ${data.percent >= 80 ? "critical" : "normal"}`;

        bedsGrid.innerHTML = beds.map(bed => {
            const isSelected = selectedBedId === bed.getBedId();
            const isOccupied = bed.getIsOccupied();
            const btnText = isOccupied ? "Discharge" : (isSelected ? "Selected" : "Select");
            const btnClass = `secondary-button ${isSelected && !isOccupied ? "selected-button" : ""}`.trim();
            return `
            <div class="bed-card ${isSelected && !isOccupied ? "selected" : ""}">
                <strong>${escapeHtml(bed.getBedId())}</strong>
                <p>${escapeHtml(bed.getWardName())}</p>
                <p>${escapeHtml(bed.getBedInfo())}</p>
                <p>${isOccupied ? `Occupied (${escapeHtml(bed.getPatientName())})` : "Available"}</p>

                <button class="${btnClass}" data-id="${escapeHtml(bed.getBedId())}">
                    ${btnText}
                </button>
            </div>
        `}).join("");

        bedsGrid.querySelectorAll("button").forEach(btn => {
            (btn as HTMLButtonElement).onclick = () => {
                const id = (btn as HTMLButtonElement).dataset.id!;
                const bed = system.getBedsList().find(b => b.getBedId() === id);

                if (!bed) return;

                if (bed.getIsOccupied()) {
                    logMsg(system.dischargePatient(id));
                    selectedBedId = null;
                } else {
                    selectedBedId = id;
                    logMsg(`[INFO] Selected ${id}`);
                }

                refresh();
            };
        });
    };

    document.getElementById("admitButton")!.addEventListener("click", () => {
        const name = patientName.value.trim();

        if (!name) {
            logMsg("[INFO] Enter a patient name first.");
            return;
        }

        logMsg(system.admitPatient(bedType.value as any, name));
        patientName.value = "";
        refresh();
    });

    document.getElementById("addBedButton")!.addEventListener("click", () => {
        const bedId = newBedId.value.trim();

        const result = system.addBed(newBedType.value as BedType, bedId);
        logMsg(result);

        if (result.startsWith("[ADDED]")) {
            newBedId.value = "";
        }

        refresh();
    });

    document.getElementById("summaryButton")!.addEventListener("click", () => {
        const s = system.getCapacitySummary();
        logMsg(`Summary: ${s.occupied}/${s.total} occupied (${s.percent}%)`);
    });

    document.getElementById("clearLogButton")!.addEventListener("click", () => {
        log.innerHTML = "";
    });

    refresh();
}

document.addEventListener("DOMContentLoaded", mountHospitalSystem);
