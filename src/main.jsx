import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const sources = [
  {
    label: "CEPA - Kari Odermann profile",
    url: "https://cepa.org/author/dr-kari-hiepko-odermann/",
    note: "Fellow; political analyst and communication specialist; 20+ years across security, development, and technical assistance.",
  },
  {
    label: "K2 Communication - about Kari Odermann",
    url: "https://k2.news/about",
    note: "Sensitive political communication, European security and communication strategy, complex narratives made accessible.",
  },
  {
    label: "Dunlevy Aerospace",
    url: "https://www.dunlevyaerospace.com/",
    note: "North Dakota-based UAS company; 10+ years; airframes, curriculum, consulting; 250,000+ missions overseen.",
  },
  {
    label: "Northland directory - Matt Dunlevy",
    url: "https://www.northlandcollege.edu/directory/dunlevy-matt/",
    note: "Owner of Dunlevy Consulting and UAS entrepreneur in North Dakota, Minnesota, and internationally.",
  },
  {
    label: "Council of the EU - defence in numbers",
    url: "https://www.consilium.europa.eu/en/policies/defence-numbers/",
    note: "EU member state defence expenditure reached EUR 343B in 2024 and is expected to reach EUR 381B in 2025.",
  },
  {
    label: "European Commission - Readiness 2030 / SAFE",
    url: "https://defence-industry-space.ec.europa.eu/eu-defence-industry/white-paper-european-defence-readiness-2030_en",
    note: "SAFE provides up to EUR 150B in loans for defence areas including missile defence, drones, and cyber security.",
  },
];

const sections = [
  { id: "brief", eyebrow: "Board briefing", nav: "Brief" },
  { id: "kari", eyebrow: "Chapter 1", nav: "Why Kari" },
  { id: "europe", eyebrow: "Chapter 2", nav: "Why Europe" },
  { id: "dunlevy", eyebrow: "Chapter 3", nav: "Dunlevy fit" },
  { id: "pilot", eyebrow: "Chapter 4", nav: "Pilot" },
  { id: "sources", eyebrow: "Appendix", nav: "Sources" },
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
      { threshold: [0.35, 0.55, 0.75] },
    );

    sections.forEach((section) => {
      const node = document.getElementById(section.id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

function Icon({ type }) {
  return <span className={`icon icon-${type}`} aria-hidden="true" />;
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

function TopNav({ active }) {
  const activeIndex = Math.max(0, sections.findIndex((section) => section.id === active));

  return (
    <header className="topbar">
      <a className="brand" href="#brief" aria-label="Open briefing introduction">
        <span className="brand-mark">KO</span>
        <span>
          <strong>Kari Odermann / Dunlevy Aerospace</strong>
          <small>Strategic pilot briefing</small>
        </span>
      </a>
      <nav className="navrail" aria-label="Briefing chapters">
        {sections.map((section, index) => (
          <a key={section.id} className={section.id === active ? "active" : ""} href={`#${section.id}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {section.nav}
          </a>
        ))}
      </nav>
      <div className="progress">
        <span>{String(activeIndex + 1).padStart(2, "0")}</span>
        <div className="progress-track">
          <i style={{ width: `${((activeIndex + 1) / sections.length) * 100}%` }} />
        </div>
      </div>
    </header>
  );
}

function BriefIntro() {
  return (
    <SectionShell id="brief" eyebrow="Board briefing" tone="hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="pretitle">Strategic partnership memo converted into a web briefing</p>
          <h1>A governed test of whether trust can produce measurable international opportunity.</h1>
          <p className="hero-lede">
            This briefing frames a limited Kari Odermann / Dunlevy Aerospace pilot for board review:
            strategic enough to justify exploration, controlled enough to protect time, governance, and
            compliance posture.
          </p>
          <div className="decision-strip">
            <div>
              <span>Recommended action</span>
              <strong>Approve a 60-90 day exploratory pilot</strong>
            </div>
            <div>
              <span>Operating principle</span>
              <strong>Opportunity qualification before commitment</strong>
            </div>
            <div>
              <span>Control standard</span>
              <strong>No binding authority or technical transfer</strong>
            </div>
          </div>
        </div>
        <div className="brief-card" aria-label="Board decision frame">
          <div className="brief-card-top">
            <span>Board question</span>
            <b>Is this worth disciplined exploration?</b>
          </div>
          <div className="matrix">
            <div>Governance</div>
            <div>Board gates</div>
            <div>Upside</div>
            <div>International pathways</div>
            <div>Risk</div>
            <div>Export-control review</div>
            <div>Time</div>
            <div>Kari filters first</div>
          </div>
          <p>
            The case is not personal trust alone. It is whether a trusted relationship can be
            converted into a measured, board-visible market-development process.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}

function KariChapter() {
  const pillars = [
    ["shield", "Security & political communication", "20+ years working across security, development, technical assistance, and sensitive political contexts."],
    ["network", "International networks", "Experience across Europe, North America, Africa, Asia, Ukraine, and policy-adjacent forums."],
    ["translate", "Policy / investor translation", "Frames complex UAS and security relevance in language European stakeholders can evaluate."],
  ];

  return (
    <SectionShell
      id="kari"
      eyebrow="Chapter 1 - Why Kari, why now"
      title="Kari Odermann is a credible bridge, not a generic consultant."
    >
      <div className="two-column">
        <aside className="identity-panel">
          <div className="portrait-block">
            <span>Kari</span>
            <span>Odermann</span>
          </div>
          <dl>
            <div>
              <dt>Public profile</dt>
              <dd>CEPA Fellow; political analyst and communication specialist</dd>
            </div>
            <div>
              <dt>Relevant domain</dt>
              <dd>Security, democratic resilience, counter-disinformation, geopolitical communication</dd>
            </div>
            <div>
              <dt>Strategic value</dt>
              <dd>Credibility and qualification, not a promise of access</dd>
            </div>
          </dl>
        </aside>
        <div className="pillar-stack">
          {pillars.map(([icon, titleText, body]) => (
            <article className="pillar" key={titleText}>
              <Icon type={icon} />
              <div>
                <h3>{titleText}</h3>
                <p>{body}</p>
              </div>
            </article>
          ))}
          <blockquote>
            Kari gives Dunlevy Aerospace a credible front door into European security, policy, and
            investor conversations that would otherwise take years to build.
          </blockquote>
        </div>
      </div>
    </SectionShell>
  );
}

function EuropeChapter() {
  const nodes = ["Investors", "Policy leaders", "Defence industry", "Dual-use tech", "Ukraine / eastern flank", "Security forums", "Compliance"];

  return (
    <SectionShell
      id="europe"
      eyebrow="Chapter 2 - Why Europe is strategically relevant"
      title="European defence demand is being reshaped around urgency, resilience, and dual-use technology."
    >
      <div className="market-layout">
        <div className="network-map">
          <div className="network-core">
            <span>EU / NATO</span>
            <strong>security ecosystem</strong>
          </div>
          {nodes.map((node, index) => (
            <div className={`network-node node-${index + 1}`} key={node}>
              {node}
            </div>
          ))}
        </div>
        <div className="metric-column">
          <article>
            <span>2024</span>
            <strong>EUR 343B</strong>
            <p>EU member state defence expenditure reached in 2024.</p>
          </article>
          <article>
            <span>2025E</span>
            <strong>EUR 381B</strong>
            <p>Expected EU member state defence expenditure in 2025.</p>
          </article>
          <article className="gold">
            <span>SAFE</span>
            <strong>EUR 150B</strong>
            <p>Loan instrument for areas including missile defence, drones, and cyber security.</p>
          </article>
        </div>
      </div>
      <p className="chapter-note">
        Security forums are useful here because they can expose serious partners, policy signals,
        investment appetite, and regulatory constraints before Dunlevy commits resources.
      </p>
      <blockquote>
        Kari’s network is valuable because Europe’s security conversation is now becoming a
        procurement and investment conversation.
      </blockquote>
    </SectionShell>
  );
}

function DunlevyChapter() {
  const routes = ["Investors", "Strategic partners", "Joint ventures", "Training", "Licensing", "Components", "Dual-use applications", "Advisory"];

  return (
    <SectionShell
      id="dunlevy"
      eyebrow="Chapter 3 - Why this matters to Dunlevy Aerospace"
      title="A focused intermediary can open international pathways without distracting the core team."
    >
      <div className="funnel-layout">
        <div className="proof-rail">
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
              <span>manufacturing, training, consulting, and integration capability</span>
            </div>
          </div>
          <div className="route-cloud">
            {routes.map((route) => (
              <span key={route}>{route}</span>
            ))}
          </div>
        </div>
        <div className="funnel">
          <div>European security demand</div>
          <div>Qualified investor / partner targets</div>
          <div>Compliance / risk screen</div>
          <div>Board-ready opportunities</div>
        </div>
      </div>
      <div className="risk-band">
        <span>Risk controls</span>
        <p>
          Subject to export-control and compliance review. No technical transfer or binding
          commitment without legal and board approval. International opportunity qualification,
          not a promise of capital.
        </p>
      </div>
      <blockquote>
        Kari can help Dunlevy Aerospace find the right international doors before the company
        commits serious time, capital, or operational bandwidth.
      </blockquote>
    </SectionShell>
  );
}

function PilotChapter() {
  const steps = ["Trust advantage", "Defined scope", "Board gates", "Measurable outputs", "Next-stage decision"];
  const deliverables = [
    "Map 10-15 qualified international investor / strategic partner targets.",
    "Identify 3-5 relevant European security conference or network opportunities.",
    "Produce a preliminary compliance / risk checklist.",
    "Recommend priority markets and next-step partnership structure.",
    "Provide a board update with a go / no-go recommendation.",
  ];
  const concerns = [
    ["Conflict of interest", "Written scope, disclosure, board approval gates, and no authority to bind the company."],
    ["Export controls / dual-use risk", "Early legal and compliance review before technical, customer, investor, or partner discussions."],
    ["Time drain on Matt", "Kari filters first; Matt enters only qualified conversations."],
    ["Europe-first supplier bias", "Broader pathways: joint ventures, training, licensing, components, consulting, strategic investors, and market-entry partnerships."],
    ["Overpromising access", "Frame the work as opportunity qualification, not assured contracts or capital."],
  ];

  return (
    <SectionShell
      id="pilot"
      eyebrow="Chapter 4 - Recommended pilot"
      title="A trusted relationship, structured as a low-risk strategic pilot."
    >
      <div className="pilot-flow">
        {steps.map((step, index) => (
          <div key={step} className={index === steps.length - 1 ? "final" : ""}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>
      <div className="pilot-grid">
        <div>
          <h3>Recommended 60-90 day deliverables</h3>
          <ol>
            {deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
        <div className="concerns">
          <h3>Board concerns pre-empted</h3>
          {concerns.map(([summary, detail]) => (
            <details key={summary}>
              <summary>{summary}</summary>
              <p>{detail}</p>
            </details>
          ))}
        </div>
      </div>
      <blockquote>
        This is not a bet on a relationship; it is a controlled test of whether that relationship
        can produce strategic international opportunity.
      </blockquote>
    </SectionShell>
  );
}

function SourcesChapter() {
  return (
    <SectionShell id="sources" eyebrow="Appendix - sources and caveats" title="Source-backed, deliberately bounded claims.">
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
          This briefing does not imply NATO, EU, government, procurement, investor, or contract
          access. It recommends a governed qualification process with legal and board review before
          commitments, technical-transfer discussions, or resource allocation beyond the pilot.
        </p>
        <p>
          Naming note: CEPA currently references KII Communication, while Kari’s own site uses K2
          Communication. This briefing avoids making the naming issue a core proof point.
        </p>
      </div>
    </SectionShell>
  );
}

function App() {
  const active = useActiveSection();
  const containerRef = useRef(null);
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
    <div className="app" ref={containerRef}>
      <TopNav active={active} />
      <main>
        <BriefIntro />
        <KariChapter />
        <EuropeChapter />
        <DunlevyChapter />
        <PilotChapter />
        <SourcesChapter />
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
