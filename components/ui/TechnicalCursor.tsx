"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function TechnicalCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    gsap.set([outer, inner], { opacity: 0 });

    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        gsap.to([outer, inner], { opacity: 1, duration: 0.2 });
        isVisible = true;
      }
      gsap.to(outer, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power2.out",
      });
      gsap.to(inner, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <>
      <div
        ref={outerRef}
        className="pointer-events-none fixed top-0 left-0 w-7 h-7 border border-primary/60 -translate-x-1/2 -translate-y-1/2 z-[100] hidden sm:block"
        style={{ mixBlendMode: "difference" }}
      />
      <div
        ref={innerRef}
        className="pointer-events-none fixed top-0 left-0 w-1.5 h-1.5 bg-primary -translate-x-1/2 -translate-y-1/2 z-[100] hidden sm:block"
        style={{ mixBlendMode: "difference" }}
      />
    </>
  );
}
