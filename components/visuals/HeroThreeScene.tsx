"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import * as THREE from "three";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  phase: number;
}

const PARTICLE_COUNT = 220;
const CONNECT_DIST = 130;
const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;
const BOUNDS_X = 520;
const BOUNDS_Y = 320;
const BOUNDS_Z = 240;
const MAX_LINES = (PARTICLE_COUNT * (PARTICLE_COUNT - 1)) / 2;

function subscribePRM(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function getPRMSnapshot() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
function getPRMServerSnapshot() {
  return false;
}

/**
 * Cinematic Three.js hero scene — 220 drifting particles in 3D space,
 * additive-blended lines between pairs within proximity, slow orbital
 * camera sweep, fog-based depth fade. Honours prefers-reduced-motion
 * (renders one static frame and stops). Pauses RAF when tab hidden.
 */
export function HeroThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useSyncExternalStore(
    subscribePRM,
    getPRMSnapshot,
    getPRMServerSnapshot
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // ── Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x020912, 200, 900);

    const camera = new THREE.PerspectiveCamera(58, width / height, 1, 2000);
    camera.position.set(0, 0, 460);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── Particles (Points)
    const particles: Particle[] = [];
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * BOUNDS_X * 2;
      const y = (Math.random() - 0.5) * BOUNDS_Y * 2;
      const z = (Math.random() - 0.5) * BOUNDS_Z * 2;
      particles.push({
        x,
        y,
        z,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        vz: (Math.random() - 0.5) * 0.22,
        phase: Math.random() * Math.PI * 2,
      });
      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      sizes[i] = 2 + Math.random() * 3;
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeom.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Round-glow sprite via canvas texture (cheap, no external asset).
    const spriteCanvas = document.createElement("canvas");
    spriteCanvas.width = 64;
    spriteCanvas.height = 64;
    const sctx = spriteCanvas.getContext("2d");
    if (sctx) {
      const grad = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(180,240,255,1)");
      grad.addColorStop(0.25, "rgba(0,229,255,0.85)");
      grad.addColorStop(0.6, "rgba(0,150,220,0.18)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      sctx.fillStyle = grad;
      sctx.fillRect(0, 0, 64, 64);
    }
    const spriteTex = new THREE.CanvasTexture(spriteCanvas);
    spriteTex.colorSpace = THREE.SRGBColorSpace;

    const particleMat = new THREE.PointsMaterial({
      map: spriteTex,
      size: 5,
      sizeAttenuation: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: 0x9fefff,
    });
    const particleMesh = new THREE.Points(particleGeom, particleMat);
    scene.add(particleMesh);

    // ── Connection lines
    const linePositions = new Float32Array(MAX_LINES * 2 * 3);
    const lineColors = new Float32Array(MAX_LINES * 2 * 3);
    const lineGeom = new THREE.BufferGeometry();
    lineGeom.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeom.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.85,
    });
    const lineMesh = new THREE.LineSegments(lineGeom, lineMat);
    scene.add(lineMesh);

    // ── Animation
    let rafId = 0;
    let lastTime = performance.now();
    let totalTime = 0;

    function renderFrame(now: number) {
      const dt = Math.min((now - lastTime) / 16.67, 2.5);
      lastTime = now;
      totalTime += dt;

      // Update positions
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.z += p.vz * dt;
        if (p.x < -BOUNDS_X) p.x = BOUNDS_X;
        else if (p.x > BOUNDS_X) p.x = -BOUNDS_X;
        if (p.y < -BOUNDS_Y) p.y = BOUNDS_Y;
        else if (p.y > BOUNDS_Y) p.y = -BOUNDS_Y;
        if (p.z < -BOUNDS_Z) p.z = BOUNDS_Z;
        else if (p.z > BOUNDS_Z) p.z = -BOUNDS_Z;
        positions[i * 3 + 0] = p.x;
        positions[i * 3 + 1] = p.y;
        positions[i * 3 + 2] = p.z;
      }
      particleGeom.attributes.position.needsUpdate = true;

      // Build connection segments
      let lineIdx = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const a = particles[i];
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dz = a.z - b.z;
          const distSq = dx * dx + dy * dy + dz * dz;
          if (distSq < CONNECT_DIST_SQ) {
            const t = 1 - Math.sqrt(distSq) / CONNECT_DIST;
            const alpha = t * t;
            const off = lineIdx * 6;
            linePositions[off + 0] = a.x;
            linePositions[off + 1] = a.y;
            linePositions[off + 2] = a.z;
            linePositions[off + 3] = b.x;
            linePositions[off + 4] = b.y;
            linePositions[off + 5] = b.z;
            // Cyan gradient: brighter the closer the pair
            const r = 0.05 * alpha;
            const g = 0.78 * alpha;
            const bcol = 1.0 * alpha;
            lineColors[off + 0] = r;
            lineColors[off + 1] = g;
            lineColors[off + 2] = bcol;
            lineColors[off + 3] = r;
            lineColors[off + 4] = g;
            lineColors[off + 5] = bcol;
            lineIdx++;
          }
        }
      }
      lineGeom.setDrawRange(0, lineIdx * 2);
      lineGeom.attributes.position.needsUpdate = true;
      lineGeom.attributes.color.needsUpdate = true;

      // Slow orbital camera sweep — 25 s period
      const t = totalTime * 0.0008;
      camera.position.x = Math.sin(t) * 90;
      camera.position.y = Math.cos(t * 0.7) * 50;
      camera.position.z = 460 + Math.sin(t * 0.5) * 30;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }

    function loop(now: number) {
      renderFrame(now);
      rafId = requestAnimationFrame(loop);
    }

    if (reduced) {
      renderFrame(performance.now());
    } else {
      rafId = requestAnimationFrame(loop);
    }

    // ── Resize
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    // ── Pause when tab hidden
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      } else if (!rafId && !reduced) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      particleGeom.dispose();
      lineGeom.dispose();
      particleMat.dispose();
      lineMat.dispose();
      spriteTex.dispose();
      renderer.dispose();
      renderer.domElement.parentNode?.removeChild(renderer.domElement);
    };
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="absolute inset-0 -z-10 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, #04132a 0%, #020912 60%, #000000 100%)",
      }}
    />
  );
}
