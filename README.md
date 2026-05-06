# Hospital Bed & Patient Triage System

A browser-based hospital bed availability and patient triage system built with TypeScript, HTML, and CSS. The app tracks a small set of hospital beds, admits patients into available beds by ward type, discharges occupied beds, and shows live capacity information.

## Features

- View total, occupied, and available bed counts
- Admit patients by bed type:
  - ICU
  - Emergency
  - Pediatric
  - Maternity
- Discharge occupied beds directly from the ward bed cards
- Display bed status, ward name, patient name, and bed-specific information
- Show activity logs for admissions, discharges, selections, and capacity summaries
- Highlight critical capacity when occupancy reaches 80% or higher
- Responsive dashboard layout for desktop and smaller screens

## Tech Stack

- HTML
- CSS
- TypeScript
- Compiled JavaScript

## Project Structure

```text
Hospital-Bed-Patient-Triage-System/
+-- index.html
+-- styles.css
+-- HospitalTriageSystem.ts
+-- HospitalTriageSystem.js
+-- tsconfig.json
+-- .gitignore
+-- README.md
```

## How To Run

Open `index.html` directly in your browser.

No server is required because this project is a static front-end app.

## Development

The main source file is:

```text
HospitalTriageSystem.ts
```

The browser loads:

```text
HospitalTriageSystem.js
```

After editing the TypeScript file, rebuild the JavaScript with:

```powershell
tsc
```

You can also type-check without emitting JavaScript:

```powershell
tsc --noEmit
```

## Main Classes

- `HospitalBed` - abstract base class for all bed types
- `CriticalBed` - abstract class for beds that use monitoring levels
- `GeneralBed` - abstract class for beds that use ward floor information
- `ICUBed` - ICU-specific admission and discharge behavior
- `EmergencyBed` - emergency-specific admission and discharge behavior
- `PediatricBed` - pediatric-specific admission and discharge behavior
- `MaternityBed` - maternity-specific admission and discharge behavior
- `HospitalTriageSystem` - manages bed data and triage operations
- `HospitalTriageUI` - renders and updates the browser interface

## Notes

This project stores data in memory only. Refreshing the browser resets the bed state to the default sample data.

This is a front-end demonstration project and does not include authentication, a database, or real hospital system integration.
