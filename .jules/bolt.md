
## 2024-05-19 - GSAP Plugin Registration & Component Lifecycle
**Learning:** Calling `gsap.registerPlugin()` inside a React functional component causes it to execute unnecessarily on every re-render. Additionally, using `setInterval` within a `useGSAP` hook without returning a cleanup function that calls `clearInterval` causes a memory leak if the component unmounts.
**Action:** Always move `gsap.registerPlugin` outside of the component body to register plugins exactly once. Always return a cleanup function from `useGSAP` to clear any intervals or timeouts created within it.
