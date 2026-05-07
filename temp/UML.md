# UML Class Diagram

This diagram represents the main TypeScript classes in the Hospital Bed Patient Triage System.

## Visual Diagram

![Hospital Bed Patient Triage System UML](UML.svg)

## Mermaid Diagram

```mermaid
classDiagram
    direction TB

    class HospitalBed {
        <<abstract>>
        -bedId: string
        -wardName: string
        -isOccupied: boolean
        -patientName: string
        +constructor(bedId: string, wardName: string)
        +getBedId() string
        +setBedId(bedId: string) void
        +getWardName() string
        +setWardName(wardName: string) void
        +getIsOccupied() boolean
        +setIsOccupied(occupied: boolean) void
        +getPatientName() string
        +setPatientName(patientName: string) void
        #baseAdmit(patientName: string) boolean
        #baseDischarge() boolean
        #alreadyOccupiedMsg() string
        #alreadyVacantMsg() string
        +admitPatient(patientName: string)* string
        +dischargePatient()* string
        +getBedInfo()* string
    }

    class CriticalBed {
        <<abstract>>
        -monitoringLevel: string
        +constructor(bedId: string, wardName: string, monitoringLevel: string)
        +getMonitoringLevel() string
        +setMonitoringLevel(monitoringLevel: string) void
        +getBedInfo() string
    }

    class GeneralBed {
        <<abstract>>
        -wardFloor: string
        +constructor(bedId: string, wardName: string, wardFloor: string)
        +getWardFloor() string
        +setWardFloor(wardFloor: string) void
        +getBedInfo() string
    }

    class ICUBed {
        +constructor(bedId: string, wardName: string, monitoringLevel: string)
        +admitPatient(patientName: string) string
        +dischargePatient() string
    }

    class EmergencyBed {
        +constructor(bedId: string, wardName: string, monitoringLevel: string)
        +admitPatient(patientName: string) string
        +dischargePatient() string
    }

    class PediatricBed {
        +constructor(bedId: string, wardName: string, wardFloor: string)
        +admitPatient(patientName: string) string
        +dischargePatient() string
    }

    class MaternityBed {
        +constructor(bedId: string, wardName: string, wardFloor: string)
        +admitPatient(patientName: string) string
        +dischargePatient() string
    }

    class HospitalTriageSystem {
        -bedsList: HospitalBed[]
        +constructor()
        -initializeData() void
        -findAvailableBed(bedType: BedType) HospitalBed?
        -findBedById(bedId: string) HospitalBed?
        -createBed(bedType: BedType, bedId: string) HospitalBed
        +addBed(bedType: BedType, bedId: string) string
        +admitPatient(bedType: BedType, patientName: string) string
        +dischargePatient(bedId: string) string
        +getBedsList() HospitalBed[]
        +getCapacitySummary() CapacitySummary
        +getBedTypeLabel(bed: HospitalBed) string
    }

    class MountHospitalSystem {
        <<function>>
        +mountHospitalSystem() void
        -logMsg(message: string) void
        -refresh() void
    }

    class BedType {
        <<enumeration>>
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

    HospitalBed <|-- CriticalBed
    HospitalBed <|-- GeneralBed
    CriticalBed <|-- ICUBed
    CriticalBed <|-- EmergencyBed
    GeneralBed <|-- PediatricBed
    GeneralBed <|-- MaternityBed

    HospitalTriageSystem "1" *-- "many" HospitalBed : manages
    MountHospitalSystem ..> HospitalTriageSystem : uses
    HospitalTriageSystem ..> BedType : accepts
    HospitalTriageSystem ..> CapacitySummary : returns
    HospitalTriageSystem ..> BedDefaults : uses defaults
```

## Relationship Summary

- `HospitalBed` is the abstract parent class for all beds.
- `CriticalBed` and `GeneralBed` extend `HospitalBed` and add specialized shared fields.
- `ICUBed` and `EmergencyBed` are critical bed types.
- `PediatricBed` and `MaternityBed` are general bed types.
- `HospitalTriageSystem` owns and manages the list of beds, including creating new bed objects through `addBed()`.
- `BedType` limits the accepted bed categories, while `BedDefaults` stores the default ward and detail values used when creating new beds.
- `mountHospitalSystem()` connects the browser UI to `HospitalTriageSystem` without putting bed creation rules inside the HTML.
