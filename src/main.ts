import { HospitalTriageSystem } from "./system/HospitalTriageSystem.ts";
import { UIManager } from "./ui/UIManager.ts";
import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const system = new HospitalTriageSystem();
  const ui = new UIManager(system);

  setInterval(() => {
    ui.simulateDay();
  }, 24000);
});
