import type { Question } from "./types";

// Domain 4.0 — Reporting and Communication (16% of exam)
export const D4_QUESTIONS: Question[] = [
  {
    id: "d4-01",
    domain: 4,
    objective: "4.1",
    topic: "Remediation inhibitors",
    question:
      "A critical vulnerability on a legacy SCADA system cannot be patched because the vendor no longer exists, the system cannot tolerate downtime, and patching would void a support agreement. These are examples of:",
    options: [
      "Scanning errors",
      "Inhibitors to remediation — legacy/proprietary systems, business process interruption, and contractual constraints",
      "False positives",
      "Risk transference",
    ],
    answer: 1,
    explanation:
      "Inhibitors to remediation are explicitly listed in objective 4.1: memorandums of understanding/SLAs, organizational governance, business process interruption, degrading functionality, legacy systems, proprietary systems, and patch availability. The report should surface these blockers with compensating-control recommendations and risk acceptance requests — leadership can't act on blockers they never see.",
  },
  {
    id: "d4-02",
    domain: 4,
    objective: "4.1",
    topic: "Metrics/KPIs",
    question:
      "A vulnerability manager wants to show leadership whether the program is improving over time. Which metrics BEST demonstrate trend and posture?",
    options: [
      "Total number of employees",
      "Trends in open vulnerabilities by severity, mean remediation time vs SLA targets, top recurring risks, and scan coverage rates",
      "Number of pages in the scan report",
      "Total firewall rules",
    ],
    answer: 1,
    explanation:
      "Objective 4.1 metrics/KPIs: trends over time (open vulns by severity), SLA compliance (are criticals closed within the mandated window), top risks (recurring/root-cause themes), and coverage (what percentage of assets is actually scanned). Good metrics drive action — e.g., a rising MTTR trend triggers a resourcing or process conversation, not just a chart.",
  },
  {
    id: "d4-03",
    domain: 4,
    objective: "4.1",
    topic: "Action plans",
    question:
      "A remediation action plan assigns tasks across infrastructure, app teams, and a vendor, with some fixes depending on others completing first. What must the plan explicitly capture?",
    options: [
      "Only the CVE numbers",
      "Owners, timelines, escalations, and dependencies between remediation tasks",
      "Analyst home addresses",
      "The CEO's travel schedule",
    ],
    answer: 1,
    explanation:
      "Action plans (4.1) turn findings into executable work: each item has an owner, due date tied to SLA, escalation path for missed dates, and dependencies (e.g., OS upgrade before app patch, vendor fix before config change). Without dependencies and escalation, plans stall silently — the report should also flag inhibitors and track completion status for leadership.",
  },
  {
    id: "d4-04",
    domain: 4,
    objective: "4.1",
    topic: "Stakeholder communication",
    question:
      "The vulnerability team must present findings to (1) the board, (2) system administrators, and (3) internal auditors. How should communication differ?",
    options: [
      "Send everyone the same 400-page technical export",
      "Tailor content: executives get risk-based summaries, scorecards, and trends; admins get technical detail and remediation steps; auditors get compliance-mapped evidence",
      "Only communicate verbally to avoid records",
      "Let each audience run their own scans",
    ],
    answer: 1,
    explanation:
      "Stakeholder identification and audience-appropriate communication is the heart of Domain 4. Executives need business risk framing — trends, top risks, SLA posture — not CVE minutiae. Technical teams need actionable detail (affected hosts, fixes, verification steps). Auditors/compliance need evidence mapped to frameworks. Same underlying data, three different reports.",
  },
  {
    id: "d4-05",
    domain: 4,
    objective: "4.1",
    topic: "Compliance reporting",
    question:
      "For the quarterly PCI DSS assessment, the team must demonstrate that all in-scope systems were scanned and that high-severity findings were remediated within policy timelines. This is an example of:",
    options: [
      "Compliance reporting against regulatory/contractual requirements",
      "A tabletop exercise",
      "Dynamic application testing",
      "Adversary emulation",
    ],
    answer: 0,
    explanation:
      "Compliance reporting maps vulnerability data to specific obligations — PCI DSS requires quarterly scans and timely remediation of high-risk findings. These reports must show scope coverage, findings by severity, remediation status against SLOs, and approved exceptions. Failing to produce them risks fines and loss of the ability to process payments — a business-level consequence executives understand.",
  },
  {
    id: "d4-06",
    domain: 4,
    objective: "4.1",
    topic: "Risk scorecards",
    question:
      "A dashboard shows each business unit a color-coded score combining open critical vulnerabilities, remediation SLA compliance, and unpatched internet-facing assets. This artifact is a:",
    options: ["Chain of custody form", "Risk scorecard", "Forensic image manifest", "Packet capture"],
    answer: 1,
    explanation:
      "Risk scorecards distill vulnerability posture into comparable, visual units — enabling leadership to rank business units, allocate resources, and hold owners accountable. They work best when scores roll up transparent, defensible metrics (severity-weighted open findings, SLA adherence, exposure) rather than opaque numbers. Scorecards pair with action plans: the scorecard says WHERE the problem is, the action plan says HOW it gets fixed.",
  },
  {
    id: "d4-07",
    domain: 4,
    objective: "4.2",
    topic: "Incident declaration",
    question:
      "An alert confirms attacker access to systems containing regulated data. Before broad communication begins, what formal step ensures the response is coordinated and criteria-based?",
    options: [
      "Post about it on social media",
      "Formal incident declaration per the IR plan — triggering severity classification, escalation paths, and the communication plan",
      "Wait a month to see if it happens again",
      "Let each analyst decide independently who to tell",
    ],
    answer: 1,
    explanation:
      "Incident declaration is the formal act that activates the IR machinery: predefined criteria classify severity, the escalation path engages the right responders and leadership, and the communication plan governs who is told what and when. Ad-hoc, individual disclosure decisions cause inconsistent messaging, legal exposure, and uncoordinated response.",
  },
  {
    id: "d4-08",
    domain: 4,
    objective: "4.2",
    topic: "Communication plans",
    question:
      "A breach will likely require notifying regulators within 72 hours and informing customers. Who should be involved in the incident communication plan?",
    options: [
      "Only the SOC analysts",
      "Legal, PR/communications, compliance/privacy, executives, and (as applicable) law enforcement and affected customers",
      "Only the IT help desk",
      "External hackers for technical advice",
    ],
    answer: 1,
    explanation:
      "Objective 4.2's stakeholder list: legal (regulatory notification duties, privilege, liability), PR (public messaging), compliance/privacy (GDPR/CCPA/contractual clocks), executives (business decisions), plus potentially law enforcement, cyber insurance, and customers. Technical staff brief them but shouldn't freelance external communications — a single accurate, approved voice prevents contradictory statements that create legal and reputational damage.",
  },
  {
    id: "d4-09",
    domain: 4,
    objective: "4.2",
    topic: "Executive summaries",
    question:
      "Which element does NOT belong in an executive summary of a major incident?",
    options: [
      "Business impact in plain language (systems, data, downtime, financial exposure)",
      "Current status and containment state",
      "Step-by-step command-line syntax used during forensics",
      "Decisions needed from leadership and next steps",
    ],
    answer: 2,
    explanation:
      "Executive summaries answer: what happened, what's the business impact, where do we stand, what do we need from you, and what happens next. Raw technical detail (commands, packet captures, code) belongs in the technical appendix for responders and auditors. Tailoring depth to the audience is the recurring theme of Domain 4 — the same incident produces multiple layered reports.",
  },
  {
    id: "d4-10",
    domain: 4,
    objective: "4.2",
    topic: "Post-incident reporting",
    question:
      "Two weeks after containment, the team convenes to review what worked, what failed (a missing log source, a slow escalation), and assigns corrective actions with owners and dates. This session and its output are:",
    options: [
      "The initial triage",
      "Lessons learned / after-action review producing the post-incident report",
      "A vulnerability scan",
      "A phishing simulation",
    ],
    answer: 1,
    explanation:
      "The post-incident lessons-learned (after-action) review turns the incident into improvement: candid assessment of detection, response, and communication; root cause confirmation; and tracked corrective actions. The after-action report feeds leadership reporting and program metrics. Blame-free, honest review is essential — otherwise the same gaps cause the next incident.",
  },
  {
    id: "d4-11",
    domain: 4,
    objective: "4.2",
    topic: "IR metrics",
    question:
      "The CISO asks: 'How fast are we at handling incidents, and is it improving?' Which metric set directly answers this?",
    options: [
      "Total number of firewalls",
      "MTTD (mean time to detect), MTTR (mean time to respond), mean time to remediate/close, plus alert volume and false/true positive rates",
      "Lines of code in playbooks",
      "Number of conference talks given by staff",
    ],
    answer: 1,
    explanation:
      "Objective 4.2 key metrics: MTTD (detection speed), MTTR (response speed), MTT-remediate/contain/close, alert volume trends, false-positive vs true-positive rates (detection fidelity), and phishing campaign click rates (user susceptibility). Together they quantify SOC effectiveness over time and justify investments — e.g., rising FP rate argues for alert tuning; rising MTTD argues for better telemetry coverage.",
  },
  {
    id: "d4-12",
    domain: 4,
    objective: "4.2",
    topic: "False positive rate",
    question:
      "A SOC receives 1,000 alerts/month; 850 are false positives. Beyond the 85% FP rate itself, why does this metric matter to REPORTING?",
    options: [
      "It doesn't — false positives are harmless",
      "High FP rates indicate detection rules need tuning; they drive alert fatigue, waste analyst hours, and inflate MTTR — so leadership should fund rule-tuning and content engineering",
      "It proves the SIEM should be deleted",
      "It means all alerts should be auto-closed",
    ],
    answer: 1,
    explanation:
      "Metrics exist to drive decisions. An 85% FP rate translates into wasted analyst capacity, alert fatigue (real incidents get missed), and degraded response times — reporting it with trend data makes the case for detection engineering investment. FP rate alongside TP rate measures detection content quality, just as MTTD/MTTR measure speed. 'Close everything' and 'ignore it' are how breaches get missed.",
  },
  {
    id: "d4-13",
    domain: 4,
    objective: "4.2",
    topic: "Handover",
    question:
      "A 24/7 SOC's night shift discovered an active intrusion at 03:00 and contained the affected segment. At 07:00, what ensures continuity with the incoming shift?",
    options: [
      "Verbal hallway chat if they happen to meet",
      "A structured shift/incident handover — documented status, actions taken, pending tasks, evidence locations, and next steps",
      "Deleting the night shift's notes for a fresh start",
      "Assuming the day shift will figure it out from alerts",
    ],
    answer: 1,
    explanation:
      "Shift and incident handover (4.2) is formal knowledge transfer: incident status, timeline and actions completed, containment state, pending actions with owners, evidence/artifact locations, and open questions. Poor handovers cause duplicated work, missed attacker re-entry, and broken chains of custody. Standard handover templates and a shared case-management system make it reliable.",
  },
  {
    id: "d4-14",
    domain: 4,
    objective: "4.2",
    topic: "Threat intel reporting",
    question:
      "The threat intel team distributes a weekly internal bulletin: newly observed actor TTPs targeting the industry, relevant IoCs pushed to detections, and recommended hunts. This artifact is an:",
    options: [
      "Internal threat intelligence report",
      "Incident declaration",
      "Chain of custody log",
      "Asset inventory",
    ],
    answer: 0,
    explanation:
      "Internal threat intelligence reports translate external intel and internal findings into actionable guidance for SOC consumers — new TTPs, detection opportunities, IoC packages, and hunt hypotheses. They connect Domain 1 (intel collection) to operations and hunting. Distribution should target the right consumers: SOC analysts get technical detail; leadership gets strategic threat landscape summaries.",
  },
  {
    id: "d4-15",
    domain: 4,
    objective: "4.2",
    topic: "Phishing metrics",
    question:
      "Across four quarterly phishing simulations, click rates fell from 22% → 15% → 9% → 6%. Reporting this trend demonstrates:",
    options: [
      "The simulations should stop",
      "Security awareness training effectiveness — a key security-operations metric for leadership",
      "A scanning configuration error",
      "That all users can now spot every phish",
    ],
    answer: 1,
    explanation:
      "Phishing campaign click rate is an explicitly listed objective 4.2 metric measuring user-susceptibility and awareness-program effectiveness over time. The downward trend justifies continued training investment; report rate (users reporting phish) is an even better companion metric. 6% is good, not zero — so layered technical controls remain necessary.",
  },
  {
    id: "d4-16",
    domain: 4,
    objective: "4.1",
    topic: "Trend analysis",
    question:
      "Quarterly reporting shows 'missing EDR coverage' recurring as a root cause in 40% of unremediated critical findings. How should this trend be USED?",
    options: [
      "Ignore it — trends are just history",
      "Highlight the systemic root cause to leadership with a recommended corrective action (deploy EDR to uncovered assets), rather than reporting each finding in isolation",
      "Reclassify all findings as false positives",
      "Blame individual administrators in the report",
    ],
    answer: 1,
    explanation:
      "Trend and top-risk analysis elevates reporting from ticket lists to program insight: recurring root causes (coverage gaps, a legacy OS, a process failure) point at systemic fixes that eliminate whole classes of findings. That's the difference between activity reporting and decision-grade reporting — and exactly what objective 4.1's 'trends' and 'top risks' metrics are for.",
  },
];
