"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { IconChevronDown } from "@/components/ui/Icons";

const faqs = [
  {
    question: "What industries does MACPROTEC serve?",
    answer:
      "We work primarily with cement plants and terminals, mining and aggregates operations, bulk material handling facilities, chemical and petrochemical plants, power generation, and lime production — heavy-process industries where uptime and thermal efficiency are critical.",
  },
  {
    question: "Do you handle projects from concept through commissioning?",
    answer:
      "Yes. Our engineering design services span feasibility studies, FEED, and basic and detail engineering across process, mechanical, piping, civil/structural, electrical, and I&C disciplines, through to EPC technical support and on-site commissioning.",
  },
  {
    question: "What is CFD and process simulation used for?",
    answer:
      "CFD, thermal, and FEA simulations let us validate flow, combustion, and structural behavior before capital is committed — reducing risk on kiln retrofits, dust collection systems, pipe stress, and equipment performance upgrades.",
  },
  {
    question: "Can you scan and reverse-engineer an existing plant?",
    answer:
      "Yes. Our 3D laser scanning teams capture point-cloud data on-site, convert it to CAD, and produce as-built documentation, retrofit engineering packages, fabrication drawings, and clash detection reports.",
  },
  {
    question: "Do you offer training for plant personnel?",
    answer:
      "Through CementX LMS we deliver corporate, plant-specific, online, and on-site training on cement manufacturing, kiln operation, grinding technology, process and maintenance engineering, and digital twin/AI topics.",
  },
  {
    question: "What engagement models do you offer?",
    answer:
      "We support project-based FEED and basic-design engagements as well as long-term operational support SLAs with continuous monitoring, optimization reviews, and 24/7 technical support.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-xl bg-background border-t border-border blueprint-mesh">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <Reveal className="text-center mb-14">
          <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4 justify-center flex">
            <span className="text-primary font-bold mr-1">┌</span> FAQ
          </div>
          <h2 className="mb-4 font-display font-extrabold text-3xl text-foreground uppercase">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="body-md text-secondary mt-4">
            Answers to the questions we hear most from plant owners and operations teams.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border border-border bg-white divide-y divide-border">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-bold text-sm sm:text-base text-foreground uppercase">
                      {faq.question}
                    </span>
                    <IconChevronDown
                      className={`w-4 h-4 text-primary shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-200 ease-standard ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-xs sm:text-sm text-secondary leading-relaxed font-sans max-w-2xl">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
