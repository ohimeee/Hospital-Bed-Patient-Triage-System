"use strict";
class HospitalBed {
    constructor(bedId, wardName) {
        this.bedId = bedId;
        this.wardName = wardName;
        this.isOccupied = false;
        this.patientName = "None";
    }
    getBedId() { return this.bedId; }
    setBedId(v) { this.bedId = v; }
    getWardName() { return this.wardName; }
    setWardName(v) { this.wardName = v; }
    getIsOccupied() { return this.isOccupied; }
    setIsOccupied(v) { this.isOccupied = v; }
    getPatientName() { return this.patientName; }
    setPatientName(v) { this.patientName = v; }
    baseAdmit(patientName) {
        if (this.isOccupied)
            return false;
        this.isOccupied = true;
        this.patientName = patientName;
        return true;
    }
    baseDischarge() {
        if (!this.isOccupied)
            return false;
        this.isOccupied = false;
        this.patientName = "None";
        return true;
    }
    alreadyOccupiedMsg() {
        return `${this.bedId} is already occupied by ${this.patientName}.`;
    }
    alreadyVacantMsg() {
        return `${this.bedId} is already vacant.`;
    }
}
class CriticalBed extends HospitalBed {
    constructor(bedId, wardName, monitoringLevel) {
        super(bedId, wardName);
        this.monitoringLevel = monitoringLevel;
    }
    getMonitoringLevel() { return this.monitoringLevel; }
    setMonitoringLevel(v) { this.monitoringLevel = v; }
    getBedInfo() {
        return `${this.getBedId()} - Monitoring level: ${this.monitoringLevel}`;
    }
}
class GeneralBed extends HospitalBed {
    constructor(bedId, wardName, wardFloor) {
        super(bedId, wardName);
        this.wardFloor = wardFloor;
    }
    getWardFloor() { return this.wardFloor; }
    setWardFloor(v) { this.wardFloor = v; }
    getBedInfo() {
        return `${this.getBedId()} - Floor: ${this.wardFloor}`;
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
        return `ICU Bed ${this.getBedId()} admitted. Check if patient needs ventilator and flag staff.`;
    }
    dischargePatient() {
        const discharged = this.baseDischarge();
        if (!discharged)
            return `ICU Bed ${this.alreadyVacantMsg()}`;
        return `ICU Bed ${this.getBedId()} released. Requires doctor approval before freeing bed.`;
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
        return `Emergency Bed ${this.getBedId()} admitted. Fast-tracked admission, no prior paperwork needed.`;
    }
    dischargePatient() {
        const discharged = this.baseDischarge();
        if (!discharged)
            return `Emergency Bed ${this.alreadyVacantMsg()}`;
        return `Emergency Bed ${this.getBedId()} released. Patient auto-moved to regular ward if stable.`;
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
        return `Pediatric Bed ${this.getBedId()} admitted. Requires guardian info before admission.`;
    }
    dischargePatient() {
        const discharged = this.baseDischarge();
        if (!discharged)
            return `Pediatric Bed ${this.alreadyVacantMsg()}`;
        return `Pediatric Bed ${this.getBedId()} released. Discharge summary sent to guardian.`;
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
        return `Maternity Bed ${this.getBedId()} admitted. Expected delivery date logged.`;
    }
    dischargePatient() {
        const discharged = this.baseDischarge();
        if (!discharged)
            return `Maternity Bed ${this.alreadyVacantMsg()}`;
        return `Maternity Bed ${this.getBedId()} released. Newborn record required before release.`;
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
        return this.bedsList.find((bed) => bed instanceof BedClass && !bed.getIsOccupied());
    }
    findBedById(bedId) {
        return this.bedsList.find((bed) => bed.getBedId() === bedId);
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
        return `[ADDED] ${this.getBedTypeLabel(bed)} ${cleanedBedId} added to ${bed.getWardName()}.`;
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
        if (!bed.getIsOccupied())
            return `[INFO] Bed ${bedId} is already vacant.`;
        return `[DISCHARGE] ${bed.dischargePatient()}`;
    }
    printWardSummary() {
        console.log("\n--- Ward Summary ---");
        let occupiedCount = 0;
        this.bedsList.forEach((bed) => {
            const status = bed.getIsOccupied()
                ? `Occupied by ${bed.getPatientName()}`
                : "Available";
            console.log(`${bed.getBedId()} | ${bed.getWardName()} | ${bed.getBedInfo()} | ${status}`);
            if (bed.getIsOccupied())
                occupiedCount++;
        });
        const capacityPercent = Math.round((occupiedCount / this.bedsList.length) * 100);
        const isCritical = capacityPercent >= 80;
        const statusColor = isCritical ? "\x1b[31m" : "\x1b[32m";
        const statusMessage = isCritical
            ? `[CRITICAL CAPACITY ALERT] ${capacityPercent}% full!`
            : `[STATUS NORMAL] ${capacityPercent}% capacity utilized.`;
        console.log(`${statusColor}${statusMessage}\x1b[0m`);
        console.log("---------------------\n");
    }
    getBedsList() {
        return [...this.bedsList];
    }
    getCapacitySummary() {
        const total = this.bedsList.length;
        const occupied = this.bedsList.filter((bed) => bed.getIsOccupied()).length;
        const percent = Math.round((occupied / total) * 100);
        return { occupied, total, percent };
    }
    getBedTypeLabel(bed) {
        return BED_TYPE_LABELS.get(bed.constructor) ?? "Hospital Bed";
    }
}
function mountHospitalSystem() {
    const system = new HospitalTriageSystem();
    let selectedBedId = null;
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
    const escapeHtml = (value) => value
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
        `;
        }).join("");
        bedsGrid.querySelectorAll("button").forEach(btn => {
            btn.onclick = () => {
                const id = btn.dataset.id;
                const bed = system.getBedsList().find(b => b.getBedId() === id);
                if (!bed)
                    return;
                if (bed.getIsOccupied()) {
                    logMsg(system.dischargePatient(id));
                    selectedBedId = null;
                }
                else {
                    selectedBedId = id;
                    logMsg(`[INFO] Selected ${id}`);
                }
                refresh();
            };
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
    document.getElementById("summaryButton").addEventListener("click", () => {
        const s = system.getCapacitySummary();
        logMsg(`Summary: ${s.occupied}/${s.total} occupied (${s.percent}%)`);
    });
    document.getElementById("clearLogButton").addEventListener("click", () => {
        log.innerHTML = "";
    });
    refresh();
}
document.addEventListener("DOMContentLoaded", mountHospitalSystem);
