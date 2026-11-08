import type { Question } from "./types";

// Domain 3.0 — Incident Response and Management (24% of exam)
export const D3_QUESTIONS: Question[] = [
  {
    id: "d3-01",
    domain: 3,
    objective: "3.1",
    topic: "Cyber Kill Chain",
    question:
      "An attacker has completed reconnaissance, delivered a weaponized document, achieved installation, and is now receiving instructions from a remote server. Per the Cyber Kill Chain, which phase is this?",
    options: [
      "Delivery",
      "Command and Control (C2)",
      "Actions on Objectives",
      "Weaponization",
    ],
    answer: 1,
    explanation:
      "Lockheed Martin's Cyber Kill Chain has seven phases: Reconnaissance → Weaponization → Delivery → Exploitation → Installation → Command & Control → Actions on Objectives. Beaconing to a remote server for instructions is C2 (phase 6) — the last chance to stop the intrusion before Actions on Objectives (exfiltration, destruction, encryption). Defensive value: break the chain at any single phase and the attack fails.",
  },
  {
    id: "d3-02",
    domain: 3,
    objective: "3.1",
    topic: "Diamond Model",
    question:
      "The Diamond Model of Intrusion Analysis represents an intrusion event as a relationship between which four core features?",
    options: [
      "Recon, exploit, payload, exfiltration",
      "Adversary, capability, infrastructure, victim",
      "People, process, technology, governance",
      "Identify, protect, detect, respond",
    ],
    answer: 1,
    explanation:
      "The Diamond Model connects Adversary (who), Capability (what tools/malware), Infrastructure (through what — IPs, domains, C2), and Victim (whom) — with meta-features like timestamp and phase. Pivoting across vertices (e.g., from one victim to shared infrastructure to other victims) drives intrusion analysis and actor attribution. Identify/Protect/Detect/Respond is NIST CSF; the seven kill-chain phases are a different framework.",
  },
  {
    id: "d3-03",
    domain: 3,
    objective: "3.1",
    topic: "MITRE ATT&CK",
    question:
      "An analyst documents that an actor 'obtained valid accounts via phishing, then used them to log in via RDP for lateral movement.' In MITRE ATT&CK terms, 'Initial Access' and 'Lateral Movement' are the ______, while phishing and valid-account/RDP abuse are ______.",
    options: [
      "procedures; tactics",
      "tactics; techniques",
      "techniques; procedures",
      "mitigations; detections",
    ],
    answer: 1,
    explanation:
      "ATT&CK structure: TACTICS are the adversary's goals (the 'why' — Initial Access, Persistence, Lateral Movement, Exfiltration...); TECHNIQUES are how goals are achieved (the 'how' — e.g., T1566 Phishing, T1078 Valid Accounts); PROCEDURES are the specific implementations of a technique by a particular actor. This vocabulary appears constantly on the exam and in real SOC work.",
  },
  {
    id: "d3-04",
    domain: 3,
    objective: "3.2",
    topic: "IR lifecycle",
    question:
      "Place the incident response lifecycle phases in the correct order.",
    options: [
      "Detection → Preparation → Containment → Analysis → Recovery → Eradication",
      "Preparation → Detection & Analysis → Containment → Eradication → Recovery → Post-Incident Activity",
      "Preparation → Containment → Detection → Recovery → Eradication → Lessons Learned",
      "Analysis → Containment → Preparation → Recovery → Detection → Eradication",
    ],
    answer: 1,
    explanation:
      "The standard lifecycle: (1) Preparation — plans, tools, training, before anything happens; (2) Detection & Analysis — identify and scope; (3) Containment — stop the spread; (4) Eradication — remove the threat (malware, accounts, persistence); (5) Recovery — restore systems and validate business function; (6) Post-Incident Activity — lessons learned, RCA, reporting, improvement. Note detection/analysis is a combined phase, and eradication precedes recovery — restoring before removing the threat invites reinfection.",
  },
  {
    id: "d3-05",
    domain: 3,
    objective: "3.2",
    topic: "Containment",
    question:
      "Ransomware is actively encrypting file shares and spreading via SMB. What is the BEST immediate containment action?",
    options: [
      "Begin forensics imaging of all 2,000 endpoints",
      "Isolate affected hosts/segments from the network (EDR isolation, switch/VLAN quarantine, disabling SMB propagation paths) to stop the spread",
      "Reboot all servers to clear memory",
      "Delete encrypted files to remove the ransomware",
    ],
    answer: 1,
    explanation:
      "Containment's goal is stopping the bleeding fast: network isolation via EDR, VLAN quarantine, ACLs, or disabling propagation vectors (SMBv1, admin shares). Full forensic imaging during active spread wastes the containment window. Reboots can destroy volatile evidence and trigger dormant encryption routines. Deleting files destroys data and evidence. Balance: containment vs. evidence preservation vs. business impact — and document every action for the timeline.",
  },
  {
    id: "d3-06",
    domain: 3,
    objective: "3.2",
    topic: "Eradication vs recovery",
    question:
      "After containment, the team removes malware, deletes persistence mechanisms (run keys, rogue accounts), patches the exploited vulnerability, and rotates compromised credentials. Which phase is this?",
    options: ["Recovery", "Eradication", "Preparation", "Post-incident activity"],
    answer: 1,
    explanation:
      "Eradication = removing the threat entirely: malware, persistence, backdoors, rogue accounts, and closing the root entry vector (patching, credential rotation). Recovery follows — restoring systems from known-good backups/images, validating functionality, and staged return to production with heightened monitoring. Skipping thorough eradication before recovery is how organizations get re-compromised days later.",
  },
  {
    id: "d3-07",
    domain: 3,
    objective: "3.3",
    topic: "Evidence handling",
    question:
      "An analyst seizes a compromised laptop. To preserve evidence admissibility, they document who handled it, when, where, and why, in an unbroken log from collection onward. This documentation is the:",
    options: ["Service-level agreement", "Chain of custody", "Root cause analysis", "Tabletop after-action report"],
    answer: 1,
    explanation:
      "Chain of custody is the chronological record of evidence collection, custody, transfer, and analysis — essential for legal proceedings, HR actions, and law-enforcement referrals. Companion practices: hash images/files at acquisition (integrity validation), work from forensic copies not originals (preservation), and apply a legal hold when litigation is anticipated.",
  },
  {
    id: "d3-08",
    domain: 3,
    objective: "3.3",
    topic: "Forensics",
    question:
      "Before analyzing a suspect drive, the examiner images it and computes SHA-256 hashes of both the original media and the image. What is the PRIMARY purpose?",
    options: [
      "To compress the evidence",
      "To validate data integrity — proving the forensic copy is bit-for-bit identical to the original and unaltered during analysis",
      "To encrypt the evidence at rest",
      "To attribute the attack to a threat actor",
    ],
    answer: 1,
    explanation:
      "Hashing at acquisition and verification proves integrity: if hashes match, the copy is identical and analysis hasn't modified anything; if they later differ, evidence was altered and its value collapses. Standard practice: image with write blockers, hash everything, analyze only the copy, store the original securely. This is 'data integrity validation' and 'preservation' from objective 3.3.",
  },
  {
    id: "d3-09",
    domain: 3,
    objective: "3.3",
    topic: "Volatile data",
    question:
      "Responding to a suspected live intrusion on a server, the analyst wants to capture running processes, network connections, and memory BEFORE pulling the plug. Why this order?",
    options: [
      "Because hard drives self-destruct on shutdown",
      "Volatile data (RAM, connections, sessions) is lost on power-off and may hold decryption keys, injected code, and C2 evidence",
      "Because disk forensics is always unreliable",
      "It is faster than imaging the disk",
    ],
    answer: 1,
    explanation:
      "Order of volatility: capture the most fragile evidence first — CPU registers/cache, RAM (memory-resident malware, keys, sessions), network connections, then disk. Powering down destroys volatile evidence and can also trigger destructive malware logic. Fileless malware may exist ONLY in memory, making memory capture (with tools like WinPmem/MAGNET RAM Capture) decisive for the investigation.",
  },
  {
    id: "d3-10",
    domain: 3,
    objective: "3.3",
    topic: "Triage",
    question:
      "The SIEM fires 40 alerts overnight. The on-call analyst reviews each alert's context, enriches with asset criticality and intel, and closes obvious false positives before escalating two genuine incidents. This process is called:",
    options: ["Eradication", "Triage", "Legal hold", "Lessons learned"],
    answer: 1,
    explanation:
      "Triage is the rapid assessment, prioritization, and initial categorization of alerts: validate (true vs false positive), determine severity and impact (asset value, data sensitivity, scope), and prioritize response order. Good triage depends on enrichment (asset context, threat intel, user data) and is the gateway to escalation — the two real incidents now enter the formal IR process.",
  },
  {
    id: "d3-11",
    domain: 3,
    objective: "3.3",
    topic: "Timeline analysis",
    question:
      "During analysis, the team correlates firewall logs, EDR telemetry, authentication logs, and email gateway records into a single chronological sequence of attacker actions. What are they building?",
    options: [
      "A risk register",
      "An incident timeline",
      "A compliance dashboard",
      "A vulnerability scorecard",
    ],
    answer: 1,
    explanation:
      "Timeline construction (objective 3.3) stitches correlated events from multiple sources into chronological order to establish initial access, lateral movement, persistence, and impact — enabling accurate scoping and eradication. It requires synchronized time (NTP) and normalized timestamps. The timeline later feeds the incident report, RCA, and lessons learned.",
  },
  {
    id: "d3-12",
    domain: 3,
    objective: "3.3",
    topic: "Escalation",
    question:
      "Analysis reveals the intrusion reached a database containing regulated customer PII, exceeding the SOC's authority to manage alone. What should happen next?",
    options: [
      "Continue containment quietly without informing anyone",
      "Escalate per the communication plan — IR leadership, legal, privacy/compliance, and executives — because regulatory notification duties may apply",
      "Delete the affected database to remove evidence",
      "Wait for the next quarterly review to report it",
    ],
    answer: 1,
    explanation:
      "Escalation triggers include regulated-data involvement, business-critical impact, scope beyond team authority, and legal/law-enforcement thresholds. Legal and privacy teams assess breach notification obligations (GDPR, state laws, contractual); executives own business risk decisions. Suppressing or delaying escalation is a governance and often legal failure. Escalation criteria should be predefined in the IR plan and playbooks.",
  },
  {
    id: "d3-13",
    domain: 3,
    objective: "3.3",
    topic: "Training",
    question:
      "The IR team and executives walk through a simulated ransomware scenario in a conference room, discussing decisions and gaps without touching real systems. This is a:",
    options: [
      "Live-fire penetration test",
      "Tabletop exercise",
      "Breach and attack simulation",
      "Red team engagement",
    ],
    answer: 1,
    explanation:
      "A tabletop exercise is a discussion-based walkthrough of a scenario that tests plans, roles, communication, and decision-making — low cost, executive-friendly. Simulation exercises go further (injecting realistic artifacts). BAS tools (Caldera, Atomic Red Team) technically execute techniques. Tabletops are preparation-phase activities that surface gaps before a real incident — e.g., 'who can authorize shutting down the payment system?'",
  },
  {
    id: "d3-14",
    domain: 3,
    objective: "3.3",
    topic: "Root cause analysis",
    question:
      "An incident report concludes: 'Root cause: unpatched VPN appliance (CVE exploited); contributing factors: delayed patch cycle and missing MFA on remote access.' Producing this analysis is part of:",
    options: [
      "The detection phase",
      "Root cause analysis (RCA) during post-incident activity",
      "Passive scanning",
      "Threat intelligence collection",
    ],
    answer: 1,
    explanation:
      "RCA identifies WHY the incident happened — the exploited weakness plus systemic contributing factors — so corrective actions fix causes, not just symptoms. It feeds lessons learned and the after-action report, and drives concrete improvements (patch SLO changes, MFA rollout). Techniques like the '5 Whys' help dig past surface explanations.",
  },
  {
    id: "d3-15",
    domain: 3,
    objective: "3.3",
    topic: "Verification",
    question:
      "Eradication is declared complete. Before restoring systems to production, the team should:",
    options: [
      "Skip validation to save time",
      "Verify remediation — rescan affected systems, confirm no persistence or C2 callbacks remain, and monitor closely during staged restoration",
      "Reimage every workstation in the company",
      "Publicly announce the incident is over",
    ],
    answer: 1,
    explanation:
      "Remediation and verification go together in objective 3.3: confirm the threat is actually gone (clean scans, no beaconing, no rogue accounts), then restore in stages from known-good media with heightened monitoring for re-infection indicators. 'Release from isolation' and 'restoration' should be deliberate, verified steps — premature all-clear is how reinfection happens.",
  },
  {
    id: "d3-16",
    domain: 3,
    objective: "3.3",
    topic: "Legal hold",
    question:
      "Legal counsel instructs the IR team to suspend all data deletion and preserve relevant logs, emails, and images because litigation is anticipated. This is a:",
    options: ["Legal hold", "Chain of vulnerability", "Data retention exception", "Risk transfer"],
    answer: 0,
    explanation:
      "A legal (litigation) hold suspends normal retention/destruction schedules and requires preservation of potentially relevant evidence — overriding routine log rotation or device reimaging for in-scope systems. Failing to honor a hold can constitute spoliation with serious legal consequences. It complements chain of custody (documenting evidence handling) and integrity validation (hashing).",
  },
  {
    id: "d3-17",
    domain: 3,
    objective: "3.2",
    topic: "Preparation",
    question:
      "Which of the following is a PREPARATION-phase activity rather than a response-phase activity?",
    options: [
      "Isolating an infected host",
      "Building and maintaining IR playbooks, contact lists, forensic toolkits, and jump kits before incidents occur",
      "Imaging a compromised drive",
      "Writing the lessons-learned report",
    ],
    answer: 1,
    explanation:
      "Preparation happens before incidents: IR plans, playbooks/runbooks, roles and escalation paths, communication plans, training/tabletops, pre-staged forensic tools and jump bags, logging coverage, and retainers. Isolation is containment; imaging is analysis; lessons learned is post-incident. Strong preparation is what makes every later phase fast and effective.",
  },
  {
    id: "d3-18",
    domain: 3,
    objective: "3.1",
    topic: "Frameworks in practice",
    question:
      "A SOC maps all its detections to MITRE ATT&CK techniques and discovers zero coverage for 'Exfiltration' tactics. What is the PRIMARY benefit of this mapping exercise?",
    options: [
      "It guarantees attribution to specific APT groups",
      "It identifies detection coverage gaps so engineering can prioritize building detections for uncovered techniques",
      "It eliminates the need for threat intelligence",
      "It satisfies all compliance requirements automatically",
    ],
    answer: 1,
    explanation:
      "ATT&CK coverage heat maps visualize which tactics/techniques your detections address — revealing blind spots (like zero exfiltration coverage) and guiding detection engineering and hunting priorities. Frameworks organize knowledge; they don't do attribution, replace intel, or create compliance by themselves.",
  },
  {
    id: "d3-19",
    domain: 3,
    objective: "3.3",
    topic: "Severity & impact",
    question:
      "Two incidents fire simultaneously: (A) malware detected on a critical payment-processing server handling cardholder data; (B) adware on a marketing intern's workstation. What drives the prioritization decision?",
    options: [
      "Whichever alert arrived first",
      "Severity and impact assessment — asset criticality, data sensitivity, business impact, and scope",
      "Whichever is easier to close quickly",
      "Alphabetical order of hostnames",
    ],
    answer: 1,
    explanation:
      "Prioritization weighs severity (how bad the activity is) and impact (what's at stake: asset criticality, data classification, business function, potential spread). A payment server with cardholder data (PCI scope) dwarfs adware on a low-value endpoint. Documented severity matrices keep these calls consistent and defensible across analysts.",
  },
  {
    id: "d3-20",
    domain: 3,
    objective: "3.3",
    topic: "Isolation",
    question:
      "An EDR 'network isolation' action is applied to a compromised laptop. What does this typically do?",
    options: [
      "Wipes the hard drive remotely",
      "Blocks all network traffic to/from the host except communication with the EDR management console, allowing continued investigation",
      "Deletes local user accounts",
      "Physically powers off the device",
    ],
    answer: 1,
    explanation:
      "EDR network isolation (containment) cuts the host off from everything except the management plane — C2 and lateral movement die, but analysts keep visibility and can still collect evidence and run response actions. It's reversible ('release from isolation' after verification). Imaging, wiping, or powering off are separate, more destructive actions chosen based on scenario.",
  },
  {
    id: "d3-21",
    domain: 3,
    objective: "3.2",
    topic: "Detection & analysis",
    question:
      "Which activity belongs to the DETECTION & ANALYSIS phase rather than containment?",
    options: [
      "Disabling a compromised user account",
      "Determining the incident's scope: which systems, accounts, and data are affected, and what the initial vector was",
      "Blocking a malicious IP at the firewall",
      "Reimaging affected endpoints",
    ],
    answer: 1,
    explanation:
      "Detection & analysis is about understanding: validating the alert, scoping affected assets, identifying the attack vector and actor behavior, and documenting findings. Disabling accounts and firewall blocks are containment actions; reimaging belongs to eradication/recovery. Scoping errors here cascade — contain too little and the attacker persists; too much and the business suffers unnecessarily.",
  },
  {
    id: "d3-22",
    domain: 3,
    objective: "3.3",
    topic: "Playbooks",
    question:
      "A phishing playbook specifies: extract headers/URLs → detonate attachments → search mailboxes for the campaign → purge messages → reset credentials of clickers → block sender infrastructure. What is the PRIMARY purpose of defining this in advance?",
    options: [
      "To guarantee no phishing email ever lands in inboxes",
      "To standardize response so any analyst executes consistent, complete, fast actions with nothing forgotten",
      "To eliminate the need for analyst judgment",
      "To avoid documenting incidents",
    ],
    answer: 1,
    explanation:
      "Playbooks standardize processes (objective 3.3 / 1.5): consistent, repeatable response regardless of who is on shift, with defined steps, decision points, and escalation triggers. They reduce errors and MTTR and pair naturally with SOAR automation. They don't remove analyst judgment (edge cases always exist) and don't replace documentation — every execution still gets recorded.",
  },
  {
    id: "d3-23",
    domain: 3,
    objective: "3.3",
    topic: "Log collection",
    question:
      "During a major incident, analysts discover the VPN logs needed to trace attacker access were overwritten after 7 days due to short retention. Which preparation improvement addresses this failure?",
    options: [
      "Reduce log collection further to save storage",
      "Align log retention and collection scope with IR and compliance needs, ensuring critical sources (VPN, identity, EDR, email) are centrally retained",
      "Disable VPN logging to reduce noise",
      "Rely on attackers to document their own actions",
    ],
    answer: 1,
    explanation:
      "Log collection, correlation, and enrichment are IR techniques that only work if the data exists. Preparation must define which sources are collected centrally (identity, remote access, endpoints, email, DNS, cloud) and how long they're retained — often driven by compliance and average attacker dwell time (weeks to months). This failure should land in lessons learned with a corrective action.",
  },
  {
    id: "d3-24",
    domain: 3,
    objective: "3.2",
    topic: "Post-incident",
    question:
      "Which deliverables come from the POST-INCIDENT phase?",
    options: [
      "Isolation commands and firewall blocks",
      "After-action report, lessons learned, root cause analysis, and improvement actions (detection, process, control changes)",
      "Reconnaissance and weaponization",
      "Daily alert triage queues",
    ],
    answer: 1,
    explanation:
      "Post-incident activity converts the incident into organizational improvement: the after-action report (timeline, actions, impact), lessons-learned session (what worked, what didn't), RCA, and tracked corrective actions — new detections, playbook updates, control fixes, training needs. Skipping this phase means repeating the same incident. The outputs also feed Domain 4 reporting and metrics.",
  },
];
