export interface IndustryData {
  slug: string;
  name: string;
  summary: string;
  description?: string;
  engineeringServices: string[];
  engineeringApplications: string[];
}

export interface ServiceData {
  slug: string;
  title: string;
  description: string;
  extendedDescription: string[];
  engineeringApproach: string[];
  deliverables: string[];
  keyBenefits: string[];
}

export const cfdIndustries: Record<string, IndustryData> = {
  cement: {
    slug: "cement",
    name: "Cement Industry",
    summary: "Pyroprocessing, grinding, dust collection, material handling.",
    description:
      "The cement industry is MACPROTEC's primary core area of expertise. We provide comprehensive simulation and engineering analysis across pyroprocessing, grinding systems, dust control, clinker cooling, and alternative fuel co-processing.",
    engineeringServices: [
      "CFD & Flow Simulation",
      "Thermal & Heat Transfer Analysis",
      "Combustion & Alternative Fuel Engineering",
      "Material Flow & Pneumatic Conveying",
      "Structural & Thermal FEA",
      "Process Simulation",
      "Equipment Performance Optimization",
      "Dust Collection & Air Pollution Control",
      "Digital Twin & Virtual Commissioning",
      "Root Cause Engineering",
    ],
    engineeringApplications: [
      "Kiln & Burner CFD",
      "Calciner CFD",
      "Cyclone & Preheater CFD",
      "Clinker Cooler CFD",
      "Vertical Roller Mill CFD",
      "Ball Mill CFD",
      "Separator CFD",
      "Bag Filter CFD",
      "Duct & Fan Optimization",
      "Silo & Hopper Flow Analysis",
      "Pneumatic Conveying",
      "Alternative Fuel Conversion",
      "Waste Heat Recovery",
      "Process Optimization",
    ],
  },
  steel: {
    slug: "steel",
    name: "Steel Industry",
    summary: "Furnaces, cooling systems, gas exhaust and dust control.",
    description:
      "High-temperature metallurgical processes require precise thermal and fluid flow management to optimize energy usage, protect refractory linings, and control hazardous emissions.",
    engineeringServices: [
      "CFD & Flow Simulation",
      "Thermal & Heat Transfer Analysis",
      "Combustion & Alternative Fuel Engineering",
      "Pipe Stress Analysis & Support Design",
      "Structural & Thermal FEA",
      "Process Simulation",
      "Equipment Performance Optimization",
      "Dust Collection & Air Pollution Control",
      "Digital Twin & Virtual Commissioning",
      "Root Cause Engineering",
    ],
    engineeringApplications: [
      "Reheating Furnace CFD",
      "Electric Arc Furnace CFD",
      "Ladle Heating CFD",
      "Cooling System CFD",
      "Fume Extraction CFD",
      "Dust Collection",
      "Chimney CFD",
      "Exhaust Duct CFD",
      "Heat Recovery",
    ],
  },
  power: {
    slug: "power",
    name: "Power Generation",
    summary: "Boilers, combustion, flue gas and thermal systems.",
    description:
      "Optimizing thermal efficiency, SCR/ESP gas distribution, boiler combustion, and cooling tower airflow for power generation utility plants.",
    engineeringServices: [
      "CFD & Flow Simulation",
      "Thermal & Heat Transfer Analysis",
      "Combustion & Alternative Fuel Engineering",
      "Pipe Stress Analysis & Support Design",
      "Structural & Thermal FEA",
      "Process Simulation",
      "Equipment Performance Optimization",
      "Digital Twin & Virtual Commissioning",
      "Root Cause Engineering",
    ],
    engineeringApplications: [
      "Boiler CFD",
      "Burner Optimization",
      "SCR Flow Distribution",
      "ESP Flow Analysis",
      "Air Heater CFD",
      "Flue Gas Duct CFD",
      "Ash Handling CFD",
      "Cooling Tower CFD",
    ],
  },
  "oil-gas": {
    slug: "oil-gas",
    name: "Oil & Gas",
    summary: "Flow assurance, pipelines and process equipment.",
    description:
      "Flow assurance, multiphase pipeline modeling, slug flow mitigation, pressure relief, and vessel separator optimization for onshore and offshore assets.",
    engineeringServices: [
      "CFD & Flow Simulation",
      "Pipe Stress Analysis & Support Design",
      "Flow Assurance & Pipeline Engineering",
      "Thermal & Heat Transfer Analysis",
      "Structural & Thermal FEA",
      "Process Simulation",
      "Equipment Performance Optimization",
      "Digital Twin & Virtual Commissioning",
    ],
    engineeringApplications: [
      "Multiphase Pipeline CFD",
      "Slug Flow Analysis",
      "Separator CFD",
      "Flare CFD",
      "Pressure Relief Analysis",
      "Compressor Station CFD",
      "LNG Vapor Dispersion",
      "Heat Exchanger Analysis",
      "Pipe Support Design",
    ],
  },
  chemical: {
    slug: "chemical",
    name: "Chemical & Petrochemical",
    summary: "Reactors, mixing, piping and process systems.",
    description:
      "Advanced chemical reaction kinetics, tank mixing dynamics, static mixer performance, and pressure vessel integrity evaluations.",
    engineeringServices: [
      "CFD & Flow Simulation",
      "Pipe Stress Analysis & Support Design",
      "Flow Assurance & Pipeline Engineering",
      "Thermal & Heat Transfer Analysis",
      "Combustion & Alternative Fuel Engineering",
      "Structural & Thermal FEA",
      "Process Simulation",
      "Equipment Performance Optimization",
      "Digital Twin & Virtual Commissioning",
    ],
    engineeringApplications: [
      "Reactor Mixing",
      "Reactor CFD",
      "Static Mixer CFD",
      "Storage Tank Mixing",
      "Heat Exchanger CFD",
      "Pipe Stress",
      "Flare Analysis",
      "Ventilation CFD",
    ],
  },
  mining: {
    slug: "mining",
    name: "Mining Industry",
    summary: "Material transfer, ventilation and dust handling.",
    description:
      "Bulk ore transfer chute modeling (DEM), crusher dust capture, mine ventilation CFD, and slurry pipeline hydraulic transport analysis.",
    engineeringServices: [
      "CFD & Flow Simulation",
      "Material Flow & Pneumatic Conveying",
      "Structural & Thermal FEA",
      "Equipment Performance Optimization",
      "Dust Collection & Air Pollution Control",
      "Digital Twin & Virtual Commissioning",
      "Root Cause Engineering",
    ],
    engineeringApplications: [
      "Crusher Dust Control",
      "Conveyor Transfer CFD",
      "Ore Chute Flow",
      "Silo Flow",
      "Dust Collection",
      "Ventilation CFD",
      "Material Transfer",
    ],
  },
  "bulk-material-handling": {
    slug: "bulk-material-handling",
    name: "Bulk Material Handling",
    summary: "Pneumatic conveying, silos, transfer systems and storage.",
    description:
      "Pneumatic conveying line velocity tuning, silo/hopper discharge optimization, ship unloader CFD, and transfer chute wear reduction.",
    engineeringServices: [
      "CFD & Flow Simulation",
      "Material Flow & Pneumatic Conveying",
      "Structural & Thermal FEA",
      "Equipment Performance Optimization",
      "Dust Collection & Air Pollution Control",
      "Digital Twin & Virtual Commissioning",
    ],
    engineeringApplications: [
      "Transfer Chute Design",
      "Pneumatic Conveying",
      "Silo Flow Analysis",
      "Hopper Flow Analysis",
      "Dust Extraction",
      "Belt Conveyor Ventilation",
      "Ship Loader / Unloader CFD",
      "Storage Bin Flow",
    ],
  },
};

export const cfdCoreServices: ServiceData[] = [
  {
    slug: "cfd-and-flow-simulation",
    title: "CFD & Flow Simulation",
    description:
      "Computational Fluid Dynamics (CFD) is a powerful engineering tool used to simulate and analyze the behavior of fluids, gases, heat, and particulate matter within industrial processes and equipment.",
    extendedDescription: [
      "By solving the governing equations of fluid flow, CFD provides a detailed understanding of velocity fields, pressure distribution, turbulence, heat transfer, combustion, and multiphase interactions that are difficult or impossible to observe through conventional plant measurements. This enables engineers to evaluate process behavior under real operating conditions, investigate design alternatives, and predict system performance before implementing physical modifications.",
      "At MACPROTEC, CFD is applied as an engineering decision-support tool rather than simply a visualization technique. Our engineers combine advanced numerical simulation with practical process engineering expertise to identify the root causes of operational challenges, validate equipment designs, optimize process performance, and support plant modernization projects. Whether assessing a new facility during the design stage or troubleshooting an existing operation, our CFD studies provide engineering insight that reduces uncertainty, minimizes trial-and-error, and supports informed technical decisions.",
      "Our CFD capabilities cover a wide range of industrial applications, including fluid flow analysis, heat transfer, combustion, particle transport, pressure loss evaluation, gas distribution, ventilation, and multiphase flow behaviour across kilns, calciners, cyclones, coolers, boilers, furnaces, duct systems, dust collectors, heat exchangers, silos, pneumatic conveying systems, and process pipelines.",
    ],
    engineeringApproach: [
      "1. Engineering Assessment",
      "2. 3D Model Development",
      "3. CFD Simulation",
      "4. Engineering Interpretation",
      "5. Design Optimization",
      "6. Final Engineering Recommendations",
    ],
    deliverables: [
      "CFD Engineering Report",
      "Velocity, Pressure & Temperature Contours",
      "Particle Tracking & Flow Visualization",
      "Performance Assessment",
      "Design Optimization Recommendations",
      "Engineering Presentation",
    ],
    keyBenefits: [
      "Improve Process Efficiency",
      "Reduce Energy Consumption",
      "Minimize Pressure Loss",
      "Optimize Equipment Performance",
      "Improve Product Quality",
      "Reduce Operational Risk",
      "Validate Engineering Designs Before Implementation",
    ],
  },
  {
    slug: "thermal-and-heat-transfer-analysis",
    title: "Thermal & Heat Transfer Analysis",
    description:
      "Thermal performance plays a critical role in the efficiency, reliability, and safety of industrial processes across kilns, calciners, boilers, heat exchangers, and reactors.",
    extendedDescription: [
      "The transfer of heat directly influences fuel consumption, equipment life, product quality, and overall plant performance. Thermal & Heat Transfer Analysis enables engineers to evaluate how heat is generated, transferred, and dissipated throughout a system, providing valuable insight into temperature distribution, thermal gradients, heat losses, and cooling or heating effectiveness under actual operating conditions.",
      "At MACPROTEC, Thermal & Heat Transfer Analysis is used to optimize thermal processes, improve energy efficiency, and support engineering decisions throughout the design, operation, and modernization of industrial facilities. Using advanced numerical simulation techniques, our engineers evaluate conduction, convection, radiation, and coupled thermal-fluid interactions to identify inefficiencies, validate equipment designs, and assess the impact of operating conditions on thermal performance.",
    ],
    engineeringApproach: [
      "1. Thermal System Assessment",
      "2. Digital Model Development",
      "3. Thermal Simulation & Analysis",
      "4. Performance Evaluation",
      "5. Engineering Optimization",
      "6. Engineering Recommendations",
    ],
    deliverables: [
      "Thermal Engineering Assessment Report",
      "Temperature Distribution Contours",
      "Heat Flux & Heat Loss Analysis",
      "Thermal Gradient Evaluation",
      "Heat Transfer Performance Assessment",
      "Equipment Thermal Performance Review",
      "Design Optimization Recommendations",
      "Comparative Analysis of Design Alternatives",
    ],
    keyBenefits: [
      "Improve Thermal Efficiency",
      "Reduce Energy Consumption",
      "Minimize Heat Losses",
      "Identify Hot Spots & Thermal Stress Risks",
      "Optimize Heating & Cooling Performance",
      "Improve Heat Recovery Systems",
      "Increase Equipment Reliability & Service Life",
    ],
  },
  {
    slug: "combustion-and-alternative-fuel-engineering",
    title: "Combustion & Alternative Fuel Engineering",
    description:
      "Efficient combustion is fundamental to the performance, energy efficiency, and environmental sustainability of high-temperature industrial processes.",
    extendedDescription: [
      "The interaction between fuel, oxidizer, temperature, and flow dynamics directly influences flame stability, heat release, fuel consumption, emissions, and product quality. As industries transition toward alternative and low-carbon fuels, combustion systems become increasingly complex, requiring detailed engineering analysis to maintain operational reliability while achieving environmental and economic objectives.",
      "At MACPROTEC, we provide comprehensive Combustion & Alternative Fuel Engineering services to optimize combustion processes and support the successful integration of conventional and alternative fuels (RDF, SRF, biomass, hydrogen).",
    ],
    engineeringApproach: [
      "1. Combustion System Assessment",
      "2. Digital Model Development",
      "3. Combustion Simulation & Analysis",
      "4. Performance Evaluation",
      "5. Engineering Optimization",
      "6. Engineering Recommendations",
    ],
    deliverables: [
      "Combustion Engineering Assessment Report",
      "Flame Behaviour & Temperature Distribution Analysis",
      "Fuel-Air Mixing Evaluation",
      "Combustion Efficiency Assessment",
      "Alternative Fuel Feasibility Study",
      "Emission & Pollutant Formation Analysis",
      "Heat Release & Residence Time Evaluation",
    ],
    keyBenefits: [
      "Improve Combustion Efficiency",
      "Optimize Fuel Consumption",
      "Increase Alternative Fuel Utilization",
      "Enhance Flame Stability & Heat Distribution",
      "Reduce CO, NOx and Unburnt Fuel Emissions",
      "Support Decarbonization & Sustainability Goals",
    ],
  },
  {
    slug: "pipe-stress-analysis-and-support-design",
    title: "Pipe Stress Analysis & Support Design",
    description:
      "Evaluating thermal expansion, sustained loads, and piping flexibility to ensure code compliance and structural integrity under all operating conditions.",
    extendedDescription: [
      "Industrial piping systems are subjected to a combination of internal pressure, thermal expansion, dead weight, dynamic loads, and external environmental forces throughout their operating life. Pipe Stress Analysis ensures that piping systems operate safely, reliably, and in compliance with applicable international design codes.",
      "At MACPROTEC, we assess sustained loads, thermal expansion, occasional loads, support reactions, equipment interface loads, and piping flexibility.",
    ],
    engineeringApproach: [
      "1. System Assessment",
      "2. Analytical Model Development",
      "3. Stress & Flexibility Analysis",
      "4. Support Design & Optimization",
      "5. Code Compliance Verification",
      "6. Engineering Recommendations",
    ],
    deliverables: [
      "Pipe Stress Analysis Report",
      "Piping Flexibility Assessment",
      "Pipe Support Layout & Support Schedule",
      "Support Load Calculations",
      "Equipment Nozzle Load Evaluation",
      "Thermal Expansion Assessment",
    ],
    keyBenefits: [
      "Ensure Safe & Reliable Piping Operation",
      "Verify Compliance with International Design Codes",
      "Minimize Thermal Expansion & Excessive Pipe Movement",
      "Reduce Equipment Nozzle Loads",
      "Prevent Fatigue, Leakage & Mechanical Failure",
    ],
  },
  {
    slug: "flow-assurance-and-pipeline-engineering",
    title: "Flow Assurance & Pipeline Engineering",
    description:
      "Predicting pressure drop, multiphase behavior, slug flow, and thermal profiles to ensure continuous and economical pipeline operation.",
    extendedDescription: [
      "The safe and efficient transportation of liquids, gases, and multiphase fluids is critical to the performance of pipeline systems. Variations in pressure, temperature, and fluid properties can lead to slug flow, hydrate formation, erosion, or corrosion.",
      "At MACPROTEC, we evaluate steady-state and transient hydraulic profiles across onshore/offshore gas pipelines, slurry lines, and utility networks.",
    ],
    engineeringApproach: [
      "1. Pipeline System Assessment",
      "2. Hydraulic & Process Model Development",
      "3. Flow & Thermal Analysis",
      "4. Performance Evaluation",
      "5. System Optimization",
      "6. Engineering Recommendations",
    ],
    deliverables: [
      "Flow Assurance Engineering Report",
      "Hydraulic & Pressure Drop Analysis",
      "Pipeline Capacity Assessment",
      "Flow Regime & Multiphase Flow Evaluation",
      "Slugging & Operational Stability Assessment",
    ],
    keyBenefits: [
      "Ensure Reliable Pipeline Operation",
      "Optimize Flow Capacity & Hydraulic Performance",
      "Reduce Pressure Losses & Energy Consumption",
      "Minimize Unplanned Shutdowns & Production Losses",
    ],
  },
  {
    slug: "material-flow-and-pneumatic-conveying",
    title: "Material Flow & Pneumatic Conveying",
    description:
      "Evaluating movement of powders, granules, and bulk solids through DEM/CFD modeling to eliminate blockages, wear, and dust generation.",
    extendedDescription: [
      "Efficient handling of bulk solids is essential for maintaining productivity and minimizing material losses. Material Flow & Pneumatic Conveying Engineering provides a systematic approach to understanding bulk material behavior in silos, hoppers, transfer chutes, and conveying lines.",
      "At MACPROTEC, we combine CFD, DEM (Discrete Element Method), and process engineering to analyze air-solid interactions, pressure drop, and discharge dynamics.",
    ],
    engineeringApproach: [
      "1. Material & System Assessment",
      "2. Engineering Model Development",
      "3. Flow Behavior Analysis",
      "4. System Performance Evaluation",
      "5. Design Optimization",
      "6. Engineering Recommendations",
    ],
    deliverables: [
      "Material Flow Engineering Report",
      "Pneumatic Conveying Performance Assessment",
      "CFD & DEM Simulation Results",
      "Particle Flow & Velocity Analysis",
      "Transfer Chute Design Review",
      "Wear & Erosion Assessment",
    ],
    keyBenefits: [
      "Improve Material Flow Reliability",
      "Optimize Pneumatic Conveying Performance",
      "Reduce Blockages & Material Build-Up",
      "Minimize Wear, Erosion & Equipment Damage",
    ],
  },
  {
    slug: "structural-and-thermal-fea",
    title: "Structural & Thermal FEA",
    description:
      "Finite Element Analysis to evaluate stress distribution, deformation, fatigue life, and buckling under static, dynamic, and thermal loads.",
    extendedDescription: [
      "The structural integrity of industrial equipment is critical to ensuring safe operation, long service life, and reliable plant performance. Structural & Thermal FEA provides engineers with a detailed understanding of component response to severe operating environments.",
      "At MACPROTEC, we analyze pressure vessels, rotary kilns, ducts, cyclones, steel structures, silos, and mechanical components.",
    ],
    engineeringApproach: [
      "1. Engineering Assessment",
      "2. Finite Element Model Development",
      "3. Structural & Thermal Analysis",
      "4. Performance Evaluation",
      "5. Design Optimization",
      "6. Engineering Recommendations",
    ],
    deliverables: [
      "Structural & Thermal FEA Report",
      "Stress Distribution Analysis",
      "Deformation & Displacement Evaluation",
      "Fatigue & Life Assessment",
      "Buckling & Stability Evaluation",
    ],
    keyBenefits: [
      "Verify Structural Integrity Under Operating Conditions",
      "Identify Critical Stress & Failure Locations",
      "Reduce Thermal Stress & Deformation Risks",
      "Improve Equipment Reliability & Service Life",
    ],
  },
  {
    slug: "process-simulation",
    title: "Process Simulation",
    description:
      "Rigorous mass and energy balance flowsheet modeling to optimize unit operations, energy utilization, and production throughput.",
    extendedDescription: [
      "Process Simulation is a fundamental tool used to model, analyze, and optimize industrial processes before physical implementation. Creating a digital representation of an entire process allows engineers to predict system behavior under varying scenarios.",
      "At MACPROTEC, we develop heat and mass balance models, optimize grinding circuits, evaluate pyroprocesses, and audit plant capacity.",
    ],
    engineeringApproach: [
      "1. Process Assessment",
      "2. Process Model Development",
      "3. Simulation & Performance Analysis",
      "4. Process Evaluation",
      "5. Process Optimization",
      "6. Engineering Recommendations",
    ],
    deliverables: [
      "Process Simulation Report",
      "Mass & Energy Balance Calculations",
      "Process Flow & Stream Analysis",
      "Equipment Performance Evaluation",
      "Utility & Energy Consumption Assessment",
    ],
    keyBenefits: [
      "Optimize Overall Process Performance",
      "Improve Energy Efficiency & Utility Utilization",
      "Identify Process Bottlenecks & Capacity Constraints",
      "Evaluate Alternative Operating Scenarios with Confidence",
    ],
  },
  {
    slug: "equipment-performance-optimization",
    title: "Equipment Performance Optimization",
    description:
      "Engineering analysis and advanced simulation to identify performance limitations, debottleneck operations, and extend asset life.",
    extendedDescription: [
      "Industrial equipment operates under continuously changing process conditions, where minor inefficiencies can significantly impact production capacity and operating costs. Equipment Performance Optimization combines process evaluation and numerical modeling.",
      "At MACPROTEC, we optimize rotary kilns, calciners, coolers, mills, cyclones, separators, boilers, fans, and bag filters.",
    ],
    engineeringApproach: [
      "1. Performance Assessment",
      "2. Data Analysis & Digital Model Development",
      "3. Performance Evaluation",
      "4. Engineering Analysis",
      "5. Optimization Studies",
      "6. Engineering Recommendations",
    ],
    deliverables: [
      "Equipment Performance Assessment Report",
      "Operational Performance Evaluation",
      "Capacity & Bottleneck Analysis",
      "Energy Efficiency Assessment",
      "Comparative Performance Analysis",
    ],
    keyBenefits: [
      "Improve Equipment Efficiency & Productivity",
      "Increase Plant Capacity Through Performance Optimization",
      "Reduce Energy Consumption & Operating Costs",
      "Extend Equipment Service Life",
    ],
  },
  {
    slug: "dust-collection-and-air-pollution-control",
    title: "Dust Collection & Air Pollution Control",
    description:
      "Evaluating duct networks, bag filters, cyclones, and ESPs to optimize airflow, capture particulate emissions, and lower fan energy consumption.",
    extendedDescription: [
      "Effective dust collection systems are essential for environmental compliance, worker safety, and equipment protection. Poorly designed systems lead to high emissions, material losses, and excessive fan power consumption.",
      "At MACPROTEC, we apply CFD airflow and particle tracking to optimize duct networks, hoods, baghouses, and electrostatic precipitators.",
    ],
    engineeringApproach: [
      "1. System Assessment",
      "2. Engineering Model Development",
      "3. Airflow & Dust Analysis",
      "4. Performance Evaluation",
      "5. System Optimization",
      "6. Engineering Recommendations",
    ],
    deliverables: [
      "Dust Collection Engineering Report",
      "Airflow & Ventilation Assessment",
      "CFD Airflow & Dust Distribution Analysis",
      "Dust Capture Efficiency Assessment",
      "Duct Network Performance Review",
    ],
    keyBenefits: [
      "Improve Dust Collection Efficiency",
      "Reduce Particulate Emissions & Product Losses",
      "Minimize Pressure Losses & Fan Energy Consumption",
      "Improve Workplace Safety & Environmental Compliance",
    ],
  },
  {
    slug: "digital-twin-and-virtual-commissioning",
    title: "Digital Twin & Virtual Commissioning",
    description:
      "Combining process models, CFD/FEA, and real-time plant telemetry to monitor performance, simulate scenarios, and validate control logic.",
    extendedDescription: [
      "Digital Twin technology creates a dynamic digital representation of physical assets and processes by integrating physics-based models with live SCADA telemetry data. Virtual Commissioning extends this by testing DCS control logic in a virtual model before physical startup.",
      "At MACPROTEC, we build unified Digital Twins for process optimization, operator training, predictive maintenance, and virtual checkout.",
    ],
    engineeringApproach: [
      "1. Plant & Process Assessment",
      "2. Digital Model Development",
      "3. System Integration & Validation",
      "4. Virtual Commissioning & Scenario Analysis",
      "5. Performance Optimization",
      "6. Engineering Recommendations",
    ],
    deliverables: [
      "Digital Twin Engineering Model",
      "Virtual Commissioning Simulation",
      "Process Performance Assessment",
      "Equipment Performance Monitoring Framework",
      "Operator Training & Simulation Models",
    ],
    keyBenefits: [
      "Develop a Realistic Digital Representation of Plant Operations",
      "Validate Plant Designs Before Physical Commissioning",
      "Reduce Startup Time & Commissioning Risks",
      "Optimize Process Performance Using Real-Time Operational Data",
    ],
  },
  {
    slug: "root-cause-engineering",
    title: "Root Cause Engineering",
    description:
      "Systematic analytical investigation using CFD, FEA, and process modeling to identify the true origin of recurring operational failures.",
    extendedDescription: [
      "Recurring operational problems are symptoms of deeper underlying engineering issues. Excessive wear, material build-up, abnormal vibration, or repeated breakdowns stem from process interactions that routine inspection cannot uncover.",
      "At MACPROTEC, we combine process engineering, numerical simulation, and failure analysis to develop permanent corrective actions.",
    ],
    engineeringApproach: [
      "1. Problem Assessment",
      "2. Data Collection & Engineering Review",
      "3. Engineering Analysis",
      "4. Root Cause Identification",
      "5. Solution Evaluation",
      "6. Engineering Recommendations",
    ],
    deliverables: [
      "Root Cause Engineering Investigation Report",
      "Process & Equipment Performance Assessment",
      "Engineering Failure Analysis",
      "Performance Gap Assessment",
      "Corrective Action & Optimization Recommendations",
    ],
    keyBenefits: [
      "Identify the True Cause of Recurring Operational Problems",
      "Eliminate Repetitive Failures Through Permanent Engineering Solutions",
      "Improve Equipment Reliability & Process Stability",
      "Reduce Unplanned Downtime & Maintenance Costs",
    ],
  },
];
