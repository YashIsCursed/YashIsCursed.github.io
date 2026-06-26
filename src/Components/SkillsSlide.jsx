import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { PX10, PX25, BEBAS, SKILLS } from "./constants";

// ─── Hex geometry ──────────────────────────────────────────────────────────────
const HEX_CLIP = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
const HEX_H    = 1.1547; // height = width × HEX_H for a regular pointy-top hex

// ─── Orbital rings  (sizes grow outward) ──────────────────────────────────────
const RINGS = [
  { radius: 200, size:  86, speed: 0.0036, dir:  1 }, // inner  CW  — smallest
  { radius: 355, size: 106, speed: 0.0021, dir: -1 }, // mid   CCW  — medium
  { radius: 505, size: 126, speed: 0.0013, dir:  1 }, // outer  CW  — largest
];
const CENTER_SIZE = 130;

// ─── Per-category accent palette ──────────────────────────────────────────────
const CAT_ACCENT = {
  LANGUAGE: "#c9b1ff",
  FRONTEND: "#4ecdc4",
  MOTION:   "#f4a261",
  AI:       "#ff99c8",
  TOOLING:  "#ffe08a",
  GRAPHICS: "#a8d8ea",
};

// ─── Distribute orbital skills across rings ────────────────────────────────────
function buildRings(skills) {
  const orbital = skills.filter(s => !s.center);
  const n       = orbital.length;
  const r0      = Math.ceil(n / 3);
  const r1      = Math.ceil((n - r0) / 2);
  const r2      = n - r0 - r1;
  return [orbital.slice(0, r0), orbital.slice(r0, r0 + r1), orbital.slice(r0 + r1)];
}

// ─── Two-layer hexagon shell ───────────────────────────────────────────────────
// Key rule: never put a `transform` style on this element — GSAP owns that.
function HexShell({ size, fill, border, transMs = 320, children, ...rest }) {
  const h  = Math.round(size * HEX_H);
  const si = size - 3;
  const hi = Math.round(si * HEX_H);
  const bgTrans = `background ${transMs}ms ease`;
  return (
    <div style={{ width: size, height: h, clipPath: HEX_CLIP, background: border, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: bgTrans, animationDelay:0.25 }} {...rest}>
      <div style={{ width: si, height: hi, clipPath: HEX_CLIP, background: fill, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px", overflow: "hidden", transition: bgTrans }}>
        {children}
      </div>
    </div>
  );
}

// ─── Skill hexagon card ────────────────────────────────────────────────────────
function SkillHex({ skill, size, state, transMs = 320, onEnter, onLeave }) {
  const accent    = CAT_ACCENT[skill.cat] || "#fff";
  const fs        = Math.max(9, Math.round(size * 0.122));
  const isActive  = state === "active";
  const isPeer    = state === "peer";
  const dur       = `${transMs}ms`;

  return (
    <HexShell
      size={size}
      fill={isActive ? "#fff" : isPeer ? "#181818" : "#0c0c0c"}
      border={isActive ? "#fff" : isPeer ? accent + "cc" : accent + "44"}
      transMs={transMs}
      style={{ cursor: "crosshair" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <span style={{
        fontFamily: PX25, fontSize: fs + "px",
        letterSpacing: "0.07em",
        color: isActive ? "#000" : isPeer ? "#fff" : "#aaa",
        textAlign: "center", lineHeight: 1.15,
        padding: "0 6px", userSelect: "none",
        transition: `color ${dur}`,
      }}>
        {skill.label}
      </span>
      <div style={{
        width: isActive ? "55%" : isPeer ? "40%" : "18%",
        height: "1.5px",
        background: isActive ? "rgba(0,0,0,0.25)" : accent,
        transition: `width ${dur} ease`,
      }} />
    </HexShell>
  );
}

// ─── Dot-grid background ───────────────────────────────────────────────────────
function DotGrid() {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
      <defs>
        <pattern id="sk-dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="rgba(255,255,255,0.07)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#sk-dots)" />
    </svg>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function SkillsSlide() {
  const rings       = useMemo(() => buildRings(SKILLS), []);
  const centerSkill = SKILLS.find(s => s.center);
  const flatSkills  = useMemo(() => rings.flat(), [rings]);

  // ringOffset[ri] = starting flat-index of ring ri
  const ringOffset = useMemo(() => {
    const o = [0];
    rings.forEach((r, i) => { if (i < rings.length - 1) o.push(o[i] + r.length); });
    return o;
  }, [rings]);

  // posRefs[ri][si] — GSAP writes x,y here; React must NOT write transform here
  const posRefs  = useRef([[], [], []]);
  // scalRefs[ri][si] — React writes scale/opacity here via CSS only
  const scalRefs = useRef([[], [], []]);
  const overlayRef = useRef(null);

  const [hoveredIdx, setHoveredIdx] = useState(null);
  const hoveredSkill = hoveredIdx !== null ? flatSkills[hoveredIdx] : null;
  const hoveredCat   = hoveredSkill?.cat ?? null;
  const accent       = hoveredSkill ? (CAT_ACCENT[hoveredSkill.cat] || "#fff") : "rgba(255,255,255,0.18)";

  // ── Orbital ticker — touches posRefs only ──────────────────────────────────
  useEffect(() => {
    const angles = RINGS.map(() => -Math.PI / 2);

    // Set initial positions immediately
    rings.forEach((ring, ri) => {
      ring.forEach((_, si) => {
        const el = posRefs.current[ri][si];
        if (!el) return;
        const a = (Math.PI * 2 / ring.length) * si + angles[ri];
        gsap.set(el, { x: Math.cos(a) * RINGS[ri].radius, y: Math.sin(a) * RINGS[ri].radius });
      });
    });

    const tick = () => {
      rings.forEach((ring, ri) => {
        const { radius, speed, dir } = RINGS[ri];
        angles[ri] += speed * dir;
        ring.forEach((_, si) => {
          const el = posRefs.current[ri][si];
          if (!el) return;
          const a = (Math.PI * 2 / ring.length) * si + angles[ri];
          gsap.set(el, { x: Math.cos(a) * radius, y: Math.sin(a) * radius });
        });
      });
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [rings]);

  // ── Dim overlay — GSAP on its own element ─────────────────────────────────
  useEffect(() => {
    const leaving = hoveredIdx === null;
    gsap.to(overlayRef.current, {
      opacity: leaving ? 0 : 1,
      duration: leaving ? 0.75 : 0.32,
      ease: "power2.out",
    });
  }, [hoveredIdx]);

  // ── Scale/opacity — pure CSS transitions on scalRefs ─────────────────────
  // Writes to the CHILD scaler element (never the GSAP positioner).
  // transMs: 320ms on enter, 750ms on leave so the reset feels gentle.
  useEffect(() => {
    const transMs = hoveredIdx !== null ? 500 : 750;
    const durS    = transMs / 1000;
    const trans   = `transform ${durS}s cubic-bezier(0.34,1.56,0.64,1), opacity ${durS}s ease`;

    rings.forEach((ring, ri) => {
      ring.forEach((skill, si) => {
        const el = scalRefs.current[ri][si];
        if (!el) return;
        el.style.transition = trans;
        const flatIdx = ringOffset[ri] + si;
        let scale   = 1;
        let opacity = 1;
        if (hoveredIdx !== null) {
          if (flatIdx === hoveredIdx)         { scale = 1.28; opacity = 1; }
          else if (skill.cat === hoveredCat)  { scale = 1.14; opacity = 1; }
          else                                { scale = 0.88; opacity = 0.22; }
        }
        el.style.transform = `scale(${scale})`;
        el.style.opacity   = String(opacity);
      });
    });
  }, [hoveredIdx, hoveredCat, rings, ringOffset]);

  const getState = (skill, flatIdx) => {
    if (hoveredIdx === null)          return "idle";
    if (flatIdx === hoveredIdx)       return "active";
    if (skill.cat === hoveredCat)     return "peer";
    return "dim";
  };

  return (
    <div style={{ width: "100%", height: "100%", background: "#050505", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>

      {/* Backgrounds */}
      {/* <DotGrid /> */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 68%)" }} />

      {/* Category dim overlay — GSAP animates opacity via ref */}
      <div ref={overlayRef} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)", opacity: 0, pointerEvents: "none", zIndex: 8 }} />

      {/* Dashed orbit rings */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }}>
        <g transform="translate(50%, 50%)">
          {RINGS.map((r, i) => (
            <g key={i}>
              <circle r={r.radius} fill="none" stroke="rgba(255,255,255,0.055)" strokeWidth="1" strokeDasharray={i === 0 ? "4 10" : i === 1 ? "5 13" : "6 16"} />
              <circle r={r.radius} fill="none" stroke="rgba(255,255,255,0.012)" strokeWidth={10 + i * 4} />
            </g>
          ))}
        </g>
      </svg>

      {/* Top label */}
      <div className="slide-text" style={{ position: "absolute", top: "1.4rem", left: "5vw", fontFamily: PX10, fontSize: "0.68rem", color: "rgba(255,255,255,0.18)", letterSpacing: "0.3em", zIndex: 20 }}>
        [03] SKILLS
      </div>

      {/* Hover detail panel — bottom-left */}
      <div style={{ position: "absolute", bottom: "3.5rem", left: "5vw", borderLeft: `2px solid ${accent}`, paddingLeft: "1.2rem", transition: "border-color 0.3s", minHeight: "4.5rem", display: "flex", flexDirection: "column", justifyContent: "center", zIndex: 20 }}>
        {hoveredSkill ? (
          <>
            <span style={{ fontFamily: BEBAS, fontSize: "clamp(1.8rem, 3vw, 3rem)", color: "#fff", letterSpacing: "0.03em", lineHeight: 1 }}>{hoveredSkill.label}</span>
            <span style={{ fontFamily: PX10, fontSize: "0.68rem", color: "rgba(255,255,255,0.38)", letterSpacing: "0.22em", marginTop: "5px" }}>{hoveredSkill.sub}</span>
            <span style={{ fontFamily: PX10, fontSize: "0.58rem", color: accent, letterSpacing: "0.25em", marginTop: "3px" }}>{hoveredSkill.cat}</span>
          </>
        ) : (
          <span style={{ fontFamily: PX10, fontSize: "0.65rem", color: "rgba(255,255,255,0.12)", letterSpacing: "0.25em" }}>HOVER A HEX TO INSPECT</span>
        )}
      </div>

      {/* Category badge — bottom-right */}
      {hoveredCat && (
        <div style={{ position: "absolute", bottom: "3.5rem", right: "5vw", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px", zIndex: 20 }}>
          <span style={{ fontFamily: PX10, fontSize: "0.58rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em" }}>CATEGORY</span>
          <span style={{ fontFamily: BEBAS, fontSize: "1.6rem", color: accent, letterSpacing: "0.06em", lineHeight: 1 }}>{hoveredCat}</span>
          <span style={{ fontFamily: PX10, fontSize: "0.55rem", color: "rgba(255,255,255,0.15)", letterSpacing: "0.18em" }}>
            {flatSkills.filter(s => s.cat === hoveredCat).length} SKILLS
          </span>
        </div>
      )}

      {/* ── Orbital system centered at (50%, 50%) ── */}
      <div style={{ position: "relative", width: 0, height: 0, zIndex: 10 }}>

        {/* Center hex */}
        <div style={{ position: "absolute", left: -(CENTER_SIZE / 2), top: -(Math.round(CENTER_SIZE * HEX_H) / 2), zIndex: 15 }}>
          <HexShell size={CENTER_SIZE} fill="#fff" border="#fff">
            <span style={{ fontFamily: BEBAS, fontSize: "1.35rem", color: "#000", letterSpacing: "0.04em", lineHeight: 1, textAlign: "center", padding: "0 8px" }}>
              {centerSkill?.label ?? "YB"}
            </span>
            <span style={{ fontFamily: PX10, fontSize: "0.42rem", color: "rgba(0,0,0,0.38)", letterSpacing: "0.28em" }}>
              {centerSkill?.sub ?? "DEV"}
            </span>
          </HexShell>
        </div>

        {/* Rings */}
        {rings.map((ring, ri) =>
          ring.map((skill, si) => {
            const sz      = RINGS[ri].size;
            const flatIdx = ringOffset[ri] + si;
            const state   = getState(skill, flatIdx);
            const zIdx    = state === "active" ? 14 : state === "peer" ? 12 : 5;

            return (
              // positioner: GSAP writes x/y here — React must NOT write `transform` on this div
              <div
                key={`${ri}-${si}`}
                ref={el => { posRefs.current[ri][si] = el; }}
                style={{
                  position: "absolute",
                  left: -(sz / 2),
                  top:  -(Math.round(sz * HEX_H) / 2),
                  zIndex: zIdx,
                }}
              >
                {/* scaler: React writes transform:scale and opacity here — safe, separate element */}
                {/* Initial transition set here; overridden imperatively in useEffect with correct duration */}
                <div
                  ref={el => { scalRefs.current[ri][si] = el; }}
                  style={{ transition: "transform 0.32s cubic-bezier(0.34,1.56,0.64,1), opacity 0.32s ease" }}
                >
                  <SkillHex
                    skill={skill}
                    size={sz}
                    state={state}
                    transMs={hoveredIdx !== null ? 320 : 750}
                    onEnter={() => setHoveredIdx(flatIdx)}
                    onLeave={() => setHoveredIdx(null)}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="slide-text" style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderTop: "1px solid rgba(255,255,255,0.05)", padding: "0.75rem 5vw", display: "flex", justifyContent: "space-between", fontFamily: PX10, fontSize: "0.62rem", color: "rgba(255,255,255,0.09)", letterSpacing: "0.2em", zIndex: 20 }}>
        <span>{flatSkills.length} SKILLS · {rings.length} RINGS</span>
        <span>RING 1 ↻ · RING 2 ↺ · RING 3 ↻</span>
      </div>
    </div>
  );
}
