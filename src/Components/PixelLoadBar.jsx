import { useEffect, useRef } from "react";
import gsap from "gsap";

// ─── Pixel load bar ────────────────────────────────────────────────────────────
export default function PixelLoadBar() {
  const TOTAL = 25;
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const cells = Array.from(ref.current.children);
    gsap.fromTo(cells,
      { opacity: 0.08 },
      { opacity: 1, duration: 0.04, stagger: { amount: 1.2, from: "start" }, ease: "none", delay: 0.7 }
    );
  }, []);
  return (
    <div ref={ref} style={{ display: "flex", gap: "3px", flex: 1 }}>
      {Array.from({ length: TOTAL }).map((_, i) => (
        <div key={i} style={{ flex: 1, height: "10px", background: "#000", opacity: 0.08 }} />
      ))}
    </div>
  );
}
