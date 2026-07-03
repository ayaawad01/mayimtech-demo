const ui = {
  patientName: document.getElementById("patientName"),
  heartRate: document.getElementById("heartRate"),
  temperature: document.getElementById("temperature"),
  hydration: document.getElementById("hydration"),
  statusPill: document.getElementById("statusPill"),
  statusText: document.getElementById("statusText"),
  statusMessage: document.getElementById("statusMessage"),
  lastUpdate: document.getElementById("lastUpdate"),
  toast: document.getElementById("toast"),
  connectionBadge: document.getElementById("connectionBadge")
};

function showToast(message) {
  ui.toast.textContent = message;
  ui.toast.classList.add("show");
  setTimeout(() => ui.toast.classList.remove("show"), 3000);
}

function render(data) {
  if (!data) return;
  ui.patientName.textContent = data.name || "David Cohen";
  ui.heartRate.textContent = data.heartRate ?? "--";
  ui.temperature.textContent = data.temperature ?? "--";
  ui.hydration.textContent = data.hydration ?? "--";
  ui.statusText.textContent = data.status || "Normal";
  ui.statusMessage.textContent = data.alertReason || "No active alert";
  ui.lastUpdate.textContent = formatTime(data.updatedAt);

  ui.statusPill.className = `status-pill ${data.statusClass || "normal"}`;
  ui.connectionBadge.textContent = data.deviceOnline ? "Device Online" : "Device Offline";
}

function writeReadings(heartRate, temperature, hydration, forcedAlert, reason) {
  const status = calculateStatus(heartRate, temperature, forcedAlert);
  const payload = {
    name: "David Cohen",
    age: 78,
    heartRate,
    temperature,
    hydration,
    alertActive: status.level === "High Risk",
    alertReason: reason || status.message,
    status: status.level,
    statusClass: status.className,
    deviceOnline: true,
    updatedAt: Date.now()
  };
  return patientRef.set(payload);
}

function randomNormal() {
  const heartRate = Math.floor(72 + Math.random() * 12);
  const temperature = Number((36.4 + Math.random() * 0.5).toFixed(1));
  const hydration = Math.floor(84 + Math.random() * 10);
  writeReadings(heartRate, temperature, hydration, false, "Readings updated. Patient is stable.");
  showToast("Normal readings sent to caregiver dashboard.");
}

function simulateDehydration() {
  const heartRate = Math.floor(106 + Math.random() * 12);
  const temperature = Number((37.9 + Math.random() * 0.5).toFixed(1));
  const hydration = Math.floor(48 + Math.random() * 12);
  writeReadings(heartRate, temperature, hydration, true, "Simulated dehydration pattern: high pulse and temperature.");
  showToast("Dehydration simulation sent.");
}

function forceAlert() {
  writeReadings(112, 38.2, 42, true, "Manual demo alert was forced from the patient app.");
  showToast("Forced alert sent to caregiver dashboard.");
}

document.getElementById("updateBtn").addEventListener("click", randomNormal);
document.getElementById("simulateBtn").addEventListener("click", simulateDehydration);
document.getElementById("forceAlertBtn").addEventListener("click", forceAlert);

patientRef.on("value", (snapshot) => {
  const data = snapshot.val();
  if (!data) {
    patientRef.set(defaultPatientData());
    return;
  }
  render(data);
});
