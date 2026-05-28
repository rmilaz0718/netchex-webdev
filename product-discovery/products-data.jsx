// products-data.jsx, All 16 Netchex Product Discovery screens
// Source: in-app-product-discovery-screens.docx

const TINT_NAMES = ['primary', 'warning', 'success', 'teal', 'indigo', 'orange'];

// Cycle through tints so feature cards stay colorful without micromanaging each one
const tinted = (features) => features.map((f, i) => ({ ...f, tint: f.tint || TINT_NAMES[i % TINT_NAMES.length] }));

const PRODUCTS = [
  // ─── 01 · 401(k) ─────────────────────────────────────────────
  {
    id: '401k',
    tabLabel: '401(k)',
    title: '401(k) Solutions',
    eyebrow: 'Retirement',
    badges: [
      { kind: 'available' },
      { kind: 'included' },
    ],
    tagline: "Two ways in, zero manual reconciliation. Netchex has an in-house 401(k) solution and integrates with Empower, Fidelity, John Hancock, and others, so every contribution election syncs automatically to payroll deductions and employer match calculates itself every pay period.",
    features: tinted([
      { icon: 'fa-solid fa-money-bill-transfer', title: 'Auto-Synced Contributions', blurb: 'Employee elections sync directly from your 401(k) provider to payroll deductions, automatically, every pay period.' },
      { icon: 'fa-solid fa-handshake',           title: 'Employer Match Automation', blurb: 'Set your match formula once. Netchex calculates and applies the correct employer contribution every cycle without manual review.' },
      { icon: 'fa-solid fa-link',                title: 'Major Provider Integrations', blurb: 'Pre-built connections with Empower, Fidelity, John Hancock, and others. Keep your provider, just the manual work disappears.' },
      { icon: 'fa-solid fa-mobile-screen',       title: 'Employee Self-Service Enrollment', blurb: 'Employees manage elections inside the same Netchex portal they already use. No separate login, no new system to learn.' },
      { icon: 'fa-solid fa-clipboard-check',     title: 'Compliance-Ready Reporting', blurb: 'Year-end reporting, contribution history, and audit-ready records in one place, no manual data pulls from two separate systems.' },
      { icon: 'fa-solid fa-rocket',              title: 'Turnkey Option Available', blurb: "Don't have a provider yet? Through our partnership with Vestwell, Netchex can set you up with a fully managed 401(k) plan, from setup to administration, integrated from day one." },
    ]),
    featuresTitle: "Built for set-it-and-forget-it retirement benefits",
    stats: [
      { v: 'Zero', label: 'manual entries required per pay period once integrated', color: '#2563eb', icon: 'fa-regular fa-hand' },
      { v: '78%',  label: 'of employees say retirement benefits influence their decision to stay (SHRM)', color: '#0d9488', icon: 'fa-regular fa-user-check' },
      { v: '100%', label: 'auto-reconciled, every contribution syncs to payroll automatically', color: '#f59e0b', icon: 'fa-regular fa-check-double' },
    ],
    statsTitle: 'Teams using Netchex 401(k)',
    ctaText: 'Talk to your account manager, activation typically takes one conversation.',
  },

  // ─── 02 · Benefits Administration ────────────────────────────
  {
    id: 'benefits',
    tabLabel: 'Benefits Admin',
    title: 'Benefits Administration',
    eyebrow: 'Benefits',
    badges: [
      { kind: 'available' },
      { kind: 'included' },
    ],
    tagline: "Three paths. One payroll. Netchex integrates with Employee Navigator, offers its own native benefits platform, or connects with any third-party your broker prefers, everything flowing directly into payroll automatically, every enrollment cycle.",
    features: tinted([
      { icon: 'fa-solid fa-mobile-screen',  title: 'Mobile-First Enrollment',     blurb: 'Employees enroll from their phone with a simple interface that shows current plan costs and the exact paycheck impact before they confirm.' },
      { icon: 'fa-solid fa-chart-column',    title: 'ACA Compliance: Automated', blurb: 'Netchex tracks hours, monitors coverage obligations, and files your 1094-C and 1095-C forms automatically. Your biggest penalty exposure, handled.' },
      { icon: 'fa-solid fa-link',            title: 'Carrier Integrations',       blurb: 'Enrollment changes sync to carriers automatically, no manual updates, no duplicate data entry, no reconciliation between systems.' },
      { icon: 'fa-solid fa-bell',            title: 'Life Events Management',     blurb: 'Employees submit life events, HR approves, and benefits update automatically. Every change is documented and audit-ready.' },
      { icon: 'fa-solid fa-file-invoice',    title: 'COBRA Administration',       blurb: 'Automated notices and a self-service payment portal for employees, with full tracking and reporting for your HR team.' },
      { icon: 'fa-solid fa-briefcase',       title: 'Total Compensation Statements', blurb: 'Show every employee the full value of what you invest in them, salary, benefits, and more. A powerful retention and engagement tool.' },
    ]),
    featuresTitle: "Three paths to benefits, one payroll",
    stats: [
      { v: '50%', label: 'faster open enrollment completion with guided mobile enrollment',      color: '#2563eb', icon: 'fa-regular fa-bolt' },
      { v: '65%', label: 'of compliance risk eliminated with automated ACA tracking and filing', color: '#0d9488', icon: 'fa-regular fa-shield-halved' },
      { v: '89%', label: 'of employees report less financial stress with benefits like EWA and pay cards', color: '#f59e0b', icon: 'fa-regular fa-face-smile' },
    ],
    statsTitle: 'Teams using Benefits Administration',
    ctaText: "We'll walk you through how it works with your current benefits setup and broker relationships.",
  },

  // ─── 03 · Recruit ────────────────────────────────────────────
  {
    id: 'recruit',
    tabLabel: 'Recruit',
    title: 'Recruit',
    eyebrow: 'Hiring',
    badges: [
      { kind: 'pill', text: 'NetRecruiter → Recruit', star: true },
      { kind: 'available' },
      { kind: 'included' },
    ],
    tagline: "Hire faster. Retain more. Recruit goes beyond NetRecruiter with AI that scores candidates, conducts first interviews, and surfaces your best fits, so your team spends time on people worth meeting, not on managing the process.",
    features: tinted([
      { icon: 'fa-solid fa-robot',          title: 'NextMatch AI Interviews', blurb: 'AI conducts structured voice interviews with every candidate so you only review people worth hiring. Transcripts, audio, and summaries in one place.' },
      { icon: 'fa-solid fa-calendar-check', title: 'Automated Scheduling',    blurb: 'Set your availability once. Netchex invites top candidates to self-book. Automated reminders reduce no-shows by 67%.' },
      { icon: 'fa-solid fa-message',        title: 'Text-to-Apply',           blurb: 'Candidates apply in under 4 minutes via QR code or text keyword, 88% application completion rate and 8x the hire rate of other channels.' },
      { icon: 'fa-solid fa-star',           title: 'Candidate Scoring',       blurb: 'Every applicant is ranked automatically based on pre-screening answers, availability match, and proximity to the job. Best fits rise first.' },
      { icon: 'fa-solid fa-trophy',         title: 'Indeed Platinum Partner', blurb: 'One of just 10 Platinum ATS Partners globally. Your jobs get priority placement, exclusive metrics, and the latest Indeed features first.' },
      { icon: 'fa-solid fa-chart-line',     title: 'Hiring Analytics',        blurb: 'Real-time dashboards show source effectiveness, candidate drop-off, and hiring velocity across every role and location.' },
    ]),
    featuresTitle: "Six tools to hire faster and retain more",
    stats: [
      { v: '1 day',   label: 'average time from job post to hired with Netchex Recruit',    color: '#2563eb', icon: 'fa-regular fa-bolt' },
      { v: '67%',     label: 'reduction in interview no-shows with automated reminders and self-scheduling', color: '#0d9488', icon: 'fa-regular fa-calendar-check' },
      { v: '$3,600',  label: 'saved per location annually with more efficient hiring',      color: '#f59e0b', icon: 'fa-regular fa-piggy-bank' },
    ],
    statsTitle: 'Teams using Netchex Recruit',
    ctaText: "We'll show you exactly how Recruit compares to what you're doing in NetRecruiter today.",
  },

  // ─── 04 · Onboarding ─────────────────────────────────────────
  {
    id: 'onboarding',
    tabLabel: 'Onboarding',
    title: 'Onboarding',
    eyebrow: 'Hire to Day One',
    badges: [
      { kind: 'pill', text: 'Rebuilt from NetGuide', star: true },
      { kind: 'pill', text: 'Early Access Open', tone: 'amber' },
      { kind: 'included' },
    ],
    tagline: "You asked. We rebuilt it. The new Onboarding module is the evolution of NetGuide, rebuilt on the modern Workflows platform, shaped by client feedback. New hires go from offer to on-the-clock in one day.",
    features: tinted([
      { icon: 'fa-solid fa-file-lines',      title: 'Digital Paperwork',           blurb: 'New hires complete all required forms digitally before their first day. Nothing waiting at a desk on day one.' },
      { icon: 'fa-solid fa-file-signature',  title: 'E-Signatures and I-9',        blurb: 'Offer letters, agreements, and I-9 verification handled electronically, including remote options. Fully compliant and audit-ready.' },
      { icon: 'fa-solid fa-list-check',      title: 'Automated Task Workflows',    blurb: 'Assign checklists to new hires, managers, and HR with automated reminders and real-time status tracking for every step.' },
      { icon: 'fa-solid fa-user-clock',      title: 'Pending Employee Portal',     blurb: "New hires access onboarding tasks from a mobile-friendly portal before they're even in the payroll system, starting before day one." },
      { icon: 'fa-solid fa-user-tie',        title: 'Manager Checklists',          blurb: "Managers see what's done and what's pending for every new hire without calling HR. Accountability built into the workflow." },
      { icon: 'fa-solid fa-link',            title: 'Connected to Payroll',        blurb: 'New hire data, tax forms, direct deposit, benefits elections, flows directly into Netchex payroll. No re-entry, no delay, no mismatch.' },
    ]),
    featuresTitle: "Everything to get new hires productive on day one",
    stats: [
      { v: '80%',   label: 'reduction in onboarding time, from a full week of paperwork down to one day', color: '#2563eb', icon: 'fa-regular fa-bolt' },
      { v: '55%',   label: 'of managers reclaim a full day per week by eliminating manual onboarding tasks', color: '#0d9488', icon: 'fa-regular fa-clock' },
      { v: '1 day', label: "from offer to on-the-clock, your next hire doesn't need to start with a stack of paperwork", color: '#f59e0b', icon: 'fa-regular fa-rocket' },
    ],
    statsTitle: 'Teams using Netchex Onboarding',
    ctaText: "We'll migrate your existing NetGuide tasks and partner with you through every step of the transition.",
  },

  // ─── 05 · Flex Pay (EWA) ─────────────────────────────────────
  {
    id: 'flexpay',
    tabLabel: 'Flex Pay',
    title: 'Flex Pay: Earned Wage Access',
    eyebrow: 'Financial Wellness',
    badges: [
      { kind: 'pill', text: 'Now Available', star: true },
      { kind: 'pill', text: 'Free to Offer', tone: 'green' },
      { kind: 'pill', text: 'Zero employer cost', tone: 'amber' },
    ],
    tagline: "A financial wellness benefit available within Netchex — no extra tools, no workflow changes, no cost to you. Powered by PayAccess Services LLC, it gives your employees on-demand access to a portion of their earned wages before payday. You pay nothing. Payroll runs exactly the same way it always has. The only difference? Your team has the financial flexibility they need, right when they need it.",
    features: tinted([
      { icon: 'fa-solid fa-circle-dollar-to-slot', title: 'Zero Cost to You',           blurb: 'No employer fees.' },
      { icon: 'fa-solid fa-shield-halved',         title: 'Your Company is Never on the Hook',             blurb: "Employees are responsible for repaying all advances taken through Flex Pay. But if a repayment can't be collected due to termination, a schedule change, or any other circumstance, PayAccess Services LLC absorbs the loss — not you." },
      { icon: 'fa-solid fa-bolt',                  title: 'Instant or ACH Transfers',   blurb: 'Employees choose free standard ACH (1-2 business days) or instant transfer for $4.99. Their money, their timing, their choice.' },
      { icon: 'fa-solid fa-link',                  title: 'Built Within Netchex',         blurb: 'No new app, no new vendor, no new login. Flex Pay appears in the same employee portal they already use every day.' },
      { icon: 'fa-solid fa-arrows-rotate',         title: 'Automatic Payroll Deduction',blurb: 'Advances deduct from the next paycheck automatically as a clearly labeled post-tax deduction. Your payroll team does nothing extra.' },
      { icon: 'fa-solid fa-moon',                  title: '24/7 Employee Access',       blurb: 'Employees check available balance and request advances any time, day or night, any shift. No HR involvement required.' },
    ]),
    featuresTitle: "The full earned wage access experience, zero employer cost",
    stats: [
      { v: '16%', label: 'average reduction in turnover for employers that offer earned wage access', color: '#2563eb', icon: 'fa-regular fa-arrow-trend-down' },
      { v: '76%', label: 'of employees say access to earned wages matters when choosing where to work', color: '#0d9488', icon: 'fa-regular fa-user-check' },
      { v: '$0',  label: 'cost to employers, no fees, no funding obligation, no liability',          color: '#f59e0b', icon: 'fa-regular fa-piggy-bank' },
    ],
    statsTitle: 'Teams offering Flex Pay',
    ctaText: 'Talk to your account manager, it takes one conversation and your employees see it immediately.',
  },

  // ─── 06 · Hardware Clocks ────────────────────────────────────
  {
    id: 'clocks',
    tabLabel: 'Hardware Clocks',
    title: 'Hardware Clocks',
    eyebrow: 'Time & Attendance',
    badges: [
      { kind: 'available' },
      { kind: 'pill', text: 'Add to your plan' },
    ],
    tagline: "The moment you add a new employee in Netchex, they're ready to clock in, at every device, in every location. No IT setup, no manual enrollment, no delay. Biometric authentication prevents buddy punching and works without internet, 24/7.",
    features: tinted([
      { icon: 'fa-solid fa-bolt',         title: 'Instant Employee Activation', blurb: "Add a new hire in Netchex and they're enrolled on every clock in your network immediately. Zero IT steps, zero per-device configuration." },
      { icon: 'fa-solid fa-fingerprint',  title: 'Biometric Authentication',    blurb: 'Fingerprint, facial recognition, or badge tap. One enrollment works on all clocks. No shared PINs, no loaned badges, no buddy punching.' },
      { icon: 'fa-solid fa-wifi',         title: 'Works Without Internet',      blurb: 'Clocks function offline and sync automatically when connectivity returns. Worksites stay covered, no missed punches due to network outages.' },
      { icon: 'fa-solid fa-arrows-rotate',title: 'Department Transfers',        blurb: 'Employees switch departments at the clock. Labor cost allocations and punch rules apply automatically, no admin step required.' },
      { icon: 'fa-solid fa-coins',        title: 'Tip Entry at Punch-Out',      blurb: 'Tip-eligible employees enter amounts at the clock when they punch out. The data flows into payroll calculations automatically.' },
      { icon: 'fa-solid fa-globe',        title: 'Enroll Once, Use Everywhere', blurb: 'Register a biometric or badge at any one clock. That credential is immediately active on every other clock in your network.' },
    ]),
    featuresTitle: "Built for every worksite, every shift, every connection",
    stats: [
      { v: '75%',  label: 'of companies are affected by buddy punching, biometric clocks eliminate it at the device', color: '#2563eb', icon: 'fa-regular fa-shield-halved' },
      { v: '0s',   label: "setup time for new employees, clock-ready the moment they're added in Netchex",            color: '#0d9488', icon: 'fa-regular fa-bolt' },
      { v: '24/7', label: 'offline operation, no internet dependency, no missed punches, no coverage gaps',            color: '#f59e0b', icon: 'fa-regular fa-clock' },
    ],
    statsTitle: 'Teams using Hardware Clocks',
    ctaText: 'Devices ship pre-configured. Setup takes about 15 minutes per location, no IT required.',
  },

  // ─── 07 · AskHR ──────────────────────────────────────────────
  {
    id: 'askhr',
    tabLabel: 'AskHR',
    title: 'AskHR',
    eyebrow: 'AI Assistant',
    badges: [
      { kind: 'pill', text: 'AI-Powered', star: true },
      { kind: 'available' },
      { kind: 'pill', text: 'Add to your plan' },
    ],
    tagline: "Answers for every question, every shift, every language. AskHR is an AI-powered HR assistant that gives employees instant, accurate answers at any hour, pulled from your actual company policies and their personal data. Fewer interruptions. Faster answers.",
    features: tinted([
      { icon: 'fa-solid fa-comment-dots',  title: 'Instant Policy Answers', blurb: 'Employees ask in plain language and get answers pulled from your actual company documentation, not generic HR content.' },
      { icon: 'fa-solid fa-calendar-days', title: 'PTO and Time Off',       blurb: 'Balance checks, request status, accrual questions, answered automatically without HR involvement. Available at 2 AM or 2 PM.' },
      { icon: 'fa-solid fa-money-bill',    title: 'Paycheck Questions',     blurb: 'Deductions, pay dates, withholdings, and stub explanations, answered on demand. No HR call required.' },
      { icon: 'fa-solid fa-hospital',      title: 'Benefits Support',       blurb: 'Plan comparisons, enrollment deadlines, coverage details, answered in plain language, 24/7, before open enrollment or any time.' },
      { icon: 'fa-solid fa-language',      title: 'Multi-Language Support', blurb: 'Employees ask in their language and receive answers in their language, automatically. No separate translation step required.' },
      { icon: 'fa-solid fa-shuffle',       title: 'Smart Escalation to HR', blurb: "When a question goes beyond what's documented, it routes directly to the right HR person, automatically, nothing falls through." },
    ]),
    featuresTitle: "Trained on your policies, ready for every question",
    stats: [
      { v: '40%',  label: 'fewer repetitive HR inquiries when employees can self-serve accurate answers instantly', color: '#2563eb', icon: 'fa-regular fa-arrow-trend-down' },
      { v: '24/7', label: "availability in any language, questions don't wait for business hours",                  color: '#0d9488', icon: 'fa-regular fa-clock' },
      { v: '100%', label: 'grounded in your actual documentation, your policies, your data, not generic answers', color: '#f59e0b', icon: 'fa-regular fa-shield-halved' },
    ],
    statsTitle: 'Teams using AskHR',
    ctaText: "We'll show you how AskHR works with your actual company documentation in a 30-minute walkthrough.",
  },

  // ─── 08 · Scheduler ──────────────────────────────────────────
  {
    id: 'scheduler',
    tabLabel: 'Scheduler',
    title: 'Scheduler + Violation Points',
    eyebrow: 'Scheduling',
    badges: [
      { kind: 'available' },
      { kind: 'included' },
    ],
    tagline: "Build and publish schedules in minutes, not hours. Violation Points automatically track tardiness, absences, and no-calls based on your policy so managers have documented, consistent accountability records without doing the paperwork themselves.",
    features: tinted([
      { icon: 'fa-solid fa-calendar-days',     title: 'Drag-and-Drop Scheduling',   blurb: 'Build full-week schedules across every location from a single dashboard. Copy previous weeks, apply templates, and publish in one click.' },
      { icon: 'fa-solid fa-triangle-exclamation', title: 'Violation Points Tracking', blurb: 'Tardiness, absences, early departures, and no-calls are logged automatically based on your policy rules. Point totals update in real time.' },
      { icon: 'fa-solid fa-mobile-screen',     title: 'Automated Notifications',    blurb: "Employees receive their schedule the moment it's published, plus shift reminders. Fewer no-shows before they happen." },
      { icon: 'fa-solid fa-sack-dollar',       title: 'Labor Cost Visibility',      blurb: 'Projected labor cost updates as you build the schedule, so overages are caught during planning, not two weeks after the period closes.' },
      { icon: 'fa-solid fa-arrows-rotate',     title: 'Shift Swapping',             blurb: 'Employees request swaps in the app. Managers approve with one tap. The schedule updates automatically, no group texts, no confusion.' },
      { icon: 'fa-solid fa-eye',               title: 'Real-Time Attendance',       blurb: "See who's in, who's late, and who called out, live, across every location, without waiting for a timesheet or a manager report." },
    ]),
    featuresTitle: "Build, publish, and enforce schedules automatically",
    stats: [
      { v: '3-5 hrs', label: 'saved per manager per week, replace manual spreadsheet scheduling with rules-driven automation', color: '#2563eb', icon: 'fa-regular fa-clock' },
      { v: '67%',     label: 'fewer shift no-shows with automated schedule distribution and employee reminders',                color: '#0d9488', icon: 'fa-regular fa-bell' },
      { v: '$3,600',  label: 'lost per hourly worker annually to absenteeism, Violation Points create the accountability to stop it (CDC/SHRM)', color: '#f59e0b', icon: 'fa-regular fa-piggy-bank' },
    ],
    statsTitle: 'Teams using Scheduler',
    ctaText: "We'll walk through how Scheduler and Violation Points work together for your team's specific structure.",
  },

  // ─── 09 · ACA Reporting ──────────────────────────────────────
  {
    id: 'aca',
    tabLabel: 'ACA Reporting',
    title: 'ACA Reporting',
    eyebrow: 'Compliance',
    badges: [
      { kind: 'available' },
      { kind: 'pill', text: 'Add to your plan' },
    ],
    tagline: "Miss one IRS filing deadline and penalties start at $310 per form. Netchex ACA Reporting tracks employee hours in real time, monitors your coverage obligations automatically, and generates every 1094-C and 1095-C, then e-files them for you. Year-end is no longer a scramble.",
    features: tinted([
      { icon: 'fa-solid fa-stopwatch',         title: 'Real-Time Hours Tracking',   blurb: 'Netchex monitors hours for every employee, full-time, part-time, and variable, and flags anyone approaching ALE coverage thresholds before they cross them.' },
      { icon: 'fa-solid fa-bell',              title: 'Coverage Obligation Alerts', blurb: 'Automatic alerts when an employee becomes benefit-eligible based on hours worked. No more manual tracking in spreadsheets.' },
      { icon: 'fa-solid fa-file-invoice',      title: 'Auto-Generated 1094-C & 1095-C', blurb: 'Every required form is generated automatically from your payroll and benefits data. No manual input, no transcription errors, no last-minute panic.' },
      { icon: 'fa-solid fa-paper-plane',       title: 'IRS E-Filing',               blurb: 'Netchex submits your ACA forms directly to the IRS electronically on your behalf, with confirmation receipts and deadline tracking built in.' },
      { icon: 'fa-solid fa-calculator',        title: 'Affordability Calculator',   blurb: 'See exactly what your minimum coverage cost threshold is for each employee under current IRS affordability safe harbor rules. No guesswork.' },
      { icon: 'fa-solid fa-folder-open',       title: 'Audit-Ready Records',        blurb: 'Every form, filing date, and coverage record is stored and searchable. If the IRS ever asks, your documentation is already organized.' },
    ]),
    featuresTitle: "Track, generate, and file, automated end-to-end",
    stats: [
      { v: '$310+', label: 'per form in IRS penalties for late or inaccurate ACA filings (2024 penalty schedule)',  color: '#dc2626', icon: 'fa-regular fa-triangle-exclamation' },
      { v: '~3 hrs',label: 'per employee saved at year-end when 1095-C forms are generated automatically',          color: '#2563eb', icon: 'fa-regular fa-clock' },
      { v: '100%',  label: 'of required forms generated automatically from your existing Netchex payroll and benefits data', color: '#0d9488', icon: 'fa-regular fa-shield-halved' },
    ],
    statsTitle: 'Teams using ACA Reporting',
    ctaText: 'Setup takes one meeting and your first filing runs itself.',
  },

  // ─── 11 · Workplace Communications ───────────────────────────
  {
    id: 'conversations',
    tabLabel: 'Conversations',
    title: 'Workplace Communications',
    eyebrow: 'Engagement · Module 02 Reach + Act',
    badges: [
      { kind: 'pill', text: 'Free Add-On', tone: 'green' },
    ],
    tagline: "Coordinate teams without managing group lists. Conversations is secure, in-app messaging that builds and maintains team channels automatically, based on your HR data. The right people are always in the right channel. No stale text chains, no group chat chaos.",
    features: tinted([
      { icon: 'fa-solid fa-tags',           title: 'Rule-Based Team Channels',  blurb: 'Define a rule (e.g., "Day Shift, Location 3") and Netchex builds the channel automatically, adding new hires and removing terminated employees with no admin step.' },
      { icon: 'fa-solid fa-arrows-rotate',  title: 'Auto-Updating Membership',  blurb: "HR data drives the channel. When someone transfers, gets promoted, or exits, they're in or out of the right channels automatically. No stale lists to manage." },
      { icon: 'fa-solid fa-bullhorn',       title: 'Schedule Announcements',    blurb: 'Push schedule updates, policy changes, and shift alerts directly to the right teams. Targeted messaging, not broadcast-to-everyone blasts.' },
      { icon: 'fa-solid fa-shield-halved',  title: 'Built-In Moderation',       blurb: 'HR admins can view channels, remove messages, and enforce communication standards. All within the Netchex platform, nothing external to manage.' },
      { icon: 'fa-solid fa-eye',            title: 'Read Receipts',             blurb: 'See exactly who read each message. Critical for schedule distribution, policy acknowledgments, and emergency communications where confirmation matters.' },
      { icon: 'fa-solid fa-mobile-screen',  title: 'Replaces Text Chains',      blurb: 'Deskless workers stay connected in the same app they use for schedules, pay stubs, and time off. No more personal cell numbers, no more lost group texts.' },
    ]),
    featuresTitle: "Team messaging that runs itself",
    stats: [
      { v: 'Zero', label: 'group lists to maintain, channels update automatically when HR data changes',         color: '#2563eb', icon: 'fa-regular fa-hand' },
      { v: '100%', label: 'team coverage, every employee is in the right channel from their first day, automatically', color: '#0d9488', icon: 'fa-regular fa-users' },
      { v: '$0',   label: 'cost, Conversations is a free add-on included with your Netchex Engagement module',   color: '#f59e0b', icon: 'fa-regular fa-tag' },
    ],
    statsTitle: 'Teams using Conversations',
    ctaText: 'Conversations activates in minutes, your account manager can turn it on today.',
  },

  // ─── 12 · Engagement Surveys ─────────────────────────────────
  {
    id: 'surveys',
    tabLabel: 'Surveys',
    title: 'Engagement Surveys',
    eyebrow: 'Engagement',
    badges: [
      { kind: 'pill', text: 'Low-Cost Add-On', tone: 'green' },
      { kind: 'pill', text: 'AI Flight Risk Detection', star: true },
    ],
    tagline: "The early-warning signal you're missing today. Surveys delivers pulse checks, onboarding feedback, and exit interviews, with AI that spots flight risks and drafts action plans before your best people walk out the door.",
    features: tinted([
      { icon: 'fa-solid fa-clipboard-list',  title: 'Pulse, Onboarding & Exit Surveys', blurb: 'Run the right survey at the right moment, quick weekly pulses, 30/60/90-day new hire check-ins, and exit interviews that actually get completed.' },
      { icon: 'fa-solid fa-wand-magic-sparkles', title: 'Magic-Link Mobile Delivery',  blurb: 'Surveys reach employees via a single tap on any device, no app download, no login required. Completion rates jump when there\'s no friction.' },
      { icon: 'fa-solid fa-robot',           title: 'AI Flight Risk Detection',         blurb: 'The AI flags employees showing disengagement patterns before they resign, and drafts a concrete action plan for managers to take immediate steps.' },
      { icon: 'fa-solid fa-list-check',      title: 'Action Plan Builder',              blurb: 'Turn survey findings into assigned tasks for managers. Track completion and measure whether actions actually moved the needle on the next pulse.' },
      { icon: 'fa-solid fa-user-secret',     title: 'Anonymous Response Mode',          blurb: 'Employees are 4x more likely to respond honestly in anonymous mode. Real feedback requires safety, Surveys protects individual identity while surfacing team trends.' },
      { icon: 'fa-solid fa-chart-line',      title: 'Real-Time Dashboards',             blurb: 'See response rates, score trends, and driver breakdowns across locations, departments, or tenure cohorts, updated live as surveys are completed.' },
    ]),
    featuresTitle: "Every signal you need, before it's too late",
    stats: [
      { v: '$2T',   label: 'lost annually to disengaged employees in the U.S., the cost of not listening (Gallup)', color: '#dc2626', icon: 'fa-regular fa-arrow-trend-down' },
      { v: '4x',    label: 'more honest feedback when employees respond anonymously vs. identified surveys',         color: '#2563eb', icon: 'fa-regular fa-user-secret' },
      { v: '60%+',  label: 'of HR teams report operating over capacity, surveys give leaders an early signal before problems escalate', color: '#0d9488', icon: 'fa-regular fa-bell' },
    ],
    statsTitle: 'Teams using Engagement Surveys',
    ctaText: 'Setup takes one conversation, your first pulse survey can go live the same week.',
  },

  // ─── 13 · Mineral ────────────────────────────────────────────
  {
    id: 'mineral',
    tabLabel: 'Mineral',
    title: 'Mineral (Virgil HR)',
    eyebrow: 'HR Guidance',
    badges: [
      { kind: 'available' },
      { kind: 'pill', text: 'Add to your plan' },
    ],
    tagline: "Every HR policy question answered. Every compliance deadline tracked. Mineral is a comprehensive HR guidance platform built into Netchex, with 2,000+ employment law resources, an AI HR advisor, and a certified expert hotline. It's like adding an HR attorney and compliance officer to your team without the overhead.",
    features: tinted([
      { icon: 'fa-solid fa-book',           title: '2,000+ HR & Legal Resources',  blurb: 'A searchable library of employment law content, state-by-state compliance guides, wage and hour rules, and HR best practices, always current, always verified.' },
      { icon: 'fa-solid fa-robot',           title: 'AI HR Advisor',                blurb: 'Ask any HR or compliance question in plain language and get an instant, sourced answer, drawn from up-to-date legal guidance, not generic internet content.' },
      { icon: 'fa-solid fa-headset',         title: 'Expert HR Hotline',            blurb: "When AI isn't enough, connect with certified HR professionals for live guidance. Available when you're facing a situation that needs real human judgment." },
      { icon: 'fa-solid fa-book-open',       title: 'Employee Handbook Builder',    blurb: 'Build and maintain a compliant employee handbook with pre-built templates for every required policy. State law updates are flagged automatically.' },
      { icon: 'fa-solid fa-file-lines',      title: 'Policy & Job Description Templates', blurb: 'Hundreds of ready-to-use templates, offer letters, termination checklists, PIPs, job descriptions, built by HR attorneys.' },
      { icon: 'fa-solid fa-bell',            title: 'State Law Update Alerts',      blurb: 'Get notified automatically when employment laws change in your state. Minimum wage updates, leave law expansions, posting requirements, nothing falls through.' },
    ]),
    featuresTitle: "Your in-house HR attorney and compliance officer",
    stats: [
      { v: '1 in 5',  label: 'businesses face an employment lawsuit each year, 67% have no dedicated HR attorney (Hiscox)', color: '#dc2626', icon: 'fa-regular fa-triangle-exclamation' },
      { v: '$160K',   label: 'average cost of defending an employment lawsuit, even when you win (Hiscox)',                  color: '#2563eb', icon: 'fa-regular fa-scale-balanced' },
      { v: '100+ hrs',label: 'saved per year by HR teams with on-demand legal guidance vs. researching compliance independently', color: '#0d9488', icon: 'fa-regular fa-clock' },
    ],
    statsTitle: 'Teams using Mineral',
    ctaText: 'Mineral activates as an add-on, talk to your account manager about getting it added today.',
  },

  // ─── 14 · Rewards & Recognition ──────────────────────────────
  {
    id: 'recognition',
    tabLabel: 'Rewards & Recognition',
    title: 'Rewards & Recognition',
    eyebrow: 'Engagement · Modules 03 + 04',
    badges: [
      { kind: 'pill', text: 'Free Add-On', tone: 'green' },
    ],
    tagline: "Recognition, revamped. You can't give a raise every quarter, but you can give a $25 Starbucks gift card today. Configure signals like attendance streaks and shift pickups, let the platform post kudos automatically, and add a points catalog so employees can redeem real rewards.",
    features: tinted([
      { icon: 'fa-solid fa-sliders',        title: 'Configurable Recognition Signals', blurb: 'Set the triggers that matter to your business, attendance streaks, open shift pickups, performance goals, anniversaries. Netchex fires recognition automatically.' },
      { icon: 'fa-solid fa-bullhorn',       title: 'Auto-Posted Kudos to Conversations', blurb: "When a signal fires, public kudos post automatically to the team's Conversations channel. Recognition becomes visible, not just a manager email nobody sees." },
      { icon: 'fa-solid fa-gift',           title: 'Points-Based Rewards Catalog',     blurb: 'Employees earn points for recognized behaviors and redeem them for Amazon, Starbucks, Target, and other gift cards. You set the value, they feel the difference.' },
      { icon: 'fa-solid fa-sack-dollar',    title: 'Bonus Pool & Caps',                blurb: 'Set a total monthly reward budget and per-recognition cap so spend stays predictable. Managers can give rewards within guardrails, no surprises on your books.' },
      { icon: 'fa-solid fa-trophy',         title: 'Leaderboards',                     blurb: 'Friendly competition across the team. Recognition points and count leaderboards create visibility and motivation that informal praise never does.' },
      { icon: 'fa-solid fa-bell',           title: 'Manager Nudges',                   blurb: 'When an employee hits a milestone, their manager gets a nudge to post personal recognition. Structured culture-building, no extra mental load on managers.' },
    ]),
    featuresTitle: "Recognition that actually moves the needle",
    stats: [
      { v: '2x',  label: 'lower turnover at organizations with strong recognition programs vs. those without (Netchex data)', color: '#2563eb', icon: 'fa-regular fa-arrow-trend-down' },
      { v: '21%', label: 'higher profitability at companies with highly engaged, recognized employees (Gallup)',              color: '#0d9488', icon: 'fa-regular fa-arrow-trend-up' },
      { v: '$0',  label: 'cost to activate Recognition, free add-on; rewards budget is yours to set',                        color: '#f59e0b', icon: 'fa-regular fa-piggy-bank' },
    ],
    statsTitle: 'Teams using Rewards & Recognition',
    ctaText: "Activate Recognition free, add Rewards when you're ready with a budget you control.",
  },

  // ─── 15 · Learning Management ────────────────────────────────
  {
    id: 'learning',
    tabLabel: 'Learning',
    title: 'Learning Management',
    eyebrow: 'Talent Development',
    badges: [
      { kind: 'available' },
      { kind: 'pill', text: 'Add to your plan' },
    ],
    tagline: "2,000+ courses. Mobile-ready. Assigned automatically by role, department, or location. Netchex Learning tracks compliance training completions, closes skills gaps, and lets you build custom courses, all from the same platform your team already uses for HR and payroll.",
    features: tinted([
      { icon: 'fa-solid fa-graduation-cap', title: '2,000+ Course Library',       blurb: 'Pre-built courses covering compliance, safety, HR essentials, DEI, leadership, and skills development, ready to assign without any content creation from your team.' },
      { icon: 'fa-solid fa-mobile-screen',  title: 'Mobile-Friendly Delivery',    blurb: 'Employees complete training on any device, phone, tablet, or desktop. Deskless workers can complete required training on their own schedule.' },
      { icon: 'fa-solid fa-bullseye',       title: 'Role, Dept & Location Assignment', blurb: 'Assign courses automatically based on job role, department, or location. New hires get the right training on day one without HR manually assigning each one.' },
      { icon: 'fa-solid fa-scale-balanced', title: 'Compliance Training Tracking', blurb: "Track required training completions by employee, with automatic deadline reminders and a real-time dashboard showing who's current and who's overdue." },
      { icon: 'fa-solid fa-wrench',         title: 'Custom Course Builder',        blurb: 'Build your own courses using your content, videos, PDFs, quizzes. Upload SOPs, train on your systems, deliver your culture. Fully branded, fully yours.' },
      { icon: 'fa-solid fa-chart-column',   title: 'Real-Time Progress Reports',   blurb: 'See course completion rates, quiz scores, and training hours by employee, department, or location, live. Compliance audits become a report pull, not a scramble.' },
    ]),
    featuresTitle: "2,000+ courses, assigned automatically by role",
    stats: [
      { v: '94%',     label: "of employees say they'd stay longer at a company that invests in their learning and development (LinkedIn)", color: '#2563eb', icon: 'fa-regular fa-graduation-cap' },
      { v: '$2,342',  label: 'average savings per hire when turnover drops, learning investment directly reduces your replacement cost', color: '#0d9488', icon: 'fa-regular fa-piggy-bank' },
      { v: '2,000+',  label: 'mobile-ready courses available on day one, no content creation required to get started',                   color: '#f59e0b', icon: 'fa-regular fa-book' },
    ],
    statsTitle: 'Teams using Netchex Learning',
    ctaText: 'Learning activates on your existing Netchex plan, your account manager can demo the course library today.',
  },

  // ─── 16 · Netchex Perform ────────────────────────────────────
  {
    id: 'perform',
    tabLabel: 'Perform',
    title: 'Perform',
    eyebrow: 'Performance Management',
    badges: [
      { kind: 'pill', text: 'AI-Powered', star: true },
      { kind: 'pill', text: 'Maven AI Coach' },
      { kind: 'pill', text: 'Add to your plan' },
    ],
    tagline: "AI-native performance management that drives real development, not just annual review paperwork. Set goals, run reviews, coach 1:1s, collect 360 feedback, and let Maven AI surface insights and next steps. All connected to your people data in Netchex so nothing lives in a separate HR tool.",
    features: tinted([
      { icon: 'fa-solid fa-robot',          title: 'Maven AI Coach',         blurb: 'An AI that reviews performance signals, flags risk, drafts talking points for 1:1s, and nudges managers toward the next best action, before problems fester into turnover.' },
      { icon: 'fa-solid fa-bullseye',       title: 'Goals & OKRs',           blurb: 'Connect individual goals to company strategy so every employee sees how their work ladders up. Track progress in real time, not just at review time.' },
      { icon: 'fa-solid fa-file-pen',       title: 'Performance Reviews',    blurb: 'Configurable review cycles, annual, semi-annual, 90-day. Structured templates ensure consistency across managers. Ratings feed directly into compensation planning data.' },
      { icon: 'fa-solid fa-arrows-rotate',  title: '360-Degree Feedback',    blurb: 'Collect peer, upward, and manager feedback in structured rounds. Surfaces blind spots, validates strengths, and gives employees a fuller picture of their impact.' },
      { icon: 'fa-solid fa-comments',       title: 'Continuous Feedback',    blurb: 'Real-time recognition and coaching notes between formal reviews, so development happens in the moment, not just twice a year in a performance doc.' },
      { icon: 'fa-solid fa-calendar-day',   title: '1:1 Meeting Templates',  blurb: 'Structured agendas for every 1:1, goal check-ins, feedback exchanges, career conversations. AI-suggested talking points so managers arrive prepared every time.' },
    ]),
    featuresTitle: "AI-native performance, end-to-end",
    stats: [
      { v: '91%', label: 'retention improvement at organizations with strong performance and development programs (Netchex Perform data)', color: '#2563eb', icon: 'fa-regular fa-arrow-trend-up' },
      { v: '86%', label: 'more consistent alignment between individual goals and company strategy when OKRs are tracked in-platform',     color: '#0d9488', icon: 'fa-regular fa-bullseye' },
      { v: '72%', label: 'increase in self-driven development conversations when Maven AI coaching nudges are active',                    color: '#f59e0b', icon: 'fa-regular fa-comments' },
    ],
    statsTitle: 'Teams using Netchex Perform',
    ctaText: 'Perform is built into Netchex, no separate login, no new vendor, no migration. Ask your account manager today.',
  },
];

Object.assign(window, { PRODUCTS });
