import { BEBAS, PX10, PX25 } from "./constants";
import ScanBar from "./ScanBar";
import StaggeredAbout from "./StaggeredAbout";
import PixelLoadBar from "./PixelLoadBar";

// ─── About Slide ───────────────────────────────────────────────────────────────
export default function AboutSlide() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#fff", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      <ScanBar dark />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 8vw" }}>
        <p className="slide-text" style={{ fontFamily: PX25, fontSize: "1rem", letterSpacing: "0.25em", color: "rgba(0,0,0,0.35)", marginBottom: "2.5rem" }}>
          &gt; WHO_I_AM.EXE
        </p>
        <h2 className="slide-text" style={{
          fontFamily: BEBAS, fontSize: "clamp(3rem, 10vw, 11rem)",
          color: "#000", lineHeight: 0.88, letterSpacing: "0.02em", marginBottom: "3rem",
        }}>
          BUILDING THE SHARP<br/>EDGE OF THE WEB.
        </h2>

        <div style={{ display: "flex", gap: "6vw", flexWrap: "wrap" }}>
          {/* Word stagger paragraph */}
          <StaggeredAbout />

          {/* Pixel-style tech list */}
          <div className="slide-text" style={{ display: "flex", flexDirection: "column", gap: "0.5rem", justifyContent: "center" }}>
            {["REACT.JS", "NEXT.JS & VITE+", "GSAP & MOTION.DEV", "KOTLIN & JAVA"].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ fontFamily: PX10, fontSize: "0.75rem", color: "rgba(0,0,0,0.3)" }}>
                  [{String(i + 1).padStart(2, "0")}]
                </span>
                <span style={{ fontFamily: PX25, fontSize: "1rem", letterSpacing: "0.08em", color: "rgba(0,0,0,0.6)" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="slide-text" style={{
        borderTop: "1px solid rgba(0,0,0,0.08)", padding: "0.8rem 8vw",
        display: "flex", alignItems: "center", justifyContent:"start", gap: "1rem",
      }}>
        <span style={{ fontFamily: PX10, fontSize: "0.72rem", color: "rgba(0,0,0,0.3)", flexShrink: 0 }}>B·Tech</span>
        <span style={{ fontFamily: PX10, fontSize: "0.72rem", color: "rgba(0,0,0,0.3)", flexShrink: 0 }}>Diploma in Computer Engineering </span>
      </div>
    </div>
  );
}
