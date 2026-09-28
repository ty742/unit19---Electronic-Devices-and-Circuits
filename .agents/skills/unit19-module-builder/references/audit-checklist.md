# Unit 19 Weekly Module Quality Assurance Audit Checklist

Before considering any weekly web module (`weekX/index.html`) complete and ready for student deployment, run this systematic audit against the authoritative curriculum and delivery constraints.

---

## 1. Scheme of Learning (SoL) & Curriculum Fidelity
- [ ] **Week & Date Match**: Matches the exact date and session in `Unit19-Master-SOL-Locked.md`.
- [ ] **Lesson Aim & Objectives**: Accurately reflects the agreed weekly aim (e.g., Week 4: Signal Conditioning & Op-Amps).
- [ ] **Pearson Content Alignment**: Integrates relevant curriculum units (A1–A6, B1–B9, C1–C2).
- [ ] **Pearson Criteria Preservation**: Strict adherence to official criteria (e.g. A.P1, A.P2, A.P3, A.M1, A.M2, A.M3, A.D1). No invented or altered Pearson terminology.

## 2. Workplace Realism & Narrative
- [ ] **Engineering Role**: Learner is designated with an authentic workplace role (e.g. *Junior Instrumentation Engineer*, *Junior Control Engineer*).
- [ ] **Engineering Challenge Brief**: Lesson begins with a realistic industrial problem (not "today we write assignment criterion X").
- [ ] **Reasoning Progression**: Activities adhere to the engineering problem-solving cycle:
  $$\text{PREDICT} \longrightarrow \text{SIMULATE} \longrightarrow \text{BUILD} \longrightarrow \text{TEST} \longrightarrow \text{COMPARE} \longrightarrow \text{EXPLAIN} \longrightarrow \text{DOCUMENT}$$

## 3. Delivery & Timing Constraints
- [ ] **160 Active Minutes**: Total learning activities fit realistically within 160 minutes (3-hour block minus 20-minute break).
- [ ] **No External Dependency**: Practical activities do not require extra outside lab sessions.
- [ ] **Absence / Catch-Up Scaffolding**: Structured so absent students can complete guided simulation before attending practical bench catch-up.

## 4. Interactive Components & Digital Features
- [ ] **Interactive Circuit Calculator / Modeler**: Contains at least one live interactive JS widget for dynamic parameter manipulation (gain, cutoff frequency, filter response, truth table, etc.).
- [ ] **Interactive Prediction Checkpoints**: Immediate formative feedback provided upon prediction selection before physical measurement.
- [ ] **Pre-Power Checklist**: Interactive checkboxes with local storage persistence to verify safety before powering breadboards.
- [ ] **Data Logging Table**: Interactive input fields for bench test points with a one-click "Copy for MS Forms" summary generator.
- [ ] **Timer Widget**: Integrated 160-minute session countdown / bench timer.

## 5. Inclusion, SEND & Differentiation
- [ ] **Cognitive Load Scaffolds**: Difficult math/circuits broken into staged steps with visual diagrams.
- [ ] **Accessible Typesetting**: Mathematical expressions rendered cleanly via KaTeX ($$...$$ and $...$).
- [ ] **Terminal / Pinout Maps**: Component packages (e.g. TO-92, DIP-8, 1N4001 bands) have clear visual pinout indicators.
- [ ] **Sentence Starters / Vocabulary Bank**: Available for technical explanations and diagnostic conclusions.
- [ ] **Genuine Engineering Stretch**: Stretch challenges require engineering trade-off decisions, tolerance calculations, or deeper root-cause investigation (not just more repetitive worksheets).

## 6. Student vs. Tutor Material Separation (Data Integrity)
- [ ] **No Tutor Answer Keys Exposed**: Student-facing files must never reveal deliberate tutor fault identities, expected values marked as answers, or hidden assessment grading rubrics.
- [ ] **Private PoE Submission**: Student portfolio data is collected via Microsoft Forms (placeholders `[INSERT COLLEGE MICROSOFT FORMS LINK]`), never committed to public GitHub Pages.

## 7. Central Hub & Navigation Integration
- [ ] **Root `index.html` Updated**: Module card updated from `upcoming` to `active`, status marked `Week X • Live`, and launch button points to `weekX/index.html`.
- [ ] **Top Bar Link**: Hub breadcrumb / back-link present and functional in `weekX/index.html`.
- [ ] **Asset Relational Paths**: Shared assets referenced as `../shared/css/presentation.css`, `../shared/js/presentation-engine.js`, etc. Images referenced within `images/`.
