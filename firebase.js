// MAYIMTECH Firebase configuration
// Firebase v8 compat libraries are loaded in patient.html and caregiver.html.

const firebaseConfig = {
  apiKey: "AIzaSyBs1WLSmehcI49F2yQBQjByTACcauLDvj0",
  authDomain: "mayimtech-b9183.firebaseapp.com",
  databaseURL: "https://mayimtech-b9183-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mayimtech-b9183",
  storageBucket: "mayimtech-b9183.firebasestorage.app",
  messagingSenderId: "921699045952",
  appId: "1:921699045952:web:4bce8bb5d4b1f1667cc5a5",
  measurementId: "G-5ZYW00C81M"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const PATIENT_ID = "patient_001";
const patientRef = database.ref(`mayimtech/patients/${PATIENT_ID}`);

function formatTime(timestamp) {
  if (!timestamp) return "No update yet";
  const d = new Date(timestamp);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function calculateStatus(heartRate, temperature, forcedAlert = false) {
  if (forcedAlert || heartRate >= 105 || temperature >= 37.8) {
    return {
      level: "High Risk",
      className: "danger",
      message: "High dehydration risk detected. Patient needs attention."
    };
  }
  if (heartRate >= 92 || temperature >= 37.3) {
    return {
      level: "Warning",
      className: "warning",
      message: "Early warning signs detected. Please monitor patient closely."
    };
  }
  return {
    level: "Normal",
    className: "normal",
    message: "Patient readings are within normal range."
  };
}

function defaultPatientData() {
  return {
    name: "David Cohen",
    age: 78,
    heartRate: 76,
    temperature: 36.7,
    hydration: 88,
    alertActive: false,
    alertReason: "No active alert",
    status: "Normal",
    statusClass: "normal",
    deviceOnline: true,
    updatedAt: Date.now()
  };
}
