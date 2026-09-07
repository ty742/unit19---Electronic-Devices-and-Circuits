# Unit 19: Electronic Devices & Circuits — Week 1 Microsoft Forms Setup & Curriculum Alignment Guide
## Unified Student Deliverables & Portfolio of Evidence (PoE A01) Template

This document provides the complete, authoritative blueprint for the **Week 1 Microsoft Forms Deliverables Form (PoE A01)**. It is cleanly structured for direct import/entry into Microsoft Forms and student completion without internal resource codes.

---

## ⚙️ Form Configuration Settings (In Microsoft Forms Settings):
- **Who can fill out this form**: `Only people in my organization can respond`
- **Record name**: `Checked` (Auto-captures student email & full name via Microsoft 365)
- **One response per person**: `Checked` (Prevents duplicate entries)
- **Allow response editing after submission**: `Checked` (Enables iterative updates throughout the 160-minute practical)
- **Send email receipt to respondents**: `Checked` (Gives students a verifiable record of their engineering evidence)

---

## 📋 Section 1: Engineering Role & Circuit Identification

### Form Section Header:
**Section 1: Engineering Role & Circuit Identification**
> *Workplace Context: You are joining the prototype lab as a Junior Electronics Technician. A low-voltage LED indicator board has failed production testing, and your supervisor needs you to investigate and verify it.*

1. **Student Full Name**
   - *Type*: Text (Single line)
   - *Required*: Yes

2. **Student ID / College Number**
   - *Type*: Text (Single line)
   - *Required*: Yes

3. **Engineering Requirement: What was the circuit designed to do when operating normally?**
   - *Type*: Text (Long answer)
   - *Prompt*: Describe the expected operation when the switch is closed and power is supplied.
   - *Required*: Yes

---

## 📋 Section 2: Safe Electronic Working Practices & Emergency Procedures

### Form Section Header:
**Section 2: Safe Electronic Working Practices & Emergency Procedures**
> *Safe laboratory standard operating procedures, hazard identification, and isolation.*

4. **Pre-Power Verification Checklist**
   - *Type*: Choice (Multiple answers allowed)
   - *Prompt*: Confirm which mandatory pre-power checks you completed before connecting power:
   - *Options*:
     - [ ] Work bench clean, dry, and clear of loose wire clippings or uninsulated metal
     - [ ] DC Bench Power Supply switched OFF and verified at 5.0 V with current limit <= 100 mA
     - [ ] LED polarity verified (Anode to +5V rail, Cathode to 0V ground)
     - [ ] Current-limiting resistor value checked (220 Ω / 330 Ω) - NOT a 0 Ω short link
     - [ ] Breadboard rows inspected to confirm components share valid terminal columns
   - *Required*: Yes

5. **Emergency Scenario: Smoke or Overheating**
   - *Type*: Choice
   - *Prompt*: If smoke or excessive heat is detected from a breadboard during testing, what is the mandatory FIRST action?
   - *Options*:
     - [ ] Touch the components to identify which one is hot
     - [ ] Disconnect / isolate the electrical power supply immediately
     - [ ] Continue measuring with the multimeter to record the fault voltage
     - [ ] Swap the LED component immediately
   - *Required*: Yes (Correct: Disconnect/isolate power)

6. **Safety Decision: Incorrect Supply Voltage Setting**
   - *Type*: Text (Long answer)
   - *Prompt*: A 5 V circuit is connected to a PSU set to 12 V. Your partner says "It's only for a few seconds, it will be fine." Explain what you should do and why.
   - *Required*: Yes

7. **Laboratory Emergency Stop Location**
   - *Type*: Text (Single line)
   - *Prompt*: State the location of the main electrical isolation / emergency stop button in your laboratory.
   - *Required*: Yes

---

## 📋 Section 3: Circuit Schematic Interpretation & Virtual Simulation

### Form Section Header:
**Section 3: Circuit Schematic Interpretation & Virtual Simulation**
> *Schematic reference: +5V Supply -> S1 (Switch) -> R1 (330Ω/220Ω) -> D1 (LED) -> 0V Return.*

8. **Component Function Matching**
   - *Type*: Text (Single line)
   - *Prompt*: State the function of R1 and D1.
   - *Required*: Yes

9. **Current Path Order**
   - *Type*: Text (Single line)
   - *Prompt*: Starting from +5 V, list the exact order current passes through the circuit to 0V.
   - *Required*: Yes (Expected: +5V -> Switch S1 -> Resistor R1 -> LED D1 -> 0V)

10. **What could happen to the LED if R1 was accidentally replaced with a 0 Ω wire link?**
    - *Type*: Text (Long answer)
    - *Required*: Yes

11. **Simulation Verification: What was your simulated baseline current and LED forward voltage?**
    - *Type*: Text (Single line)
    - *Prompt*: Record your simulated circuit current (I_total) and LED forward voltage (V_LED) from Multisim / Tinkercad.
    - *Required*: Yes

12. **Upload a screenshot of your completed circuit simulation in Multisim / Tinkercad**
    - *Type*: File Upload (Image)
    - *File limit*: 1
    - *Max size*: 10MB
    - *Required*: Yes

---

## 📋 Section 4: Systematic Troubleshooting & Diagnostic Measurements

### Form Section Header:
**Section 4: Systematic Troubleshooting & Diagnostic Measurements**
> *Diagnostic cycle: Observe -> Predict -> Test -> Locate -> Fix -> Verify.*

13. **Initial Observation: What was the observed symptom on the faulty board?**
    - *Type*: Text (Long answer)
    - *Required*: Yes

14. **Hypothesis / Initial Prediction: What did you predict was causing the fault before changing anything?**
    - *Type*: Text (Long answer)
    - *Required*: Yes

15. **Diagnostic Test Measurements (Paste from Website Measurement Logger)**
    - *Type*: Text (Long answer)
    - *Prompt*: Paste your formatted measurement summary generated by the "Copy Summary for Microsoft Form" tool on the website (including Vs, VR1, V_LED, and I_total).
    - *Required*: Yes

16. **Fault Root Cause: What was the confirmed fault?**
    - *Type*: Choice
    - *Options*:
      - [ ] Fault A: LED installed backwards (Reverse-biased open circuit)
      - [ ] Fault B: Open resistor connection / missing jumper wire
      - [ ] Fault C: Incorrect breadboard terminal row misalignment
      - [ ] Fault D: Missing 0V supply ground return rail
      - [ ] Fault E: Incorrect high resistor value (e.g. 220 kΩ instead of 220 Ω)
      - [ ] Fault F: Loose / high-resistance jumper wire connection
      - [ ] Stretch Fault: Secondary / intermittent wiring fault
    - *Required*: Yes

17. **Corrective Repair Action: What physical change did you make to fix the circuit?**
    - *Type*: Text (Long answer)
    - *Required*: Yes

18. **Verification: What measurements and visual proof confirm that the repair was successful?**
    - *Type*: Text (Long answer)
    - *Prompt*: State the final verified LED state, measured voltage VR1, and circuit current I_total.
    - *Required*: Yes

---

## 📋 Section 5: Physical Circuit Photographic Evidence

### Form Section Header:
**Section 5: Physical Circuit Photographic Evidence**

19. **Upload a clear photograph of your verified, operational physical breadboard circuit**
    - *Type*: File Upload (Image)
    - *File limit*: 1
    - *Max size*: 10MB
    - *Required*: Yes

---

## 📋 Section 6: Engineer Exit Ticket & Professional Sign-Off

### Form Section Header:
**Section 6: Engineer Exit Ticket & Professional Sign-Off**

20. **Exit Ticket Q1: Why is the statement "I think the resistor is faulty" not enough to justify replacing it?**
    - *Type*: Text (Long answer)
    - *Required*: Yes

21. **Exit Ticket Q2: If the PSU is 5.0 V but you measure 0.0 V across the resistor, give TWO possible causes.**
    - *Type*: Text (Long answer)
    - *Required*: Yes

22. **Technician Sign-Off Decision: Would you sign off this prototype for production integration?**
    - *Type*: Choice
    - *Options*:
      - [ ] YES - Fully verified against specifications
      - [ ] YES, WITH CONDITIONS - Minor wire routing rework needed
      - [ ] NO - Requires further bench testing
    - *Required*: Yes

23. **What is one troubleshooting skill you want to improve in next week's Diode Lab?**
    - *Type*: Text (Single line)
    - *Required*: Yes
