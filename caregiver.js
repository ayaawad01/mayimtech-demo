const ui = {
  patientName: document.getElementById("patientName"),
  heartRate: document.getElementById("heartRate"),
  temperature: document.getElementById("temperature"),
  hydration: document.getElementById("hydration"),
  statusPill: document.getElementById("statusPill"),
  statusText: document.getElementById("statusText"),
  statusMessage: document.getElementById("statusMessage"),
  lastUpdate: document.getElementById("lastUpdate"),
  alertBox: document.getElementById("alertBox"),
  toast: document.getElementById("toast"),
  connectionBadge: document.getElementById("connectionBadge")
};

let previousAlertState = false;

function showToast(message) {
  ui.toast.textContent = message;
  ui.toast.classList.add("show");
  setTimeout(() => ui.toast.classList.remove("show"), 4000);
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

  if (data.alertActive) {
    ui.alertBox.classList.remove("hidden");
    ui.alertBox.textContent = `🚨 HIGH DEHYDRATION RISK - ${data.alertReason}`;
    if (!previousAlertState) showToast("New dehydration risk alert received.");
  } else {
    ui.alertBox.classList.add("hidden");
  }
  previousAlertState = Boolean(data.alertActive);
}

document.getElementById("ackBtn").addEventListener("click", () => {
  showToast("Alert acknowledged by caregiver.");
});

document.getElementById("refreshBtn").addEventListener("click", () => {
  patientRef.once("value").then((snapshot) => {
    render(snapshot.val());
    showToast("Dashboard refreshed.");
  });
});

document.getElementById("resetBtn").addEventListener("click", () => {
  patientRef.set(defaultPatientData());
  showToast("Demo reset to normal readings.");
});

patientRef.on("value", (snapshot) => {
  const data = snapshot.val();
  if (!data) {
    patientRef.set(defaultPatientData());
    return;
  }
  render(data);
});
