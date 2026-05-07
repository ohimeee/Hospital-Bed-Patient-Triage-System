"use strict";
class HospitalBed {
    constructor(_bedId, _wardName) {
        this._bedId = _bedId;
        this._wardName = _wardName;
        this._isOccupied = false;
        this._patientName = "None";
    }
    // getters
    get bedId() {
        return this._bedId;
    }
    get wardName() {
        return this._wardName;
    }
    get isOccupied() {
        return this._isOccupied;
    }
    get patientName() {
        return this._patientName;
    }
    // setters
    set bedId(value) {
        this._bedId = value;
    }
    set wardName(value) {
        this._wardName = value;
    }
    set isOccupied(value) {
        this._isOccupied = value;
    }
    set patientName(value) {
        this._patientName = value;
    }
    // protected methods
    baseAdmit(patientName) {
        if (this._isOccupied) {
            return false;
        }
        else {
            this._isOccupied = true;
            this._patientName = patientName;
            return true;
        }
    }
    baseDischarge() {
        if (!this._isOccupied) {
            return false;
        }
        else {
            this._isOccupied = false;
            this._patientName = "None";
            return true;
        }
    }
    alreadyOccupiedMsg() {
        return `${this._bedId} is already occupied by ${this._patientName}.`;
    }
    alreadyVacantMsg() {
        return `${this._bedId} is already vacant.`;
    }
}
class CriticalBed extends HospitalBed {
    constructor(_bedId, _wardName, _monitoringLevel) {
        super(_bedId, _wardName);
        this._monitoringLevel = _monitoringLevel;
    }
    getMonitoringLevel() {
        return this._monitoringLevel;
    }
    getBedInfo() {
        return `${this.bedId} - Monitoring level: ${this._monitoringLevel}`;
    }
    setMonitoringLevel(value) {
        this._monitoringLevel = value;
    }
}
class GeneralBed extends HospitalBed {
    constructor(bedId, wardName, wardFloor) {
        super(bedId, wardName);
        this._wardFloor = wardFloor;
    }
    getWardFloor() {
        return this._wardFloor;
    }
    getBedInfo() {
        return `${this.bedId} - Floor: ${this._wardFloor}`;
    }
    setWardFloor(value) {
        this._wardFloor = value;
    }
}
class ICUBed extends CriticalBed {
    constructor(bedId, wardName, monitoringLevel) {
        super(bedId, wardName, monitoringLevel);
    }
    admitPatient(patientName) {
        const admitted = this.baseAdmit(patientName);
        if (!admitted)
            return `ICU Bed ${this.alreadyOccupiedMsg()}`;
        return `ICU Bed ${this.bedId} admitted. Check if patient needs ventilator and flag staff.`;
    }
    dischargePatient() {
        const discharged = this.baseDischarge();
        if (!discharged)
            return `ICU Bed ${this.alreadyVacantMsg()}`;
        return `ICU Bed ${this.bedId} released. Requires doctor approval before freeing bed.`;
    }
}
class EmergencyBed extends CriticalBed {
    constructor(bedId, wardName, monitoringLevel) {
        super(bedId, wardName, monitoringLevel);
    }
    admitPatient(patientName) {
        const admitted = this.baseAdmit(patientName);
        if (!admitted)
            return `Emergency Bed ${this.alreadyOccupiedMsg()}`;
        return `Emergency Bed ${this.bedId} admitted. Fast-tracked admission, no prior paperwork needed.`;
    }
    dischargePatient() {
        const discharged = this.baseDischarge();
        if (!discharged)
            return `Emergency Bed ${this.alreadyVacantMsg()}`;
        return `Emergency Bed ${this.bedId} released. Patient auto-moved to regular ward if stable.`;
    }
}
class PediatricBed extends GeneralBed {
    constructor(bedId, wardName, wardFloor) {
        super(bedId, wardName, wardFloor);
    }
    admitPatient(patientName) {
        const admitted = this.baseAdmit(patientName);
        if (!admitted)
            return `Pediatric Bed ${this.alreadyOccupiedMsg()}`;
        return `Pediatric Bed ${this.bedId} admitted. Requires guardian info before admission.`;
    }
    dischargePatient() {
        const discharged = this.baseDischarge();
        if (!discharged)
            return `Pediatric Bed ${this.alreadyVacantMsg()}`;
        return `Pediatric Bed ${this.bedId} released. Discharge summary sent to guardian.`;
    }
}
class MaternityBed extends GeneralBed {
    constructor(bedId, wardName, wardFloor) {
        super(bedId, wardName, wardFloor);
    }
    admitPatient(patientName) {
        const admitted = this.baseAdmit(patientName);
        if (!admitted)
            return `Maternity Bed ${this.alreadyOccupiedMsg()}`;
        return `Maternity Bed ${this.bedId} admitted. Expected delivery date logged.`;
    }
    dischargePatient() {
        const discharged = this.baseDischarge();
        if (!discharged)
            return `Maternity Bed ${this.alreadyVacantMsg()}`;
        return `Maternity Bed ${this.bedId} released. Newborn record required before release.`;
    }
}
const BED_TYPE_LABELS = new Map([
    [ICUBed, "ICU Bed"],
    [EmergencyBed, "Emergency Bed"],
    [PediatricBed, "Pediatric Bed"],
    [MaternityBed, "Maternity Bed"],
]);
const BED_DEFAULTS = {
    ICU: { wardName: "ICU Ward", detail: "Medium" },
    Emergency: { wardName: "Emergency Ward", detail: "Medium" },
    Pediatric: { wardName: "Pediatric Ward", detail: "3rd Floor" },
    Maternity: { wardName: "Maternity Ward", detail: "2nd Floor" },
};
class HospitalTriageSystem {
    constructor() {
        this.bedsList = [];
        this.initializeData();
    }
    initializeData() {
        this.bedsList.push(new ICUBed("ICU-01", "ICU Ward", "High"));
        this.bedsList.push(new ICUBed("ICU-02", "ICU Ward", "Medium"));
        this.bedsList.push(new EmergencyBed("EM-01", "Emergency Ward", "High"));
        this.bedsList.push(new PediatricBed("PED-01", "Pediatric Ward", "3rd Floor"));
        this.bedsList.push(new MaternityBed("MAT-01", "Maternity Ward", "2nd Floor"));
    }
    findAvailableBed(bedType) {
        const typeMap = {
            ICU: ICUBed,
            Emergency: EmergencyBed,
            Pediatric: PediatricBed,
            Maternity: MaternityBed,
        };
        const BedClass = typeMap[bedType];
        return this.bedsList.find((bed) => bed instanceof BedClass && !bed.isOccupied);
    }
    findBedById(bedId) {
        return this.bedsList.find((bed) => bed.bedId === bedId);
    }
    createBed(bedType, bedId) {
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
    addBed(bedType, bedId) {
        const cleanedBedId = bedId.trim().toUpperCase();
        if (!cleanedBedId) {
            return "[ERROR] Enter a bed ID before adding a bed.";
        }
        if (this.findBedById(cleanedBedId)) {
            return `[ERROR] Bed ID ${cleanedBedId} already exists.`;
        }
        const bed = this.createBed(bedType, cleanedBedId);
        this.bedsList.push(bed);
        return `[ADDED] ${this.getBedTypeLabel(bed)} ${cleanedBedId} added to ${bed.wardName}.`;
    }
    admitPatient(bedType, patientName) {
        const bed = this.findAvailableBed(bedType);
        if (!bed)
            return `[FAILED] No available ${bedType} beds found.`;
        return `[ADMIT] ${bed.admitPatient(patientName)}`;
    }
    dischargePatient(bedId) {
        const bed = this.findBedById(bedId);
        if (!bed)
            return `[ERROR] Bed ID ${bedId} not found.`;
        if (!bed.isOccupied)
            return `[INFO] Bed ${bedId} is already vacant.`;
        return `[DISCHARGE] ${bed.dischargePatient()}`;
    }
    getBedsList() {
        return [...this.bedsList];
    }
    getCapacitySummary() {
        const total = this.bedsList.length;
        const occupied = this.bedsList.filter((bed) => bed.isOccupied).length;
        const percent = Math.round((occupied / total) * 100);
        return { occupied, total, percent };
    }
    getBedTypeLabel(bed) {
        return BED_TYPE_LABELS.get(bed.constructor) ?? "Hospital Bed";
    }
}
function mountHospitalSystem() {
    const system = new HospitalTriageSystem();
    const patientName = document.getElementById("patientName");
    const bedType = document.getElementById("bedType");
    const newBedId = document.getElementById("newBedId");
    const newBedType = document.getElementById("newBedType");
    const bedsGrid = document.getElementById("bedsGrid");
    const log = document.getElementById("activityLog");
    const totalBeds = document.getElementById("totalBeds");
    const occupiedBeds = document.getElementById("occupiedBeds");
    const availableBeds = document.getElementById("availableBeds");
    const percent = document.getElementById("capacity-percent");
    const pillText = document.getElementById("capacity-text");
    const pill = document.getElementById("capacity-pill");
    const logMsg = (msg) => {
        const p = document.createElement("p");
        p.textContent = msg;
        log.prepend(p);
    };
    const refresh = () => {
        const data = system.getCapacitySummary();
        const beds = system.getBedsList();
        totalBeds.textContent = String(data.total);
        occupiedBeds.textContent = String(data.occupied);
        availableBeds.textContent = String(data.total - data.occupied);
        percent.textContent = `${data.percent}%`;
        pillText.textContent = data.percent >= 80 ? "Critical capacity" : "Capacity normal";
        pill.className = `capacity-pill ${data.percent >= 80 ? "critical" : "normal"}`;
        bedsGrid.innerHTML = beds
            .map((bed) => `
            <div class="bed-card">
                <strong>${bed.bedId}</strong>
                <p>${bed.wardName}</p>
                <p>${bed.getBedInfo()}</p>
                <strong>
                    <p>${bed.isOccupied ? `Occupied (${bed.patientName})` : "Unoccupied"}</p>
                </strong>

                <button data-id="${bed.bedId}">
                    ${bed.isOccupied ? "Discharge" : "Available"}
                </button>
            </div>
        `)
            .join("");
        bedsGrid.querySelectorAll("button").forEach((btn) => {
            btn.addEventListener("click", () => {
                const id = btn.dataset.id;
                const bed = system.getBedsList().find((b) => b.bedId === id);
                if (!bed)
                    return;
                if (bed.isOccupied) {
                    logMsg(system.dischargePatient(id));
                }
                else {
                    logMsg(`[INFO] Selected ${id}`);
                }
                refresh();
            });
        });
    };
    document.getElementById("admitButton").addEventListener("click", () => {
        const name = patientName.value.trim();
        if (!name) {
            logMsg("[INFO] Enter a patient name first.");
            return;
        }
        logMsg(system.admitPatient(bedType.value, name));
        patientName.value = "";
        refresh();
    });
    document.getElementById("addBedButton").addEventListener("click", () => {
        const bedId = newBedId.value.trim();
        const result = system.addBed(newBedType.value, bedId);
        logMsg(result);
        if (result.startsWith("[ADDED]")) {
            newBedId.value = "";
        }
        refresh();
    });
    document.getElementById("clearLogButton").addEventListener("click", () => {
        log.innerHTML = "";
    });
    refresh();
}
document.addEventListener("DOMContentLoaded", mountHospitalSystem);
