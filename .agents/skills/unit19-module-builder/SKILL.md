---
name: unit19-module-builder
description: >-
  Builds, audits, and integrates interactive weekly learning modules (weekX/index.html)
  for Pearson BTEC Level 3 Engineering Unit 19 (Electronic Devices and Circuits).
  Transforms week planning documents and master Scheme of Learning into interactive web
  modules with circuit calculators, prediction self-checks, and links to the central hub.
---

# Unit 19 Weekly Module Builder Skill

This skill guides the end-to-end authoring, interactive widget design, and hub integration of weekly teaching and learning web modules for **Pearson BTEC Level 3 Engineering: Unit 19 (Electronic Devices and Circuits)**.

---

## 1. Core Workflow Pipeline

```text
INPUT ASSETS
├── Unit19-Master-SOL-Locked.md (Authoritative curriculum)
├── AGENTS.md (Pedagogical & delivery constraints)
├── resource pack/weekX/ (Planning docx, schematics, waveforms)
│
▼ STEP 1: Plan & Extract
Extract week topic, role, KSBs, 160-min timing, circuit specs, formulas, and PoE identifier.
│
▼ STEP 2: Scaffolding & Setup
Create weekX/ directory, copy/organize circuit diagrams into weekX/images/, copy template.
│
▼ STEP 3: Implement Interactive Web Module (weekX/index.html)
- PresentationEngine slides setup (Welcome, Scenario, Retrieval, Theory, Interactive Labs, Exit Ticket)
- Mandatory Interactive Circuit Calculator / Simulator Widget
- Mandatory Interactive Self-Check / Prediction Checkpoints (Predict -> Test -> Explain)
- KaTeX mathematical typesetting ($$...$$ and $...$)
- Accessible Form Drawer integration for Microsoft Forms PoE submission
│
▼ STEP 4: Integrate with Portal Hub (index.html)
Update root index.html card: switch status to Live, enable Launch button, verify relative paths.
│
▼ STEP 5: Quality Assurance & Compliance Audit
Run the 26-point QA checklist (timing, Pearson fidelity, student/tutor separation, accessibility).
```

---

## 2. Directory Architecture & Conventions

Every weekly module must reside in its respective subdirectory at the workspace root:

```text
unit19/
├── index.html                 # Central Engineering Portal Hub
├── shared/
│   ├── css/
│   │   ├── presentation.css   # Core design system & slide engine styles
│   │   └── form-drawer.css    # PoE slide-over drawer styles
│   └── js/
│       ├── presentation-engine.js  # Keyboard & button slide navigation
│       ├── accessibility-engine.js # Dyslexia fonts, high-contrast, text scaling
│       ├── timer.js                # 160-minute countdown / bench stopwatch
│       ├── form-drawer.js          # Microsoft Forms drawer controller
│       └── self-check.js           # Instant feedback question engine
├── resource pack/
│   └── weekX/                 # Input assets: planning docx, Multisim/LTspice PNGs
└── weekX/                     # Web module for week X
    ├── images/                # Optimized PNGs/SVGs for schematics & pinouts
    └── index.html             # The weekly interactive lab module
```

---

## 3. Mandatory Pedagogical & Technical Rules

Before authoring or editing `weekX/index.html`, verify compliance against:

1. **Curriculum Source of Truth**: Always read `Unit19-Master-SOL-Locked.md` for the specific week. Never invent or alter Pearson assessment criteria (A1–A6, A.P1–A.D1, etc.).
2. **Workplace Narrative**: Every lesson must frame the learner as part of a **Junior Electronics Engineering Team** with a concrete industrial scenario (e.g., Week 3: Junior Control Engineer; Week 4: Junior Instrumentation Engineer).
3. **160-Minute Active Learning Limit**: The lesson must fit exactly within 160 active minutes (3 hours total with a 20-minute break).
4. **Engineering Reasoning Cycle**: Every practical investigation must follow:
   $$\text{PREDICT} \longrightarrow \text{SIMULATE} \longrightarrow \text{BUILD} \longrightarrow \text{TEST} \longrightarrow \text{COMPARE} \longrightarrow \text{EXPLAIN} \longrightarrow \text{DOCUMENT}$$
5. **Engineering Toolbox / Retrieval**: Must occupy 5–10 minutes at the start, testing cumulative recall (Week $N$ retrieves weeks $1 \dots N-1$).
6. **Student vs. Tutor Separation**: Student-facing web pages **must NEVER contain** tutor answer keys, predetermined fault injection identities, or hidden marking schemes.
7. **SEND & Stretch Scaffolding**:
   - **SEND**: Collapsible calculation scaffolds, color-coded terminal pinouts, formula reference badges, sentence starters.
   - **Stretch**: Component trade-off analysis, tolerance modeling, or root-cause troubleshooting.

---

## 4. Mandatory Interactive Features Implementation

### Feature A: Interactive Circuit Calculator / Simulator Widget
Each module must contain at least one live interactive engineering tool allowing students to manipulate parameters and observe theoretical or simulated circuit responses before building.

**Pattern (Cut-off / Inverting Op-Amp / Gain Calculator):**
```html
<div class="card interactive-calculator-card">
  <div class="card-title">⚡ Interactive Signal / Component Calculator</div>
  <div class="calc-inputs-grid">
    <div class="input-group">
      <label for="calc-rf">Feedback Resistor $R_f$ ($\text{k}\Omega$):</label>
      <input type="number" id="calc-rf" value="10" min="1" max="100" step="1" oninput="updateCalculator()">
    </div>
    <div class="input-group">
      <label for="calc-rin">Input Resistor $R_{in}$ ($\text{k}\Omega$):</label>
      <input type="number" id="calc-rin" value="1" min="0.1" max="20" step="0.1" oninput="updateCalculator()">
    </div>
  </div>
  <div class="calc-results-display">
    <div class="result-item">
      <span class="label">Voltage Gain ($A_v = -R_f / R_{in}$):</span>
      <span class="value" id="calc-gain-val">-10.0 V/V</span>
    </div>
    <div class="result-item">
      <span class="label">Phase Inversion:</span>
      <span class="value status-ok">180° Inverted</span>
    </div>
  </div>
</div>
```

### Feature B: Interactive Self-Check & Prediction Checkpoints
Before powering on or measuring physical hardware, learners must enter or select predictions. Provide immediate, non-punitive formative feedback.

**Pattern (Prediction Checkpoint):**
```html
<div class="prediction-box">
  <h4>🔮 Pre-Power Prediction Checkpoint</h4>
  <p>What do you predict will happen to the output voltage if $R_f$ is doubled while $R_{in}$ remains constant?</p>
  <div class="prediction-options">
    <button class="pred-btn" onclick="checkPrediction(this, false, 'Remember: A_v = -R_f / R_in. Gain is directly proportional to R_f.')">
      Gain is halved ($50\%$)
    </button>
    <button class="pred-btn" onclick="checkPrediction(this, true, 'Spot on! Doubling feedback resistance doubles the closed-loop voltage gain.')">
      Gain doubles ($200\%$)
    </button>
    <button class="pred-btn" onclick="checkPrediction(this, false, 'Negative feedback controls closed-loop gain directly. Check the formula.')">
      Gain remains unchanged
    </button>
  </div>
  <div class="prediction-feedback" style="display:none; margin-top:10px; padding:10px; border-radius:8px;"></div>
</div>
```

---

## 5. Central Hub (`index.html`) Integration Checklist

When a weekly module `weekX` is ready:
1. Locate the corresponding week card in the root `index.html`.
2. Update the status tag from `<span class="status-tag upcoming">` to `<span class="status-tag active">Week X • Live</span>`.
3. Add class `active-module` to `.module-card`.
4. Replace `<span class="btn-disabled">` with:
   ```html
   <a href="weekX/index.html" class="btn-launch">Launch Module →</a>
   ```
5. Ensure the top navigation bar or quick-link strip reflects the current live session.

---

## 6. Resources & Templates

- **Starter HTML Skeleton**: See [weekly-module-template.html](file://templates/weekly-module-template.html) for a complete starter file pre-wired with KaTeX, PresentationEngine, Form Drawer, and accessible styling.
- **Audit Checklist**: See [audit-checklist.md](file://references/audit-checklist.md) for the mandatory 26-point quality assurance check before releasing any module.
