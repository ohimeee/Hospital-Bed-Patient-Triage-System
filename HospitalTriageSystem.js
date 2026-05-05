var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var HospitalBed = /** @class */ (function () {
    function HospitalBed(bedId, wardName) {
        this.bedId = bedId;
        this.wardName = wardName;
        this.isOccupied = false;
        this.patientName = "None";
    }
    HospitalBed.prototype.getBedId = function () {
        return this.bedId;
    };
    HospitalBed.prototype.setBedId = function (bedId) {
        this.bedId = bedId;
    };
    HospitalBed.prototype.getWardName = function () {
        return this.wardName;
    };
    HospitalBed.prototype.setWardName = function (wardName) {
        this.wardName = wardName;
    };
    HospitalBed.prototype.getIsOccupied = function () {
        return this.isOccupied;
    };
    HospitalBed.prototype.setIsOccupied = function (occupied) {
        this.isOccupied = occupied;
    };
    HospitalBed.prototype.getPatientName = function () {
        return this.patientName;
    };
    HospitalBed.prototype.setPatientName = function (patientName) {
        this.patientName = patientName;
    };
    return HospitalBed;
}());
var CriticalBed = /** @class */ (function (_super) {
    __extends(CriticalBed, _super);
    function CriticalBed(bedId, wardName, monitoringLevel) {
        var _this = _super.call(this, bedId, wardName) || this;
        _this.monitoringLevel = monitoringLevel;
        return _this;
    }
    CriticalBed.prototype.getMonitoringLevel = function () {
        return this.monitoringLevel;
    };
    CriticalBed.prototype.setMonitoringLevel = function (monitoringLevel) {
        this.monitoringLevel = monitoringLevel;
    };
    return CriticalBed;
}(HospitalBed));
var ICUBed = /** @class */ (function (_super) {
    __extends(ICUBed, _super);
    function ICUBed(bedId, wardName, monitoringLevel) {
        return _super.call(this, bedId, wardName, monitoringLevel) || this;
    }
    ICUBed.prototype.admitPatient = function (pName) {
        if (this.getIsOccupied()) {
            return "ICU Bed ".concat(this.getBedId(), " is already occupied by ").concat(this.getPatientName(), ".");
        }
        this.setIsOccupied(true);
        this.setPatientName(pName);
        return "ICU Bed ".concat(this.getBedId(), " admitted. Check if patient needs ventilator, and flag staff.");
    };
    ICUBed.prototype.dischargePatient = function () {
        if (!this.getIsOccupied()) {
            return "ICU Bed ".concat(this.getBedId(), " is already vacant.");
        }
        this.setIsOccupied(false);
        this.setPatientName("None");
        return "ICU Bed ".concat(this.getBedId(), " released. Requires doctor approval before freeing bed.");
    };
    ICUBed.prototype.getBedInfo = function () {
        return "ICU Bed [".concat(this.getBedId(), "] - Level: ").concat(this.getMonitoringLevel());
    };
    return ICUBed;
}(CriticalBed));
var EmergencyBed = /** @class */ (function (_super) {
    __extends(EmergencyBed, _super);
    function EmergencyBed(bedId, wardName, monitoringLevel) {
        return _super.call(this, bedId, wardName, monitoringLevel) || this;
    }
    EmergencyBed.prototype.admitPatient = function (pName) {
        if (this.getIsOccupied()) {
            return "Emergency Bed ".concat(this.getBedId(), " is already occupied by ").concat(this.getPatientName(), ".");
        }
        this.setIsOccupied(true);
        this.setPatientName(pName);
        return "Emergency Bed ".concat(this.getBedId(), " admitted. Fast-tracked admission (no prior paperwork).");
    };
    EmergencyBed.prototype.dischargePatient = function () {
        if (!this.getIsOccupied()) {
            return "Emergency Bed ".concat(this.getBedId(), " is already vacant.");
        }
        this.setIsOccupied(false);
        this.setPatientName("None");
        return "Emergency Bed ".concat(this.getBedId(), " released. Auto-moved patient to regular ward if stable.");
    };
    EmergencyBed.prototype.getBedInfo = function () {
        return "Emergency Bed [".concat(this.getBedId(), "] - Level: ").concat(this.getMonitoringLevel());
    };
    return EmergencyBed;
}(CriticalBed));
var GeneralBed = /** @class */ (function (_super) {
    __extends(GeneralBed, _super);
    function GeneralBed(bedId, wardName, wardFloor) {
        var _this = _super.call(this, bedId, wardName) || this;
        _this.wardFloor = wardFloor;
        return _this;
    }
    GeneralBed.prototype.getWardFloor = function () {
        return this.wardFloor;
    };
    GeneralBed.prototype.setWardFloor = function (wardFloor) {
        this.wardFloor = wardFloor;
    };
    return GeneralBed;
}(HospitalBed));
var PediatricBed = /** @class */ (function (_super) {
    __extends(PediatricBed, _super);
    function PediatricBed(bedId, wardName, wardFloor) {
        return _super.call(this, bedId, wardName, wardFloor) || this;
    }
    PediatricBed.prototype.admitPatient = function (pName) {
        if (this.getIsOccupied()) {
            return "Pediatric Bed ".concat(this.getBedId(), " is already occupied by ").concat(this.getPatientName(), ".");
        }
        this.setIsOccupied(true);
        this.setPatientName(pName);
        return "Pediatric Bed ".concat(this.getBedId(), " admitted. Requires guardian info before admission.");
    };
    PediatricBed.prototype.dischargePatient = function () {
        if (!this.getIsOccupied()) {
            return "Pediatric Bed ".concat(this.getBedId(), " is already vacant.");
        }
        this.setIsOccupied(false);
        this.setPatientName("None");
        return "Pediatric Bed ".concat(this.getBedId(), " released. Sends discharge summary to guardian.");
    };
    PediatricBed.prototype.getBedInfo = function () {
        return "Pediatric Bed [".concat(this.getBedId(), "] - Floor: ").concat(this.getWardFloor());
    };
    return PediatricBed;
}(GeneralBed));
var MaternityBed = /** @class */ (function (_super) {
    __extends(MaternityBed, _super);
    function MaternityBed(bedId, wardName, wardFloor) {
        return _super.call(this, bedId, wardName, wardFloor) || this;
    }
    MaternityBed.prototype.admitPatient = function (pName) {
        if (this.getIsOccupied()) {
            return "Maternity Bed ".concat(this.getBedId(), " is already occupied by ").concat(this.getPatientName(), ".");
        }
        this.setIsOccupied(true);
        this.setPatientName(pName);
        return "Maternity Bed ".concat(this.getBedId(), " admitted. Logs expected delivery date.");
    };
    MaternityBed.prototype.dischargePatient = function () {
        if (!this.getIsOccupied()) {
            return "Maternity Bed ".concat(this.getBedId(), " is already vacant.");
        }
        this.setIsOccupied(false);
        this.setPatientName("None");
        return "Maternity Bed ".concat(this.getBedId(), " released. Requires newborn record before release.");
    };
    MaternityBed.prototype.getBedInfo = function () {
        return "Maternity Bed [".concat(this.getBedId(), "] - Floor: ").concat(this.getWardFloor());
    };
    return MaternityBed;
}(GeneralBed));
var HospitalTriageSystem = /** @class */ (function () {
    function HospitalTriageSystem() {
        this.bedsList = [];
        this.initializeData();
    }
    HospitalTriageSystem.prototype.initializeData = function () {
        this.bedsList.push(new ICUBed("ICU-01", "ICU Ward", "High"));
        this.bedsList.push(new ICUBed("ICU-02", "ICU Ward", "Medium"));
        this.bedsList.push(new EmergencyBed("EM-01", "Emergency Ward", "High"));
        this.bedsList.push(new PediatricBed("PED-01", "Pediatric Ward", "3rd Floor"));
        this.bedsList.push(new MaternityBed("MAT-01", "Maternity Ward", "2nd Floor"));
    };
    HospitalTriageSystem.prototype.admitPatient = function (bedType, patientName) {
        var bed = this.bedsList.find(function (b) {
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
            return "[ADMIT] ".concat(bed.admitPatient(patientName));
        }
        return "[FAILED] No available ".concat(bedType, " beds found.");
    };
    HospitalTriageSystem.prototype.dischargePatient = function (bedId) {
        var bed = this.bedsList.find(function (b) { return b.getBedId() === bedId; });
        if (bed) {
            if (bed.getIsOccupied()) {
                return "[DISCHARGE] ".concat(bed.dischargePatient());
            }
            return "[INFO] Bed ".concat(bedId, " is already vacant.");
        }
        return "[ERROR] Bed ID ".concat(bedId, " not found.");
    };
    HospitalTriageSystem.prototype.printWardSummary = function () {
        var occupied = 0;
        console.log("\n--- Ward Summary ---");
        this.bedsList.forEach(function (b) {
            console.log("ID: ".concat(b.getBedId(), " | Ward: ").concat(b.getWardName(), " | Bed Info: ").concat(b.getBedInfo(), " | Status: ").concat(b.getIsOccupied() ? "Occupied (" + b.getPatientName() + ")" : "Available"));
            if (b.getIsOccupied()) {
                occupied++;
            }
        });
        var capacityRatio = occupied / this.bedsList.length;
        if (capacityRatio >= 0.8) {
            console.log("\u001B[31m[CRITICAL CAPACITY ALERT] ".concat(Math.round(capacityRatio * 100), "% full!\u001B[0m"));
        }
        else {
            console.log("\u001B[32m[STATUS NORMAL] ".concat(Math.round(capacityRatio * 100), "% capacity utilized.\u001B[0m"));
        }
        console.log("---------------------\n");
    };
    HospitalTriageSystem.prototype.getBedsList = function () {
        return __spreadArray([], this.bedsList, true);
    };
    HospitalTriageSystem.prototype.getCapacitySummary = function () {
        var occupied = this.bedsList.filter(function (bed) { return bed.getIsOccupied(); }).length;
        var total = this.bedsList.length;
        var percent = Math.round((occupied * 100) / total);
        return { occupied: occupied, total: total, percent: percent };
    };
    return HospitalTriageSystem;
}());
var HospitalTriageUI = /** @class */ (function () {
    function HospitalTriageUI(app) {
        this.system = new HospitalTriageSystem();
        this.selectedBedId = "";
        this.app = app;
        this.render();
        this.addLog("System ready. All wards loaded.");
    }
    HospitalTriageUI.prototype.render = function () {
        var _a = this.system.getCapacitySummary(), occupied = _a.occupied, total = _a.total, percent = _a.percent;
        var available = total - occupied;
        var capacityState = percent >= 80 ? "critical" : "normal";
        this.app.innerHTML = "\n            <header class=\"topbar\">\n                <div>\n                    <p class=\"eyebrow\">Hospital Operations</p>\n                    <h1>Bed Availability & Patient Triage</h1>\n                </div>\n                <div class=\"capacity-pill ".concat(capacityState, "\">\n                    <span>").concat(percent, "%</span>\n                    <small>").concat(capacityState === "critical" ? "Critical capacity" : "Capacity normal", "</small>\n                </div>\n            </header>\n\n            <main class=\"layout\">\n                <section class=\"summary-grid\" aria-label=\"Bed summary\">\n                    <article class=\"summary-card\">\n                        <span>Total Beds</span>\n                        <strong>").concat(total, "</strong>\n                    </article>\n                    <article class=\"summary-card\">\n                        <span>Occupied</span>\n                        <strong>").concat(occupied, "</strong>\n                    </article>\n                    <article class=\"summary-card\">\n                        <span>Available</span>\n                        <strong>").concat(available, "</strong>\n                    </article>\n                </section>\n\n                <section class=\"work-area\">\n                    <div class=\"panel triage-panel\">\n                        <div class=\"panel-heading\">\n                            <h2>Patient Triage</h2>\n                        </div>\n\n                        <label for=\"patientName\">Patient name</label>\n                        <input id=\"patientName\" type=\"text\" placeholder=\"Enter patient name\" autocomplete=\"off\" />\n\n                        <label for=\"bedType\">Bed type</label>\n                        <select id=\"bedType\">\n                            <option value=\"ICU\">ICU</option>\n                            <option value=\"Emergency\">Emergency</option>\n                            <option value=\"Pediatric\">Pediatric</option>\n                            <option value=\"Maternity\">Maternity</option>\n                        </select>\n\n                        <button id=\"admitButton\" class=\"primary-button\" type=\"button\">Admit Patient</button>\n                    </div>\n\n                    <div class=\"panel beds-panel\">\n                        <div class=\"panel-heading\">\n                            <h2>Ward Beds</h2>\n                            <button id=\"summaryButton\" class=\"ghost-button\" type=\"button\">Print Summary</button>\n                        </div>\n                        <div id=\"bedsGrid\" class=\"beds-grid\"></div>\n                    </div>\n                </section>\n\n                <section class=\"panel log-panel\">\n                    <div class=\"panel-heading\">\n                        <h2>Activity Log</h2>\n                        <button id=\"clearLogButton\" class=\"ghost-button\" type=\"button\">Clear</button>\n                    </div>\n                    <div id=\"activityLog\" class=\"activity-log\" aria-live=\"polite\"></div>\n                </section>\n            </main>\n        ");
        this.renderBeds();
        this.bindEvents();
    };
    HospitalTriageUI.prototype.renderBeds = function () {
        var _this = this;
        var bedsGrid = this.getElement("bedsGrid");
        var beds = this.system.getBedsList();
        bedsGrid.innerHTML = beds.map(function (bed) {
            var occupied = bed.getIsOccupied();
            var selected = bed.getBedId() === _this.selectedBedId;
            return "\n                <article class=\"bed-card ".concat(occupied ? "occupied" : "available", " ").concat(selected ? "selected" : "", "\">\n                    <div class=\"bed-card-header\">\n                        <div>\n                            <strong>").concat(bed.getBedId(), "</strong>\n                            <span>").concat(_this.getBedTypeLabel(bed), "</span>\n                        </div>\n                        <mark>").concat(occupied ? "Occupied" : "Available", "</mark>\n                    </div>\n                    <p>").concat(bed.getWardName(), "</p>\n                    <p class=\"bed-info\">").concat(bed.getBedInfo(), "</p>\n                    <div class=\"patient-line\">\n                        <span>Patient</span>\n                        <strong>").concat(bed.getPatientName(), "</strong>\n                    </div>\n                    <button class=\"secondary-button\" type=\"button\" data-bed-id=\"").concat(bed.getBedId(), "\">\n                        ").concat(occupied ? "Discharge" : "Select", "\n                    </button>\n                </article>\n            ");
        }).join("");
        bedsGrid.querySelectorAll("[data-bed-id]").forEach(function (button) {
            button.addEventListener("click", function () {
                var _a;
                var bedId = (_a = button.dataset.bedId) !== null && _a !== void 0 ? _a : "";
                var bed = _this.system.getBedsList().find(function (item) { return item.getBedId() === bedId; });
                if (!bed) {
                    return;
                }
                _this.selectedBedId = bedId;
                if (bed.getIsOccupied()) {
                    _this.addLog(_this.system.dischargePatient(bedId));
                    _this.refresh();
                    return;
                }
                _this.addLog("[INFO] Selected available bed ".concat(bedId, "."));
                _this.renderBeds();
            });
        });
    };
    HospitalTriageUI.prototype.bindEvents = function () {
        var _this = this;
        this.getElement("admitButton").addEventListener("click", function () {
            var patientNameInput = _this.getElement("patientName");
            var bedTypeSelect = _this.getElement("bedType");
            var patientName = patientNameInput.value.trim();
            if (!patientName) {
                _this.addLog("[INFO] Enter a patient name before admission.");
                patientNameInput.focus();
                return;
            }
            _this.addLog(_this.system.admitPatient(bedTypeSelect.value, patientName));
            patientNameInput.value = "";
            _this.refresh();
        });
        this.getElement("summaryButton").addEventListener("click", function () {
            var _a = _this.system.getCapacitySummary(), occupied = _a.occupied, total = _a.total, percent = _a.percent;
            _this.addLog("--- Ward Summary: ".concat(occupied, "/").concat(total, " occupied, ").concat(percent, "% capacity utilized. ---"));
        });
        this.getElement("clearLogButton").addEventListener("click", function () {
            _this.getElement("activityLog").innerHTML = "";
        });
    };
    HospitalTriageUI.prototype.refresh = function () {
        var logs = this.getElement("activityLog").innerHTML;
        this.render();
        this.getElement("activityLog").innerHTML = logs;
    };
    HospitalTriageUI.prototype.addLog = function (message) {
        var activityLog = this.getElement("activityLog");
        var row = document.createElement("p");
        row.textContent = message;
        activityLog.prepend(row);
    };
    HospitalTriageUI.prototype.getBedTypeLabel = function (bed) {
        if (bed instanceof ICUBed)
            return "ICU Bed";
        if (bed instanceof EmergencyBed)
            return "Emergency Bed";
        if (bed instanceof PediatricBed)
            return "Pediatric Bed";
        if (bed instanceof MaternityBed)
            return "Maternity Bed";
        return "Hospital Bed";
    };
    HospitalTriageUI.prototype.getElement = function (id) {
        var element = document.getElementById(id);
        if (!element) {
            throw new Error("Missing UI element: ".concat(id));
        }
        return element;
    };
    return HospitalTriageUI;
}());
var app = typeof document === "undefined" ? null : document.getElementById("app");
if (app) {
    new HospitalTriageUI(app);
}
