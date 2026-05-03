// src/frontend/components/IcebergReveal.jsx
// GSAP Scroll-Trigger: 20ft Subterranean Shaft Reveal
// Brand Colors: Crimson, Black, Gold + Electric Cyan

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IcebergReveal() {
  const containerRef = useRef(null);
  const surfaceRef = useRef(null);
  const shaftRef = useRef(null);
  const hullRef = useRef(null);
  const depthMeterRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const surface = surfaceRef.current;
    const shaft = shaftRef.current;
    const hull = hullRef.current;
    const depthMeter = depthMeterRef.current;

    // Timeline: Iceberg Reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top center",
        end: "bottom center",
        scrub: 1, // Smooth scrub
        markers: false, // Set true for debugging
      },
    });

    // Phase 1: Surface Ghost Office fades
    tl.to(surface, {
      opacity: 0.3,
      scale: 0.95,
      duration: 1,
    }, 0);

    // Phase 2: Shaft descends into view (20ft reveal)
    tl.to(shaft, {
      opacity: 1,
      y: 0,
      duration: 2,
    }, 0.5);

    // Phase 3: Hull (octagonal vault) emerges
    tl.to(hull, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
    }, 1.5);

    // Phase 4: Depth meter updates
    tl.to(depthMeter, {
      textContent: "20ft",
      duration: 2,
      snap: { textContent: 1 },
    }, 0);

    // Glow effect on hull (Electric Cyan)
    tl.to(hull, {
      boxShadow: "0 0 40px #00ffff, inset 0 0 40px rgba(0, 255, 255, 0.3)",
      duration: 1.5,
    }, 1.5);

    return () => {
      if (ScrollTrigger.getAll()) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        minHeight: "200vh",
        background: "linear-gradient(180deg, #000 0%, #1a0000 50%, #0a0a0a 100%)",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* SURFACE: Ghost Office */}
      <div
        ref={surfaceRef}
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 50% 50%, #1a1a1a 0%, #000 100%)",
          borderBottom: "2px solid #dc143c",
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: "center", color: "#fff" }}>
          <h1 style={{ fontSize: "3rem", margin: 0, color: "#ffd700" }}>
            Vector Bellows
          </h1>
          <p style={{ fontSize: "1.2rem", color: "#00ffff", marginTop: "1rem" }}>
            The Ghost in the Grid
          </p>
          <p style={{ fontSize: "0.9rem", color: "#aaa", marginTop: "2rem" }}>
            Scroll to descend...
          </p>
        </div>
      </div>

      {/* DESCENT SECTION */}
      <div style={{ height: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* SHAFT: 20ft Vertical Drop */}
        <div
          ref={shaftRef}
          style={{
            position: "absolute",
            width: "200px",
            height: "400px",
            background: "linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)",
            border: "3px solid #dc143c",
            borderRadius: "20px",
            opacity: 0,
            y: -300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "inset 0 0 40px rgba(220, 20, 60, 0.3)",
          }}
        >
          {/* Spiral Staircase Visualization */}
          <div
            style={{
              width: "80%",
              height: "80%",
              border: "2px dashed #00ffff",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.8rem",
              color: "#00ffff",
            }}
          >
            VRC Lift
          </div>
        </div>

        {/* DEPTH METER */}
        <div
          style={{
            position: "absolute",
            right: "50px",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#00ffff",
            textShadow: "0 0 20px #00ffff",
          }}
        >
          <span ref={depthMeterRef}>0ft</span>
          <div style={{ fontSize: "0.8rem", marginTop: "0.5rem", color: "#ffd700" }}>
            Depth
          </div>
        </div>
      </div>

      {/* HULL: Octagonal Vault (18GW Core) */}
      <div
        style={{
          position: "relative",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          ref={hullRef}
          style={{
            width: "300px",
            height: "300px",
            background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
            clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
            border: "3px solid #ffd700",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            scale: 0.5,
            boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
            flexDirection: "column",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#ffd700" }}>
            18,000
          </div>
          <div style={{ fontSize: "0.9rem", color: "#00ffff", marginTop: "1rem" }}>
            1MW Nodes
          </div>
          <div style={{ fontSize: "0.8rem", color: "#aaa", marginTop: "1rem" }}>
            18GW Subterranean Grid
          </div>
        </div>
      </div>

      {/* TELEMETRY OVERLAY */}
      <div
        style={{
          position: "fixed",
          bottom: "50px",
          left: "50px",
          background: "rgba(0, 0, 0, 0.7)",
          border: "2px solid #00ffff",
          borderRadius: "10px",
          padding: "1.5rem",
          color: "#fff",
          fontSize: "0.9rem",
          zIndex: 10,
          fontFamily: "'Courier New', monospace",
        }}
      >
        <div style={{ color: "#ffd700", marginBottom: "0.5rem" }}>
          [SYSTEM STATUS]
        </div>
        <div>Nodes: <span style={{ color: "#00ffff" }}>18,000/18,000</span></div>
        <div>Capacity: <span style={{ color: "#00ffff" }}>18.0 GW</span></div>
        <div>Phase: <span style={{ color: "#dc143c" }}>3 (Open Enrollment)</span></div>
        <div>Thermal: <span style={{ color: "#00ffff" }}>Optimal</span></div>
      </div>
    </div>
  );
}
