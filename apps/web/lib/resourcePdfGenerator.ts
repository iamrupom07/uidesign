import { jsPDF } from "jspdf";

interface PdfTheme {
  primaryColor: [number, number, number];
  secondaryColor: [number, number, number];
  textColor: [number, number, number];
  mutedColor: [number, number, number];
  accentColor: [number, number, number];
}

const THEME: PdfTheme = {
  primaryColor: [128, 0, 32], // MacProtec Burgundy #800020
  secondaryColor: [30, 41, 59], // Slate 800
  textColor: [15, 23, 42], // Slate 900
  mutedColor: [100, 116, 139], // Slate 500
  accentColor: [225, 29, 72], // Rose 600
};

// Helper: Add consistent header & footer across all pages
function applyHeaderAndFooter(doc: jsPDF, documentTitle: string) {
  const totalPages = doc.getNumberOfPages();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    // Skip header on page 1 (cover page)
    if (i > 1) {
      // Header Top Bar
      doc.setFillColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
      doc.rect(0, 0, pageWidth, 5, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
      doc.text("MACPROTEC ENGINEERING", 14, 12);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(THEME.mutedColor[0], THEME.mutedColor[1], THEME.mutedColor[2]);
      doc.text(documentTitle.toUpperCase(), pageWidth - 14, 12, { align: "right" });

      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.3);
      doc.line(14, 15, pageWidth - 14, 15);
    }

    // Footer Bottom Bar
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(14, pageHeight - 14, pageWidth - 14, pageHeight - 14);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(THEME.mutedColor[0], THEME.mutedColor[1], THEME.mutedColor[2]);
    doc.text(
      "863 Dairy Ashford Rd., Houston, TX 77079 | +1-346-550-0964 | process@macproteceng.com | www.macproteceng.com",
      14,
      pageHeight - 9
    );

    doc.setFont("helvetica", "bold");
    doc.text(`PAGE ${i} OF ${totalPages}`, pageWidth - 14, pageHeight - 9, { align: "right" });
  }
}

// 1. Company Brochure PDF Generator
export function generateCompanyBrochurePdf(): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();

  // --- PAGE 1: COVER ---
  doc.setFillColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
  doc.rect(0, 0, pageWidth, 28, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text("MACPROTEC ENGINEERING", 14, 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("EXCELLENCE IN PROCESS // TECHNICAL DOSSIER", 14, 23);

  // Main Cover Titles
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
  doc.text("COMPANY BROCHURE", 14, 55);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(THEME.secondaryColor[0], THEME.secondaryColor[1], THEME.secondaryColor[2]);
  doc.text("Engineering Design & Consulting Services", 14, 65);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(THEME.textColor[0], THEME.textColor[1], THEME.textColor[2]);
  const introText =
    "Partner of choice for sustainable, cost-effective, high-efficiency cement, mining, petrochemical, and process plants worldwide. We deliver practical, high-impact engineering that helps clients design, execute, and operate projects safely, efficiently, and sustainably from concept through commissioning and optimization.";
  doc.text(doc.splitTextToSize(introText, pageWidth - 28), 14, 75);

  // Executive Capabilities Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
  doc.rect(14, 100, pageWidth - 28, 48, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
  doc.text("GLOBAL EPC EXPERTISE & REGULATORY CODES", 20, 110);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(THEME.textColor[0], THEME.textColor[1], THEME.textColor[2]);
  const expText =
    "Our engineers have vast experience working with global EPC companies and are thoroughly familiar with international plant engineering technologies, management procedures, and rigorous codes including:\n\n• ASME (Pressure Vessels & Piping)   • API (Storage Tanks & Refining)\n• NFPA (Fire Safety Standards)      • ASHRAE (HVAC & Cleanroom)\n• ASTM (Material & Metallurgy)      • BNBC / RSC (Structural Safety)";
  doc.text(doc.splitTextToSize(expText, pageWidth - 40), 20, 118);

  // Key Achievements Grid
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(THEME.secondaryColor[0], THEME.secondaryColor[1], THEME.secondaryColor[2]);
  doc.text("VERIFIED ENGINEERING ACHIEVEMENTS", 14, 162);

  const achievements = [
    { metric: "1,300 MW", label: "Total Power Generation Project Involvement" },
    { metric: "1,430,000 Sft", label: "Pharmaceutical & Industrial MEP / HVAC In Operation" },
    { metric: "47,000 M3", label: "Chemical & Fuel Storage Tank Facility Engineering" },
    { metric: "2,200 RT", label: "Precision HVAC System Design Running Smoothly" },
    { metric: "17,000 MT", label: "Heavy Structural Steel Detailing in Service" },
    { metric: "510,000 Ft", label: "Pipeline System Engineering for Power & Petrochemical" },
  ];

  let startY = 170;
  achievements.forEach((ach, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const xPos = col === 0 ? 14 : 110;
    const yPos = startY + row * 22;

    doc.setFillColor(241, 245, 249);
    doc.rect(xPos, yPos, 88, 18, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(THEME.accentColor[0], THEME.accentColor[1], THEME.accentColor[2]);
    doc.text(ach.metric, xPos + 4, yPos + 6);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(THEME.textColor[0], THEME.textColor[1], THEME.textColor[2]);
    doc.text(doc.splitTextToSize(ach.label, 80), xPos + 4, yPos + 11);
  });

  // --- PAGE 2: SERVICES BREAKDOWN ---
  doc.addPage();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
  doc.text("CORE ENGINEERING DIVISIONS", 14, 25);

  const services = [
    {
      title: "1. Front End Engineering Design (FEED)",
      desc: "Conceptual design, design basis establishment, feasibility studies, Process Flow Diagrams (PFDs), Preliminary P&IDs, equipment selection, process simulation, datasheets, CAPEX/OPEX estimation, and environmental compliance.",
    },
    {
      title: "2. Civil, Structural & Architectural Design",
      desc: "Plot plans, structural analysis & calculations, GA & construction drawings (RCC & Steel), Bill of Materials (BOM), bar bending schedules, and pipe rack structural models.",
    },
    {
      title: "3. Process Design Services",
      desc: "Mass & Energy balances, intelligent AutoCAD Process & Instrumentation Diagrams (P&IDs), utility sizing, valve/line lists, HAZOP studies, and hazardous area classification.",
    },
    {
      title: "4. Mechanical & Rotating Equipment Design",
      desc: "Static & rotating equipment sizing (reactors, columns, tanks, heat exchangers, pumps, fans, compressors), HVAC design basis, pipe sizing, heat load calculations, and manufacturing drawings.",
    },
    {
      title: "5. Piping Design & Stress Analysis",
      desc: "Piping material specifications, 3D piping models with clash detection, isometric drawings, piping BOQ, tie-in points, high-vacuum systems, and Caesar II piping stress analysis.",
    },
    {
      title: "6. Electrical & Instrumentation (E&I)",
      desc: "Single Line Diagrams (SLDs), MCC design specifications, cable schedules, lighting lux calculations, PLC/DCS logic diagrams, loop diagrams, and emergency power earthing layouts.",
    },
    {
      title: "7. 2D/3D CAD Drafting & As-Built Digitization",
      desc: "2D/3D plant layouts, skid models, equipment drafting, PDF to CAD conversions, redline markups, and modular equipment skid engineering.",
    },
  ];

  let servY = 35;
  services.forEach((s) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(THEME.secondaryColor[0], THEME.secondaryColor[1], THEME.secondaryColor[2]);
    doc.text(s.title, 14, servY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(THEME.textColor[0], THEME.textColor[1], THEME.textColor[2]);
    const lines = doc.splitTextToSize(s.desc, pageWidth - 28);
    doc.text(lines, 14, servY + 4.5);

    servY += 6 + lines.length * 4;
  });

  // --- PAGE 3: GLOBAL PORTFOLIO & REFERENCES ---
  doc.addPage();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
  doc.text("GLOBAL PROJECT PORTFOLIO & REFERENCES", 14, 25);

  const projects = [
    {
      client: "Saint Gobain Glass, Poland",
      scope: "Detail study of pumping and storage station for glass manufacturing facility in collaboration with Ecad France and ATEIM.",
      deliverables: "P&ID diagram for total plant, basic plant layout, and structural drawings.",
    },
    {
      client: "Arkema CTIL, Lyon, France",
      scope: "Basic feasibility study of construction and lump-sum cost estimation of a Hydrogen Peroxide plant.",
      deliverables: "Equipment list with overall dimensions, basic equipment arrangement, and 3D piping models.",
    },
    {
      client: "Heurtey Petrochemical, France",
      scope: "Study and design of new P2R (Petroleum Residue Recycling Unit) pilot plant and full-scale industrial facility.",
      deliverables: "Equipment specification, data sheets, structural drawings, and piping layout.",
    },
    {
      client: "Beacon Pharmaceutical Ltd., Valuka",
      scope: "Detailed HVAC system duct layout and cleanroom air handling for pharmaceutical plant.",
      deliverables: "Single line diagram, duct layout drawings, and fabrication drawings.",
    },
  ];

  let projY = 35;
  projects.forEach((p) => {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.rect(14, projY, pageWidth - 28, 44, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
    doc.text(`CLIENT: ${p.client.toUpperCase()}`, 18, projY + 8);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(THEME.secondaryColor[0], THEME.secondaryColor[1], THEME.secondaryColor[2]);
    doc.text("Project Scope:", 18, projY + 16);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(THEME.textColor[0], THEME.textColor[1], THEME.textColor[2]);
    doc.text(doc.splitTextToSize(p.scope, pageWidth - 60), 42, projY + 16);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(THEME.secondaryColor[0], THEME.secondaryColor[1], THEME.secondaryColor[2]);
    doc.text("Deliverables:", 18, projY + 30);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(THEME.textColor[0], THEME.textColor[1], THEME.textColor[2]);
    doc.text(doc.splitTextToSize(p.deliverables, pageWidth - 60), 42, projY + 30);

    projY += 50;
  });

  applyHeaderAndFooter(doc, "Company Brochure — MacProtec Engineering");
  return doc;
}

// 2. MacProtec Scan2Value (3D Laser Scanning & Reverse Engineering) PDF Generator
export function generateScan2ValuePdf(): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();

  // --- COVER ---
  doc.setFillColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
  doc.rect(0, 0, pageWidth, 28, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text("MACPROTEC SCAN2VALUE", 14, 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("TRANSFORMING ASSETS INTO DIGITAL INTELLIGENCE", 14, 23);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
  doc.text("3D Scanning & Reverse Engineering", 14, 52);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(THEME.textColor[0], THEME.textColor[1], THEME.textColor[2]);
  const intro =
    "At MACPROTEC Engineering, we convert your plant's physical assets into dynamic 3D digital twins—bridging engineering precision with operational insight. Our process starts with high-definition 3D scanning and reverse engineering to create fully detailed plant models that integrate flawlessly with your CMMS, warehouse, and reliability systems.";
  doc.text(doc.splitTextToSize(intro, pageWidth - 28), 14, 62);

  // Core Value Pillars
  const pillars = [
    {
      title: "MacProtec DigiPlant 3D",
      desc: "Accurate 3D scans and digital twins of plant assets as the foundation for engineering, planning, and collaboration.",
    },
    {
      title: "Reverse Engineering of Parts",
      desc: "Recreate obsolete or high-wear parts with precision. Slash maintenance costs by reproducing components locally at a fraction of OEM prices.",
    },
    {
      title: "Assembly & Part Drawings",
      desc: "Convert high-accuracy 3D scans into precise, manufacturable 2D/3D drawings with tolerances, dimensions, and material notes.",
    },
    {
      title: "Wear Tracking & Predictive Replacement",
      desc: "Repeated scans over time reveal wear patterns, material loss, and geometry shifts—helping plan replacements before failure occurs.",
    },
    {
      title: "Fast Basis for CFD & FEA",
      desc: "High-resolution point clouds convert directly into simplified 3D CAD models for CFD flow and FEA structural studies.",
    },
    {
      title: "Zero-Guess Retrofit & Clash Detection",
      desc: "Ensure new equipment fits the first time. Eliminate guesswork, avoid on-site rework, schedule slips, and costly scrap.",
    },
  ];

  let y = 92;
  pillars.forEach((p, idx) => {
    doc.setFillColor(248, 250, 252);
    doc.rect(14, y, pageWidth - 28, 24, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
    doc.text(`${idx + 1}. ${p.title}`, 18, y + 7);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(THEME.textColor[0], THEME.textColor[1], THEME.textColor[2]);
    doc.text(doc.splitTextToSize(p.desc, pageWidth - 36), 18, y + 13);

    y += 28;
  });

  applyHeaderAndFooter(doc, "MacProtec Scan2Value — 3D Scanning & Reverse Engineering");
  return doc;
}

// 3. MacFlow Vision (CFD for Cement Plants) PDF Generator
export function generateMacFlowVisionPdf(): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();

  // --- COVER ---
  doc.setFillColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
  doc.rect(0, 0, pageWidth, 28, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text("MACFLOW VISION", 14, 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("CFD & NUMERICAL MODELING FOR SMARTER CEMENT PLANTS", 14, 23);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
  doc.text("MacFlow Vision CFD Solutions", 14, 52);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(THEME.textColor[0], THEME.textColor[1], THEME.textColor[2]);
  const intro =
    "MacFlow Vision CFD for cement plants takes you from 'we think' to 'we know' for every change from burner to stack. It lets you see, test, and optimize the entire gas-solids path before you ever touch the plant.";
  doc.text(doc.splitTextToSize(intro, pageWidth - 28), 14, 62);

  const cfdModules = [
    {
      title: "1. Kiln & Burner Combustion Modeling",
      desc: "Simulate flame shape, heat flux distribution, and secondary/tertiary air interaction. Eliminate cold zones and hot spots, protect refractories, and lower specific heat consumption.",
    },
    {
      title: "2. Calciner Hydrodynamics & Residence Time",
      desc: "Visualize gas-meal mixing, residence time, and temperature distribution. Maximize Alternative Fuel (AF) substitution rates (TSR) with complete calcination and lower NOx/CO emissions.",
    },
    {
      title: "3. Cyclone Separation & Preheater Optimization",
      desc: "Optimize cyclone separation efficiency, eliminate pressure drops, and resolve bypass build-ups and meal blockages.",
    },
    {
      title: "4. Mills & Ducts Flow Streamlining",
      desc: "Expose recirculation zones, uneven splits, and high-loss duct areas. Lower kWh/ton and achieve smoother, higher throughput.",
    },
    {
      title: "5. Vertical Mill Louver Ring Design",
      desc: "Equalize air and material flow around the grinding table, improve internal classification, and reduce fan power.",
    },
    {
      title: "6. Bins, Silos & Hopper Flow Behavior",
      desc: "Understand powder and clinker flow patterns, eliminate ratholing and dead zones, and optimize discharge angles.",
    },
  ];

  let y = 85;
  cfdModules.forEach((m) => {
    doc.setFillColor(248, 250, 252);
    doc.rect(14, y, pageWidth - 28, 24, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
    doc.text(m.title, 18, y + 7);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(THEME.textColor[0], THEME.textColor[1], THEME.textColor[2]);
    doc.text(doc.splitTextToSize(m.desc, pageWidth - 36), 18, y + 13);

    y += 28;
  });

  applyHeaderAndFooter(doc, "MacFlow Vision — CFD for Smarter Cement Plants");
  return doc;
}

// 4. CementX Training PDF Generator
export function generateCementXPdf(): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFillColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
  doc.rect(0, 0, pageWidth, 28, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text("CEMENTX TECHNICAL TRAINING", 14, 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("TRAINING FOR SMART PLANTS // CAPABILITY BUILDING", 14, 23);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
  doc.text("CementX — Training for Smart Plants", 14, 52);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(THEME.textColor[0], THEME.textColor[1], THEME.textColor[2]);
  const intro =
    "We design and deliver training that looks and feels like your own plant. Sessions are built around real equipment, real bottlenecks, and real operating data—not generic slides. Teams learn using custom case studies, hands-on plant floor activities, and 3D physical models that make complex systems intuitive to understand.";
  doc.text(doc.splitTextToSize(intro, pageWidth - 28), 14, 62);

  const pillars = [
    {
      title: "Hands-On Training",
      desc: "We take training out of the slide deck and closer to the plant. Participants work through real tasks, checks, and diagnostic routines mirroring daily shift operations.",
    },
    {
      title: "Custom Plant-Focused Case Studies",
      desc: "Built from your actual operating history, past incidents, and improvement projects so your personnel solve challenges they recognize.",
    },
    {
      title: "3D Printed Models & Physical Learning Aids",
      desc: "Complex equipment becomes intuitive when held in your hands. We utilize 3D printed components and cutaway models to demystify internal flow paths and failure modes.",
    },
    {
      title: "Training with Live Plant Data",
      desc: "Your historian and control system contain thousands of hidden lessons. We turn data into interactive training to build analytical problem-solving skills.",
    },
    {
      title: "Modular & Scalable Delivery",
      desc: "From focused single-process workshops to multi-month plant-wide engineering capability programs.",
    },
  ];

  let y = 92;
  pillars.forEach((p, idx) => {
    doc.setFillColor(248, 250, 252);
    doc.rect(14, y, pageWidth - 28, 26, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
    doc.text(`${idx + 1}. ${p.title}`, 18, y + 7);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(THEME.textColor[0], THEME.textColor[1], THEME.textColor[2]);
    doc.text(doc.splitTextToSize(p.desc, pageWidth - 36), 18, y + 13);

    y += 30;
  });

  applyHeaderAndFooter(doc, "CementX — Training for Smart Plants");
  return doc;
}

// 5. Kiln OCMS Technical Spec PDF Generator
export function generateKilnOcmsPdf(): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFillColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
  doc.rect(0, 0, pageWidth, 28, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text("KILN OCMS TECHNICAL SPECIFICATION", 14, 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("ONLINE CONDITION MONITORING SYSTEM // PRODUCTIVITY SOLUTION", 14, 23);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
  doc.text("Kiln Online Condition Monitoring System", 14, 52);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(THEME.textColor[0], THEME.textColor[1], THEME.textColor[2]);
  const intro =
    "Comprehensive multi-sensor online condition monitoring telemetry engineered for 2-base and 3-base rotary cement kilns. Provides real-time early detection of thermal stress, shell ovality, crank misalignment, and drive vibration.";
  doc.text(doc.splitTextToSize(intro, pageWidth - 28), 14, 62);

  const sensors = [
    {
      name: "ECS / CemScanner Shell Temperature",
      desc: "Continuous infrared thermal scanning of kiln shell to detect refractory brick thinning and hot spots.",
    },
    {
      name: "Crank Sensors (10 Nos.)",
      desc: "Installed on every roller support (FLS Type RA, RB, Fuller) with dedicated mounting brackets and 2-3 mm gap tolerance.",
    },
    {
      name: "Kiln Shell Ovality Monitoring",
      desc: "Measures dynamic tire flexure and shell deformation during operation to prevent shell fatigue.",
    },
    {
      name: "Axial Balance & Roller Position Sensors",
      desc: "2 RTDs + 1 position sensor mounted on downhill bearing end covers (Ø45mm & M8) to track axial thrust balance.",
    },
    {
      name: "Kiln Drive Vibration & Girth Gear Run-Out",
      desc: "Continuous accelerometer vibration monitoring on Drive End (DE) bearings and girth gear radial/axial run-out.",
    },
    {
      name: "Bearing Thrust Collar RTD Sensors",
      desc: "Precision resistance temperature detectors monitoring thrust collar temperature dynamics.",
    },
  ];

  let y = 85;
  sensors.forEach((s, idx) => {
    doc.setFillColor(248, 250, 252);
    doc.rect(14, y, pageWidth - 28, 25, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
    doc.text(`${idx + 1}. ${s.name}`, 18, y + 7);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(THEME.textColor[0], THEME.textColor[1], THEME.textColor[2]);
    doc.text(doc.splitTextToSize(s.desc, pageWidth - 36), 18, y + 13);

    y += 29;
  });

  applyHeaderAndFooter(doc, "Kiln Online Condition Monitoring System — Technical Spec");
  return doc;
}

// 6. Hydraulic Services of Clinker Cooler and Vertical Mill PDF Generator
export function generateHydraulicServicesPdf(): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFillColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
  doc.rect(0, 0, pageWidth, 28, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text("HYDRAULIC SERVICES", 14, 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("CLINKER COOLER & VERTICAL ROLLER MILL SPECIALIZATION", 14, 23);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
  doc.text("Hydraulic Services of Clinker Cooler & VRM", 14, 52);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(THEME.textColor[0], THEME.textColor[1], THEME.textColor[2]);
  const intro =
    "Macprotec hydraulics service is unique because we combine deep cement process know-how with advanced hydraulic diagnostics to fix root causes, not just symptoms. OEM's hydraulic service replaces parts—MACPROTEC solves problems. We find root causes in design, settings, and contamination to stabilize pressures, sharpen system response, and protect performance.";
  doc.text(doc.splitTextToSize(intro, pageWidth - 28), 14, 62);

  const sections = [
    {
      title: "1. Expert Hydraulic Service for All Clinker Coolers",
      desc: "Dependable service for all clinker cooler types: SF, MMC, CB, and others. We understand the unique hydraulic behavior of each design, allowing us to quickly diagnose issues, stabilize motion and pressures, and keep your cooler running smoothly instead of stopping your kiln.",
    },
    {
      title: "2. Hydraulic Services for Vertical Roller Mills",
      desc: "Dependable, expert hydraulic service for all major vertical mills: OK, ATOX, FRM, Loesche, and more. We know specific hydraulic behaviors and failure modes of each design to stabilize pressures, solve recurring trips, and keep your mills running smoothly.",
    },
    {
      title: "3. Root Cause vs. Part Replacement Philosophy",
      desc: "We diagnose pressure drops, pump cavitation, heat buildup, hydraulic leaks, and faulty seal failures. We eliminate roller lift malfunctions and separator pressure instability through circuit optimization.",
    },
    {
      title: "4. Accumulators, Relief Valves & Pressure Control",
      desc: "Gas pre-charging protocols, nitrogen bottle management, accumulator fatigue and bladder inspection, relief valve fine-tuning, and peak pressure surge dampening.",
    },
  ];

  let y = 92;
  sections.forEach((s) => {
    doc.setFillColor(248, 250, 252);
    doc.rect(14, y, pageWidth - 28, 28, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
    doc.text(s.title, 18, y + 7);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(THEME.textColor[0], THEME.textColor[1], THEME.textColor[2]);
    doc.text(doc.splitTextToSize(s.desc, pageWidth - 36), 18, y + 13);

    y += 32;
  });

  applyHeaderAndFooter(doc, "Hydraulic Services — Clinker Cooler & Vertical Mill");
  return doc;
}

// 7. Process Simulation and Beyond PDF Generator
export function generateProcessSimulationPdf(): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFillColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
  doc.rect(0, 0, pageWidth, 28, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text("PROCESS SIMULATION & BEYOND", 14, 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("MODEL // PREDICT // PERFORM — CEMENT PLANT DIGITAL TWINS", 14, 23);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
  doc.text("Process Simulation & Digital Twins", 14, 52);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(THEME.textColor[0], THEME.textColor[1], THEME.textColor[2]);
  const intro =
    "Technology solves problems that experience can only describe. MACPROTEC's process simulation transforms cement plant optimization from reactive firefighting into proactive, measurable, repeatable excellence. Where others see risks, we see data. MACPROTEC engineers certainty into cement operations through simulation, prediction, and prevention.";
  doc.text(doc.splitTextToSize(intro, pageWidth - 28), 14, 62);

  const pillars = [
    {
      title: "1. State-of-the-Art Plant Process Simulation",
      desc: "Build a realistic digital twin of your preheater tower, rotary kiln, clinker cooler, and mills. Reveal exactly where energy is wasted and material gets stuck before touching the plant.",
    },
    {
      title: "2. Zero Catastrophic Surprises in Operating Changes",
      desc: "Test alternative fuel changes, raw feed variations, and production rate increases virtually. Bottlenecks that hide for months become visible in hours.",
    },
    {
      title: "3. Ball & Vertical Mill Digital Twins",
      desc: "Visualize how the mill really behaves: load, airflow, circulation, classification, and energy use. Optimize liner design, internals, and grinding efficiency to lower kWh/ton.",
    },
    {
      title: "4. Thermo-Chemical Flowsheet & Energy Integration",
      desc: "Simulate steady-state heat and mass balances across pyroprocessing and grinding circuits for maximum heat recovery and net-zero roadmaps.",
    },
  ];

  let y = 92;
  pillars.forEach((p) => {
    doc.setFillColor(248, 250, 252);
    doc.rect(14, y, pageWidth - 28, 28, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
    doc.text(p.title, 18, y + 7);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(THEME.textColor[0], THEME.textColor[1], THEME.textColor[2]);
    doc.text(doc.splitTextToSize(p.desc, pageWidth - 36), 18, y + 13);

    y += 32;
  });

  applyHeaderAndFooter(doc, "Process Simulation and Beyond — MacProtec");
  return doc;
}

// 8. Cement Plant Services A to Z PDF Generator
export function generateCementPlantServicesAtoZPdf(): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFillColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
  doc.rect(0, 0, pageWidth, 28, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text("CEMENT PLANT SERVICES A TO Z", 14, 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("PROCESS, MECHANICAL & AUTOMATION SERVICES", 14, 23);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
  doc.text("Cement Plant Services A to Z", 14, 52);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(THEME.textColor[0], THEME.textColor[1], THEME.textColor[2]);
  const intro =
    "We don't just hand over a report—we stay to make it work. MACPROTEC supports you until the problem is fixed and the improvement is proven. Our cement services typically deliver 3-5% energy reduction per ton, 5-7% more stable throughput, and fewer unplanned shutdowns (translating into high six- to seven-figure annual savings with short payback).";
  doc.text(doc.splitTextToSize(intro, pageWidth - 28), 14, 62);

  const services = [
    { name: "Kiln Process Optimization", desc: "Burn smarter, not hotter—lower fuel, higher clinker throughput." },
    { name: "Kiln & Preheater Troubleshooting", desc: "Troubleshooting difficult pyroprocess challenges and build-up blockages." },
    { name: "Burner & Combustion Optimization", desc: "Burner inspection, flame tuning, and multi-fuel optimization." },
    { name: "Raw Mix Design & AI Optimization", desc: "Raw mix design and burnability optimization using AI-based tools." },
    { name: "Control & Automation Services", desc: "Control system programming, commissioning, and loop optimization." },
    { name: "Raw Mill Optimization", desc: "More feed, less kWh—raw mills tuned for steady, efficient grinding." },
    { name: "Grinding Circuit Debottlenecking", desc: "Uncover hidden bottlenecks in separators, cyclones, and conveying." },
    { name: "Cement Mill Performance Boost", desc: "Higher tph, tighter Blaine cement grinding without sacrificing quality." },
    { name: "Blending Silo Troubleshooting", desc: "Blending silo audit, fluidization troubleshooting, and mass flow optimization." },
  ];

  let y = 88;
  services.forEach((s) => {
    doc.setFillColor(248, 250, 252);
    doc.rect(14, y, pageWidth - 28, 16, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
    doc.text(s.name, 18, y + 6);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(THEME.textColor[0], THEME.textColor[1], THEME.textColor[2]);
    doc.text(s.desc, 18, y + 11.5);

    y += 18.5;
  });

  applyHeaderAndFooter(doc, "Cement Plant Services A to Z — MacProtec");
  return doc;
}

// 9. Master Training Catalog 2026 PDF Generator (Complete 6 Series Curriculum)
export function generateMasterTrainingCatalog2026Pdf(): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();

  // --- PAGE 1: COVER & OVERVIEW ---
  doc.setFillColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
  doc.rect(0, 0, pageWidth, 28, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text("MACPROTEC TRAINING CATALOG 2026", 14, 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("EMPOWERING INDUSTRY // COMPLETE PROFESSIONAL CURRICULUM", 14, 23);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
  doc.text("Training Catalog 2026 — Master Syllabus", 14, 52);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(THEME.textColor[0], THEME.textColor[1], THEME.textColor[2]);
  const intro =
    "At Macprotec, we believe progress begins with knowledge—refined through experience and driven by innovation. Our 2026 Training Catalogue brings together a complete portfolio of programs designed to elevate skills, enhance process performance, and empower industrial professionals with results-oriented learning.";
  doc.text(doc.splitTextToSize(intro, pageWidth - 28), 14, 62);

  const seriesList = [
    {
      num: "SERIES 1",
      title: "Cement Plant Basic Training Series",
      courses: "1.1 Cement 101 (Quarry to Kiln, 8 Modules) · 1.2 Introduction to Cement Chemistry: Mine to Mill (10 Modules)",
    },
    {
      num: "SERIES 2",
      title: "Control Room Operator Training Series",
      courses: "2.1 Raw Grinding O&M · 2.2 Pyroprocess O&M · 2.3 Cement Grinding O&M (10 Modules each)",
    },
    {
      num: "SERIES 3",
      title: "Advanced Training Series",
      courses: "3.1 Vertical Mill Optimization · 3.2 Ball Mill Optimization · 3.3 Pyroprocess Optimization · 3.4 Microscopy · 3.5 Cement Chemistry",
    },
    {
      num: "SERIES 4",
      title: "Hands-On Training Series",
      courses: "4.1 Grinding Process Engineer Almanac · 4.2 Pyroprocess Engineer Almanac · 4.3 Heat & Mass Balance Bootcamp",
    },
    {
      num: "SERIES 5",
      title: "Equipment Specific Training Series",
      courses: "5.1 Material Handling Equipment · 5.2 Pyroprocess Equipment · 5.3 Emission Control Equipment",
    },
    {
      num: "SERIES 6",
      title: "Specialized Training Series",
      courses: "6.1 Vertical Mill Hydraulics Hands-On · 6.2 Clinker Cooler Hydraulics Hands-On",
    },
  ];

  let y = 82;
  seriesList.forEach((s) => {
    doc.setFillColor(248, 250, 252);
    doc.rect(14, y, pageWidth - 28, 26, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(THEME.accentColor[0], THEME.accentColor[1], THEME.accentColor[2]);
    doc.text(s.num, 18, y + 6);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
    doc.text(s.title, 38, y + 6);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(THEME.textColor[0], THEME.textColor[1], THEME.textColor[2]);
    doc.text(doc.splitTextToSize(s.courses, pageWidth - 36), 18, y + 13);

    y += 30;
  });

  applyHeaderAndFooter(doc, "MacProtec Training Catalog 2026 — Master Curriculum");
  return doc;
}

// 10. Predictive Solutions — Smart Up Time PDF Generator
export function generatePredictiveSmartUpTimePdf(): jsPDF {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFillColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
  doc.rect(0, 0, pageWidth, 28, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text("PREDICTIVE SOLUTIONS FOR CEMENT PLANTS", 14, 16);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("SMART UP TIME // EARLY WARNINGS, NOT LATE ALARMS", 14, 23);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
  doc.text("Predictive Solutions — Smart Up Time", 14, 52);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(THEME.textColor[0], THEME.textColor[1], THEME.textColor[2]);
  const intro =
    "Predictive solutions turn your plant's data into early warnings, not late alarms. They concentrate on your critical assets—kilns, mills, coolers, fans—so you see problems weeks before they stop production. Unplanned outages drop, more work moves into planned shutdowns, and maintenance becomes targeted instead of chaotic.";
  doc.text(doc.splitTextToSize(intro, pageWidth - 28), 14, 62);

  const pillars = [
    {
      title: "1. We Connect (Historian & Sensor Agnostic)",
      desc: "Macprotec plugs into your existing data world—historian agnostic, talking to PLC/DCS, edge, and cloud—without forcing a new platform or ripping out what you already have.",
    },
    {
      title: "2. We Process (Process Physics + Machine Learning)",
      desc: "We turn raw tags into clear use cases (kiln bearings, mills, coolers, fans), combining process physics with machine learning to build predictive models your engineers actually trust.",
    },
    {
      title: "3. We Deploy (Native SCADA & CMMS Integration)",
      desc: "We push live alerts and actionable insights back into your SCADA, DCS, CMMS, or dashboards, creating a predictive layer over your cement plant with early warnings and clear actions.",
    },
    {
      title: "4. Tools We Offer",
      desc: "Continuous health monitoring of critical assets, AI-driven failure prediction using vibration and temperature trends, smart maintenance planning, and executive reliability dashboards.",
    },
  ];

  let y = 92;
  pillars.forEach((p) => {
    doc.setFillColor(248, 250, 252);
    doc.rect(14, y, pageWidth - 28, 28, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(THEME.primaryColor[0], THEME.primaryColor[1], THEME.primaryColor[2]);
    doc.text(p.title, 18, y + 7);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(THEME.textColor[0], THEME.textColor[1], THEME.textColor[2]);
    doc.text(doc.splitTextToSize(p.desc, pageWidth - 36), 18, y + 13);

    y += 32;
  });

  applyHeaderAndFooter(doc, "Predictive Solutions — Smart Up Time");
  return doc;
}

// Master Dispatcher to download any document by filename
export function downloadResourcePdf(fileName: string) {
  let doc: jsPDF;
  const cleanName = fileName.toLowerCase();

  if (cleanName.includes("hydraulic") || cleanName.includes("cooler")) {
    doc = generateHydraulicServicesPdf();
  } else if (cleanName.includes("simulation") || cleanName.includes("digital twin")) {
    doc = generateProcessSimulationPdf();
  } else if (cleanName.includes("a to z") || cleanName.includes("atoz") || cleanName.includes("cement plant services")) {
    doc = generateCementPlantServicesAtoZPdf();
  } else if (cleanName.includes("catalog") || cleanName.includes("curriculum") || (cleanName.includes("training") && cleanName.includes("2026"))) {
    doc = generateMasterTrainingCatalog2026Pdf();
  } else if (cleanName.includes("smart up time") || cleanName.includes("uptime") || (cleanName.includes("predictive") && !cleanName.includes("ocms"))) {
    doc = generatePredictiveSmartUpTimePdf();
  } else if (cleanName.includes("scan") || cleanName.includes("3d")) {
    doc = generateScan2ValuePdf();
  } else if (cleanName.includes("cfd") || cleanName.includes("macflow")) {
    doc = generateMacFlowVisionPdf();
  } else if (cleanName.includes("cementx")) {
    doc = generateCementXPdf();
  } else if (cleanName.includes("ocms") || cleanName.includes("kiln")) {
    doc = generateKilnOcmsPdf();
  } else {
    doc = generateCompanyBrochurePdf();
  }

  doc.save(fileName);
}

