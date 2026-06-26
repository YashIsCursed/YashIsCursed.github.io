// ─── Font constants ────────────────────────────────────────────────────────────
export const PX25 = "'Jersey 25', monospace";
export const PX10 = "'Jersey 10', monospace";
export const BEBAS = "'Bebas Neue', sans-serif";
export const SERIF = "'Bodoni Moda', serif";
export const SANS = "'Khand', sans-serif";

// ─── Slide definitions ─────────────────────────────────────────────────────────
export const SLIDES = [
  { id: "hero", label: "00", name: "HOME" },
  { id: "about", label: "01", name: "ABOUT" },
  { id: "work", label: "02", name: "WORK" },
  { id: "skills", label: "03", name: "SKILLS" },
  { id: "contact", label: "04", name: "CONTACT" },
];

// ─── Project data ──────────────────────────────────────────────────────────────
export const PROJECTS = [
  { n: "001", title: "INFINITY TAB", type: "REACT", year: "2026", desc: "This is a Web browser extension that allows user to customize their new tab page", link: "https://github.com/Yash-Bokade/infinite-newtab" },
  { n: "002", title: "AI COUNCIL", type: "REACT, MISTRAL-AI", year: "2026", desc: "5 distinct AI personalities and The Concluder, synthesizes everything into a clear, actionable answer:\"What should you really do?\"", link: "https://github.com/Yash-Bokade/ai_Emotion_Actions" },
  { n: "003", title: "CLI HELPER", type: "KOTLIN, MISTRAL-AI", year: "2026", desc: "A command-line tool built with Kotlin, A Ito translate natural language into executable commands", link: "https://github.com/Yash-Bokade/cliHelper" },
  { n: "004", title: "AWAYSPOT", type: "JSP TOMCAT", year: "2025", desc: "A JSP Web Project for hotels Booking, and Renting Using Tomcat Server,", link: "https://github.com/Yash-Bokade/Awayspot" },
  { n: "005", title: "PYTHON MP", type: "PYTHON", year: "2025", desc: "A Micro-Project for Python simple GUI application for task management (CRUD)", link: "https://github.com/Yash-Bokade/Python-Project-Task-Management" },
];

// ─── Skills data ───────────────────────────────────────────────────────────────
// Add / remove / reorder freely — the orbital layout adapts automatically.
// Exactly ONE skill should have `center: true` (the hub of the diagram).
export const SKILLS = [
  // ── Center ──
  { label: "COMPUTER ENGG", sub: "DESIGN + CODE", cat: "FRONTEND", center: true },

  // ── Programming Languages ──
  { label: "JAVASCRIPT", sub: "SCRIPTING", cat: "LANGUAGE" },
  { label: "TYPESCRIPT", sub: "TYPE SYSTEM", cat: "LANGUAGE" },
  { label: "HTML5 & CSS3", sub: "WEB MARKUP", cat: "LANGUAGE" },
  { label: "PYTHON", sub: "GENERAL PURPOSE", cat: "LANGUAGE" },
  { label: "JAVA", sub: "OOP LANGUAGE", cat: "LANGUAGE" },
  { label: "KOTLIN", sub: "JVM LANGUAGE", cat: "LANGUAGE" },

  // ── Web Frameworks ──
  { label: "REACT.JS", sub: "UI FRAMEWORK", cat: "FRONTEND" },
  { label: "NEXT.JS", sub: "META-FRAMEWORK", cat: "FRONTEND" },
  { label: "VITE+", sub: "BUILD TOOL", cat: "FRONTEND" },
  { label: "NODE.JS", sub: "BACKEND RUNTIME", cat: "FRONTEND" },
  { label: "GSAP", sub: "ANIMATION ENGINE", cat: "MOTION" },
  { label: "MOTION.DEV", sub: "ANIMATION LIB", cat: "MOTION" },

  // ── AI Technology ──
  { label: "CURSOR", sub: "AI IDE", cat: "AI" },
  { label: "BOLT.NEW", sub: "AI BUILDER", cat: "AI" },
  { label: "ANTIGRAVITY", sub: "AI CODING", cat: "AI" },
  { label: "GEMINI CLI", sub: "MCP'S + SKILLS", cat: "AI" },
  { label: "GEN-CHATS", sub: "GPT / CLAUDE / GEMINI", cat: "AI" },
  { label: "GOOGLE JULES", sub: "AI AGENT", cat: "AI" },

  // ── Tools ──
  { label: "VSCODE", sub: "JETBRAINS IDE'S", cat: "TOOLING" },
  { label: "TAILWIND CSS", sub: "UTILITY CSS", cat: "TOOLING" },
  { label: "NOTION", sub: "OBSIDIAN", cat: "TOOLING" },
  { label: "GIT", sub: "GITHUB / CODEBURG", cat: "TOOLING" },
];

// ─── Shared style helpers ──────────────────────────────────────────────────────
export const slideBase = { position: "absolute", inset: 0, visibility: "hidden" };

export const bigType = (color, italic) => ({
  fontFamily: italic ? SERIF : BEBAS,
  fontSize: "clamp(5rem, 18vw, 22rem)",
  fontWeight: 900,
  fontStyle: italic ? "italic" : "normal",
  color, lineHeight: 0.85, letterSpacing: "0.01em", margin: 0,
});
