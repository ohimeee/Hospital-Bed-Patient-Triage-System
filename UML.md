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
        +getBedId() string
        +setBedId(bedId: string) void
        +getWardName() string
        +setWardName(wardName: string) void
        +getIsOccupied() boolean
        +setIsOccupied(occupied: boolean) void
        +getPatientName() string
        +setPatientName(patientName: string) void
        +admitPatient(pName: string)* string
        +dischargePatient()* string
        +getBedInfo()* string
    }

    class CriticalBed {
        <<abstract>>
        -monitoringLevel: string
        +getMonitoringLevel() string
        +setMonitoringLevel(monitoringLevel: string) void
    }

    class GeneralBed {
        <<abstract>>
        -wardFloor: string
        +getWardFloor() string
        +setWardFloor(wardFloor: string) void
    }

    class ICUBed {
        +admitPatient(pName: string) string
        +dischargePatient() string
        +getBedInfo() string
    }

    class EmergencyBed {
        +admitPatient(pName: string) string
        +dischargePatient() string
        +getBedInfo() string
    }

    class PediatricBed {
        +admitPatient(pName: string) string
        +dischargePatient() string
        +getBedInfo() string
    }

    class MaternityBed {
        +admitPatient(pName: string) string
        +dischargePatient() string
        +getBedInfo() string
    }

    class HospitalTriageSystem {
        -bedsList: HospitalBed[]
        -initializeData() void
        -createBed(bedType: BedType, bedId: string) HospitalBed
        +addBed(bedType: BedType, bedId: string) string
        +admitPatient(bedType: BedType, patientName: string) string
        +dischargePatient(bedId: string) string
        +printWardSummary() void
        +getBedsList() HospitalBed[]
        +getCapacitySummary() CapacitySummary
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
```

## Relationship Summary

- `HospitalBed` is the abstract parent class for all beds.
- `CriticalBed` and `GeneralBed` extend `HospitalBed` and add specialized shared fields.
- `ICUBed` and `EmergencyBed` are critical bed types.
- `PediatricBed` and `MaternityBed` are general bed types.
- `HospitalTriageSystem` owns and manages the list of beds, including creating new bed objects through `addBed()`.
- `mountHospitalSystem()` connects the browser UI to `HospitalTriageSystem` without putting bed creation rules inside the HTML.
