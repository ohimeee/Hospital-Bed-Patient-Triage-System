"use strict";
class HospitalBed {
    constructor(bedId, wardName) {
        this.bedId = bedId;
        this.wardName = wardName;
        this.isOccupied = false;
        this.patientName = "None";
    }
    getBedId() {
        return this.bedId;
    }
    setBedId(bedId) {
        this.bedId = bedId;
    }
    getWardName() {
        return this.wardName;
    }
    setWardName(wardName) {
        this.wardName = wardName;
    }
    getIsOccupied() {
        return this.isOccupied;
    }
    setIsOccupied(occupied) {
        this.isOccupied = occupied;
    }
    getPatientName() {
        return this.patientName;
    }
    setPatientName(patientName) {
        this.patientName = patientName;
    }
}
class CriticalBed extends HospitalBed {
    constructor(bedId, wardName, monitoringLevel) {
        super(bedId, wardName);
        this.monitoringLevel = monitoringLevel;
    }
    getMonitoringLevel() {
        return this.monitoringLevel;
    }
    setMonitoringLevel(monitoringLevel) {
        this.monitoringLevel = monitoringLevel;
    }
}
class ICUBed extends CriticalBed {
    constructor(bedId, wardName, monitoringLevel) {
        super(bedId, wardName, monitoringLevel);
    }
    admitPatient(pName) {
        if (this.getIsOccupied()) {
            return `ICU Bed ${this.getBedId()} is already occupied by ${this.getPatientName()}.`;
        }
        this.setIsOccupied(true);
        this.setPatientName(pName);
        return `ICU Bed ${this.getBedId()} admitted. Check if patient needs ventilator, and flag staff.`;
    }
    dischargePatient() {
        if (!this.getIsOccupied()) {
            return `ICU Bed ${this.getBedId()} is already vacant.`;
        }
        this.setIsOccupied(false);
        this.setPatientName("None");
        return `ICU Bed ${this.getBedId()} released. Requires doctor approval before freeing bed.`;
    }
    getBedInfo() {
        return `ICU Bed [${this.getBedId()}] - Level: ${this.getMonitoringLevel()}`;
    }
}
class EmergencyBed extends CriticalBed {
    constructor(bedId, wardName, monitoringLevel) {
        super(bedId, wardName, monitoringLevel);
    }
    admitPatient(pName) {
        if (this.getIsOccupied()) {
            return `Emergency Bed ${this.getBedId()} is already occupied by ${this.getPatientName()}.`;
        }
        this.setIsOccupied(true);
        this.setPatientName(pName);
        return `Emergency Bed ${this.getBedId()} admitted. Fast-tracked admission (no prior paperwork).`;
    }
    dischargePatient() {
        if (!this.getIsOccupied()) {
            return `Emergency Bed ${this.getBedId()} is already vacant.`;
        }
        this.setIsOccupied(false);
        this.setPatientName("None");
        return `Emergency Bed ${this.getBedId()} released. Auto-moved patient to regular ward if stable.`;
    }
    getBedInfo() {
        return `Emergency Bed [${this.getBedId()}] - Level: ${this.getMonitoringLevel()}`;
    }
}
class GeneralBed extends HospitalBed {
    constructor(bedId, wardName, wardFloor) {
        super(bedId, wardName);
        this.wardFloor = wardFloor;
    }
    getWardFloor() {
        return this.wardFloor;
    }
    setWardFloor(wardFloor) {
        this.wardFloor = wardFloor;
    }
}
class PediatricBed extends GeneralBed {
    constructor(bedId, wardName, wardFloor) {
        super(bedId, wardName, wardFloor);
    }
    admitPatient(pName) {
        if (this.getIsOccupied()) {
            return `Pediatric Bed ${this.getBedId()} is already occupied by ${this.getPatientName()}.`;
        }
        this.setIsOccupied(true);
        this.setPatientName(pName);
        return `Pediatric Bed ${this.getBedId()} admitted. Requires guardian info before admission.`;
    }
    dischargePatient() {
        if (!this.getIsOccupied()) {
            return `Pediatric Bed ${this.getBedId()} is already vacant.`;
        }
        this.setIsOccupied(false);
        this.setPatientName("None");
        return `Pediatric Bed ${this.getBedId()} released. Sends discharge summary to guardian.`;
    }
    getBedInfo() {
        return `Pediatric Bed [${this.getBedId()}] - Floor: ${this.getWardFloor()}`;
    }
}
class MaternityBed extends GeneralBed {
    constructor(bedId, wardName, wardFloor) {
        super(bedId, wardName, wardFloor);
    }
    admitPatient(pName) {
        if (this.getIsOccupied()) {
            return `Maternity Bed ${this.getBedId()} is already occupied by ${this.getPatientName()}.`;
        }
        this.setIsOccupied(true);
        this.setPatientName(pName);
        return `Maternity Bed ${this.getBedId()} admitted. Logs expected delivery date.`;
    }
    dischargePatient() {
        if (!this.getIsOccupied()) {
            return `Maternity Bed ${this.getBedId()} is already vacant.`;
        }
        this.setIsOccupied(false);
        this.setPatientName("None");
        return `Maternity Bed ${this.getBedId()} released. Requires newborn record before release.`;
    }
    getBedInfo() {
        return `Maternity Bed [${this.getBedId()}] - Floor: ${this.getWardFloor()}`;
    }
}
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

    addBed(type, bedId, wardName) {
        if (!bedId || typeof bedId !== "string") {
            return `[ERROR] Invalid bed ID.`;
        }
        if (this.bedsList.find((b) => b.getBedId() === bedId)) {
            return `[ERROR] Bed ID ${bedId} already exists.`;
        }
        const ward = wardName && wardName.trim().length ? wardName.trim() : (type === 'General' ? 'General Ward' : `${type} Ward`);
        let bed;
        switch (type) {
            case "ICU":
                bed = new ICUBed(bedId, ward, "Medium");
                break;
            case "Emergency":
                bed = new EmergencyBed(bedId, ward, "Medium");
                break;
            case "Pediatric":
                bed = new PediatricBed(bedId, ward, "3rd Floor");
                break;
            case "Maternity":
                bed = new MaternityBed(bedId, ward, "2nd Floor");
                break;
            default:
                bed = new GeneralBed(bedId, ward, "1st Floor");
                break;
        }
        this.bedsList.push(bed);
        return `[ADDED] Bed ${bedId} (${type}) added to ${ward}.`;
    }
    admitPatient(bedType, patientName) {
        const bed = this.bedsList.find((b) => {
            if (bedType === "ICU" && b instanceof ICUBed && !b.getIsOccupied())
                return true;
            if (bedType === "Emergency" && b instanceof EmergencyBed && !b.getIsOccupied())
                return true;
            if (bedType === "Pediatric" && b instanceof PediatricBed && !b.getIsOccupied())
                return true;
            if (bedType === "Maternity" && b instanceof MaternityBed && !b.getIsOccupied())
                return true;
            return false;
        });
        if (bed) {
            return `[ADMIT] ${bed.admitPatient(patientName)}`;
        }
        return `[FAILED] No available ${bedType} beds found.`;
    }
    dischargePatient(bedId) {
        const bed = this.bedsList.find((b) => b.getBedId() === bedId);
        if (bed) {
            if (bed.getIsOccupied()) {
                return `[DISCHARGE] ${bed.dischargePatient()}`;
            }
            return `[INFO] Bed ${bedId} is already vacant.`;
        }
        return `[ERROR] Bed ID ${bedId} not found.`;
    }
    printWardSummary() {
        let occupied = 0;
        console.log("\n--- Ward Summary ---");
        this.bedsList.forEach((b) => {
            console.log(`ID: ${b.getBedId()} | Ward: ${b.getWardName()} | Bed Info: ${b.getBedInfo()} | Status: ${b.getIsOccupied() ? "Occupied (" + b.getPatientName() + ")" : "Available"}`);
            if (b.getIsOccupied()) {
                occupied++;
            }
        });
        const capacityRatio = occupied / this.bedsList.length;
        if (capacityRatio >= 0.8) {
            console.log(`\x1b[31m[CRITICAL CAPACITY ALERT] ${Math.round(capacityRatio * 100)}% full!\x1b[0m`);
        }
        else {
            console.log(`\x1b[32m[STATUS NORMAL] ${Math.round(capacityRatio * 100)}% capacity utilized.\x1b[0m`);
        }
        console.log("---------------------\n");
    }
    getBedsList() {
        return [...this.bedsList];
    }
    getCapacitySummary() {
        const occupied = this.bedsList.filter((bed) => bed.getIsOccupied()).length;
        const total = this.bedsList.length;
        const percent = Math.round((occupied * 100) / total);
        return { occupied, total, percent };
    }
}
class HospitalTriageUI {
    constructor(app) {
        this.system = new HospitalTriageSystem();
        this.selectedBedId = "";
        this.app = app;
        this.render();
        this.addLog("System ready. All wards loaded.");
    }

    render() {
        const { occupied, total, percent } = this.system.getCapacitySummary();
        const available = total - occupied;
        const capacityState = percent >= 80 ? "critical" : "normal";

        this.app.innerHTML = `
            <header class="topbar">
                <div>
                    <p class="eyebrow">Hospital Operations</p>
                    <h1>Bed Availability & Patient Triage</h1>
                </div>
                <div class="header-actions">
                    <div class="capacity-pill ${capacityState}">
                        <span>${percent}%</span>
                        <small>${capacityState === "critical" ? "Critical capacity" : "Capacity normal"}</small>
                    </div>
                    <button id="logoutButton" class="ghost-button logout-button" type="button">Logout</button>
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

                        <hr />

                        <label for="newRoomId">New room ID</label>
                        <input id="newRoomId" type="text" placeholder="e.g., ICU-03" />

                        <label for="newRoomType">Room type</label>
                        <select id="newRoomType">
                            <option value="ICU">ICU</option>
                            <option value="Emergency">Emergency</option>
                            <option value="Pediatric">Pediatric</option>
                            <option value="Maternity">Maternity</option>
                            <option value="General">General</option>
                        </select>

                        <label for="wardName">Ward name (optional)</label>
                        <input id="wardName" type="text" placeholder="e.g., ICU Ward" />

                        <button id="createRoomButton" class="secondary-button" type="button">Add Room</button>
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

    renderBeds() {
        const bedsGrid = this.getElement("bedsGrid");
        const beds = this.system.getBedsList();
        bedsGrid.innerHTML = beds.map((bed) => {
            const occupied = bed.getIsOccupied();
            const selected = bed.getBedId() === this.selectedBedId;
            const btnText = occupied ? "Discharge" : (selected ? "Selected" : "Select");
            const btnClass = `secondary-button ${selected ? 'selected-button' : ''}`;

            // monitoring badges removed — keep bed id only

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
                    <button class="${btnClass}" type="button" data-bed-id="${bed.getBedId()}">
                        ${btnText}
                    </button>
                </article>
            `;
        }).join("");
        bedsGrid.querySelectorAll("[data-bed-id]").forEach((button) => {
            button.onclick = () => {
                const bedId = button.dataset.bedId ?? "";
                const bed = this.system.getBedsList().find((item) => item.getBedId() === bedId);
                if (!bed) return;
                this.selectedBedId = bedId;
                if (bed.getIsOccupied()) {
                    this.addLog(this.system.dischargePatient(bedId));
                    this.refresh();
                    return;
                }
                this.addLog(`[INFO] Selected available bed ${bedId}.`);
                this.renderBeds();
            };
        });
    }

    bindEvents() {
        // assign onclick to avoid duplicate listeners on re-render
        this.getElement("admitButton").onclick = () => {
            const patientNameInput = this.getElement("patientName");
            const bedTypeSelect = this.getElement("bedType");
            const patientName = patientNameInput.value.trim();
            if (!patientName) {
                this.addLog("[INFO] Enter a patient name before admission.");
                patientNameInput.focus();
                return;
            }
            this.addLog(this.system.admitPatient(bedTypeSelect.value, patientName));
            patientNameInput.value = "";
            this.refresh();
        };

        this.getElement("createRoomButton").onclick = () => {
            const idInput = this.getElement("newRoomId");
            const typeSelect = this.getElement("newRoomType");
            const wardInput = this.getElement("wardName");
            const bedId = idInput.value.trim();
            if (!bedId) {
                this.addLog("[INFO] Enter a room ID to add.");
                idInput.focus();
                return;
            }
            const type = typeSelect.value;
            const ward = wardInput.value.trim();
            this.addLog(this.system.addBed(type, bedId, ward));
            idInput.value = "";
            wardInput.value = "";
            this.refresh();
        };

        this.getElement("summaryButton").onclick = () => {
            const { occupied, total, percent } = this.system.getCapacitySummary();
            this.addLog(`--- Ward Summary: ${occupied}/${total} occupied, ${percent}% capacity utilized. ---`);
        };

        this.getElement("clearLogButton").onclick = () => {
            this.getElement("activityLog").innerHTML = "";
<<<<<<< HEAD
        };
=======
        });

        this.getElement("logoutButton").addEventListener("click", () => {
            window.location.href = 'signup.html';
        });
>>>>>>> CB-branch
    }

    refresh() {
        const logs = this.getElement("activityLog").innerHTML;
        this.render();
        this.getElement("activityLog").innerHTML = logs;
    }

    addLog(message) {
        const activityLog = this.getElement("activityLog");
        const row = document.createElement("p");
        row.textContent = message;
        activityLog.prepend(row);
    }

    getBedTypeLabel(bed) {
        if (bed instanceof ICUBed) return "ICU Bed";
        if (bed instanceof EmergencyBed) return "Emergency Bed";
        if (bed instanceof PediatricBed) return "Pediatric Bed";
        if (bed instanceof MaternityBed) return "Maternity Bed";
        return "Hospital Bed";
    }

    getElement(id) {
        const element = document.getElementById(id);
        if (!element) {
            throw new Error(`Missing UI element: ${id}`);
        }
        return element;
    }
}
const app = typeof document === "undefined" ? null : document.getElementById("app");
if (app) {
    new HospitalTriageUI(app);
}
