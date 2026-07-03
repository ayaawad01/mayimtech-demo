# MAYIMTECH Demo Requirements

## Product Goal
MAYIMTECH is a demo system for early dehydration risk detection among elderly patients. The demo includes a patient web app and a caregiver dashboard synchronized through Firebase Realtime Database.

## User Stories
1. As a caregiver, I want to receive a notification about a dehydration risk for my patient, so I can respond quickly.
   - Acceptance Criteria: The alert appears in the caregiver dashboard within 5 seconds after pressing Force Alert or Simulate Dehydration in the patient app.

2. As a caregiver, I want to proactively view my patient's status and readings, so I can monitor health indicators in real time.
   - Acceptance Criteria: Patient-side simulated sensor readings appear in the caregiver dashboard within 5 seconds.

## Functional Requirements
1. The patient app shall run as a web app on a smartphone.
2. The caregiver app shall run as a web app on a laptop.
3. The patient app shall simulate heart rate, body temperature, and hydration level.
4. The patient app shall include a Force Alert button for demo purposes.
5. The patient app shall include a Simulate Dehydration button that generates high-risk readings.
6. The patient app shall include an Update Normal Readings button.
7. The caregiver app shall display the latest patient heart rate, temperature, hydration level, and status.
8. The caregiver app shall display a clear visual alert when dehydration risk is detected.
9. The system shall use Firebase Realtime Database for synchronization.
10. The system shall assume one patient and one caregiver only.
11. The demo shall not require real sensors, files, login, or multiple-user management.
12. The system shall use HTML, CSS, JavaScript, and Firebase v8 compat CDN libraries.

## Non-Functional Requirements
1. The UI should be simple, professional, and readable in class.
2. Updates should appear quickly enough for a two-minute live demo.
3. The project should be hosted using GitHub Pages and remain available for assessment.
