import type { Question } from "./types";

// Domain 2.0 — Vulnerability Management (26% of exam)
export const D2_QUESTIONS: Question[] = [
  {
    id: "d2-01",
    domain: 2,
    objective: "2.1",
    topic: "Scanning methods",
    question:
      "A scan needs to enumerate installed patches, local misconfigurations, and missing security updates on servers by logging in and inspecting the system. Which scan type is this?",
    options: [
      "Non-credentialed active scan",
      "Credentialed scan",
      "Passive scan",
      "External discovery scan",
    ],
    answer: 1,
    explanation:
      "Credentialed scans authenticate to targets (SSH, WMI, SMB) and query the OS directly — package versions, patch levels, registry, local config — yielding deeper, more accurate results with less network noise. Non-credentialed scans only see what services expose externally (more false positives/negatives). Passive scans observe network traffic with no probes at all, and external discovery scans map the attack surface from outside.",
  },
  {
    id: "d2-02",
    domain: 2,
    objective: "2.1",
    topic: "Scanning methods",
    question:
      "Which approach monitors network traffic to identify devices and vulnerabilities WITHOUT sending any probes — ideal for fragile OT/ICS environments?",
    options: ["Active scanning", "Passive scanning", "Agentless credentialed scanning", "Authenticated scanning"],
    answer: 1,
    explanation:
      "Passive scanning sniffs mirrored traffic to fingerprint devices, map communications, and infer vulnerabilities — zero packets injected, so it can't crash sensitive PLCs or medical devices. The tradeoff: it only sees communicating assets and visible flaws. Active/agentless/authenticated methods all send probes or log in, which can destabilize OT gear — precisely what passive monitoring avoids.",
  },
  {
    id: "d2-03",
    domain: 2,
    objective: "2.1",
    topic: "Agent vs agentless",
    question:
      "A company has many roaming laptops that rarely connect to the corporate network. Which scanning architecture provides the MOST consistent vulnerability visibility for these devices?",
    options: [
      "Weekly network-based scans of the corporate subnet",
      "Agent-based scanning that reports results whenever the device is online",
      "Annual external penetration tests",
      "Passive network monitoring at the data center",
    ],
    answer: 1,
    explanation:
      "Agent-based scanning runs locally on the endpoint and phones results home over the internet — perfect for assets that are frequently off-network. Network scans only see devices present during the scan window; passive monitoring only sees traffic crossing the data center; annual pen tests are point-in-time and not a vulnerability management substitute. Tradeoff of agents: deployment/maintenance overhead and OS compatibility.",
  },
  {
    id: "d2-04",
    domain: 2,
    objective: "2.1",
    topic: "Scan planning",
    question:
      "Before scanning a hospital's patient-monitoring VLAN, the team schedules scans for maintenance windows, segments targets, and validates scan intensity. Which planning consideration is PRIMARY here?",
    options: [
      "Maximizing scan speed",
      "Operational impact and asset sensitivity — avoiding disruption to critical systems",
      "Scanning during peak business hours for completeness",
      "Using the most aggressive scan templates available",
    ],
    answer: 1,
    explanation:
      "Vulnerability scans can crash fragile services, saturate links, or trigger IPS blocks — planning must weigh operational impact, asset sensitivity, scheduling, segmentation, and regulatory constraints. Sensitive segments (healthcare, OT, SCADA) often require throttled scans, passive methods, or exclusion windows. Speed and aggressiveness are the opposite of what's needed here.",
  },
  {
    id: "d2-05",
    domain: 2,
    objective: "2.1",
    topic: "Baselines",
    question:
      "An auditor requires proof that servers comply with hardened configuration standards like password policy, service disablement, and file permissions. What should the team run?",
    options: [
      "A web application scan",
      "A security baseline scan against CIS benchmarks (or PCI DSS / ISO 27000-derived standards)",
      "A wireless site survey",
      "A phishing simulation",
    ],
    answer: 1,
    explanation:
      "Security baseline (configuration compliance) scanning compares system configuration to recognized hardening standards — CIS Benchmarks, DISA STIGs, PCI DSS requirements, ISO 27000-series guidance. Web app scanners test application-layer flaws, site surveys map wireless coverage, and phishing simulations test people — none validate server hardening posture.",
  },
  {
    id: "d2-06",
    domain: 2,
    objective: "2.2",
    topic: "Tools",
    question:
      "Which tool pairing is correct for their PRIMARY assessment purposes?",
    options: [
      "Nessus — web app proxy interception; Burp Suite — network vulnerability scanning",
      "Nmap — host/service discovery and port scanning; Burp Suite/ZAP — web application testing",
      "Nuclei — exploit framework; Metasploit — template-based vulnerability detection",
      "Trivy — threat intelligence; ScoutSuite — container scanning",
    ],
    answer: 1,
    explanation:
      "Nmap is the standard for discovery, port scanning, and service/version fingerprinting; Burp Suite and OWASP ZAP are intercepting proxies for web app testing (Nikto is the CLI web scanner). Nessus/OpenVAS/Nuclei are vulnerability scanners (Nuclei uses community templates); Metasploit is the exploitation framework. ScoutSuite and Prowler audit cloud configurations; Trivy and Checkov scan containers/IaC. Getting these tool-to-purpose mappings straight is a guaranteed exam payoff.",
  },
  {
    id: "d2-07",
    domain: 2,
    objective: "2.2",
    topic: "Tools",
    question:
      "The team needs to audit their AWS environment for misconfigurations like public S3 buckets and overly permissive security groups. Which tools fit BEST?",
    options: [
      "ScoutSuite or Prowler",
      "Burp Suite or ZAP",
      "Masscan or Angry IP Scanner",
      "Atomic Red Team or Caldera",
    ],
    answer: 0,
    explanation:
      "ScoutSuite and Prowler are cloud security posture tools that audit AWS/Azure/GCP configurations against best practices and benchmarks. Burp/ZAP test web apps; Masscan/Angry IP Scanner do fast network discovery; Atomic Red Team and Caldera are breach-and-attack simulation tools that execute ATT&CK techniques to test detections — a different job entirely.",
  },
  {
    id: "d2-08",
    domain: 2,
    objective: "2.2",
    topic: "Scan analysis",
    question:
      "A scanner flags 'Apache 2.2.15 is vulnerable to CVE-XXXX' on a RHEL server, but the admin shows Red Hat backported the fix into their 2.2.15 build. This finding is a:",
    options: [
      "True positive",
      "False positive caused by version-based detection without backport awareness",
      "False negative",
      "Zero-day",
    ],
    answer: 1,
    explanation:
      "Scanners often infer vulnerability from banner/version strings; enterprise Linux distros backport security fixes without bumping version numbers, producing classic false positives. Validation — via credentialed checks, vendor advisories, or testing — is essential before assigning remediation. A false negative is a missed real vulnerability (arguably worse); a true positive is accurate; a zero-day has no available fix.",
  },
  {
    id: "d2-09",
    domain: 2,
    objective: "2.3",
    topic: "CVSS",
    question:
      "Given CVSS vector 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H', what can the analyst conclude?",
    options: [
      "Exploitation requires local access and user interaction",
      "The flaw is remotely exploitable over the network with low complexity, no privileges, no user interaction, and full CIA impact — likely Critical severity",
      "The flaw only affects confidentiality",
      "The vulnerability is theoretical and cannot be exploited",
    ],
    answer: 1,
    explanation:
      "Reading CVSS vectors is an exam must: AV:N = network attack vector; AC:L = low complexity; PR:N = no privileges needed; UI:N = no user interaction; S:U = scope unchanged; C/I/A:H = high impact to confidentiality, integrity, and availability. This is the worst-case profile (score 9.8-10, Critical) — wormable RCE territory like Log4Shell. Prioritize these for emergency remediation, especially on internet-facing assets.",
  },
  {
    id: "d2-10",
    domain: 2,
    objective: "2.3",
    topic: "EPSS",
    question:
      "A scanner reports two CVEs, both CVSS 9.8. CVE-A has an EPSS score of 0.94; CVE-B scores 0.02. Only one can be patched this cycle. Which should be prioritized and why?",
    options: [
      "CVE-B, because low EPSS means high danger",
      "CVE-A, because EPSS predicts the probability of real-world exploitation in the near term, so it poses greater imminent risk",
      "Either one — identical CVSS scores mean identical risk",
      "Neither — CVSS 9.8 vulnerabilities are too risky to patch quickly",
    ],
    answer: 1,
    explanation:
      "EPSS (Exploit Prediction Scoring System) estimates the likelihood a CVE will be exploited in the wild within 30 days — a key addition in CS0-004. Combined with CVSS severity and asset context, EPSS enables risk-based prioritization: high CVSS + high EPSS + internet-facing = patch now. The exam expects you to know CVSS measures severity, while EPSS measures exploitation probability.",
  },
  {
    id: "d2-11",
    domain: 2,
    objective: "2.3",
    topic: "Prioritization",
    question:
      "Which factor should MOST raise the priority of a vulnerability that is otherwise medium-severity?",
    options: [
      "It is on an isolated lab VM",
      "Active exploitation is observed in the wild (e.g., CISA KEV listing) against an internet-facing, business-critical asset",
      "The vendor classifies it as low",
      "It affects a system scheduled for decommission in 3 years",
    ],
    answer: 1,
    explanation:
      "Prioritization blends scoring with context: active exploitation/threat intel (CISA KEV, EPSS, exploit kit integration), asset value and exposure (internet-facing > internal > isolated), and business impact. A 'medium' CVE being actively exploited against a critical public asset outranks a 'critical' CVE on an isolated test box. Context awareness is exactly what objective 2.3 tests.",
  },
  {
    id: "d2-12",
    domain: 2,
    objective: "2.3",
    topic: "Mitigation",
    question:
      "A critical flaw in a vendor appliance has no patch available, and the vendor estimates a fix in 60 days. The service cannot be taken offline. What is the BEST course of action?",
    options: [
      "Accept the risk silently and wait for the patch",
      "Implement compensating controls — e.g., restrict access via ACLs, add WAF/IPS virtual patching, increase monitoring — and document an approved exception with an expiration",
      "Shut down the business function indefinitely",
      "Publicly disclose the flaw to pressure the vendor",
    ],
    answer: 1,
    explanation:
      "When patching isn't possible, compensating controls reduce exploitability (segmentation, ACLs, IPS/WAF signatures, heightened monitoring) while a formal, time-bound exception documents the risk acceptance with leadership sign-off. Silent acceptance is governance failure; indefinite shutdown ignores business needs; public disclosure without coordination is irresponsible and may be contractually/legally problematic.",
  },
  {
    id: "d2-13",
    domain: 2,
    objective: "2.3",
    topic: "Validation",
    question:
      "After a remediation sprint, what must the vulnerability team do BEFORE closing tickets?",
    options: [
      "Send the completion report to executives",
      "Rescan/retest the affected assets to validate the vulnerabilities are actually remediated",
      "Delete the old scan data",
      "Reassign the findings to another team",
    ],
    answer: 1,
    explanation:
      "Validation (rescans/retesting) confirms the fix worked — patches sometimes fail silently, configurations drift, and new instances get deployed unpatched. Closing on a technician's word creates false assurance. The remediation lifecycle is: identify → prioritize → remediate → validate → report. Only after verification should reports and metrics be updated.",
  },
  {
    id: "d2-14",
    domain: 2,
    objective: "2.3",
    topic: "Attack surface",
    question:
      "An analyst discovers an internet-facing dev server running an outdated CMS that nobody in IT knew existed. Which practice would have found this exposure proactively?",
    options: [
      "Annual policy reviews",
      "Attack surface management (ASM) — continuous discovery and inventory of internet-facing assets",
      "Stronger password policies",
      "Security awareness training",
    ],
    answer: 1,
    explanation:
      "ASM (including external ASM/'shadow IT' discovery) continuously enumerates internet-facing assets, certificates, cloud resources, and domains to find unknown or unmanaged exposure. You cannot protect what you don't know exists — accurate asset inventory is the prerequisite of every scan program and the very first item in objective 2.1.",
  },
  {
    id: "d2-15",
    domain: 2,
    objective: "2.4",
    topic: "Control types",
    question:
      "Classify these controls: (1) a security awareness training program, (2) a WAF blocking SQL injection, (3) a mantrap at the data center entrance. Which grouping is correct?",
    options: [
      "1 = technical, 2 = administrative, 3 = physical",
      "1 = administrative, 2 = technical, 3 = physical",
      "1 = physical, 2 = detective, 3 = administrative",
      "1 = corrective, 2 = technical, 3 = deterrent",
    ],
    answer: 1,
    explanation:
      "Control TYPES: administrative (policies, training, procedures), technical/logical (WAF, encryption, EDR), physical (locks, guards, mantraps, cameras). Control FUNCTIONS are separate: preventative (stops events), detective (identifies events), corrective/responsive (remediates after). The exam tests both axes — a CCTV camera is physical AND detective; a firewall is technical AND preventative.",
  },
  {
    id: "d2-16",
    domain: 2,
    objective: "2.4",
    topic: "Risk management",
    question:
      "A company purchases cyber insurance to cover breach costs. Which risk treatment strategy is this?",
    options: ["Risk avoidance", "Risk mitigation", "Risk transference (sharing)", "Risk acceptance"],
    answer: 2,
    explanation:
      "Transferring/sharing risk shifts financial impact to a third party — insurance or outsourcing contracts. Avoidance eliminates the activity entirely; mitigation reduces likelihood/impact with controls; acceptance (with documented sign-off) tolerates the residual risk. Remember the vocabulary: inherent risk = before controls; residual risk = after controls; risk appetite = how much risk the org is willing to accept.",
  },
  {
    id: "d2-17",
    domain: 2,
    objective: "2.4",
    topic: "Risk concepts",
    question:
      "After applying mitigations, the remaining exposure is $40,000/year, down from an inherent exposure of $400,000/year. The $40,000 represents:",
    options: ["Inherent risk", "Residual risk", "Risk appetite", "Risk capacity"],
    answer: 1,
    explanation:
      "Residual risk is what remains after controls are applied — management must formally accept, further mitigate, transfer, or avoid it. Inherent (gross) risk is the exposure with no controls. Risk appetite is the organization's tolerance threshold for taking risk; capacity is the maximum it can absorb. If residual risk exceeds appetite, more treatment is required.",
  },
  {
    id: "d2-18",
    domain: 2,
    objective: "2.4",
    topic: "Application security",
    question:
      "Which statement about SAST and DAST is correct?",
    options: [
      "SAST tests a running application from the outside; DAST reviews source code",
      "SAST analyzes source code/binaries without execution (white-box); DAST tests the running application from the outside (black-box)",
      "SAST and DAST both require the application to be running in production",
      "DAST finds code-level bugs earlier in the SDLC than SAST",
    ],
    answer: 1,
    explanation:
      "SAST (Static Application Security Testing) scans code/binaries without running them — early in the SDLC, white-box, pinpoints lines of code. DAST (Dynamic Application Security Testing) probes the running app like an attacker would — black-box, finds runtime/config issues. Mature AppSec programs use both, often guided by SAMM (Software Assurance Maturity Model) to measure and improve the program.",
  },
  {
    id: "d2-19",
    domain: 2,
    objective: "2.4",
    topic: "Supply chain",
    question:
      "Before deploying a third-party library, the team wants an inventory of all its components and transitive dependencies to track known vulnerabilities (like Log4j). What should they require?",
    options: [
      "A software bill of materials (SBOM) plus software composition analysis (SCA)",
      "A signed NDA",
      "A web application firewall rule",
      "A pen test authorization letter",
    ],
    answer: 0,
    explanation:
      "An SBOM is the formal inventory of components, versions, and dependencies in software; SCA tooling consumes SBOMs (and code) to map components to known CVEs — the lesson of Log4Shell, where organizations without component inventories couldn't answer 'are we affected?' SBOM/SCA are explicitly new/emphasized in CS0-004 objective 2.4 under third-party and supply-chain risk.",
  },
  {
    id: "d2-20",
    domain: 2,
    objective: "2.1",
    topic: "Internal vs external",
    question:
      "A consultant runs a vulnerability scan from the internet against the company's public IP ranges. Compared to an internal credentialed scan, this external scan will MOST likely:",
    options: [
      "Find more local patch-level detail",
      "Show the attack surface an outside attacker sees — public services, perimeter misconfigurations — but miss internal-only weaknesses",
      "Produce fewer false positives because it is slower",
      "Replace the need for internal scanning entirely",
    ],
    answer: 1,
    explanation:
      "External scans emulate the internet attacker's view: exposed services, open ports, TLS issues, perimeter misconfig. They cannot see behind NAT/firewalls or validate local patch state — that's what internal (ideally credentialed) scans provide. Mature programs run both perspectives, plus agent-based coverage for roaming assets.",
  },
  {
    id: "d2-21",
    domain: 2,
    objective: "2.3",
    topic: "Triage",
    question:
      "Scan output lists 14,000 findings across the enterprise, including duplicates from overlapping scanners. What should the analyst do FIRST before prioritization?",
    options: [
      "Patch every critical finding immediately",
      "Consolidate and deduplicate findings, then validate (weed out false positives) so triage works from accurate data",
      "Ignore findings older than 90 days",
      "Export the list to CSV and email it to all admins",
    ],
    answer: 1,
    explanation:
      "Analysis workflow: consolidate findings from all sources, deduplicate (same CVE on the same asset reported by different tools), and validate — confirm true positives — before scoring and prioritizing. Mass-assigning raw output buries admins in noise; blanket patching without validation wastes change windows on false positives; deleting data by age destroys compliance evidence.",
  },
  {
    id: "d2-22",
    domain: 2,
    objective: "2.3",
    topic: "Patching",
    question:
      "A patch for a critical RCE on production servers must go out fast, but the last rushed patch broke an application. Which approach BEST balances speed and stability?",
    options: [
      "Patch everything tonight with no testing",
      "Test in a staging environment, deploy during a maintenance window with a rollback plan, and monitor after deployment",
      "Defer the patch for six months",
      "Patch only test servers and leave production as-is",
    ],
    answer: 1,
    explanation:
      "Standard change-management for remediation: stage/test first, use approved maintenance windows, prepare rollback/backout plans, deploy (rings/canaries for large fleets), and monitor plus rescan to validate. Uncontrolled emergency patching risks outages; indefinite deferral leaves critical RCEs exposed. When emergency patching is truly infeasible, use compensating controls and a documented exception.",
  },
  {
    id: "d2-23",
    domain: 2,
    objective: "2.2",
    topic: "BAS tools",
    question:
      "The purple team wants to safely execute ATT&CK technique T1059 (Command and Scripting Interpreter) on endpoints to verify EDR detections fire. Which tools are designed for this?",
    options: [
      "Atomic Red Team or MITRE Caldera",
      "Nessus or OpenVAS",
      "Wireshark or tcpdump",
      "CyberChef or Strings",
    ],
    answer: 0,
    explanation:
      "Breach and Attack Simulation (BAS) tools — Atomic Red Team (atomic tests mapped to ATT&CK) and Caldera (automated adversary emulation) — safely execute real techniques to validate that detections and controls work. Vulnerability scanners find weaknesses but don't emulate adversary behavior; packet analyzers and decoding tools support investigation, not detection validation.",
  },
  {
    id: "d2-24",
    domain: 2,
    objective: "2.4",
    topic: "Policies & SLOs",
    question:
      "The vulnerability management policy states: 'Critical vulnerabilities on internet-facing systems must be remediated within 14 days.' This requirement is BEST described as:",
    options: [
      "A service-level objective (SLO) set by governance to define remediation timelines",
      "A compensating control",
      "An attack surface metric",
      "A chain of custody requirement",
    ],
    answer: 0,
    explanation:
      "Remediation timelines (e.g., critical/14 days, high/30 days) are SLOs defined by policy and governance — they make the program measurable and auditable, and they're what Domain 4 metrics (SLA compliance rates) report against. Compensating controls are technical substitutes when remediation isn't possible; chain of custody belongs to incident evidence handling.",
  },
  {
    id: "d2-25",
    domain: 2,
    objective: "2.3",
    topic: "False negatives",
    question:
      "A non-credentialed scan reports a database server as clean, but a later credentialed scan finds 30 missing patches. The first scan's result is a:",
    options: [
      "False positive",
      "False negative — real vulnerabilities were missed, which is the more dangerous scanning error",
      "True positive",
      "Compensating control failure",
    ],
    answer: 1,
    explanation:
      "A false negative means a real vulnerability was NOT reported — dangerous because it creates false confidence and leaves exposure unaddressed. Non-credentialed scans are prone to this because they can't inspect the system's actual patch state. False positives waste effort; false negatives create risk. This is why credentialed or agent-based scanning is preferred for authoritative asset coverage.",
  },
  {
    id: "d2-26",
    domain: 2,
    objective: "2.1",
    topic: "Discovery",
    question:
      "An analyst runs 'nmap -sn 10.0.0.0/24' followed by 'nmap -sV -sC -O' on live hosts. What phases of the scan lifecycle are these, respectively?",
    options: [
      "Vulnerability exploitation; reporting",
      "Host discovery/mapping; service version detection and OS fingerprinting",
      "Passive monitoring; remediation",
      "Compliance audit; pen test",
    ],
    answer: 1,
    explanation:
      "-sn is a ping sweep for host discovery/mapping (what's alive). -sV probes open ports for service/version info, -sC runs default scripts, and -O fingerprints the OS — together mapping and fingerprinting the attack surface before deeper vulnerability scanning. Knowing common Nmap flags and where discovery sits in the scanning lifecycle is directly testable in objective 2.1.",
  },
];
