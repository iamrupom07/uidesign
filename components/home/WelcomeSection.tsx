"use client";

import Link from "next/link";
import { companyInfo } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

function PercentCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState("0.00");

  useEffect(() => {
    if (!inView) return;
    const duration = 800;
    const start = performance.now();
    let frame: number;

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = eased * value;
      setDisplay(val.toFixed(2));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return <span ref={ref}>{display}%</span>;
}

export default function WelcomeSection() {
  return (
    <section className="py-xl bg-background overflow-hidden blueprint-mesh border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-lg lg:gap-xl items-stretch">
        <Reveal>
          <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
            <span className="text-primary font-bold mr-1">┌</span> ABOUT MACPROTEC
          </div>
          <h2 className="mb-4 font-display font-extrabold text-3xl sm:text-4xl text-foreground leading-[1.15] uppercase">
            Built on process, not <span className="text-primary">promises</span>
          </h2>
          <p className="body-md mt-5 max-w-xl text-secondary">
            {companyInfo.description}
          </p>
          <Link
            href="/our-services"
            className="button-outline inline-block mt-8 text-center"
          >
            Discover Our Services
          </Link>
        </Reveal>

        <Reveal delay={0.15} className="h-full">
          <div className="relative h-full rounded-none bg-white border border-border p-8 flex flex-col justify-between">
            <div className="grain" />
            <div>
              <div className="font-mono text-[11px] font-bold text-primary tracking-widest uppercase mb-4">
                <span className="text-primary font-bold mr-1">┌</span> PROGRESS METRIC
              </div>
              <p className="font-display font-extrabold text-lg text-foreground tracking-tight uppercase">
                Plant Performance Progress
              </p>
              <p className="font-mono text-[9px] font-semibold text-secondary tracking-widest uppercase mt-0.5">
                Infrastructure Protection
              </p>
              
              <div className="mt-6 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                <span className="font-display font-extrabold text-4xl sm:text-5xl text-foreground tracking-tight">
                  <PercentCounter value={99.98} />
                </span>
                <span className="font-mono text-[10px] font-bold text-emerald-600 tracking-wide uppercase">
                  ↑ 0.05% IMPROVEMENT SINCE SCROLL
                </span>
              </div>
            </div>

            {/* Replicated Red vertical bar progress meter with staggered scale anims */}
            <div className="flex gap-1 items-center mt-8 w-full">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.15 + i * 0.025,
                  }}
                  className={`h-12 flex-1 max-w-[12px] origin-bottom ${
                    i < 16 ? "bg-primary" : "bg-slate-100"
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
