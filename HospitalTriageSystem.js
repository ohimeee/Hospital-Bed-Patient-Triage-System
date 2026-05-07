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
    HospitalBed.prototype.setBedId = function (v) {
        this.bedId = v;
    };
    HospitalBed.prototype.getWardName = function () {
        return this.wardName;
    };
    HospitalBed.prototype.setWardName = function (v) {
        this.wardName = v;
    };
    HospitalBed.prototype.getIsOccupied = function () {
        return this.isOccupied;
    };
    HospitalBed.prototype.setIsOccupied = function (v) {
        this.isOccupied = v;
    };
    HospitalBed.prototype.getPatientName = function () {
        return this.patientName;
    };
    HospitalBed.prototype.setPatientName = function (v) {
        this.patientName = v;
    };
    HospitalBed.prototype.baseAdmit = function (patientName) {
        if (this.isOccupied)
            return false;
        this.isOccupied = true;
        this.patientName = patientName;
        return true;
    };
    HospitalBed.prototype.baseDischarge = function () {
        if (!this.isOccupied)
            return false;
        this.isOccupied = false;
        this.patientName = "None";
        return true;
    };
    HospitalBed.prototype.alreadyOccupiedMsg = function () {
        return "".concat(this.bedId, " is already occupied by ").concat(this.patientName, ".");
    };
    HospitalBed.prototype.alreadyVacantMsg = function () {
        return "".concat(this.bedId, " is already vacant.");
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
    CriticalBed.prototype.setMonitoringLevel = function (v) {
        this.monitoringLevel = v;
    };
    CriticalBed.prototype.getBedInfo = function () {
        return "".concat(this.getBedId(), " - Monitoring level: ").concat(this.monitoringLevel);
    };
    return CriticalBed;
}(HospitalBed));
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
    GeneralBed.prototype.setWardFloor = function (v) {
        this.wardFloor = v;
    };
    GeneralBed.prototype.getBedInfo = function () {
        return "".concat(this.getBedId(), " - Floor: ").concat(this.wardFloor);
    };
    return GeneralBed;
}(HospitalBed));
var ICUBed = /** @class */ (function (_super) {
    __extends(ICUBed, _super);
    function ICUBed(bedId, wardName, monitoringLevel) {
        return _super.call(this, bedId, wardName, monitoringLevel) || this;
    }
    ICUBed.prototype.admitPatient = function (patientName) {
        var admitted = this.baseAdmit(patientName);
        if (!admitted)
            return "ICU Bed ".concat(this.alreadyOccupiedMsg());
        return "ICU Bed ".concat(this.getBedId(), " admitted. Check if patient needs ventilator and flag staff.");
    };
    ICUBed.prototype.dischargePatient = function () {
        var discharged = this.baseDischarge();
        if (!discharged)
            return "ICU Bed ".concat(this.alreadyVacantMsg());
        return "ICU Bed ".concat(this.getBedId(), " released. Requires doctor approval before freeing bed.");
    };
    return ICUBed;
}(CriticalBed));
var EmergencyBed = /** @class */ (function (_super) {
    __extends(EmergencyBed, _super);
    function EmergencyBed(bedId, wardName, monitoringLevel) {
        return _super.call(this, bedId, wardName, monitoringLevel) || this;
    }
    EmergencyBed.prototype.admitPatient = function (patientName) {
        var admitted = this.baseAdmit(patientName);
        if (!admitted)
            return "Emergency Bed ".concat(this.alreadyOccupiedMsg());
        return "Emergency Bed ".concat(this.getBedId(), " admitted. Fast-tracked admission, no prior paperwork needed.");
    };
    EmergencyBed.prototype.dischargePatient = function () {
        var discharged = this.baseDischarge();
        if (!discharged)
            return "Emergency Bed ".concat(this.alreadyVacantMsg());
        return "Emergency Bed ".concat(this.getBedId(), " released. Patient auto-moved to regular ward if stable.");
    };
    return EmergencyBed;
}(CriticalBed));
var PediatricBed = /** @class */ (function (_super) {
    __extends(PediatricBed, _super);
    function PediatricBed(bedId, wardName, wardFloor) {
        return _super.call(this, bedId, wardName, wardFloor) || this;
    }
    PediatricBed.prototype.admitPatient = function (patientName) {
        var admitted = this.baseAdmit(patientName);
        if (!admitted)
            return "Pediatric Bed ".concat(this.alreadyOccupiedMsg());
        return "Pediatric Bed ".concat(this.getBedId(), " admitted. Requires guardian info before admission.");
    };
    PediatricBed.prototype.dischargePatient = function () {
        var discharged = this.baseDischarge();
        if (!discharged)
            return "Pediatric Bed ".concat(this.alreadyVacantMsg());
        return "Pediatric Bed ".concat(this.getBedId(), " released. Discharge summary sent to guardian.");
    };
    return PediatricBed;
}(GeneralBed));
var MaternityBed = /** @class */ (function (_super) {
    __extends(MaternityBed, _super);
    function MaternityBed(bedId, wardName, wardFloor) {
        return _super.call(this, bedId, wardName, wardFloor) || this;
    }
    MaternityBed.prototype.admitPatient = function (patientName) {
        var admitted = this.baseAdmit(patientName);
        if (!admitted)
            return "Maternity Bed ".concat(this.alreadyOccupiedMsg());
        return "Maternity Bed ".concat(this.getBedId(), " admitted. Expected delivery date logged.");
    };
    MaternityBed.prototype.dischargePatient = function () {
        var discharged = this.baseDischarge();
        if (!discharged)
            return "Maternity Bed ".concat(this.alreadyVacantMsg());
        return "Maternity Bed ".concat(this.getBedId(), " released. Newborn record required before release.");
    };
    return MaternityBed;
}(GeneralBed));
var BED_TYPE_LABELS = new Map([
    [ICUBed, "ICU Bed"],
    [EmergencyBed, "Emergency Bed"],
    [PediatricBed, "Pediatric Bed"],
    [MaternityBed, "Maternity Bed"],
]);
var BED_DEFAULTS = {
    ICU: { wardName: "ICU Ward", detail: "Medium" },
    Emergency: { wardName: "Emergency Ward", detail: "Medium" },
    Pediatric: { wardName: "Pediatric Ward", detail: "3rd Floor" },
    Maternity: { wardName: "Maternity Ward", detail: "2nd Floor" },
};
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
    HospitalTriageSystem.prototype.findAvailableBed = function (bedType) {
        var typeMap = {
            ICU: ICUBed,
            Emergency: EmergencyBed,
            Pediatric: PediatricBed,
            Maternity: MaternityBed,
        };
        var BedClass = typeMap[bedType];
        return this.bedsList.find(function (bed) { return bed instanceof BedClass && !bed.getIsOccupied(); });
    };
    HospitalTriageSystem.prototype.findBedById = function (bedId) {
        return this.bedsList.find(function (bed) { return bed.getBedId() === bedId; });
    };
    HospitalTriageSystem.prototype.createBed = function (bedType, bedId) {
        var defaults = BED_DEFAULTS[bedType];
        var ward = defaults.wardName;
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
    };
    HospitalTriageSystem.prototype.addBed = function (bedType, bedId) {
        var cleanedBedId = bedId.trim().toUpperCase();
        if (!cleanedBedId) {
            return "[ERROR] Enter a bed ID before adding a bed.";
        }
        if (this.findBedById(cleanedBedId)) {
            return "[ERROR] Bed ID ".concat(cleanedBedId, " already exists.");
        }
        var bed = this.createBed(bedType, cleanedBedId);
        this.bedsList.push(bed);
        return "[ADDED] ".concat(this.getBedTypeLabel(bed), " ").concat(cleanedBedId, " added to ").concat(bed.getWardName(), ".");
    };
    HospitalTriageSystem.prototype.admitPatient = function (bedType, patientName) {
        var bed = this.findAvailableBed(bedType);
        if (!bed)
            return "[FAILED] No available ".concat(bedType, " beds found.");
        return "[ADMIT] ".concat(bed.admitPatient(patientName));
    };
    HospitalTriageSystem.prototype.dischargePatient = function (bedId) {
        var bed = this.findBedById(bedId);
        if (!bed)
            return "[ERROR] Bed ID ".concat(bedId, " not found.");
        if (!bed.getIsOccupied())
            return "[INFO] Bed ".concat(bedId, " is already vacant.");
        return "[DISCHARGE] ".concat(bed.dischargePatient());
    };
    HospitalTriageSystem.prototype.printWardSummary = function () {
        console.log("\n--- Ward Summary ---");
        var occupiedCount = 0;
        this.bedsList.forEach(function (bed) {
            var status = bed.getIsOccupied() ? "Occupied by ".concat(bed.getPatientName()) : "Available";
            console.log("".concat(bed.getBedId(), " | ").concat(bed.getWardName(), " | ").concat(bed.getBedInfo(), " | ").concat(status));
            if (bed.getIsOccupied())
                occupiedCount++;
        });
        var capacityPercent = Math.round((occupiedCount / this.bedsList.length) * 100);
        var isCritical = capacityPercent >= 80;
        var statusColor = isCritical ? "\x1b[31m" : "\x1b[32m";
        var statusMessage = isCritical
            ? "[CRITICAL CAPACITY ALERT] ".concat(capacityPercent, "% full!")
            : "[STATUS NORMAL] ".concat(capacityPercent, "% capacity utilized.");
        console.log("".concat(statusColor).concat(statusMessage, "\u001B[0m"));
        console.log("---------------------\n");
    };
    HospitalTriageSystem.prototype.getBedsList = function () {
        return __spreadArray([], this.bedsList, true);
    };
    HospitalTriageSystem.prototype.getCapacitySummary = function () {
        var total = this.bedsList.length;
        var occupied = this.bedsList.filter(function (bed) { return bed.getIsOccupied(); }).length;
        var percent = Math.round((occupied / total) * 100);
        return { occupied: occupied, total: total, percent: percent };
    };
    HospitalTriageSystem.prototype.getBedTypeLabel = function (bed) {
        var _a;
        return (_a = BED_TYPE_LABELS.get(bed.constructor)) !== null && _a !== void 0 ? _a : "Hospital Bed";
    };
    return HospitalTriageSystem;
}());
function mountHospitalSystem() {
    var system = new HospitalTriageSystem();
    var patientName = document.getElementById("patientName");
    var bedType = document.getElementById("bedType");
    var newBedId = document.getElementById("newBedId");
    var newBedType = document.getElementById("newBedType");
    var bedsGrid = document.getElementById("bedsGrid");
    var log = document.getElementById("activityLog");
    var totalBeds = document.getElementById("totalBeds");
    var occupiedBeds = document.getElementById("occupiedBeds");
    var availableBeds = document.getElementById("availableBeds");
    var percent = document.getElementById("capacity-percent");
    var pillText = document.getElementById("capacity-text");
    var pill = document.getElementById("capacity-pill");
    var logMsg = function (msg) {
        var p = document.createElement("p");
        p.textContent = msg;
        log.prepend(p);
    };
    var refresh = function () {
        var data = system.getCapacitySummary();
        var beds = system.getBedsList();
        totalBeds.textContent = String(data.total);
        occupiedBeds.textContent = String(data.occupied);
        availableBeds.textContent = String(data.total - data.occupied);
        percent.textContent = "".concat(data.percent, "%");
        pillText.textContent = data.percent >= 80 ? "Critical capacity" : "Capacity normal";
        pill.className = "capacity-pill ".concat(data.percent >= 80 ? "critical" : "normal");
        bedsGrid.innerHTML = beds
            .map(function (bed) { return "\n            <div class=\"bed-card\">\n                <strong>".concat(bed.getBedId(), "</strong>\n                <p>").concat(bed.getWardName(), "</p>\n                <p>").concat(bed.getBedInfo(), "</p>\n                <p>").concat(bed.getIsOccupied() ? "Occupied (".concat(bed.getPatientName(), ")") : "Unoccupied", "</p>\n\n                <button data-id=\"").concat(bed.getBedId(), "\">\n                    ").concat(bed.getIsOccupied() ? "Discharge" : "Available", "\n                </button>\n            </div>\n        "); })
            .join("");
        bedsGrid.querySelectorAll("button").forEach(function (btn) {
            btn.addEventListener("click", function () {
                var id = btn.dataset.id;
                var bed = system.getBedsList().find(function (b) { return b.getBedId() === id; });
                if (!bed)
                    return;
                if (bed.getIsOccupied()) {
                    logMsg(system.dischargePatient(id));
                }
                else {
                    logMsg("[INFO] Selected ".concat(id));
                }
                refresh();
            });
        });
    };
    document.getElementById("admitButton").addEventListener("click", function () {
        var name = patientName.value.trim();
        if (!name) {
            logMsg("[INFO] Enter a patient name first.");
            return;
        }
        logMsg(system.admitPatient(bedType.value, name));
        patientName.value = "";
        refresh();
    });
    document.getElementById("addBedButton").addEventListener("click", function () {
        var bedId = newBedId.value.trim();
        var result = system.addBed(newBedType.value, bedId);
        logMsg(result);
        if (result.startsWith("[ADDED]")) {
            newBedId.value = "";
        }
        refresh();
    });
    document.getElementById("summaryButton").addEventListener("click", function () {
        var s = system.getCapacitySummary();
        logMsg("Summary: ".concat(s.occupied, "/").concat(s.total, " occupied (").concat(s.percent, "%)"));
    });
    document.getElementById("clearLogButton").addEventListener("click", function () {
        log.innerHTML = "";
    });
    refresh();
}
document.addEventListener("DOMContentLoaded", mountHospitalSystem);
