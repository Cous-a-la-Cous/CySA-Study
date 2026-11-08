import type { Domain } from "./types";

export const DOMAINS: Domain[] = [
  {
    id: 1,
    code: "1.0",
    title: "Security Operations",
    weight: 34,
    color: "#22d3ee",
    tagline: "Monitor the environment, spot malicious activity, and hunt threats with the right tools.",
    objectives: [
      {
        code: "1.1",
        title: "System & network architecture concepts",
        notes:
          "Logging (ingestion, config, integrity/security, time sync/NTP, retention), OS concepts (hardening, file structures, critical files, processes), infrastructure (cloud-native, virtualization, containers, APIs), device management (mobile/endpoint), network models (ZTNA, SASE, hybrid cloud), IAM (PAM, authN/authZ, secrets management), encryption & data protection, and OT/ICS/SCADA basics.",
      },
      {
        code: "1.2",
        title: "Analyze indicators of potentially malicious activity",
        notes:
          "Network indicators (rogue devices, scans/enumeration, unexpected ports), host indicators (resource spikes, unauthorized software, LOLBins, file changes, exfiltration), application & cloud anomalies, social engineering (typosquatting, URL shorteners), identity indicators (impossible travel, account compromise), and BEC.",
      },
      {
        code: "1.3",
        title: "Use tools & techniques to determine malicious activity",
        notes:
          "Packet analysis (Wireshark, tcpdump, Snort/Suricata/Zeek), SIEM log analysis, TIPs (OTX, MISP, OpenCTI), EDR/XDR, MDM, reputation (WHOIS, AbuseIPDB, GeoIP), file analysis (Strings, VirusTotal, YARA), sandboxes (Joe Sandbox, Cuckoo), CyberChef, regex, MXToolbox, UEBA; formats JSON/XML/YAML/EVTX; scripting Python/PowerShell/shell.",
      },
      {
        code: "1.4",
        title: "Threat intelligence & threat hunting",
        notes:
          "Threat actors (APT, insider), TTPs (MITRE ATT&CK, Pyramid of Pain, attribution, heat maps), confidence levels (timeliness, relevance, accuracy), collection (OSINT, closed-source, sharing), IoCs (atomic vs behavioral), STRIDE threat modeling, threat mapping, cyber deception.",
      },
      {
        code: "1.5",
        title: "Efficiency & process improvement",
        notes:
          "Standardize (playbooks/runbooks, team coordination), streamline (SOAR, automation, IaC), data enrichment, alert/rule tuning, dashboards/single pane of glass, tool integration via APIs, webhooks, plug-ins.",
      },
      {
        code: "1.6",
        title: "AI in security operations (new in V4)",
        notes:
          "Risks: hallucinations, data exposure, model poisoning, malicious prompts/prompt injection. Governance: AI usage policies, legal/regulatory compliance. Use cases: artifact comparison, log analysis, document creation, incident investigation, event correlation, automation/orchestration.",
      },
    ],
  },
  {
    id: 2,
    code: "2.0",
    title: "Vulnerability Management",
    weight: 26,
    color: "#a78bfa",
    tagline: "Scan smart, analyze the output, prioritize by risk, and drive remediation.",
    objectives: [
      {
        code: "2.1",
        title: "Implement vulnerability scanning methods",
        notes:
          "Asset inventory, planning (scheduling, operational impact, performance, sensitivity, segmentation, regulatory requirements), internal vs external, agent vs agentless, credentialed vs non-credentialed, passive vs active, discovery/mapping/fingerprinting, baseline scans (PCI DSS, CIS, ISO 27000 series).",
      },
      {
        code: "2.2",
        title: "Analyze output from vulnerability assessment tools",
        notes:
          "Network scanners (Angry IP Scanner, Masscan), multipurpose (Nmap, Metasploit, Maltego, Recon-ng), web app scanners (Burp Suite, ZAP, Nikto), vulnerability scanners (Nessus, Nuclei, OpenVAS), cloud assessment (ScoutSuite, Prowler, Trivy, Checkov), breach & attack simulation (Atomic Red Team, Caldera).",
      },
      {
        code: "2.3",
        title: "Analyze data to prioritize & mitigate vulnerabilities",
        notes:
          "Triage criteria (exploitability, active exploitation/threat intel, asset value, impact, patch availability, true/false positives), scoring (CVSS, EPSS), context awareness (internal/external/isolated), mitigation (attack surface management, secure coding, patching/config management, exceptions, compensating controls), validating remediation.",
      },
      {
        code: "2.4",
        title: "Control types, risks & vulnerability management concepts",
        notes:
          "Control types (administrative, technical, physical) and functions (preventative, detective, responsive, corrective), risk concepts (appetite, residual, inherent), risk strategies (accept, transfer, avoid, mitigate), policies/SLOs, application security (SAST, DAST, SAMM), third-party risk (supply chain, SCA, SBOM).",
      },
    ],
  },
  {
    id: 3,
    code: "3.0",
    title: "Incident Response & Management",
    weight: 24,
    color: "#f472b6",
    tagline: "Run an incident end-to-end: detect, analyze, contain, eradicate, recover, learn.",
    objectives: [
      {
        code: "3.1",
        title: "Attack methodology frameworks",
        notes:
          "Cyber Kill Chain (7 phases), Diamond Model of Intrusion Analysis (adversary, capability, infrastructure, victim), MITRE ATT&CK (tactics, techniques, procedures).",
      },
      {
        code: "3.2",
        title: "The incident response process",
        notes:
          "The full lifecycle: preparation, detection, analysis, containment, eradication, recovery, and post-incident activity (lessons learned, RCA, reporting).",
      },
      {
        code: "3.3",
        title: "Implement incident response techniques",
        notes:
          "IR/communication plans, playbooks, roles, tabletop & simulation training; log collection/correlation/enrichment, triage, timeline building, severity & impact, prioritization; evidence handling (chain of custody, integrity validation, preservation, legal hold); isolation, escalation, remediation & verification, release from isolation, restoration, root cause analysis, corrective actions.",
      },
    ],
  },
  {
    id: 4,
    code: "4.0",
    title: "Reporting & Communication",
    weight: 16,
    color: "#4ade80",
    tagline: "Turn technical findings into decisions — reports, metrics, and stakeholder comms.",
    objectives: [
      {
        code: "4.1",
        title: "Vulnerability management reporting & communication",
        notes:
          "Vulnerability scan reports, compliance reporting, risk scorecards, action plans (escalations, dependencies), inhibitors to remediation (MOUs/SLAs, governance, business interruption, degrading functionality, legacy/proprietary systems, patch availability), stakeholder identification, metrics/KPIs (trends, top risks, SLAs).",
      },
      {
        code: "4.2",
        title: "Security operations & incident response reporting",
        notes:
          "Incident declaration & escalation, executive summaries, communication plans (legal, PR, regulators, law enforcement, customers), post-incident reporting (after-action reports, lessons learned, RCA), shift/incident handover, internal threat intel reports; key metrics: alert volume, false/true positive rates, MTTD/MTTR/MTTRemediate/MTTC, phishing click rates.",
      },
    ],
  },
];
