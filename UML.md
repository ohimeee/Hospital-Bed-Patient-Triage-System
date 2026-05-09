# UML Class Diagram

This diagram represents the current TypeScript classes in the Hospital Bed Patient Triage System.

## Visual Diagram

![Hospital Bed Patient Triage System UML](UML.svg)

## Mermaid Diagram

```mermaid
classDiagram
    direction TB

    class HospitalBed {
        <<abstract>>
        -_bedId: string
        -_wardName: string
        -_isOccupied: boolean
        -_hasAssignedDoctor: boolean
        -_patientName: string
        -_doctorName: string
        -_bedType: string
        -_dailyRate: number
        -_totalBill: number
        -_daysAdmitted: number
        -_monitoringLevel: string
        -_admitMessage: string
        -_dischargeMessage: string
        +constructor(bedId: string, wardName: string, dailyRate: number)
        +get bedId() string
        +set bedId(value: string) void
        +get wardName() string
        +set wardName(value: string) void
        +get isOccupied() boolean
        +set isOccupied(value: boolean) void
        +get hasAssignedDoctor() boolean
        +set hasAssignedDoctor(value: boolean) void
        +get patientName() string
        +set patientName(value: string) void
        +get doctorName() string
        +set doctorName(value: string) void
        +get dailyRate() number
        +set dailyRate(value: number) void
        +get totalBill() number
        +set totalBill(value: number) void
        +get daysAdmitted() number
        +set daysAdmitted(value: number) void
        +get admitMessage() string
        +set admitMessage(value: string) void
        +get dischargeMessage() string
        +set dischargeMessage(value: string) void
        +get bedType() string
        +set bedType(value: string) void
        +chargeOneDay() string
        +restoreBilling(totalBill: number, daysAdmitted: number) void
        +admitPatient(patientName: string) string
        +dischargePatient() string
        +setDoctor(doctorName: string) string
        #baseAdmit(patientName: string) boolean
        #baseDischarge() boolean
        #baseSetDoctor(doctorName: string) boolean
        #alreadyOccupiedMsg() string
        #alreadyVacantMsg() string
        #alreadyHasDoctorMsg() string
        #noDoctorAssignedMsg() string
        +setMonitoringLevel(value: string) void
        +getMonitoringLevel() string
        +getBedInfo()* string
    }

    class CriticalBed {
        <<abstract>>
        +constructor(bedId: string, wardName: string, monitoringLevel: string, dailyRate: number)
        +getMonitoringLevel() string
        +getBedInfo() string
        +setMonitoringLevel(value: string) void
    }

    class GeneralBed {
        <<abstract>>
        -_wardFloor: string
        +constructor(bedId: string, wardName: string, wardFloor: string, dailyRate: number)
        +getWardFloor() string
        +getBedInfo() string
        +setWardFloor(value: string) void
    }

    class ICUBed {
        +oxygenLevel: number
        +bloodPressure: number
        +constructor(bedId: string, wardName: string, monitoringLevel: string)
        +checkCriticalStatus(spo2: number, systolicBP: number) string
        +dischargePatient() string
    }

    class EmergencyBed {
        +temperature: number
        +heartRate: number
        +constructor(bedId: string, wardName: string, monitoringLevel: string)
        +checkSepsisRisk(tempCelsius: number, heartRateBpm: number) string
        +dischargePatient() string
    }

    class PediatricBed {
        -_guardianName: string
        +constructor(bedId: string, wardName: string, wardFloor: string)
        +get guardianName() string
        +addGuardianInfo(guardianName: string) string
        +dischargePatient() string
    }

    class MaternityBed {
        -_hasDelivered: boolean
        -_deliveryDate: string
        -_newbornName: string
        +constructor(bedId: string, wardName: string, wardFloor: string)
        +get hasDelivered() boolean
        +get deliveryDate() string
        +get newbornName() string
        +recordDelivery(deliveryDate: string, newbornName: string) string
        +dischargePatient() string
    }

    class HospitalTriageSystem {
        -_bedsList: HospitalBed[]
        +constructor()
        -findAvailableBed(bedType: BedType) HospitalBed?
        -findBedById(bedId: string) HospitalBed?
        -createBed(bedType: BedType, bedId: string) HospitalBed
        +addBed(bedType: BedType, bedId: string) string
        +deleteBed(bedId: string) string
        +admitPatient(bedType: BedType, patientName: string) string
        +dischargePatient(bedId: string) string
        +setDoctor(bedId: string, doctorName: string) string
        +setMonitoringLevel(bedId: string, monitoringLevel: string) string
        +movePatient(fromBedId: string, toBedId: string) string
        +getBedsList() HospitalBed[]
        +getCapacitySummary() CapacitySummary
        +passOneDay() string[]
        +addGuardianToBed(bedId: string, guardianName: string) string
        +setRecordDelivery(bedId: string, deliveryDate: string, newbornName: string) string
        +triage(bedId: string, temp: number, hr: number) string
        +checkCriticalStatus(id: string, spo2: number, systolicBP: number) string
    }

    class UIManager {
        -system: HospitalTriageSystem
        -bedsGrid: HTMLDivElement
        -log: HTMLDivElement
        -modal: HTMLDivElement
        -operationType: HTMLSelectElement
        +constructor(system: HospitalTriageSystem)
        -setupEventListeners() void
        -openModal() void
        -closeModal() void
        -showForm() void
        +changeMonitoringLevel() void
        +admitPatient() void
        +addBed() void
        +transferPatient() void
        +refresh() void
        -updateCapacitySummary() void
        -renderBedCards() void
        -renderBedCard(bed: any) void
        -handleICUCheck(bed: any) void
        -handleTriage(bed: any) void
        -handleDischarge(bed: any) void
        -handleDoctor(bed: any) void
        -handleGuardian(bed: PediatricBed) void
        -handleRecordDelivery(bed: any) void
        -handleDelete(bed: any) void
        -getBedColorClass(wardName: string) string
        -addLog(msg: string) void
        -getElement(id: string) HTMLElement
        -getButton(id: string) HTMLButtonElement
        -getInputValue(id: string) string
        -setInputValue(id: string, value: string) void
        -getSelectValue(id: string) string
        +simulateDay() void
    }

    class Main {
        <<module>>
        +DOMContentLoaded listener
        +setInterval(simulateDay, 24000)
    }

    class BedType {
        <<type union>>
        ICU
        Emergency
        Pediatric
        Maternity
    }

    class CapacitySummary {
        <<type>>
        occupied: number
        total: number
        percent: number
    }

    class BedDefaults {
        <<type>>
        wardName: string
        detail: string
    }

    class BED_DEFAULTS {
        <<constant>>
        Record~BedType, BedDefaults~
    }

    class BED_TYPE_MAP {
        <<constant>>
        Record~BedType, Function~
    }

    HospitalBed <|-- CriticalBed
    HospitalBed <|-- GeneralBed
    CriticalBed <|-- ICUBed
    CriticalBed <|-- EmergencyBed
    GeneralBed <|-- PediatricBed
    GeneralBed <|-- MaternityBed

    HospitalTriageSystem "1" *-- "many" HospitalBed : manages
    UIManager ..> HospitalTriageSystem : controls
    UIManager ..> ICUBed : renders/checks
    UIManager ..> EmergencyBed : renders/triages
    UIManager ..> PediatricBed : guardian UI
    UIManager ..> MaternityBed : delivery UI
    Main ..> HospitalTriageSystem : creates
    Main ..> UIManager : creates
    HospitalTriageSystem ..> BedType : accepts
    HospitalTriageSystem ..> CapacitySummary : returns
    HospitalTriageSystem ..> BedDefaults : uses
    HospitalTriageSystem ..> BED_DEFAULTS : reads
    HospitalTriageSystem ..> BED_TYPE_MAP : reads
```

## Relationship Summary

- `HospitalBed` is the abstract parent class for all beds and owns shared state for occupancy, doctors, billing, monitoring, admission, and discharge.
- `CriticalBed` and `GeneralBed` extend `HospitalBed` and provide shared behavior for critical-care and general-care bed families.
- `ICUBed` and `EmergencyBed` are critical bed types with specialized vital-sign checks.
- `PediatricBed` and `MaternityBed` are general bed types with guardian and delivery-record behavior.
- `HospitalTriageSystem` owns the bed list and coordinates admissions, discharges, bed creation/deletion, transfers, billing day simulation, doctor assignment, monitoring changes, and specialty workflows.
- `UIManager` connects browser controls to `HospitalTriageSystem` and renders bed cards.
- `main.ts` creates the system and UI manager, then runs the simulated daily billing timer.
