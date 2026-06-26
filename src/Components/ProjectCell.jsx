import { useRef } from "react";
import gsap from "gsap";
import { PX10, PX25, SANS } from "./constants";

// ─── Project Cell — pixel flood + slide-up details ────────────────────────────
const PC = 16, PR = 8;

export default function ProjectCell({ p, idx }) {
  const gridRef   = useRef(null);
  const detailRef = useRef(null);

  const flood = () => {
    const cells = Array.from(gridRef.current.children);
    gsap.killTweensOf(cells);
    gsap.to(cells, { opacity: 1, duration: 0.1, stagger: { amount: 0.3, from: "random" }, ease: "none" });
    gsap.to(detailRef.current, { yPercent: 0, duration: 0.45, ease: "power3.out" });
  };
  const drain = () => {
    const cells = Array.from(gridRef.current.children);
    gsap.killTweensOf(cells);
    gsap.to(cells, { opacity: 0, duration: 0.1, stagger: { amount: 0.2, from: "random" }, ease: "none" });
    gsap.to(detailRef.current, { yPercent: 100, duration: 0.35, ease: "power2.in" });
  };

  return (
    <a href={p.link} target="_blank" rel="noopener noreferrer" onMouseEnter={flood} onMouseLeave={drain} style={{
      background: "#0a0a0a", position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column",
      justifyContent: "flex-end", padding: "1.5rem 2rem",
      cursor: "pointer", minHeight: 0, minWidth: 0,
      textDecoration: "none", color: "inherit",
    }}>
      <div ref={gridRef} style={{
        position: "absolute", inset: 0, display: "grid",
        gridTemplateColumns: `repeat(${PC}, 1fr)`,
        gridTemplateRows:    `repeat(${PR}, 1fr)`,
        pointerEvents: "none",
      }}>
        {Array.from({ length: PC * PR }).map((_, i) => (
          <div key={i} style={{ opacity: 0, background: "#fff" }} />
        ))}
      </div>

      <span style={{ position: "relative", zIndex: 1, fontFamily: PX10, fontSize: "0.68rem", color: "rgba(255,255,255,0.22)", letterSpacing: "0.2em", marginBottom: "0.5rem", mixBlendMode: "difference" }}>
        [{p.n}] {p.year}
      </span>
      <h3 style={{ position: "relative", zIndex: 1, fontFamily: PX25, fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)", color: "#fff", letterSpacing: "0.06em", margin: 0, lineHeight: 1, mixBlendMode: "difference" }}>
        {p.title}
      </h3>

      {/* Detail panel slides up on hover */}
      <div ref={detailRef} style={{
        position: "absolute", inset: 0, background: "#fff", color: "#000",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "1.5rem 2rem", transform: "translateY(100%)", zIndex: 5,
      }}>
        <span style={{ fontFamily: PX10, fontSize: "0.65rem", letterSpacing: "0.2em", opacity: 0.4, marginBottom: "0.5rem" }}>
          [{p.n}] {p.year}
        </span>
        <h3 style={{ fontFamily: PX25, fontSize: "clamp(1.2rem, 2vw, 1.9rem)", letterSpacing: "0.06em", margin: "0 0 0.8rem" }}>
          {p.title}
        </h3>
        <p style={{ fontFamily: SANS, fontSize: "clamp(0.8rem, 1.1vw, 1rem)", lineHeight: 1.7, opacity: 0.65, margin: "0 0 0.9rem" }}>
          {p.desc}
        </p>
        <span style={{ fontFamily: PX10, fontSize: "0.62rem", letterSpacing: "0.15em", opacity: 0.35 }}>
          {p.type}
        </span>
      </div>
    </a>
  );
}
