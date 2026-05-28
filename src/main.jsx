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

const fullSections = [
  { id: "slide-1", eyebrow: "Executive opening", nav: "Opening" },
  { id: "slide-2", eyebrow: "Investor thesis", nav: "Thesis" },
  { id: "slide-3", eyebrow: "First-fit target", nav: "Dunlevy fit" },
  { id: "slide-4", eyebrow: "Intermediary layer", nav: "Kari / K2" },
  { id: "slide-5", eyebrow: "Board controls", nav: "Controls" },
  { id: "slide-6", eyebrow: "Board ask", nav: "30-day sprint" },
];

const deckSections = [
  { id: "slide-1", eyebrow: "The opportunity", nav: "Opportunity" },
  { id: "slide-2", eyebrow: "Why Dunlevy", nav: "Dunlevy" },
  { id: "slide-3", eyebrow: "Why Kari / K2", nav: "Kari / K2" },
  { id: "slide-4", eyebrow: "Board ask", nav: "Board ask" },
];

function indexFromHash(sections) {
  const hash = window.location.hash.replace("#", "");
  const index = sections.findIndex((section) => section.id === hash);
  return index >= 0 ? index : 0;
}

function useSlideIndex(sections) {
  const [activeIndex, setActiveIndex] = useState(() => indexFromHash(sections));

  useEffect(() => {
    const syncFromHash = () => setActiveIndex(indexFromHash(sections));
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [sections]);

  return [activeIndex, setActiveIndex];
}

function useLockedBody() {
  useEffect(() => {
    document.body.classList.add("presentation-mode");
    return () => document.body.classList.remove("presentation-mode");
  }, []);
}

function TopNav({ activeIndex, onNavigate, sections, isDeck }) {
  return (
    <header className="topbar">
      <a className="brand" href="#slide-1" onClick={(event) => onNavigate(0, event)} aria-label="Open executive briefing">
        <span className="brand-mark">KO</span>
        <span>
          <strong>Kari Odermann / Dunlevy Aerospace</strong>
          <small>{isDeck ? "4-slide board deck" : "Strategic market access briefing"}</small>
        </span>
      </a>
      <nav className="navrail" aria-label="Briefing sections">
        {sections.map((section, index) => (
          <a
            key={section.id}
            className={activeIndex === index ? "active" : ""}
            href={`#${section.id}`}
            onClick={(event) => onNavigate(index, event)}
          >
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
    <SectionShell id="slide-1" eyebrow="Executive opening" tone="hero">
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
      id="slide-2"
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
        UAE investor thesis from Kari-provided source material; subject to investor criteria confirmation.
        Public defence-spending context from Council of the EU and European Commission.
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
    <SectionShell id="slide-3" eyebrow="First-fit target" title="Dunlevy is the logical first test of the investor thesis.">
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
      id="slide-4"
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
      id="slide-5"
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
          bind Dunlevy without the proper legal framework and board approval. Any next step is
          subject to legal, export-control, and CFIUS review where applicable.
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
    <SectionShell id="slide-6" eyebrow="Board ask" title="Approve a low-risk, board-controlled 30-day validation sprint.">
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
    </SectionShell>
  );
}

function DeckOpportunity() {
  const pillars = [
    ["Equity access", "Investment-first thesis; not a procurement-first approach."],
    ["U.S. UAS / defense-security capability", "Priority target profile is U.S. drone capability with credible technical and regulatory posture."],
    ["Localisation / licensing potential", "Long-term option set may include access, localisation, and manufacturing or licensing pathways."],
  ];

  return (
    <SectionShell id="slide-1" eyebrow="The opportunity" tone="hero">
      <div className="deck-hero">
        <div>
          <p className="pretitle">Investor thesis to validate</p>
          <h1>UAE capital is seeking strategic access to U.S. drone capabilities.</h1>
          <p className="hero-lede">
            UAE-based investors are seeking equity exposure to U.S. drone / defense-security
            companies. This is about strategic access, not simple procurement.
          </p>
        </div>
        <aside className="brief-card">
          <div className="brief-card-top">
            <span>Board framing</span>
            <b>Validate the thesis before committing resources.</b>
          </div>
          <p>
            Dunlevy is being considered as the first test case because it sits in the relevant UAS space.
          </p>
        </aside>
      </div>
      <div className="deck-pillars">
        {pillars.map(([title, body], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
      <div className="source-note">
        Kari-provided source material; subject to investor criteria confirmation.
      </div>
      <blockquote>
        This is not procurement interest; it is strategic capital seeking durable access to defense-relevant UAS capability.
      </blockquote>
    </SectionShell>
  );
}

function DeckDunlevyFit() {
  const rows = [
    ["U.S.-based UAS company", "North Dakota / U.S. UAS ecosystem"],
    ["Technical / operational credibility", "10+ years in UAS"],
    ["Demonstrated mission experience", "250,000+ UAS missions overseen"],
    ["Training / integration capability", "UAS curricula, consulting, airframe development"],
    ["Strategic growth pathway", "Fit to validate before wider pipeline"],
  ];

  return (
    <SectionShell id="slide-2" eyebrow="Why Dunlevy" title="Dunlevy is the logical first test of the investor thesis.">
      <div className="deck-fit-layout">
        <div className="fit-matrix">
          <div className="fit-head">
            <span>Investor thesis needs</span>
            <span>Dunlevy relevance</span>
          </div>
          {rows.map(([need, relevance]) => (
            <div className="fit-row" key={need}>
              <strong>{need}</strong>
              <p>{relevance}</p>
            </div>
          ))}
        </div>
        <aside className="proof-rail compact">
          <h3>Initial-fit logic</h3>
          <p>
            Dunlevy is strong enough to test the thesis before widening the pipeline. This is not a
            claim that a transaction is ready.
          </p>
        </aside>
      </div>
      <blockquote>
        Dunlevy is not simply a contact in the network; it is the logical first test of the investor thesis.
      </blockquote>
    </SectionShell>
  );
}

function DeckKariLayer() {
  const without = ["Poor targeting", "Unclear expectations", "Premature disclosure risk", "Reputational risk", "Matt's time wasted"];
  const withKari = ["Qualified access", "Credible first contact", "NDA-led sequencing", "Fit screening", "Board-safe next steps"];

  return (
    <SectionShell id="slide-3" eyebrow="Why Kari / K2" title="Kari turns relationship access into a disciplined investment process.">
      <div className="comparison-layout deck-comparison">
        <div className="comparison-column weak">
          <h3>Without Kari</h3>
          {without.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
        <div className="process-core">
          <span>Process layer</span>
          <strong>Access - filter - NDA - verify - board-safe next step</strong>
          <p>
            Kari’s value is structuring access, filtering misalignment, protecting reputations, and
            managing the cross-border process before sensitive information is exposed.
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
        <p>CEPA Fellow; founder of K2 Communication; political analyst and communication specialist in high-trust political/security environments.</p>
      </div>
      <blockquote>
        Kari’s role is the difference between a personal introduction and a board-safe market access process.
      </blockquote>
    </SectionShell>
  );
}

function DeckBoardAsk() {
  const steps = [
    ["Confirm investor criteria", "Define priorities"],
    ["NDA / legal guardrails", "Set framework"],
    ["Initial fit call", "Prepared conversation"],
    ["Qualification review", "Screen against criteria"],
    ["Board update", "Deepen, stop, or widen"],
  ];

  return (
    <SectionShell id="slide-4" eyebrow="Board ask" title="Approve a low-risk, board-controlled 30-day validation sprint.">
      <div className="roadmap deck-roadmap">
        {steps.map(([title, body], index) => (
          <article key={title} className={index === steps.length - 1 ? "final" : ""}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{title}</strong>
            <p>{body}</p>
          </article>
        ))}
      </div>
      <div className="ask-grid deck-ask-grid">
        <div className="approval-box">
          <h3>The board is asked to approve</h3>
          <p>A controlled first-step exploration and board-gated validation process.</p>
          <h3>The board is not approving</h3>
          <p>A transaction, exclusivity, authority to bind, technical disclosure, or open-ended commitment.</p>
        </div>
        <div className="approval-box">
          <h3>Required controls</h3>
          <p>
            Kari filters first; no protected technical or contractual material without NDA/legal
            framework; board receives a go / no-go recommendation.
          </p>
          <p className="compliance-line">Subject to legal, export-control, and CFIUS review where applicable.</p>
        </div>
      </div>
    </SectionShell>
  );
}

function App() {
  useLockedBody();
  const isDeck = window.location.pathname.replace(/\/+$/, "") === "/deck";
  const activeSections = isDeck ? deckSections : fullSections;
  const [activeIndex, setActiveIndex] = useSlideIndex(activeSections);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const sectionIds = useMemo(() => activeSections.map((section) => section.id), [activeSections]);

  function goTo(index, event) {
    event?.preventDefault();
    const nextIndex = Math.max(0, Math.min(index, sectionIds.length - 1));
    setActiveIndex(nextIndex);
    window.history.replaceState(null, "", `#${sectionIds[nextIndex]}`);
  }

  useEffect(() => {
    function onKeyDown(event) {
      if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) return;
      if (event.key === "Escape" && sourcesOpen) {
        setSourcesOpen(false);
        return;
      }
      if (/^[1-6]$/.test(event.key)) {
        event.preventDefault();
        const requested = Number(event.key) - 1;
        if (requested < activeSections.length) goTo(requested);
        return;
      }
      if (event.key === "ArrowDown" || event.key === "PageDown" || event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        goTo(activeIndex + 1);
      }
      if (event.key === "ArrowUp" || event.key === "PageUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(activeIndex - 1);
      }
      if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        goTo(sectionIds.length - 1);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, sectionIds, sourcesOpen, activeSections.length]);

  return (
    <div className={`app ${isDeck ? "deck-route" : "briefing-route"}`}>
      <TopNav activeIndex={activeIndex} onNavigate={goTo} sections={activeSections} isDeck={isDeck} />
      <main
        className="slide-stage"
        style={{ width: `${activeSections.length * 100}vw`, transform: `translate3d(${-activeIndex * 100}vw, 0, 0)` }}
      >
        {isDeck ? (
          <>
            <DeckOpportunity />
            <DeckDunlevyFit />
            <DeckKariLayer />
            <DeckBoardAsk />
          </>
        ) : (
          <>
            <ExecutiveOpening />
            <InvestorThesis />
            <DunlevyFit />
            <KariLayer />
            <RiskControls />
            <BoardAsk />
          </>
        )}
      </main>
      <div className="deck-controls" aria-label="Slide controls">
        <button type="button" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Previous slide">
          Prev
        </button>
        <span>{activeIndex + 1} / {activeSections.length}</span>
        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex === activeSections.length - 1}
          aria-label="Next slide"
        >
          Next
        </button>
      </div>
      <button type="button" className="sources-button" onClick={() => setSourcesOpen(true)}>
        Sources & caveats
      </button>
      {sourcesOpen ? (
        <div className="modal-backdrop" role="presentation" onClick={() => setSourcesOpen(false)}>
          <aside className="sources-modal" role="dialog" aria-modal="true" aria-label="Sources and caveats" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setSourcesOpen(false)} aria-label="Close sources">
              Close
            </button>
            <div className="eyebrow">Sources and caveats</div>
            <h2>Source-backed, deliberately bounded claims.</h2>
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
              <p>Any next step is subject to legal, export-control, and CFIUS review where applicable.</p>
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
