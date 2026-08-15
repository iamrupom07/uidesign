export interface ProjectExperienceCategory {
  id: string;
  slug: string;
  title: string;
  badge: string;
  image: string;
  description: string;
  projects: {
    name: string;
    client: string;
    location: string;
  }[];
}

export const PROJECT_CATEGORIES: ProjectExperienceCategory[] = [
  {
    id: "01",
    slug: "engineering-design-and-plant-development",
    title: "Engineering Design & Plant Development",
    badge: "DESIGN & DEVELOPMENT",
    image: "/images/projects/engineering_design_3d.jpg",
    description:
      "From concept development to detailed engineering and plant modifications, our experience covers multidisciplinary engineering for new facilities, upgrades, and retrofit projects across complex industrial environments.",
    projects: [
      {
        name: "Lithium Refinery Plant Engineering Design",
        client: "Albemarle Corporation",
        location: "USA",
      },
      {
        name: "CEMEX Multi-Plant Upgrade & Retrofit Programs",
        client: "CEMEX",
        location: "Multiple Plants, USA",
      },
      {
        name: "Pyroprocess, Raw & Finish Grinding Upgrade Study",
        client: "GCC, Pueblo Plant",
        location: "Colorado, USA",
      },
      {
        name: "Raw Grinding System Upgrade Study",
        client: "Titan America Cement, Roanoke Plant",
        location: "Virginia, USA",
      },
      {
        name: "Raw Grinding Upgrade & Optimization Study",
        client: "Cementos Argos, Harleyville Plant",
        location: "South Carolina, USA",
      },
      {
        name: "Finish Grinding System Upgrade Evaluation",
        client: "Texas Lehigh Cement, Buda Plant",
        location: "Texas, USA",
      },
      {
        name: "Raw Grinding Retrofit Engineering Support",
        client: "Ash Grove Cement, Durkee Plant",
        location: "Oregon, USA",
      },
      {
        name: "Semi-Dry Pyroprocess Conversion Support",
        client: "Ash Grove Cement, Midlothian Plant",
        location: "Texas, USA",
      },
    ],
  },
  {
    id: "02",
    slug: "process-optimization-and-troubleshooting",
    title: "Process Optimization & Troubleshooting",
    badge: "PROCESS OPTIMIZATION",
    image: "/images/projects/process_optimization_control.jpg",
    description:
      "Hands-on process engineering experience focused on identifying performance limitations, resolving operational challenges, and improving the efficiency, stability, and capacity of critical plant systems.",
    projects: [
      {
        name: "Kiln Optimization & Petcoke Inclusion",
        client: "Cimentos Avellaneda",
        location: "Argentina",
      },
      {
        name: "Vertical Grinding Mill Troubleshooting",
        client: "Cimentos BSA, Santiago Plant",
        location: "Chile",
      },
      {
        name: "Kiln Feed Dosing & Kiln Optimization",
        client: "Lafarge, Ravena Plant",
        location: "New York, USA",
      },
      {
        name: "Finish Grinding Optimization",
        client: "Ash Grove Cement, Foreman Plant",
        location: "Arkansas, USA",
      },
      {
        name: "Finish Grinding Optimization",
        client: "Argos, Harleyville Plant",
        location: "South Carolina, USA",
      },
      {
        name: "SNCR & NOx Optimization",
        client: "GCC, Odessa Plant",
        location: "Texas, USA",
      },
      {
        name: "Clinker Cooler Troubleshooting",
        client: "Lehigh Northeast Cement, Glens Falls Plant",
        location: "New York, USA",
      },
      {
        name: "Kiln Troubleshooting",
        client: "SRMG Phoenix Cement, Clarksdale Plant",
        location: "Arizona, USA",
      },
      {
        name: "Finish Grinding Optimization & Troubleshooting",
        client: "Eagle Cement Corporation, Bulacan Plant",
        location: "Philippines",
      },
      {
        name: "Raw Grinding Optimization",
        client: "National Cement, Ragland Plant",
        location: "Alabama, USA",
      },
      {
        name: "Finish Grinding Optimization",
        client: "Indocement, Citeureup Plant",
        location: "Indonesia",
      },
      {
        name: "O-Sepa Finish Grinding Optimization",
        client: "Lehigh Cement, Mason City Plant",
        location: "Iowa, USA",
      },
      {
        name: "Raw Grinding Hydraulic Troubleshooting",
        client: "Dangote Cement, Obajana Plant",
        location: "Nigeria",
      },
      {
        name: "Multi-Plant Finish Grinding Optimization & Troubleshooting",
        client: "Votorantim Cimentos, Santa Helena, Rio Branco & Sepetiba Plants",
        location: "Brazil",
      },
      {
        name: "Finish Grinding Optimization & Troubleshooting",
        client: "CEMEX, Brooksville Plant",
        location: "Florida, USA",
      },
      {
        name: "Raw Grinding Troubleshooting & Optimization",
        client: "GCC, Pueblo Plant",
        location: "Colorado, USA",
      },
      {
        name: "Finish Grinding Optimization & Troubleshooting",
        client: "Holcim, Nobsa Plant",
        location: "Boyacá, Colombia",
      },
    ],
  },
  {
    id: "03",
    slug: "plant-audits-performance-studies-and-upgrade-evaluation",
    title: "Plant Audits, Performance Studies & Upgrade Evaluation",
    badge: "AUDITS & EVALUATION",
    image: "/images/projects/plant_audits_engineers.jpg",
    description:
      "Comprehensive plant and system assessments combining process analysis, operating data, equipment performance, and field observations to identify improvement opportunities and support technically sound upgrade decisions.",
    projects: [
      {
        name: "Raw Grinding Inspection & Optimization",
        client: "Essroc Cement, Speed Plant",
        location: "Indiana, USA",
      },
      {
        name: "Finish Grinding Baseline Audit",
        client: "Texas Lehigh Cement, Buda Plant",
        location: "Texas, USA",
      },
      {
        name: "Pyroprocess Audit",
        client: "Argos, Harleyville Plant",
        location: "South Carolina, USA",
      },
      {
        name: "Type III Cement Grinding Trial",
        client: "GCC, Pueblo Plant",
        location: "Colorado, USA",
      },
      {
        name: "NOx Reduction Trial & Pyroprocess Audit",
        client: "Buzzi Unicem, Festus Plant",
        location: "Missouri, USA",
      },
      {
        name: "Integrated Plant Process Audit",
        client: "Cimento Nacional / Brennand Cimentos, Sete Lagoas Plant",
        location: "Minas Gerais, Brazil",
      },
      {
        name: "Raw Grinding Optimization & Troubleshooting Audit",
        client: "Lafarge, Richmond Plant",
        location: "British Columbia, Canada",
      },
      {
        name: "Finish Grinding Optimization & Troubleshooting Audit",
        client: "CalPortland, Mojave Plant",
        location: "California, USA",
      },
      {
        name: "Pyroprocess Audit",
        client: "Martin Marietta, Riverside Cement Plant",
        location: "California, USA",
      },
      {
        name: "Raw Grinding Optimization & Troubleshooting Audit",
        client: "Central Plains Cement, Sugar Creek Plant",
        location: "Missouri, USA",
      },
      {
        name: "Raw Grinding Optimization & Upgrade Audit",
        client: "Titan America Cement, Roanoke Plant",
        location: "Virginia, USA",
      },
      {
        name: "Integrated Pyroprocess, Raw & Finish Grinding Upgrade Audit",
        client: "GCC, Pueblo Plant",
        location: "Colorado, USA",
      },
      {
        name: "Performance Guarantee Testing",
        client: "Essroc Italcementi, Martinsburg Plant",
        location: "West Virginia, USA",
      },
      {
        name: "Raw Grinding Optimization & Upgrade Audit",
        client: "Cementos Argos, Harleyville Plant",
        location: "South Carolina, USA",
      },
      {
        name: "Finish Grinding Optimization Audit",
        client: "GCC, Pueblo Plant",
        location: "Colorado, USA",
      },
      {
        name: "Pyroprocess Audit",
        client: "Monarch Cement, Humboldt Plant",
        location: "Kansas, USA",
      },
      {
        name: "Pyroprocess Audit",
        client: "GCC, Tijeras Plant",
        location: "New Mexico, USA",
      },
      {
        name: "Pyroprocess Performance Guarantee Test",
        client: "Ash Grove Cement, Foreman Plant",
        location: "Arkansas, USA",
      },
    ],
  },
  {
    id: "04",
    slug: "commissioning-startup-and-retrofit-support",
    title: "Commissioning, Start-Up & Retrofit Support",
    badge: "COMMISSIONING & STARTUP",
    image: "/images/projects/commissioning_startup.jpg",
    description:
      "Field-based commissioning and start-up experience supporting new plants, grinding systems, pyroprocess upgrades, and retrofit projects from equipment readiness through stabilization and performance verification.",
    projects: [
      {
        name: "Semi-Dry Pyroprocess Conversion Start-Up",
        client: "Ash Grove Cement, Midlothian Plant",
        location: "Texas, USA",
      },
      {
        name: "Finish Grinding Hydraulic Commissioning & Optimization",
        client: "Votorantim Cimentos, Santa Helena Plant",
        location: "São Paulo, Brazil",
      },
      {
        name: "Raw Grinding Retrofit Hydraulic Commissioning & Optimization",
        client: "Ash Grove Cement, Durkee Plant",
        location: "Oregon, USA",
      },
      {
        name: "Finish Grinding Plant Start-Up, Line II",
        client: "Votorantim Cimentos, Sepetiba Plant",
        location: "Rio de Janeiro, Brazil",
      },
      {
        name: "Finish Grinding Plant Start-Up, Line I",
        client: "Votorantim Cimentos, Sepetiba Plant",
        location: "Rio de Janeiro, Brazil",
      },
      {
        name: "Cement Plant Start-Up",
        client: "Ash Grove Cement, Foreman Plant",
        location: "Arkansas, USA",
      },
      {
        name: "Cement Plant Start-Up",
        client: "Holcim, St. Genevieve Plant",
        location: "Missouri, USA",
      },
      {
        name: "Cement Plant Start-Up",
        client: "Caribbean Cement Ltd., Kingston Plant",
        location: "Jamaica",
      },
      {
        name: "Cement Plant Start-Up",
        client: "Emirates Cement, Ras Al Khaimah",
        location: "United Arab Emirates",
      },
      {
        name: "Trona Grinding Mill Commissioning",
        client: "Magadi Soda Company Ltd., Lake Magadi",
        location: "Kenya",
      },
      {
        name: "3,600 TPD Greenfield Clinker Line Commissioning",
        client: "Lafarge Surma Cement",
        location: "Bangladesh / Philippines / China",
      },
    ],
  },
  {
    id: "05",
    slug: "training-and-technical-support",
    title: "Training & Technical Support",
    badge: "TRAINING & SUPPORT",
    image: "/images/projects/training_technical_support.jpg",
    description:
      "Practical knowledge-transfer and technical-support experience designed to strengthen plant teams' understanding of process operation, grinding systems, hydraulics, commissioning, and process simulation.",
    projects: [
      {
        name: "Vertical Finish Grinding Process & Operations Training",
        client: "Argos, Harleyville Plant",
        location: "South Carolina, USA",
      },
      {
        name: "Raw & Coal Grinding Hydraulic Systems Training",
        client: "Martin Marietta Cement, Midlothian Plant",
        location: "Texas, USA",
      },
      {
        name: "Pyroprocess Upgrade Start-Up Training",
        client: "GCC, Tijeras Plant",
        location: "New Mexico, USA",
      },
      {
        name: "Grinding Mills & Clinker Cooler Hydraulic Systems Training",
        client: "Cementos Progreso, San Miguel Plant",
        location: "Guatemala",
      },
      {
        name: "Coal Mill Process Simulator Training",
        client: "PT Vale Inco, Sorowako",
        location: "Indonesia",
      },
    ],
  },
];

export const CASE_STUDIES_LIST = [
  {
    slug: "kiln-combustion-upgrade",
    title: "Kiln Combustion Alternative Fuel Upgrade",
    category: "Cement Plants",
    highlight: "Thermal efficiency boosted by 14%",
    summary:
      "Advanced CFD modeling and combustion optimization to maximize alternative fuel substitution rates in cement pyroprocessing kilns while maintaining clinker quality.",
  },
  {
    slug: "brownfield-conveyor-retrofit",
    title: "Brownfield Conveyor Clash Detection & Retrofit",
    category: "Bulk Material Handling",
    highlight: "Identified 20+ interferences before fabrication",
    summary:
      "High-density 3D laser scanning point-cloud capture and clash detection for complex brownfield transfer chutes, eliminating rework during installation.",
  },
  {
    slug: "boiler-flow-optimization",
    title: "Boiler Flow Modeling & CFD Audit",
    category: "Power Generation",
    highlight: "Completely resolved localized hot spots",
    summary:
      "3D flue gas hydrodynamic and heat transfer CFD analysis to eliminate severe thermal tube degradation and maldistribution in utility boilers.",
  },
];
