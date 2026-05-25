import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const sources = [
  {
    label: "CEPA - Kari Odermann profile",
    url: "https://cepa.org/author/dr-kari-hiepko-odermann/",
    note: "CEPA Fellow; political analyst and communication specialist with 20+ years across security, development, and technical assistance.",
  },
  {
    label: "K2 Communication - Kari Odermann",
    url: "https://k2.news/about",
    note: "Sensitive political communication; complex geopolitical topics translated into accessible narratives.",
  },
  {
    label: "Dunlevy Aerospace",
    url: "https://www.dunlevyaerospace.com/",
    note: "North Dakota-based UAS company; 10+ years; airframes, curricula, consulting; 250,000+ missions overseen.",
  },
  {
    label: "Northland - Matt Dunlevy",
    url: "https://www.northlandcollege.edu/directory/dunlevy-matt/",
    note: "Owner of Dunlevy Consulting and UAS entrepreneur in North Dakota, Minnesota, and internationally.",
  },
  {
    label: "Council of the EU - Defence numbers",
    url: "https://www.consilium.europa.eu/en/policies/defence-numbers/",
    note: "EU defence expenditure reached EUR 343B in 2024 and is expected at EUR 381B in 2025.",
  },
  {
    label: "European Commission - Readiness 2030 / SAFE",
    url: "https://defence-industry-space.ec.europa.eu/eu-defence-industry/white-paper-european-defence-readiness-2030_en",
    note: "SAFE includes a EUR 150B loan instrument for areas including missile defence, drones, and cyber security.",
  },
  {
    label: "U.S. Treasury - CFIUS guidance",
    url: "https://home.treasury.gov/policy-issues/international/the-committee-on-foreign-investment-in-the-united-states-cfius/cfius-laws-and-guidance",
    note: "Context for foreign investment review; this briefing does not provide legal advice.",
  },
  {
    label: "Federal Register - Drone export controls context",
    url: "https://www.federalregister.gov/documents/2026/01/21/2026-01059/streamlining-export-controls-for-drone-exports",
    note: "Context for UAS export-control considerations; applicability depends on facts and counsel review.",
  },
];

const sections = [
  { id: "opening", eyebrow: "Executive opening", nav: "Opening" },
  { id: "thesis", eyebrow: "Investor thesis", nav: "Thesis" },
  { id: "fit", eyebrow: "First-fit target", nav: "Dunlevy fit" },
  { id: "kari", eyebrow: "Intermediary layer", nav: "Kari / K2" },
  { id: "controls", eyebrow: "Board controls", nav: "Controls" },
  { id: "ask", eyebrow: "Board ask", nav: "30-day sprint" },
];

function useActiveSection() {
  const [active, setActive] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { threshold: [0.32, 0.55, 0.78] },
    );

    sections.forEach(({ id }) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

function TopNav({ active }) {
  const activeIndex = Math.max(0, sections.findIndex((section) => section.id === active));

  return (
    <header className="topbar">
      <a className="brand" href="#opening" aria-label="Open executive briefing">
        <span className="brand-mark">KO</span>
        <span>
          <strong>Kari Odermann / Dunlevy Aerospace</strong>
          <small>Strategic market access briefing</small>
        </span>
      </a>
      <nav className="navrail" aria-label="Briefing sections">
        {sections.map((section, index) => (
          <a key={section.id} className={active === section.id ? "active" : ""} href={`#${section.id}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {section.nav}
          </a>
        ))}
      </nav>
      <div className="progress" aria-label={`Section ${activeIndex + 1} of ${sections.length}`}>
        <span>{String(activeIndex + 1).padStart(2, "0")}</span>
        <div className="progress-track">
          <i style={{ width: `${((activeIndex + 1) / sections.length) * 100}%` }} />
        </div>
      </div>
    </header>
  );
}

function SectionShell({ id, eyebrow, title, children, tone = "standard" }) {
  return (
    <section id={id} className={`section section-${tone}`}>
      <div className="section-inner">
        <div className="eyebrow">{eyebrow}</div>
        {title ? <h2>{title}</h2> : null}
        {children}
      </div>
    </section>
  );
}

function Corridor() {
  return (
    <div className="corridor" aria-label="Strategic access corridor">
      <div className="corridor-node">
        <span>Source</span>
        <strong>UAE capital</strong>
      </div>
      <div className="corridor-path">
        <i />
        <b>equity-oriented market access</b>
      </div>
      <div className="corridor-node target">
        <span>Target</span>
        <strong>U.S. UAS capability</strong>
      </div>
      <div className="corridor-end">
        <span>Long-term option set</span>
        <strong>access | localisation | licensing</strong>
      </div>
    </div>
  );
}

function ExecutiveOpening() {
  return (
    <SectionShell id="opening" eyebrow="Executive opening" tone="hero">
      <div className="hero-grid access-hero">
        <div className="hero-copy">
          <p className="pretitle">Strategic Market Access and Deal Facilitation</p>
          <h1>UAE capital is seeking strategic access to U.S. drone capabilities.</h1>
          <p className="hero-lede">
            A board-controlled validation sprint can test whether Dunlevy Aerospace is a credible
            first-fit opportunity without approving a transaction, technical transfer, or
            open-ended commitment.
          </p>
          <div className="decision-strip">
            <div>
              <span>Opportunity type</span>
              <strong>Equity exposure to U.S. drone / defence-security companies</strong>
            </div>
            <div>
              <span>Strategic objective</span>
              <strong>Access, positioning, and potential localisation pathways</strong>
            </div>
            <div>
              <span>Board posture</span>
              <strong>Explore only through a controlled, compliance-aware process</strong>
            </div>
          </div>
        </div>
        <aside className="brief-card thesis-card">
          <div className="brief-card-top">
            <span>Board decision frame</span>
            <b>Approve validation, not a deal.</b>
          </div>
          <Corridor />
          <p>
            The question is whether a specific investor thesis can be tested safely, quickly, and
            with enough discipline to justify deeper diligence.
          </p>
        </aside>
      </div>
      <blockquote>
        This is not procurement interest; it is strategic capital seeking durable access to
        defense-relevant UAS capability.
      </blockquote>
    </SectionShell>
  );
}

function InvestorThesis() {
  const cards = [
    ["Equity access", "The strategy prioritises equity stakes over simple subcontracting or transactional sales."],
    ["U.S. UAS capability", "American drone companies are the primary target because IP, compliance pathways, and defence ecosystem timing matter."],
    ["Defense/security relevance", "Investors are looking for capability, positioning, and sovereignty value, not commodity procurement."],
    ["Localisation pathway", "Manufacturing, licensing, and industrial access can increase long-term strategic value if diligence supports it."],
  ];

  return (
    <SectionShell
      id="thesis"
      eyebrow="Investor thesis"
      title="The investor thesis is specific: equity, capability access, and long-term localisation."
    >
      <div className="thesis-layout">
        <div className="thesis-grid">
          {cards.map(([title, body], index) => (
            <article className="thesis-tile" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <aside className="market-signal">
          <span>External market signal</span>
          <strong>EUR 343B</strong>
          <p>EU member-state defence expenditure in 2024.</p>
          <strong>EUR 381B</strong>
          <p>Expected EU member-state defence expenditure in 2025.</p>
          <strong className="gold">EUR 150B</strong>
          <p>SAFE instrument includes drones, missile defence, and cyber security.</p>
        </aside>
      </div>
      <div className="source-note">
        Investor thesis from Kari source material; subject to investor criteria confirmation. Public
        defence-spending context from Council of the EU and European Commission.
      </div>
    </SectionShell>
  );
}

function DunlevyFit() {
  const fitRows = [
    ["U.S.-based UAS company", "North Dakota-based UAS company with U.S. aerospace and government ecosystem relevance."],
    ["Defense/security relevance", "UAS manufacturing, design, integration, counter-UAS, consulting, and mission-focused systems."],
    ["IP / technical capability", "UAS airframe development and mission-specific platform experience; candidate for deeper IP review."],
    ["Regulatory credibility", "Fit should be tested through NDA-led materials review and compliance screening before sensitive disclosure."],
    ["Defense ecosystem credentials", "Government and private-sector users; federal grants and programs experience noted by Dunlevy Aerospace."],
    ["Strategic growth pathway", "Potential equity, licensing, training, components, or market-entry pathways can be assessed without commitment."],
  ];

  return (
    <SectionShell id="fit" eyebrow="First-fit target" title="Dunlevy is the logical first test of the investor thesis.">
      <div className="fit-layout">
        <div className="proof-rail compact">
          <h3>Dunlevy brings real UAS credibility</h3>
          <div className="proof-grid">
            <div>
              <strong>10+ years</strong>
              <span>national and international UAS industry experience</span>
            </div>
            <div>
              <strong>250,000+</strong>
              <span>UAS missions overseen</span>
            </div>
            <div>
              <strong>Airframes + curricula</strong>
              <span>development, training, consulting, and integration capability</span>
            </div>
          </div>
          <p>
            This is an initial-fit argument, not a claim that a transaction is ready. The first step
            is to test alignment against investor criteria and compliance constraints.
          </p>
        </div>
        <div className="fit-matrix">
          <div className="fit-head">
            <span>Investor criteria</span>
            <span>Dunlevy relevance</span>
          </div>
          {fitRows.map(([criteria, relevance]) => (
            <div className="fit-row" key={criteria}>
              <strong>{criteria}</strong>
              <p>{relevance}</p>
            </div>
          ))}
        </div>
      </div>
      <blockquote>
        Dunlevy is not simply a contact in the network; it is the logical first test of the investor thesis.
      </blockquote>
    </SectionShell>
  );
}

function KariLayer() {
  const without = [
    "Weak or misaligned approaches",
    "Unclear expectations",
    "Premature disclosure risk",
    "Reputational risk",
    "Time drain on Matt",
  ];
  const withKari = [
    "Access to relevant stakeholders",
    "Preliminary filtering",
    "Credible first contact",
    "NDA-led sequencing",
    "Continuity across jurisdictions",
  ];

  return (
    <SectionShell
      id="kari"
      eyebrow="Intermediary layer"
      title="Kari turns relationship access into a disciplined investment process."
    >
      <div className="comparison-layout">
        <div className="comparison-column weak">
          <h3>Without intermediary layer</h3>
          {without.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
        <div className="process-core">
          <span>Market access process</span>
          <strong>Access - filter - position - NDA - verify - assess fit</strong>
          <p>
            Kari’s role is access, filtering, legitimacy, coordination, and expectation management
            before sensitive information is exposed.
          </p>
        </div>
        <div className="comparison-column strong">
          <h3>With Kari / K2</h3>
          {withKari.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
      </div>
      <div className="credibility-strip">
        <span>Credibility base</span>
        <p>
          CEPA Fellow; founder of K2 Communication; political analyst and communication specialist
          with security, political communication, democratic resilience, and international advisory experience.
        </p>
      </div>
      <blockquote>
        Kari’s role is the difference between a personal introduction and a board-safe market access process.
      </blockquote>
    </SectionShell>
  );
}

function RiskControls() {
  const concerns = [
    [
      "Conflict of interest",
      "The relationship creates trust, but any engagement should be governed by written scope, disclosure, board gates, and no authority to bind the company.",
    ],
    [
      "Export controls / dual-use risk",
      "No protected technical, contractual, or export-controlled material should be shared without legal framework, NDA, and export-control review.",
    ],
    [
      "CFIUS / foreign investment review",
      "Foreign investment implications should be screened early and remain subject to legal, export-control, and CFIUS review where applicable.",
    ],
    [
      "Time drain on Matt",
      "Kari filters first; Matt joins only qualified, board-relevant conversations with a defined agenda.",
    ],
    [
      "Overpromising investor access",
      "The framing is opportunity qualification and process facilitation, not assured capital, contracts, or government outcomes.",
    ],
    [
      "Procurement-policy confusion",
      "The current focus is investment, not procurement; any adjacent government-facing activity would require formal structure and legal review.",
    ],
  ];

  return (
    <SectionShell
      id="controls"
      eyebrow="Board controls"
      title="The process is designed to protect time, reputation, and sensitive information."
    >
      <div className="controls-grid">
        {concerns.map(([summary, detail]) => (
          <details key={summary} open={summary === "Conflict of interest" || summary === "Export controls / dual-use risk"}>
            <summary>{summary}</summary>
            <p>{detail}</p>
          </details>
        ))}
      </div>
      <div className="risk-band">
        <span>Control standard</span>
        <p>
          No transaction, exclusivity, technical transfer, protected information, or authority to
          bind Dunlevy without the proper legal framework and board approval.
        </p>
      </div>
    </SectionShell>
  );
}

function BoardAsk() {
  const steps = [
    ["Confirm investor criteria", "Define priorities, fit standards, and disqualifiers."],
    ["Execute NDA", "Create framework before company materials or sensitive information."],
    ["Initial qualification call", "Assess fit with Matt involved only when the conversation is prepared."],
    ["Review against criteria", "Cap table, equity availability, IP, credentials, growth plan, and compliance path."],
    ["Decision gate", "Deepen diligence, stop, or widen the pipeline."],
  ];
  const deliverables = [
    "Investor criteria summary",
    "Initial fit assessment",
    "Risk / compliance checklist",
    "Required company materials list",
    "Go / no-go recommendation",
    "Board update after validation period",
  ];

  return (
    <SectionShell id="ask" eyebrow="Board ask" title="Approve a low-risk, board-controlled 30-day validation sprint.">
      <div className="roadmap">
        {steps.map(([title, body], index) => (
          <article key={title} className={index === steps.length - 1 ? "final" : ""}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{title}</strong>
            <p>{body}</p>
          </article>
        ))}
      </div>
      <div className="ask-grid">
        <div className="approval-box">
          <h3>The board is asked to approve</h3>
          <p>A controlled first-step validation process.</p>
          <h3>The board is not approving</h3>
          <p>
            A transaction, exclusivity, authority to bind, technical information transfer, or
            long-term budget commitment.
          </p>
        </div>
        <div className="deliverables">
          <h3>30-day outputs</h3>
          <div>
            {deliverables.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
      <blockquote>
        This is not a bet on a relationship; it is a controlled test of whether a trusted relationship
        can produce strategic international opportunity.
      </blockquote>
      <details className="sources-drawer">
        <summary>Sources and caveats</summary>
        <div className="sources-layout">
          {sources.map((source) => (
            <a href={source.url} target="_blank" rel="noreferrer" className="source-card" key={source.url}>
              <strong>{source.label}</strong>
              <p>{source.note}</p>
              <span>{source.url.replace("https://", "")}</span>
            </a>
          ))}
        </div>
        <div className="caveat-panel">
          <h3>Boundary conditions</h3>
          <p>
            UAE investor thesis and process details are derived from Kari-provided source material
            and remain subject to investor criteria confirmation. This briefing provides business
            framing only and does not provide legal advice.
          </p>
        </div>
      </details>
    </SectionShell>
  );
}

function App() {
  const active = useActiveSection();
  const sectionIds = useMemo(() => sections.map((section) => section.id), []);

  useEffect(() => {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      window.requestAnimationFrame(() => target?.scrollIntoView());
    }

    function onKeyDown(event) {
      if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) return;
      const index = sectionIds.indexOf(active);
      if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === "ArrowRight") {
        event.preventDefault();
        document.getElementById(sectionIds[Math.min(index + 1, sectionIds.length - 1)])?.scrollIntoView();
      }
      if (event.key === "ArrowUp" || event.key === "PageUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        document.getElementById(sectionIds[Math.max(index - 1, 0)])?.scrollIntoView();
      }
      if (event.key === "Home") {
        event.preventDefault();
        document.getElementById(sectionIds[0])?.scrollIntoView();
      }
      if (event.key === "End") {
        event.preventDefault();
        document.getElementById(sectionIds[sectionIds.length - 1])?.scrollIntoView();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, sectionIds]);

  return (
    <div className="app">
      <TopNav active={active} />
      <main>
        <ExecutiveOpening />
        <InvestorThesis />
        <DunlevyFit />
        <KariLayer />
        <RiskControls />
        <BoardAsk />
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
