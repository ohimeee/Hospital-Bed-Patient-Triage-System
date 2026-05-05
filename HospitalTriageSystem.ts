
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

    public admitPatient(bedType: BedType, patientName: string): string {
        const bed = this.bedsList.find((b) => {
            if (bedType === "ICU" && b instanceof ICUBed && !b.getIsOccupied()) return true;
            if (bedType === "Emergency" && b instanceof EmergencyBed && !b.getIsOccupied()) return true;
            if (bedType === "Pediatric" && b instanceof PediatricBed && !b.getIsOccupied()) return true;
            if (bedType === "Maternity" && b instanceof MaternityBed && !b.getIsOccupied()) return true;
            return false;
        });

        if (bed) {
            return `[ADMIT] ${bed.admitPatient(patientName)}`;
        }

        return `[FAILED] No available ${bedType} beds found.`;
    }

    public dischargePatient(bedId: string): string {
        const bed = this.bedsList.find((b) => b.getBedId() === bedId);

        if (bed) {
            if (bed.getIsOccupied()) {
                return `[DISCHARGE] ${bed.dischargePatient()}`;
            }

            return `[INFO] Bed ${bedId} is already vacant.`;
        }

        return `[ERROR] Bed ID ${bedId} not found.`;
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

    public getBedsList(): HospitalBed[] {
        return [...this.bedsList];
    }

    public getCapacitySummary(): { occupied: number; total: number; percent: number } {
        const occupied = this.bedsList.filter((bed) => bed.getIsOccupied()).length;
        const total = this.bedsList.length;
        const percent = Math.round((occupied * 100) / total);

        return { occupied, total, percent };
    }
}

class HospitalTriageUI {
    private readonly system = new HospitalTriageSystem();
    private readonly app: HTMLElement;
    private selectedBedId = "";

    constructor(app: HTMLElement) {
        this.app = app;
        this.render();
        this.addLog("System ready. All wards loaded.");
    }

    private render(): void {
        const { occupied, total, percent } = this.system.getCapacitySummary();
        const available = total - occupied;
        const capacityState = percent >= 80 ? "critical" : "normal";

        this.app.innerHTML = `
            <header class="topbar">
                <div>
                    <p class="eyebrow">Hospital Operations</p>
                    <h1>Bed Availability & Patient Triage</h1>
                </div>
                <div class="capacity-pill ${capacityState}">
                    <span>${percent}%</span>
                    <small>${capacityState === "critical" ? "Critical capacity" : "Capacity normal"}</small>
                </div>
            </header>

            <main class="layout">
                <section class="summary-grid" aria-label="Bed summary">
                    <article class="summary-card">
                        <span>Total Beds</span>
                        <strong>${total}</strong>
                    </article>
                    <article class="summary-card">
                        <span>Occupied</span>
                        <strong>${occupied}</strong>
                    </article>
                    <article class="summary-card">
                        <span>Available</span>
                        <strong>${available}</strong>
                    </article>
                </section>

                <section class="work-area">
                    <div class="panel triage-panel">
                        <div class="panel-heading">
                            <h2>Patient Triage</h2>
                        </div>

                        <label for="patientName">Patient name</label>
                        <input id="patientName" type="text" placeholder="Enter patient name" autocomplete="off" />

                        <label for="bedType">Bed type</label>
                        <select id="bedType">
                            <option value="ICU">ICU</option>
                            <option value="Emergency">Emergency</option>
                            <option value="Pediatric">Pediatric</option>
                            <option value="Maternity">Maternity</option>
                        </select>

                        <button id="admitButton" class="primary-button" type="button">Admit Patient</button>
                    </div>

                    <div class="panel beds-panel">
                        <div class="panel-heading">
                            <h2>Ward Beds</h2>
                            <button id="summaryButton" class="ghost-button" type="button">Print Summary</button>
                        </div>
                        <div id="bedsGrid" class="beds-grid"></div>
                    </div>
                </section>

                <section class="panel log-panel">
                    <div class="panel-heading">
                        <h2>Activity Log</h2>
                        <button id="clearLogButton" class="ghost-button" type="button">Clear</button>
                    </div>
                    <div id="activityLog" class="activity-log" aria-live="polite"></div>
                </section>
            </main>
        `;

        this.renderBeds();
        this.bindEvents();
    }

    private renderBeds(): void {
        const bedsGrid = this.getElement<HTMLDivElement>("bedsGrid");
        const beds = this.system.getBedsList();

        bedsGrid.innerHTML = beds.map((bed) => {
            const occupied = bed.getIsOccupied();
            const selected = bed.getBedId() === this.selectedBedId;

            return `
                <article class="bed-card ${occupied ? "occupied" : "available"} ${selected ? "selected" : ""}">
                    <div class="bed-card-header">
                        <div>
                            <strong>${bed.getBedId()}</strong>
                            <span>${this.getBedTypeLabel(bed)}</span>
                        </div>
                        <mark>${occupied ? "Occupied" : "Available"}</mark>
                    </div>
                    <p>${bed.getWardName()}</p>
                    <p class="bed-info">${bed.getBedInfo()}</p>
                    <div class="patient-line">
                        <span>Patient</span>
                        <strong>${bed.getPatientName()}</strong>
                    </div>
                    <button class="secondary-button" type="button" data-bed-id="${bed.getBedId()}">
                        ${occupied ? "Discharge" : "Select"}
                    </button>
                </article>
            `;
        }).join("");

        bedsGrid.querySelectorAll<HTMLButtonElement>("[data-bed-id]").forEach((button) => {
            button.addEventListener("click", () => {
                const bedId = button.dataset.bedId ?? "";
                const bed = this.system.getBedsList().find((item) => item.getBedId() === bedId);

                if (!bed) {
                    return;
                }

                this.selectedBedId = bedId;

                if (bed.getIsOccupied()) {
                    this.addLog(this.system.dischargePatient(bedId));
                    this.refresh();
                    return;
                }

                this.addLog(`[INFO] Selected available bed ${bedId}.`);
                this.renderBeds();
            });
        });
    }

    private bindEvents(): void {
        this.getElement<HTMLButtonElement>("admitButton").addEventListener("click", () => {
            const patientNameInput = this.getElement<HTMLInputElement>("patientName");
            const bedTypeSelect = this.getElement<HTMLSelectElement>("bedType");
            const patientName = patientNameInput.value.trim();

            if (!patientName) {
                this.addLog("[INFO] Enter a patient name before admission.");
                patientNameInput.focus();
                return;
            }

            this.addLog(this.system.admitPatient(bedTypeSelect.value as BedType, patientName));
            patientNameInput.value = "";
            this.refresh();
        });

        this.getElement<HTMLButtonElement>("summaryButton").addEventListener("click", () => {
            const { occupied, total, percent } = this.system.getCapacitySummary();
            this.addLog(`--- Ward Summary: ${occupied}/${total} occupied, ${percent}% capacity utilized. ---`);
        });

        this.getElement<HTMLButtonElement>("clearLogButton").addEventListener("click", () => {
            this.getElement<HTMLDivElement>("activityLog").innerHTML = "";
        });
    }

    private refresh(): void {
        const logs = this.getElement<HTMLDivElement>("activityLog").innerHTML;
        this.render();
        this.getElement<HTMLDivElement>("activityLog").innerHTML = logs;
    }

    private addLog(message: string): void {
        const activityLog = this.getElement<HTMLDivElement>("activityLog");
        const row = document.createElement("p");
        row.textContent = message;
        activityLog.prepend(row);
    }

    private getBedTypeLabel(bed: HospitalBed): string {
        if (bed instanceof ICUBed) return "ICU Bed";
        if (bed instanceof EmergencyBed) return "Emergency Bed";
        if (bed instanceof PediatricBed) return "Pediatric Bed";
        if (bed instanceof MaternityBed) return "Maternity Bed";
        return "Hospital Bed";
    }

    private getElement<T extends HTMLElement>(id: string): T {
        const element = document.getElementById(id);
        if (!element) {
            throw new Error(`Missing UI element: ${id}`);
        }

        return element as T;
    }
}

const app = document.getElementById("app");
if (app) {
    new HospitalTriageUI(app);
}
