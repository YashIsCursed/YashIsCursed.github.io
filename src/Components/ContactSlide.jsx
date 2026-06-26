import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BEBAS, SERIF, PX10, PX25, SANS } from "./constants";

// ─── Noise canvas overlay ──────────────────────────────────────────────────────
function NoiseCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx    = canvas.getContext("2d");
    let frame;
    const draw = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const img = ctx.createImageData(canvas.width, canvas.height);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255;
        img.data[i]     = v;
        img.data[i + 1] = v;
        img.data[i + 2] = v;
        img.data[i + 3] = 18; // very faint
      }
      ctx.putImageData(img, 0, 0);
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <canvas ref={ref} style={{
      position: "absolute", inset: 0, width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 1, mixBlendMode: "screen",
    }} />
  );
}

// ─── Scrolling marquee ticker ──────────────────────────────────────────────────
function Marquee({ text, speed = 40 }) {
  const trackRef = useRef(null);
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const clone = el.children[0].cloneNode(true);
    el.appendChild(clone);
    const totalW = el.children[0].offsetWidth;
    gsap.to(el, {
      x: -totalW,
      duration: speed,
      ease: "none",
      repeat: -1,
    });
  }, [speed]);
  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap", width: "100%" }}>
      <div ref={trackRef} style={{ display: "inline-flex" }}>
        <span style={{
          fontFamily: BEBAS,
          fontSize: "clamp(4rem, 8vw, 9rem)",
          letterSpacing: "0.03em",
          color: "rgba(255,255,255,0.06)",
          paddingRight: "4vw",
          display: "inline-block",
          userSelect: "none",
        }}>
          {text}
        </span>
      </div>
    </div>
  );
}

// ─── Glitch line decorations ───────────────────────────────────────────────────
function GlitchLines() {
  const refs = useRef([]);
  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        scaleX: Math.random() * 0.4 + 0.6,
        opacity: Math.random() * 0.5 + 0.1,
        duration: 0.08 + Math.random() * 0.12,
        repeat: -1,
        yoyo: true,
        delay: i * 0.15,
        ease: "steps(1)",
        transformOrigin: "left",
      });
    });
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3px", marginBottom: "2rem" }}>
      {[80, 55, 35, 70, 45].map((w, i) => (
        <div
          key={i}
          ref={el => refs.current[i] = el}
          style={{
            width: `${w}px`, height: "2px",
            background: "rgba(255,255,255,0.25)",
          }}
        />
      ))}
    </div>
  );
}

// ─── Animated email link ───────────────────────────────────────────────────────
function EmailLink({ align = "left" }) {
  const ref     = useRef(null);
  const lineRef = useRef(null);
  const origin  = align === "right" ? "right" : "left";

  const enter = () => {
    gsap.to(lineRef.current, { scaleX: 1, duration: 0.4, ease: "power3.out" });
    gsap.to(ref.current, { color: "#fff", duration: 0.25 });
  };
  const leave = () => {
    gsap.to(lineRef.current, { scaleX: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(ref.current, { color: "rgba(255,255,255,0.55)", duration: 0.25 });
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <a
        ref={ref}
        href="mailto:yash.mahendra.bokade@gmail.com"
        onMouseEnter={enter}
        onMouseLeave={leave}
        style={{
          fontFamily: SERIF,
          fontStyle: "italic",
          fontSize: "clamp(1.1rem, 2.2vw, 2rem)",
          color: "rgba(255,255,255,0.55)",
          textDecoration: "none",
          letterSpacing: "0.04em",
          display: "block",
          paddingBottom: "6px",
          textAlign: align,
        }}
      >
        yash.mahendra.bokade@gmail.com
      </a>
      <div
        ref={lineRef}
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
          background: "rgba(255,255,255,0.5)",
          transform: "scaleX(0)", transformOrigin: origin,
        }}
      />
    </div>
  );
}

// ─── Social pill button ────────────────────────────────────────────────────────
function SocialPill({ href, label }) {
  const ref = useRef(null);
  const enter = () => gsap.to(ref.current, { background: "#fff", color: "#000", duration: 0.2, ease: "power2.out" });
  const leave = () => gsap.to(ref.current, { background: "transparent", color: "rgba(255,255,255,0.6)", duration: 0.2 });

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={enter}
      onMouseLeave={leave}
      style={{
        fontFamily: PX25, fontSize: "0.9rem", letterSpacing: "0.12em",
        color: "rgba(255,255,255,0.6)", textDecoration: "none",
        border: "1px solid rgba(255,255,255,0.2)",
        padding: "0.55rem 1.4rem",
        cursor: "pointer", display: "inline-block",
        transition: "border-color 0.2s",
      }}
    >
      {label}
    </a>
  );
}

// ─── Contact Slide — editorial full-dark centered layout ──────────────────────
export default function ContactSlide() {
  const headRef  = useRef(null);
  const bodyRef  = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 0.15 }
    );
    gsap.fromTo(
      bodyRef.current.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out", delay: 0.45 }
    );
  }, []);

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#050505",
      display: "flex", flexDirection: "column",
      position: "relative", overflow: "hidden",
    }}>
      <NoiseCanvas />

      {/* ── Background repeating marquee rows ── */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        justifyContent: "center", gap: "0", pointerEvents: "none", zIndex: 0,
        overflow: "hidden",
      }}>
        {["GET IN TOUCH · COLLABORATE · BUILD · ", "OPEN TO WORK · HIRE ME · LET'S CREATE · "].map((t, i) => (
          <Marquee key={i} text={t + t} speed={i % 2 === 0 ? 35 : 28} />
        ))}
      </div>

      {/* ── Top label bar ── */}
      <div className="slide-text" style={{
        position: "relative", zIndex: 5,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "1rem 5vw",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexShrink: 0,
      }}>
        <span style={{ fontFamily: PX10, fontSize: "0.68rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)" }}>
          [04] CONTACT
        </span>
        <span style={{ fontFamily: PX10, fontSize: "0.68rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.15)" }}>
          STATUS: OPEN TO WORK
        </span>
      </div>

      {/* ── Center content — two columns ── */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "row",
        alignItems: "flex-end",
        padding: "4vw 8vw", position: "relative", zIndex: 5,
        gap: "4vw",
      }}>
        {/* Left: big headline + glitch lines */}
        <div style={{ flex: "1 1 0", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <GlitchLines />
          <h2
            ref={headRef}
            className="slide-text"
            style={{
              fontFamily: BEBAS,
              fontSize: "clamp(4.5rem, 11vw, 14rem)",
              color: "#fff",
              lineHeight: 0.87,
              letterSpacing: "0.01em",
              margin: 0,
              opacity: 0,
            }}
          >
            LET'S<br />
            <span style={{ color: "rgba(255,255,255,0.2)" }}>BUILD</span><br />
            TOGETHER.
          </h2>
        </div>

        {/* Right: email + social + tagline */}
        <div
          ref={bodyRef}
          style={{
            flex: "0 0 auto",
            display: "flex", flexDirection: "column",
            alignItems: "flex-end",
            gap: "1.6rem",
            paddingBottom: "0.5rem",
            minWidth: "min(380px, 38vw)",
          }}
        >
          {/* Email */}
          <EmailLink align="right" />

          {/* Social links */}
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
            <SocialPill href="https://github.com/Yash-Bokade" label="GITHUB →" />
            <SocialPill href="https://linkedin.com/in/YashBokade" label="LINKEDIN →" />
            <SocialPill href="tel:+918459850489" label="+91 8459850489" />
          </div>

          {/* Tagline */}
          <p style={{
            fontFamily: SANS,
            fontSize: "clamp(0.8rem, 1.1vw, 1rem)",
            color: "rgba(255,255,255,0.22)",
            letterSpacing: "0.05em",
            lineHeight: 1.7,
            maxWidth: "340px",
            margin: 0,
            textAlign: "right",
          }}>
            Available for freelance, full-time &amp; collaborative projects.<br />
            Response within 24 hours.
          </p>
        </div>
      </div>

      {/* ── Footer bar ── */}
      <div className="slide-text" style={{
        position: "relative", zIndex: 5,
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "0.9rem 8vw",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexShrink: 0,
      }}>
        <span style={{ fontFamily: PX10, fontSize: "0.65rem", color: "rgba(255,255,255,0.15)", letterSpacing: "0.2em" }}>
          © {new Date().getFullYear()} YASH BOKADE
        </span>
        <span style={{ fontFamily: PX10, fontSize: "0.65rem", color: "rgba(255,255,255,0.12)", letterSpacing: "0.2em" }}>
          INDIA · COMPUTER ENGINEER
        </span>
      </div>
    </div>
  );
}
