import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire("/Users/ds/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/.resolver.js");
const pptxgen = require("pptxgenjs");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(__dirname, "../output/kari-odermann-dunlevy-strategic-pilot.pptx");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "OpenAI Codex";
pptx.company = "Kari Odermann / Dunlevy Aerospace";
pptx.subject = "Strategic partnership exploratory pilot";
pptx.title = "Kari Odermann and Dunlevy Aerospace Strategic Pilot";
pptx.lang = "en-US";
pptx.theme = {
  headFontFace: "Aptos Display",
  bodyFontFace: "Aptos",
  lang: "en-US",
};
pptx.defineLayout({ name: "BOARD", width: 13.333, height: 7.5 });
pptx.layout = "BOARD";
pptx.margin = 0;

const C = {
  navy: "081421",
  charcoal: "121820",
  ink: "1B2633",
  white: "F8FAFC",
  text: "E9EEF5",
  muted: "A9B6C7",
  line: "3A4656",
  steel: "5E8FB8",
  steel2: "7EA6C7",
  gold: "C6A15B",
  pale: "DDE6EF",
  panel: "101C2A",
  panel2: "172535",
  green: "6EA986",
};

const W = 13.333;
const H = 7.5;

function addBg(slide, page, kicker) {
  slide.background = { color: C.navy };
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: W, h: H, fill: { color: C.navy }, line: { color: C.navy } });
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.16, h: H, fill: { color: C.gold }, line: { color: C.gold } });
  slide.addText(kicker.toUpperCase(), {
    x: 0.45,
    y: 0.27,
    w: 3.2,
    h: 0.22,
    margin: 0,
    fontFace: "Aptos",
    fontSize: 7.5,
    bold: true,
    color: C.steel2,
    breakLine: false,
    charSpace: 1.6,
  });
  slide.addText(String(page).padStart(2, "0"), {
    x: 12.25,
    y: 0.25,
    w: 0.55,
    h: 0.18,
    fontSize: 7.5,
    bold: true,
    color: C.gold,
    align: "right",
    margin: 0,
  });
  slide.addShape(pptx.ShapeType.line, { x: 0.45, y: 6.92, w: 12.25, h: 0, line: { color: C.line, transparency: 20, width: 0.7 } });
  slide.addText("Sources in speaker notes | Draft for board discussion", {
    x: 0.45,
    y: 7.05,
    w: 7.2,
    h: 0.16,
    margin: 0,
    fontSize: 6.5,
    color: C.muted,
  });
  slide.addText("Kari Odermann + Dunlevy Aerospace strategic pilot", {
    x: 8.15,
    y: 7.05,
    w: 4.55,
    h: 0.16,
    margin: 0,
    fontSize: 6.5,
    color: C.muted,
    align: "right",
  });
}

function title(slide, text, y = 0.75, w = 11.3) {
  slide.addText(text, {
    x: 0.72,
    y,
    w,
    h: 0.95,
    margin: 0,
    fontFace: "Aptos Display",
    fontSize: 25,
    bold: true,
    color: C.white,
    fit: "shrink",
    breakLine: false,
  });
}

function subtitle(slide, text, x, y, w, h = 0.42, size = 10.5, color = C.muted) {
  slide.addText(text, {
    x,
    y,
    w,
    h,
    margin: 0.02,
    fontSize: size,
    color,
    fit: "shrink",
    valign: "mid",
    breakLine: false,
  });
}

function pill(slide, text, x, y, w, color = C.steel) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h: 0.26,
    rectRadius: 0.04,
    fill: { color, transparency: 8 },
    line: { color, transparency: 100 },
  });
  slide.addText(text.toUpperCase(), {
    x: x + 0.06,
    y: y + 0.06,
    w: w - 0.12,
    h: 0.12,
    fontSize: 5.8,
    bold: true,
    color: C.white,
    charSpace: 0.6,
    margin: 0,
    align: "center",
  });
}

function iconCircle(slide, label, x, y, color = C.steel) {
  slide.addShape(pptx.ShapeType.ellipse, {
    x,
    y,
    w: 0.44,
    h: 0.44,
    fill: { color, transparency: 4 },
    line: { color: C.pale, transparency: 70, width: 0.6 },
  });
  slide.addText(label, {
    x,
    y: y + 0.11,
    w: 0.44,
    h: 0.14,
    align: "center",
    margin: 0,
    bold: true,
    color: C.white,
    fontSize: 8.5,
  });
}

function sourceNotes(slide, notes) {
  slide.addNotes(notes.map((n) => n.trim()).join("\n\n"));
}

function slide1() {
  const slide = pptx.addSlide();
  addBg(slide, 1, "Strategic credibility");
  title(slide, "Kari Odermann: A trusted bridge between U.S. technology and European security networks");

  slide.addShape(pptx.ShapeType.rect, { x: 0.75, y: 2.1, w: 4.15, h: 3.72, fill: { color: C.panel2 }, line: { color: C.line, transparency: 15, width: 1 } });
  slide.addShape(pptx.ShapeType.arc, { x: 1.25, y: 2.52, w: 1.18, h: 1.18, adjustPoint: 0.22, line: { color: C.gold, width: 2.2 }, fill: { color: C.navy, transparency: 100 } });
  slide.addText("Kari\nOdermann", {
    x: 1.02,
    y: 3.85,
    w: 3.45,
    h: 0.62,
    margin: 0,
    fontFace: "Aptos Display",
    fontSize: 28,
    bold: true,
    color: C.white,
    breakLine: false,
  });
  slide.addShape(pptx.ShapeType.line, { x: 1.02, y: 4.75, w: 2.5, h: 0, line: { color: C.gold, width: 1.4 } });
  subtitle(slide, "Political analyst and communication specialist with 20+ years across security, development, and technical assistance.", 1.02, 5.02, 3.35, 0.45, 10.2, C.pale);
  pill(slide, "CEPA Fellow", 1.02, 2.45, 1.05, C.gold);
  pill(slide, "K2 Communication", 2.2, 2.45, 1.45, C.steel);

  const pillars = [
    ["S", "Security & political communication", "Turns sensitive geopolitical issues into credible, board-level narratives."],
    ["N", "International networks", "Operates across European, North American, African, and Asian security-policy contexts."],
    ["T", "Investor / policy translation", "Can frame U.S. UAS capabilities for European investors, policy actors, and security communities."],
  ];
  pillars.forEach(([ic, head, body], i) => {
    const y = 2.05 + i * 1.22;
    iconCircle(slide, ic, 5.65, y + 0.03, i === 1 ? C.gold : C.steel);
    slide.addText(head, { x: 6.25, y, w: 4.5, h: 0.28, margin: 0, fontSize: 13, bold: true, color: C.white });
    slide.addText(body, { x: 6.25, y: y + 0.38, w: 5.65, h: 0.42, margin: 0, fontSize: 10.2, color: C.muted, fit: "shrink" });
  });
  slide.addShape(pptx.ShapeType.line, { x: 5.87, y: 2.63, w: 0, h: 2.5, line: { color: C.line, width: 1.1, beginArrowType: "none", endArrowType: "none" } });
  slide.addText("Kari gives Dunlevy Aerospace a credible front door into European security, policy, and investor conversations that would otherwise take years to build.", {
    x: 5.64,
    y: 5.82,
    w: 6.45,
    h: 0.46,
    margin: 0,
    fontFace: "Aptos Display",
    fontSize: 15,
    bold: true,
    italic: true,
    color: C.white,
    fit: "shrink",
  });
  slide.addText("Sources: CEPA; K2 Communication", { x: 0.75, y: 6.63, w: 4, h: 0.12, fontSize: 5.8, color: C.muted, margin: 0 });
  sourceNotes(slide, [
    "Suggested framing: Introduce Kari as a strategic intermediary, not a broker or lobbyist. The board question is whether her credibility and network can be converted into disciplined opportunity qualification for Dunlevy Aerospace.",
    "Power sentence: Kari gives Dunlevy Aerospace a credible front door into European security, policy, and investor conversations that would otherwise take years to build.",
    "Sources: CEPA author profile confirms Kari Odermann is a CEPA Fellow and describes her as a political analyst and communication specialist with over 20 years of experience in security, development, and technical assistance across Africa, Asia, Europe, and North America. It also cites work with the German Parliament, German Council on Foreign Relations, UNDP, German Aid Agency, and public/private/nonprofit organizations, plus democratic resilience and counter-disinformation work: https://cepa.org/author/dr-kari-hiepko-odermann/",
    "K2 Communication about page describes Dr. Kari Odermann creating communication solutions in sensitive political contexts and translating complex information into accessible narratives; it also references Asia-Pacific, Eastern Europe, India, Ukraine, CEPA fellowship, media and teaching experience: https://k2.news/about",
    "Spelling note: use Kari Odermann and Dunlevy. CEPA page currently says founder of KII Communication, while K2's own site identifies K2 Communication. The slide uses K2 because the user provided K2 and the K2 site itself supports that usage.",
  ]);
}

function slide2() {
  const slide = pptx.addSlide();
  addBg(slide, 2, "Market signal");
  title(slide, "Her network sits where European defence demand is being shaped");

  slide.addShape(pptx.ShapeType.ellipse, { x: 4.75, y: 2.18, w: 3.15, h: 1.6, fill: { color: C.panel2 }, line: { color: C.gold, width: 1.2 } });
  slide.addText("EU / NATO\nsecurity ecosystem", { x: 5.18, y: 2.62, w: 2.25, h: 0.5, margin: 0, align: "center", fontFace: "Aptos Display", fontSize: 17, bold: true, color: C.white, breakLine: false });

  const nodes = [
    ["Investors", 1.05, 1.98, "capital"],
    ["Policy leaders", 3.1, 4.65, "priorities"],
    ["Defence industry", 8.35, 1.76, "partners"],
    ["Dual-use tech", 9.78, 4.48, "applications"],
    ["Ukraine / eastern flank", 5.15, 5.38, "urgency"],
    ["Security forums", 1.22, 3.48, "signals"],
  ];
  nodes.forEach(([head, x, y, tag], i) => {
    slide.addShape(pptx.ShapeType.line, { x: 6.33, y: 2.98, w: x + 0.83 - 6.33, h: y + 0.28 - 2.98, line: { color: C.line, transparency: 8, width: 1 } });
    slide.addShape(pptx.ShapeType.roundRect, { x, y, w: 1.65, h: 0.58, rectRadius: 0.04, fill: { color: i === 0 || i === 2 ? C.panel2 : C.panel }, line: { color: i === 4 ? C.gold : C.steel, transparency: 35, width: 0.8 } });
    slide.addText(head, { x: x + 0.1, y: y + 0.11, w: 1.45, h: 0.16, margin: 0, fontSize: 8.7, bold: true, color: C.white, align: "center" });
    slide.addText(tag.toUpperCase(), { x: x + 0.1, y: y + 0.34, w: 1.45, h: 0.1, margin: 0, fontSize: 4.9, bold: true, color: C.muted, charSpace: 0.5, align: "center" });
  });

  const metrics = [
    ["EUR 343B", "EU member state defence expenditure reached in 2024"],
    ["EUR 381B", "estimated EU member state defence expenditure in 2025"],
    ["EUR 150B", "SAFE loan instrument for key areas including drones"],
  ];
  metrics.forEach(([num, label], i) => {
    const x = 8.8 + (i % 1) * 0;
    const y = 2.35 + i * 0.82;
    slide.addText(num, { x, y, w: 2.1, h: 0.3, margin: 0, fontFace: "Aptos Display", fontSize: 18, bold: true, color: i === 2 ? C.gold : C.white });
    slide.addText(label, { x, y: y + 0.35, w: 2.95, h: 0.24, margin: 0, fontSize: 8.1, color: C.muted, fit: "shrink" });
  });
  slide.addShape(pptx.ShapeType.line, { x: 8.48, y: 2.2, w: 0, h: 2.58, line: { color: C.line, width: 1 } });
  slide.addText("Kari’s network is valuable because Europe’s security conversation is now becoming a procurement and investment conversation.", {
    x: 1.04,
    y: 6.08,
    w: 10.95,
    h: 0.35,
    margin: 0,
    fontFace: "Aptos Display",
    fontSize: 15,
    bold: true,
    italic: true,
    color: C.white,
    fit: "shrink",
  });
  slide.addText("Sources: Council of the EU; European Commission Readiness 2030 / SAFE", { x: 0.75, y: 6.63, w: 5.2, h: 0.12, fontSize: 5.8, color: C.muted, margin: 0 });
  sourceNotes(slide, [
    "Suggested framing: Security conferences are not treated here as generic networking. They are listening posts where policy priorities, investor appetite, defence industrial capacity, Ukraine-related urgency, and dual-use technology concerns converge.",
    "Use careful language: Kari can help Dunlevy identify serious conversations and market signals; she cannot guarantee NATO, EU, or member-state procurement.",
    "Power sentence: Kari's network is valuable because Europe's security conversation is now becoming a procurement and investment conversation.",
    "Sources: Council of the EU defence numbers page states that EU member states' defence expenditure reached EUR 343 billion in 2024 and is expected to reach an estimated EUR 381 billion in 2025: https://www.consilium.europa.eu/en/policies/defence-numbers/",
    "European Commission Readiness 2030 page describes SAFE as a new financial instrument for key defence areas including missile defence, drones, and cyber security; the page also states SAFE will raise funds up to EUR 150 billion and provide loans to Member States: https://defence-industry-space.ec.europa.eu/eu-defence-industry/white-paper-european-defence-readiness-2030_en",
  ]);
}

function slide3() {
  const slide = pptx.addSlide();
  addBg(slide, 3, "Dunlevy-specific value");
  title(slide, "A focused intermediary can open international pathways without distracting the core team");

  const stages = [
    ["European\nsecurity demand", "spending, urgency,\ndual-use needs"],
    ["Qualified investor /\npartner targets", "fit, seriousness,\nstrategic relevance"],
    ["Compliance /\nrisk screen", "export control,\nlegal review, board gates"],
    ["Board-ready\nopportunities", "clear next step,\ngo / no-go evidence"],
  ];
  const sx = 0.88;
  const sw = 2.78;
  stages.forEach(([head, body], i) => {
    const x = sx + i * 3.0;
    const fill = i === 3 ? C.gold : i === 2 ? C.panel2 : C.panel;
    slide.addShape(pptx.ShapeType.chevron, { x, y: 2.25, w: sw, h: 1.3, fill: { color: fill, transparency: i === 3 ? 0 : 6 }, line: { color: i === 3 ? C.gold : C.line, width: 0.8 } });
    slide.addText(head, { x: x + 0.25, y: 2.53, w: 1.8, h: 0.34, margin: 0, fontSize: 13.2, bold: true, color: C.white, fit: "shrink", breakLine: false });
    slide.addText(body, { x: x + 0.25, y: 3.05, w: 1.85, h: 0.3, margin: 0, fontSize: 7.4, color: i === 3 ? C.navy : C.muted, fit: "shrink", breakLine: false });
  });

  slide.addShape(pptx.ShapeType.rect, { x: 0.85, y: 4.43, w: 3.35, h: 1.05, fill: { color: C.panel2 }, line: { color: C.steel, transparency: 30, width: 0.8 } });
  slide.addText("Dunlevy Aerospace proof points", { x: 1.07, y: 4.66, w: 2.3, h: 0.18, fontSize: 10.6, bold: true, color: C.white, margin: 0 });
  slide.addText("10+ years in UAS; 250,000+ missions overseen; airframes, curricula, consulting, and international industry experience.", { x: 1.07, y: 4.95, w: 2.85, h: 0.27, fontSize: 7.6, color: C.muted, margin: 0, fit: "shrink" });

  const bullets = [
    "Explore investors, strategic partners, joint ventures, licensing, training, components, and dual-use applications.",
    "Reduce discovery cost by filtering weak leads before Matt invests senior time.",
    "Position Kari as market-development and strategic qualification, not sales ownership.",
  ];
  bullets.forEach((b, i) => {
    const y = 4.43 + i * 0.39;
    slide.addShape(pptx.ShapeType.ellipse, { x: 4.78, y: y + 0.06, w: 0.1, h: 0.1, fill: { color: C.gold }, line: { color: C.gold } });
    slide.addText(b, { x: 5.02, y, w: 6.75, h: 0.22, margin: 0, fontSize: 9.4, color: C.pale, fit: "shrink" });
  });
  slide.addText("Subject to export-control and compliance review; no technical transfer or binding commitment without legal and board approval.", {
    x: 5.02,
    y: 5.7,
    w: 6.5,
    h: 0.23,
    margin: 0,
    fontSize: 8.6,
    bold: true,
    color: C.gold,
    fit: "shrink",
  });
  slide.addText("Kari can help Dunlevy Aerospace find the right international doors before the company commits serious time, capital, or operational bandwidth.", {
    x: 0.88,
    y: 6.08,
    w: 11.15,
    h: 0.35,
    margin: 0,
    fontFace: "Aptos Display",
    fontSize: 14.7,
    bold: true,
    italic: true,
    color: C.white,
    fit: "shrink",
  });
  slide.addText("Sources: Dunlevy Aerospace; Northland Community & Technical College; Council of the EU; European Commission", { x: 0.75, y: 6.63, w: 7.0, h: 0.12, fontSize: 5.8, color: C.muted, margin: 0 });
  sourceNotes(slide, [
    "Suggested framing: Dunlevy already has technical and operational credibility. The question is how to qualify international opportunity without pulling Matt and the operating team into unstructured conversations.",
    "Power sentence: Kari can help Dunlevy Aerospace find the right international doors before the company commits serious time, capital, or operational bandwidth.",
    "Risk language to preserve: Subject to export-control and compliance review. No technical transfer or binding commitment without legal and board approval. International opportunity qualification, not guaranteed capital.",
    "Sources: Dunlevy Aerospace website states the company is based in North Dakota, has over a decade of national and international UAS industry experience, develops UAS airframes, designs UAS curricula, provides consulting, and has overseen more than 250,000 UAS missions: https://www.dunlevyaerospace.com/",
    "Northland Community & Technical College directory states Matt Dunlevy is owner of Dunlevy Consulting and a well-known UAS entrepreneur in North Dakota, Minnesota, and internationally: https://www.northlandcollege.edu/directory/dunlevy-matt/",
    "Market timing sources: Council of the EU defence numbers and European Commission Readiness 2030 / SAFE pages cited in Slide 2 notes.",
  ]);
}

function slide4() {
  const slide = pptx.addSlide();
  addBg(slide, 4, "Governed pilot");
  title(slide, "A trusted relationship, structured as a low-risk strategic pilot");

  const steps = [
    ["Trust advantage", "existing personal /\nprofessional relationship"],
    ["Defined scope", "60-90 day exploratory\npilot"],
    ["Board gates", "no authority to bind;\nlegal review first"],
    ["Measurable outputs", "targets, conferences,\nrisk checklist"],
    ["Next-stage decision", "go / no-go board\nupdate"],
  ];
  steps.forEach(([head, body], i) => {
    const x = 0.82 + i * 2.46;
    slide.addShape(pptx.ShapeType.roundRect, { x, y: 2.0, w: 2.08, h: 0.94, rectRadius: 0.04, fill: { color: i === 4 ? C.gold : C.panel2 }, line: { color: i === 4 ? C.gold : C.line, width: 0.8 } });
    slide.addText(head, { x: x + 0.14, y: 2.2, w: 1.8, h: 0.16, fontSize: 9.8, bold: true, color: i === 4 ? C.navy : C.white, margin: 0, align: "center", fit: "shrink" });
    slide.addText(body, { x: x + 0.17, y: 2.47, w: 1.73, h: 0.27, fontSize: 6.8, color: i === 4 ? C.navy : C.muted, margin: 0, align: "center", fit: "shrink", breakLine: false });
    if (i < 4) slide.addShape(pptx.ShapeType.line, { x: x + 2.08, y: 2.47, w: 0.36, h: 0, line: { color: C.steel, width: 1.2, endArrowType: "triangle" } });
  });

  slide.addText("Recommended 60-90 day pilot deliverables", { x: 0.9, y: 3.72, w: 4.2, h: 0.22, fontSize: 13, bold: true, color: C.white, margin: 0 });
  const deliverables = [
    "Map 10-15 qualified international investor / strategic partner targets.",
    "Identify 3-5 relevant European security conference or network opportunities.",
    "Produce preliminary compliance / risk checklist and priority market view.",
    "Return to board with recommended partnership structure and go / no-go decision.",
  ];
  deliverables.forEach((b, i) => {
    const y = 4.13 + i * 0.38;
    slide.addText(`${i + 1}`, { x: 0.94, y: y + 0.01, w: 0.22, h: 0.15, fontSize: 7, bold: true, color: C.gold, margin: 0, align: "center" });
    slide.addShape(pptx.ShapeType.line, { x: 1.26, y: y + 0.1, w: 0.34, h: 0, line: { color: C.gold, width: 0.8 } });
    slide.addText(b, { x: 1.75, y, w: 5.1, h: 0.2, fontSize: 8.9, color: C.pale, margin: 0, fit: "shrink" });
  });

  slide.addShape(pptx.ShapeType.rect, { x: 7.55, y: 3.6, w: 4.7, h: 1.75, fill: { color: C.panel2 }, line: { color: C.gold, transparency: 20, width: 0.9 } });
  slide.addText("Board concerns pre-empted", { x: 7.86, y: 3.9, w: 2.2, h: 0.18, fontSize: 10.8, bold: true, color: C.white, margin: 0 });
  slide.addText("Conflict disclosure | export controls | Matt's time | Europe-first supplier bias | no access overclaim", {
    x: 7.86,
    y: 4.32,
    w: 3.95,
    h: 0.45,
    fontSize: 9.2,
    color: C.muted,
    margin: 0,
    breakLine: false,
    fit: "shrink",
  });
  slide.addText("This is not a bet on a relationship; it is a controlled test of whether that relationship can produce strategic international opportunity.", {
    x: 0.88,
    y: 6.08,
    w: 11.15,
    h: 0.35,
    margin: 0,
    fontFace: "Aptos Display",
    fontSize: 14.7,
    bold: true,
    italic: true,
    color: C.white,
    fit: "shrink",
  });
  slide.addText("Board ask: approve limited exploratory scope; require written update before any next commitment.", { x: 0.75, y: 6.63, w: 6.2, h: 0.12, fontSize: 5.8, color: C.muted, margin: 0 });
  sourceNotes(slide, [
    "Suggested framing: The relationship matters because it lowers trust friction, but the board should not approve an open-ended relationship-based effort. The recommendation is a limited, governed pilot with board gates and specific outputs.",
    "Power sentence: This is not a bet on a relationship; it is a controlled test of whether that relationship can produce strategic international opportunity.",
    "Pilot scope: 60-90 days. Kari filters opportunities before Matt enters conversations. No exclusivity. No authority to bind Dunlevy Aerospace or Dunlevy Consulting. No export-controlled or technical-transfer discussions without counsel.",
    "Deliverables: map 10-15 qualified international investor / strategic partner targets; identify 3-5 relevant European security conference or network opportunities; produce preliminary compliance / risk checklist; recommend priority markets and partnership structure; provide board update with go / no-go recommendation.",
    "Pushback to pre-empt: conflict of interest handled through written scope, disclosure, and board approval gates; export-control and dual-use risk handled through early legal/compliance review; Matt's time protected by Kari filtering first; Europe-first supplier bias addressed through broader models such as joint ventures, training, licensing, components, consulting, and strategic investors; avoid overpromising access by positioning the pilot as opportunity qualification only.",
    "Sources referenced from prior slides: CEPA, K2 Communication, Dunlevy Aerospace, Northland Community & Technical College, Council of the EU, European Commission Readiness 2030 / SAFE.",
  ]);
}

slide1();
slide2();
slide3();
slide4();

await pptx.writeFile({ fileName: out });
console.log(out);
