import type { Question } from "./types";

// Domain 1.0 — Security Operations (34% of exam)
export const D1_QUESTIONS: Question[] = [
  {
    id: "d1-01",
    domain: 1,
    objective: "1.1",
    topic: "Logging",
    question:
      "A SOC analyst correlating a brute-force attack across three servers finds that the events appear out of order between systems. Which logging practice should be addressed FIRST to make cross-system correlation reliable?",
    options: [
      "Increase log retention on all three servers",
      "Synchronize all systems to a common NTP time source",
      "Enable log encryption at rest",
      "Switch all logs to JSON format",
    ],
    answer: 1,
    explanation:
      "Time synchronization is the foundation of correlation. If system clocks drift, events from different sources cannot be placed on a common timeline — the exact symptom described. Retention affects how long logs are kept, encryption protects confidentiality/integrity, and format standardization helps parsing, but none of those fix out-of-order timestamps. Ensure every host, network device, and cloud service syncs to the same reliable NTP source (ideally with an authenticated/stratum-consistent configuration).",
  },
  {
    id: "d1-02",
    domain: 1,
    objective: "1.1",
    topic: "Network architecture",
    question:
      "An organization replaces its VPN with a solution that grants users access to specific applications only after continuously verifying identity, device posture, and context — never trusting network location. Which architecture has it adopted?",
    options: ["SASE", "ZTNA", "SD-WAN", "Hybrid cloud"],
    answer: 1,
    explanation:
      "Zero Trust Network Access (ZTNA) is defined by 'never trust, always verify': access is granted per-application based on identity, device health, and context rather than network location. SASE is a broader cloud-delivered framework that converges networking (SD-WAN) with security services — ZTNA is often one component of SASE. SD-WAN is a networking technology, and hybrid cloud describes an infrastructure model, not an access philosophy.",
  },
  {
    id: "d1-03",
    domain: 1,
    objective: "1.1",
    topic: "Identity & access management",
    question:
      "Which control is MOST appropriate for securing the credentials used by domain administrators and service accounts with elevated rights?",
    options: [
      "Multifactor authentication for all users",
      "Privileged Access Management (PAM) with credential vaulting and rotation",
      "Role-based access control for standard users",
      "Federated identity via SAML",
    ],
    answer: 1,
    explanation:
      "PAM is purpose-built for privileged credentials: vaulting, just-in-time access, session recording, automatic rotation, and check-out workflows. MFA is essential but applies broadly and doesn't vault or rotate admin secrets. RBAC governs authorization for regular users, and SAML federation addresses authentication across organizations — neither manages privileged credential lifecycles.",
  },
  {
    id: "d1-04",
    domain: 1,
    objective: "1.1",
    topic: "Critical infrastructure",
    question:
      "A security analyst is asked to monitor a power plant's control systems. The environment uses PLCs and HMIs to manage physical processes, and availability is prioritized over patching. Which environment is this?",
    options: [
      "IT enterprise network",
      "OT/ICS/SCADA environment",
      "Hybrid cloud infrastructure",
      "Mobile device fleet",
    ],
    answer: 1,
    explanation:
      "Operational Technology (OT), Industrial Control Systems (ICS), and SCADA environments control physical processes using PLCs, HMIs, and sensors. They differ from IT: availability and safety outrank confidentiality, patching windows are rare, and passive monitoring is strongly preferred because active scans can disrupt fragile control equipment. This is why specialized monitoring approaches (network taps, passive ICS-aware tools) are used instead of traditional IT scanning.",
  },
  {
    id: "d1-05",
    domain: 1,
    objective: "1.1",
    topic: "Logging",
    question:
      "To detect tampering, an analyst needs assurance that logs were not modified after collection. Which measure provides log INTEGRITY?",
    options: [
      "Storing logs for seven years",
      "Cryptographic hashing and forwarding logs to a write-once (WORM) central server",
      "Compressing logs to save space",
      "Restricting log access to administrators",
    ],
    answer: 1,
    explanation:
      "Integrity means proving logs are unchanged: hashing (e.g., SHA-256 digests) plus forwarding to an append-only/WORM central log server makes tampering detectable and difficult. Retention is about duration, compression is about storage efficiency, and access control is about confidentiality — important, but none of them prove the content wasn't altered.",
  },
  {
    id: "d1-06",
    domain: 1,
    objective: "1.2",
    topic: "Host indicators",
    question:
      "An EDR alert shows powershell.exe spawning from winword.exe, downloading a payload with certutil.exe, and creating a scheduled task. What BEST describes this activity?",
    options: [
      "Normal software installation",
      "Living-off-the-land binaries (LOLBins) being abused for defense evasion",
      "A failed Windows update",
      "Legitimate administrative scripting",
    ],
    answer: 1,
    explanation:
      "This chain is a classic LOLBin attack: attackers abuse signed, built-in Windows binaries (certutil, mshta, regsvr32, rundll32, PowerShell) to download and execute payloads while blending in with normal activity. The parent-child anomaly (Word spawning PowerShell) is a strong malicious indicator — Office applications have no business launching shells. Detection should focus on process lineage and command-line arguments rather than file reputation, since the binaries themselves are legitimate.",
  },
  {
    id: "d1-07",
    domain: 1,
    objective: "1.2",
    topic: "Identity indicators",
    question:
      "A user's account authenticates from New York at 09:00 and from Singapore at 09:20 the same day, with no travel booked. What type of indicator is this?",
    options: [
      "Typosquatting",
      "Impossible travel",
      "Enumeration",
      "Data exfiltration",
    ],
    answer: 1,
    explanation:
      "Impossible travel is an identity-based indicator: two logins from geographically distant locations within a timeframe that no human could physically travel. It strongly suggests credential compromise or session token theft (or sometimes VPN use — worth validating). Typosquatting is look-alike domains, enumeration is reconnaissance probing, and exfiltration is unauthorized data movement out of the environment.",
  },
  {
    id: "d1-08",
    domain: 1,
    objective: "1.2",
    topic: "Email attacks",
    question:
      "An attacker registers 'acme-corp.co' (the real company uses acme-corp.com), emails the CFO's assistant a spoofed invoice, and requests an urgent wire transfer. No malware is attached. This BEST describes:",
    options: [
      "Whaling combined with business email compromise (BEC)",
      "A watering hole attack",
      "Credential phishing with a malicious payload",
      "Ransomware staging",
    ],
    answer: 0,
    explanation:
      "BEC is a malware-free social engineering attack using spoofed or look-alike domains to trick staff into payments or data disclosure; targeting executives (whaling) or their assistants with urgent payment requests is the hallmark. A watering hole attack compromises a website the targets visit. Credential phishing would lure victims to a fake login page to steal passwords. No ransomware indicators (encryption, ransom notes, mass file changes) are present.",
  },
  {
    id: "d1-09",
    domain: 1,
    objective: "1.2",
    topic: "Network indicators",
    question:
      "NetFlow data shows a single internal host connecting to TCP ports 22, 135, 139, 445, and 3389 across hundreds of internal IPs in sequence. What is MOST likely occurring?",
    options: [
      "Rogue device broadcasting ARP storms",
      "Internal enumeration/lateral movement reconnaissance",
      "Normal patch management traffic",
      "DNS tunneling exfiltration",
    ],
    answer: 1,
    explanation:
      "One host systematically probing administrative ports (SSH, SMB, RDP, RPC) across many internal systems is horizontal scanning — enumeration typical of an attacker mapping the network before lateral movement (or a compromised host doing it for them). Patch management scans come from known, authorized scanner IPs on predictable schedules. ARP storms are layer-2 broadcast anomalies, and DNS tunneling would appear as unusually high volumes of long/odd DNS queries, not port sweeps.",
  },
  {
    id: "d1-10",
    domain: 1,
    objective: "1.2",
    topic: "Data exfiltration",
    question:
      "An endpoint sends a steady stream of small HTTPS POST requests every 10 minutes to an IP with no domain, totaling 2 GB overnight. The user reports nothing unusual. What should the analyst suspect FIRST?",
    options: [
      "Software update traffic",
      "Data exfiltration over an encrypted channel",
      "A misconfigured proxy",
      "Cloud backup synchronization",
    ],
    answer: 1,
    explanation:
      "Regularly timed (beaconing), steady outbound transfers to a bare IP with no associated domain are classic C2/exfiltration behavior — attackers commonly exfiltrate over HTTPS to blend with normal traffic. Updates and backups go to known vendor/cloud domains with verifiable destinations, and a misconfigured proxy would break connectivity rather than create periodic uploads. Next steps: check destination reputation, inspect process telemetry on the host, and contain if confirmed.",
  },
  {
    id: "d1-11",
    domain: 1,
    objective: "1.2",
    topic: "Social engineering",
    question:
      "A phishing link reads 'https://paypa1.com/login' instead of 'paypal.com', distributed through SMS messages. Which TWO techniques are being used? (Pick the BEST single answer.)",
    options: [
      "Typosquatting and smishing",
      "URL shorteners and vishing",
      "BEC and pharming",
      "Watering hole and quid pro quo",
    ],
    answer: 0,
    explanation:
      "'paypa1' (digit 1 replacing letter l) is typosquatting — a look-alike domain exploiting visual similarity. Delivery via SMS is smishing. Vishing is voice-call phishing, pharming redirects traffic via DNS manipulation without a look-alike link, a watering hole compromises a legitimate site the target already visits, and quid pro quo offers something in exchange for information.",
  },
  {
    id: "d1-12",
    domain: 1,
    objective: "1.3",
    topic: "Packet analysis",
    question:
      "An analyst wants a full-packet, protocol-decoding capture of suspicious traffic on a SPAN port with a GUI to follow TCP streams. Which tool fits BEST?",
    options: ["Nmap", "Wireshark", "YARA", "tcpdump"],
    answer: 1,
    explanation:
      "Wireshark is the GUI-based packet analyzer with deep protocol dissectors and 'Follow TCP Stream' — exactly what's described. tcpdump is its command-line counterpart (great for quick captures, but no GUI). Nmap is a port/vulnerability scanner, not a passive analyzer. YARA matches patterns/rules against files and memory, not live network streams.",
  },
  {
    id: "d1-13",
    domain: 1,
    objective: "1.3",
    topic: "Network detection",
    question:
      "Which tool is a NETWORK-BASED IDS/IPS that inspects traffic against signature rules and can output alerts in formats consumed by SIEMs, and is also capable of full packet logging and protocol analysis as a 'network security monitor'?",
    options: [
      "Zeek (formerly Bro)",
      "VirusTotal",
      "CyberChef",
      "MXToolbox",
    ],
    answer: 0,
    explanation:
      "Zeek is a network security monitor that passively analyzes traffic and generates rich, structured logs (conn, dns, http, ssl...) ideal for SIEM ingestion and hunting. Snort/Suricata are the signature-based IDS/IPS counterparts; Zeek's strength is behavioral/protocol analysis and metadata logging. VirusTotal is multi-engine file/URL reputation, CyberChef is data decoding/transformation, and MXToolbox checks email/DNS configuration (SPF, DKIM, MX, blacklists).",
  },
  {
    id: "d1-14",
    domain: 1,
    objective: "1.3",
    topic: "File analysis",
    question:
      "An analyst wants to detect a malware family across the environment using a rule that matches on characteristic strings and byte patterns in files. Which approach is BEST?",
    options: [
      "Write a YARA rule and scan endpoints",
      "Run WHOIS on the malware's IP",
      "Decode the file with CyberChef",
      "Query the file hash on AbuseIPDB",
    ],
    answer: 0,
    explanation:
      "YARA rules describe malware families by textual/binary patterns and can be run against files, memory, and mail stores at scale — perfect for sweeping an environment. WHOIS and AbuseIPDB concern IP/domain reputation, not file content. CyberChef transforms/decodes data (useful for de-obfuscation) but doesn't pattern-match across hosts. VirusTotal (not listed as an option here) could check a hash, but that only matches identical samples, not a family.",
  },
  {
    id: "d1-15",
    domain: 1,
    objective: "1.3",
    topic: "Scripting",
    question:
      "A Windows analyst must quickly pull all failed logon events (Event ID 4625) from the Security log on 50 servers and export them to CSV. Which is the BEST fit?",
    options: [
      "A Bash loop with grep",
      "PowerShell with Get-WinEvent remoting",
      "Python with the requests library",
      "Manual review in Event Viewer on each server",
    ],
    answer: 1,
    explanation:
      "PowerShell is native to Windows, has first-class event-log cmdlets (Get-WinEvent with -FilterHashtable for EventId 4625), supports remoting to many hosts, and exports CSV natively — the fastest, most reliable path. Bash/grep doesn't parse Windows EVTX logs. Python requests is for HTTP APIs, not local event logs. Manual review across 50 servers is slow and error-prone.",
  },
  {
    id: "d1-16",
    domain: 1,
    objective: "1.3",
    topic: "Email analysis",
    question:
      "Which tool would an analyst use to verify a suspicious sender domain's SPF, DKIM, DMARC, and MX records and check blacklist status?",
    options: ["MXToolbox", "Zeek", "Prowler", "Strings"],
    answer: 0,
    explanation:
      "MXToolbox is the go-to for email infrastructure analysis: MX/SPF/DKIM/DMARC lookups, header analysis, and blacklist checks — all key when assessing phishing legitimacy. Zeek is network monitoring, Prowler is cloud security assessment (AWS/Azure/GCP), and Strings extracts printable text from binaries for file analysis.",
  },
  {
    id: "d1-17",
    domain: 1,
    objective: "1.3",
    topic: "Data formats",
    question:
      "A Windows investigation requires parsing the native binary event log format for evidence of service creation (Event ID 7045). Which format is being handled?",
    options: ["JSON", "YAML", "EVTX", "XML"],
    answer: 2,
    explanation:
      "EVTX is the native binary format of Windows Event Logs (Security, System, Application). Event 7045 ('A service was installed in the system') is a key persistence indicator — attackers frequently install malicious services. Tools like Event Viewer, wevtutil, PowerShell, or log parsers (e.g., Chainsaw, hayabusa) read EVTX. JSON/YAML/XML are structured text formats common in logs and configs, but they are not the native Windows event log format.",
  },
  {
    id: "d1-18",
    domain: 1,
    objective: "1.3",
    topic: "Threat intel platforms",
    question:
      "The SOC wants a platform to aggregate threat feeds, store indicators with relationships, correlate them internally, and share structured intel with partners. Which tool type is this?",
    options: [
      "TIP (Threat Intelligence Platform) such as MISP or OpenCTI",
      "EDR agent",
      "Vulnerability scanner",
      "SOAR engine",
    ],
    answer: 0,
    explanation:
      "TIPs (MISP, OpenCTI, OTX) centralize indicator collection, enrichment, relationship mapping, and sharing (STIX/TAXII support is common). An EDR monitors endpoints for malicious activity, a vulnerability scanner finds weaknesses, and SOAR orchestrates response actions — SOAR may consume TIP data but doesn't manage the intelligence lifecycle itself.",
  },
  {
    id: "d1-19",
    domain: 1,
    objective: "1.3",
    topic: "Pattern recognition",
    question:
      "An analyst needs to extract every IPv4 address from a large text log using a script. Which technique is MOST appropriate?",
    options: [
      "Regular expressions with a pattern like \\b\\d{1,3}(\\.\\d{1,3}){3}\\b",
      "Base64 decoding the log first",
      "Hashing each line with SHA-256",
      "Running the log through a sandbox",
    ],
    answer: 0,
    explanation:
      "Regex is the standard pattern-matching technique for extracting structured strings (IPs, emails, URLs, hashes) from unstructured text — a core CySA+ skill. Base64 decoding applies to encoded blobs, hashing provides integrity fingerprints, and sandboxes execute suspicious files to observe behavior; none extract patterns from text.",
  },
  {
    id: "d1-20",
    domain: 1,
    objective: "1.4",
    topic: "Pyramid of Pain",
    question:
      "In the Pyramid of Pain, which indicator type is MOST painful for an adversary to change when defenders detect and block it?",
    options: ["IP addresses", "Domain names", "File hashes", "TTPs (tactics, techniques, and procedures)"],
    answer: 3,
    explanation:
      "The Pyramid of Pain ranks indicator types by how costly they are for attackers to change: hash values (trivial), IPs (easy), domains (simple), artifacts/tools (challenging), and TTPs at the apex (tough). Detecting TTPs — how the adversary operates, per MITRE ATT&CK — forces them to retrain, retool, and redesign their playbook, giving defenders the most durable advantage.",
  },
  {
    id: "d1-21",
    domain: 1,
    objective: "1.4",
    topic: "IoCs",
    question:
      "Which of the following is a BEHAVIORAL indicator of compromise rather than an atomic one?",
    options: [
      "A specific malicious file hash",
      "A command-and-control domain name",
      "A pattern of Office applications spawning scripting interpreters followed by registry run-key modification",
      "A known attacker IP address",
    ],
    answer: 2,
    explanation:
      "Atomic indicators are discrete, context-free artifacts: hashes, IPs, domains, URLs. Behavioral indicators combine multiple elements into a meaningful pattern — process chains, sequences of actions, timing relationships. Behavioral detections (e.g., Sigma rules for process lineage) survive recompilation and infrastructure rotation, making them far more resilient than atomic IoCs.",
  },
  {
    id: "d1-22",
    domain: 1,
    objective: "1.4",
    topic: "Threat modeling",
    question:
      "A team models threats to a new web app using six categories: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege. Which methodology are they using?",
    options: ["MITRE ATT&CK", "STRIDE", "Diamond Model", "Cyber Kill Chain"],
    answer: 1,
    explanation:
      "STRIDE is Microsoft's threat-modeling mnemonic for identifying threat categories during design. MITRE ATT&CK is a knowledge base of observed adversary TTPs, the Diamond Model relates adversary/capability/infrastructure/victim for intrusion analysis, and the Cyber Kill Chain describes the stages of an intrusion from reconnaissance to actions on objectives.",
  },
  {
    id: "d1-23",
    domain: 1,
    objective: "1.4",
    topic: "Confidence levels",
    question:
      "A feed reports a malicious domain, but the intel is 14 months old, from an unknown source, and never corroborated. Which confidence factors are WEAKEST here?",
    options: [
      "Timeliness and accuracy",
      "Volume and velocity",
      "Encryption and integrity",
      "Automation and orchestration",
    ],
    answer: 0,
    explanation:
      "Threat-intel confidence rests on timeliness (14 months old — infrastructure churns fast), relevance, and accuracy (unknown, uncorroborated source). Stale, unverified indicators risk false positives and wasted effort; aging out IoCs is a standard TIP practice. Volume/velocity describe data rates, and encryption/integrity and automation are unrelated to source-confidence assessment.",
  },
  {
    id: "d1-24",
    domain: 1,
    objective: "1.4",
    topic: "Threat hunting",
    question:
      "An analyst forms the hypothesis: 'An attacker may be using scheduled tasks for persistence,' then queries endpoint telemetry for Task Scheduler events with unusual authors and paths. What does this describe?",
    options: [
      "Signature-based detection",
      "Hypothesis-driven threat hunting",
      "Vulnerability scanning",
      "A tabletop exercise",
    ],
    answer: 1,
    explanation:
      "Hypothesis-driven hunting starts with a testable theory derived from TTP knowledge (e.g., ATT&CK T1053 Scheduled Task) and then searches telemetry proactively — it doesn't wait for alerts. Signature detection is reactive rule-matching, vulnerability scanning finds weaknesses rather than active compromise, and a tabletop is a discussion-based preparedness exercise.",
  },
  {
    id: "d1-25",
    domain: 1,
    objective: "1.5",
    topic: "SOAR",
    question:
      "A SOC is drowning in phishing alerts. Analysts manually extract URLs, check reputation, quarantine messages, and reset credentials — 45 minutes each. What is the BEST process improvement?",
    options: [
      "Hire more Tier-1 analysts",
      "Build a SOAR playbook that automates enrichment, quarantine, and credential reset on alert trigger",
      "Increase the SIEM license size",
      "Write longer runbooks documenting the manual steps",
    ],
    answer: 1,
    explanation:
      "SOAR (Security Orchestration, Automation, and Response) exists precisely for high-volume, repetitive, well-defined workflows: it integrates tools via APIs, enriches indicators automatically, and executes containment actions in seconds — cutting MTTR and analyst burnout. More headcount doesn't scale linearly, a bigger SIEM license just ingests more data, and documenting manual steps doesn't reduce toil. Playbooks standardize the response; automation executes it.",
  },
  {
    id: "d1-26",
    domain: 1,
    objective: "1.5",
    topic: "Process improvement",
    question:
      "What is the PRIMARY difference between a playbook and a runbook in security operations?",
    options: [
      "Playbooks are automated; runbooks are manual",
      "A playbook is the strategic workflow for an incident type; a runbook is the step-by-step tactical procedure executing part of it",
      "Runbooks are for executives; playbooks are for analysts",
      "They are synonyms used interchangeably by CompTIA",
    ],
    answer: 1,
    explanation:
      "A playbook defines the overall strategy and phases for handling a scenario (e.g., the ransomware playbook: detect → isolate → eradicate → recover), while a runbook contains the specific, repeatable technical steps (e.g., 'how to isolate a host in the EDR console'). Either can be manual or automated — automation is not the distinguishing factor. Together they standardize processes, reduce errors, and speed onboarding.",
  },
  {
    id: "d1-27",
    domain: 1,
    objective: "1.5",
    topic: "Alert tuning",
    question:
      "A correlation rule generates 300 alerts/day with a 92% false-positive rate, and analysts have started ignoring it. What is the BEST action?",
    options: [
      "Disable the rule entirely",
      "Tune the rule — refine thresholds, add contextual filters and suppressions for known-good patterns — and re-measure",
      "Route all alerts directly to a mailbox no one monitors",
      "Lower the severity of every alert to informational",
    ],
    answer: 1,
    explanation:
      "Alert fatigue is a real security risk; the fix is tuning, not silence. Refine logic, add allowlists for verified benign activity, adjust thresholds, and enrich context so analysts see fewer, higher-fidelity alerts — then measure the false-positive rate again. Disabling the rule creates a detection gap, ignoring alerts defeats the purpose, and blanket severity reduction just hides the noise rather than removing it.",
  },
  {
    id: "d1-28",
    domain: 1,
    objective: "1.5",
    topic: "Integration",
    question:
      "The SOC wants its SIEM to automatically create a ticket and page the on-call responder whenever a critical alert fires. Which integration approach enables this?",
    options: [
      "APIs and webhooks between the SIEM and ITSM/paging tools",
      "Email distribution lists reviewed hourly",
      "Daily CSV exports",
      "A shared spreadsheet",
    ],
    answer: 0,
    explanation:
      "APIs (for programmatic actions like ticket creation) and webhooks (pushing event notifications in real time) are the standard mechanism for tool integration in modern SOCs — they enable immediate, automated, auditable workflows. Email, CSV exports, and spreadsheets introduce latency and manual handling, undermining response times for critical events.",
  },
  {
    id: "d1-29",
    domain: 1,
    objective: "1.6",
    topic: "AI risks",
    question:
      "An analyst pastes raw logs containing employee PII and internal hostnames into a public generative AI chatbot for summarization. Which AI risk has been realized?",
    options: [
      "Model poisoning",
      "Data exposure/leakage",
      "Hallucination",
      "Prompt injection",
    ],
    answer: 1,
    explanation:
      "Submitting sensitive data to an external AI service risks data exposure — the data may be logged, used for training, or breached. Model poisoning is corrupting training data so the model behaves maliciously; hallucination is the AI confidently generating false information (dangerous if used uncritically in reports); prompt injection embeds malicious instructions in input the model processes. Governance controls (AI usage policies, approved internal tools, redaction) mitigate this.",
  },
  {
    id: "d1-30",
    domain: 1,
    objective: "1.6",
    topic: "AI risks",
    question:
      "An AI-assisted analysis tool summarizes an incident and confidently cites a 'CVE-2024-99999 exploited in the attack' — but that CVE does not exist. This is an example of:",
    options: [
      "Model inversion",
      "Hallucination",
      "Data poisoning",
      "Adversarial evasion",
    ],
    answer: 1,
    explanation:
      "Hallucination is when generative AI produces plausible-sounding but fabricated content — a serious risk when AI output lands in incident reports or executive briefings. Mitigation: human verification of all AI-generated findings, cross-checking against authoritative sources, and clear AI usage policies. Data poisoning corrupts the model during training; model inversion extracts training data; adversarial evasion crafts inputs that fool classifiers.",
  },
  {
    id: "d1-31",
    domain: 1,
    objective: "1.6",
    topic: "AI use cases",
    question:
      "Which of the following is the MOST appropriate, risk-aware use of AI in security operations?",
    options: [
      "Letting AI autonomously disable user accounts it deems suspicious, without review",
      "Using AI to draft a first-pass summary of large log sets and correlate related events, with an analyst verifying conclusions",
      "Uploading the entire incident evidence package to a public AI service for faster processing",
      "Replacing all signature-based detections with AI-generated rules deployed directly to production",
    ],
    answer: 1,
    explanation:
      "Approved AI use cases include log analysis, event correlation, artifact comparison, document creation, and investigation support — always with human verification because hallucination risk is real. Autonomous irreversible actions (account disabling) without review violate governance; uploading evidence to public services causes data exposure; unreviewed AI-generated detections deployed to production invite false positives and outages.",
  },
  {
    id: "d1-32",
    domain: 1,
    objective: "1.1",
    topic: "Infrastructure",
    question:
      "A company runs microservices in ephemeral containers orchestrated by Kubernetes, with security policy enforced via API gateways. Which architectural concept MOST affects how the SOC collects telemetry?",
    options: [
      "Containers are short-lived, so host-based agents and log shipping must capture data before teardown; centralized collection from the orchestrator and APIs is essential",
      "Containers cannot be monitored, so only perimeter IDS works",
      "Kubernetes encrypts all logs by default, so only network taps work",
      "Containers use no network stack, so only file integrity monitoring applies",
    ],
    answer: 0,
    explanation:
      "Ephemeral, cloud-native infrastructure breaks traditional host-centric logging: a container may live for minutes, so logs must stream to centralized collectors (node agents, daemonsets, sidecars, orchestrator/API audit logs) before teardown. The other options are simply false — containers are monitorable, Kubernetes does not encrypt logs by default, and containers absolutely have network stacks.",
  },
  {
    id: "d1-33",
    domain: 1,
    objective: "1.2",
    topic: "Cloud indicators",
    question:
      "CloudTrail shows an IAM user creating a new access key, disabling CloudTrail logging, and attaching an AdministratorAccess policy — all from an unfamiliar ASN within minutes. What is the BEST interpretation?",
    options: [
      "Routine cloud administration",
      "Compromised cloud credentials being used for privilege escalation and defense evasion",
      "An expired certificate renewal",
      "Normal auto-scaling behavior",
    ],
    answer: 1,
    explanation:
      "The sequence — new access key creation, disabling logging, escalating privileges, unfamiliar source — is a textbook cloud account compromise pattern: persistence (new key), defense evasion (killing CloudTrail), and privilege escalation (admin policy). Cloud-specific indicators like these are core to CS0-004 objective 1.2. Immediate actions: revoke the keys, re-enable logging, scope the blast radius via CloudTrail history, and rotate exposed credentials.",
  },
  {
    id: "d1-34",
    domain: 1,
    objective: "1.3",
    topic: "Sandboxing",
    question:
      "An analyst detonates a suspicious executable in an isolated instrumented VM that records file drops, registry changes, network callbacks, and screenshots. Which technique is this?",
    options: [
      "Static analysis with Strings",
      "Dynamic analysis in a sandbox (e.g., Cuckoo, Joe Sandbox)",
      "Passive DNS replication",
      "Regex extraction",
    ],
    answer: 1,
    explanation:
      "Sandboxing = dynamic analysis: executing the sample in an isolated, instrumented environment to observe runtime behavior (file system, registry, network beacons) without risking production. Strings is static analysis of binary content without execution; passive DNS tracks historical domain resolutions; regex extracts patterns from text. Sandbox reports feed IoCs (callbacks, mutexes, dropped hashes) back into detections.",
  },
];
