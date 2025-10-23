"use client";
import React, { useEffect, useRef, useState } from "react";

// =============================
// Types
// =============================
type Particle = { x: number; y: number; vx: number; vy: number; tx: number; ty: number };
type Point = { x: number; y: number };
type Mouse = { x: number; y: number; inside: boolean };

// =============================
// Reusable component
// =============================
export type ParticleLogoProps = {
  src: string;              // image URL (can be object URL from <input type="file" />)
  width?: number;           // canvas width in CSS pixels
  height?: number;          // canvas height in CSS pixels
  particleCount?: number;   // approx number of particles to sample
  particleSize?: number;    // base radius in px
  particleColor?: string;   // any CSS color
  background?: string;      // canvas background color
  hoverDistort?: number;    // mouse repel radius
  speed?: number;           // movement speed factor
  threshold?: number;       // alpha threshold 0..255
  center?: boolean;         // center image within canvas
};

export function ParticleLogo({
  src,
  width = 900,
  height = 450,
  particleCount = 5000,
  particleSize = 1.8,
  particleColor = "#ffffff",
  background = "#0b0f16",
  hoverDistort = 90,
  speed = 0.08,
  threshold = 40,
  center = true,
}: ParticleLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Keep DPR sharpness
  const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

  const state = useRef<{
    points: Point[];
    particles: Particle[];
    mouse: Mouse;
    anim: number;
  }>({
    points: [],
    particles: [],
    mouse: { x: 0, y: 0, inside: false },
    anim: 0,
  });

  // Load image -> sample points
  useEffect(() => {
    let isActive = true;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      if (!isActive) return;
      const tmp = document.createElement("canvas");
      const tctx = tmp.getContext("2d", { willReadFrequently: true });
      if (!tctx) return;

      // Fit image into our canvas box preserving aspect
      const boxW = width * dpr;
      const boxH = height * dpr;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const aspect = iw / ih;
      let dw = boxW;
      let dh = dw / aspect;
      if (dh > boxH) {
        dh = boxH;
        dw = dh * aspect;
      }
      tmp.width = Math.max(1, Math.floor(dw));
      tmp.height = Math.max(1, Math.floor(dh));
      tctx.clearRect(0, 0, tmp.width, tmp.height);
      tctx.drawImage(img, 0, 0, tmp.width, tmp.height);

      const { data } = tctx.getImageData(0, 0, tmp.width, tmp.height);

      // Decide sampling step from desired particleCount
      const total = tmp.width * tmp.height;
      const sampleEvery = Math.max(1, Math.floor(total / particleCount));
      const pts: Point[] = [];
      let di = 0;
      for (let y = 0; y < tmp.height; y++) {
        for (let x = 0; x < tmp.width; x++) {
          if ((x + y * tmp.width) % sampleEvery !== 0) {
            di += 4;
            continue;
          }
          const a = data[di + 3];
          if (a > threshold) {
            // Map from image space to final canvas space
            const offX = center ? (boxW - tmp.width) / 2 : 0;
            const offY = center ? (boxH - tmp.height) / 2 : 0;
            pts.push({ x: x + offX, y: y + offY });
          }
          di += 4;
        }
      }

      state.current.points = pts;

      // Initialize particles at random positions
      const parts: Particle[] = pts.map((p) => ({
        x: Math.random() * boxW,
        y: Math.random() * boxH,
        vx: 0,
        vy: 0,
        tx: p.x,
        ty: p.y,
      }));
      state.current.particles = parts;
      setLoaded(true);
    };

    img.onerror = () => setLoaded(false);

    return () => {
      isActive = false;
    };
  }, [src, width, height, particleCount, threshold, center, dpr]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const boxW = Math.floor(width * dpr);
    const boxH = Math.floor(height * dpr);
    canvas.width = boxW;
    canvas.height = boxH;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * dpr;
      const y = (e.clientY - rect.top) * dpr;
      state.current.mouse = { x, y, inside: true };
    };
    const onLeave = () => {
      state.current.mouse = { x: 0, y: 0, inside: false };
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    let raf = 0;
    const draw = () => {
      // background
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, boxW, boxH);

      const { particles, mouse: m } = state.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // Mouse repel
        if (m && m.inside) {
          const dx = p.x - m.x;
          const dy = p.y - m.y;
          const dist2 = dx * dx + dy * dy;
          const r = hoverDistort * dpr;
          if (dist2 < r * r) {
            const inv = 1 / Math.sqrt(dist2 + 0.0001);
            const f = (r * r - dist2) / (r * r);
            p.vx += (dx * inv) * f * 1.5;
            p.vy += (dy * inv) * f * 1.5;
          }
        }

        // Pull to target
        p.vx += (p.tx - p.x) * speed;
        p.vy += (p.ty - p.y) * speed;

        // Damp a bit
        p.vx *= 0.92;
        p.vy *= 0.92;

        p.x += p.vx;
        p.y += p.vy;
      }

      // Draw
      ctx.beginPath();
      const r = particleSize * dpr;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.moveTo(p.x + r, p.y);
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      }
      ctx.fillStyle = particleColor;
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [loaded, width, height, particleSize, particleColor, background, hoverDistort, speed, dpr]);

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <canvas ref={canvasRef} className="rounded-2xl shadow-xl" />
      {!loaded && (
        <div className="text-sm text-neutral-400">Load a logo to generate particles.</div>
      )}
    </div>
  );
}

// =============================
// Drop-in page that acts as your "upload place"
// Put this file at: app/particles/page.tsx (App Router)
// =============================
export default function ParticleLogoPage() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [count, setCount] = useState(6000);
  const [size, setSize] = useState(1.6);
  const [color, setColor] = useState("#ffffff");
  const [bg, setBg] = useState("#0b0f16");

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setFileUrl(url);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-black text-white flex flex-col items-center px-6 py-10">
      <div className="max-w-5xl w-full grid gap-6">
        <h1 className="text-3xl md:text-4xl font-semibold">Particle Distortion Generator</h1>
        <p className="text-neutral-300">
          Upload your company logo (PNG/SVG/JPEG with transparent background preferred). Move your
          mouse over the canvas to see distortion. Tweak knobs. Copy the code snippet below into any
          Next.js page.
        </p>

        <div className="grid md:grid-cols-3 gap-4 items-end">
          <label className="grid gap-2">
            <span className="text-sm text-neutral-400">Upload Logo</span>
            <input
              type="file"
              accept="image/*"
              onChange={onPick}
              className="block rounded-lg border border-neutral-700 p-2 bg-neutral-900"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm text-neutral-400">Particle Count</span>
            <input
              type="range"
              min={1000}
              max={20000}
              step={500}
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
            />
            <div className="text-xs text-neutral-400">{count}</div>
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="grid gap-1">
              <span className="text-xs text-neutral-400">Size</span>
              <input
                type="number"
                min={0.5}
                max={4}
                step={0.1}
                value={size}
                onChange={(e) => setSize(parseFloat(e.target.value))}
                className="rounded-md bg-neutral-900 border border-neutral-700 p-2"
              />
            </label>
            <label className="grid gap-1">
              <span className="text-xs text-neutral-400">Color</span>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-full rounded-md border border-neutral-700 bg-neutral-900"
              />
            </label>
          </div>
        </div>

        <div className="w-full rounded-2xl p-4 bg-neutral-950 ring-1 ring-neutral-800">
          {fileUrl ? (
            <ParticleLogo
              src={fileUrl}
              width={1000}
              height={420}
              particleCount={count}
              particleSize={size}
              particleColor={color}
              background={bg}
            />
          ) : (
            <div className="h-[420px] rounded-2xl bg-neutral-950 grid place-items-center text-neutral-500 ring-1 ring-neutral-800">
              Upload a logo to start
            </div>
          )}
        </div>

        <div className="grid gap-2">
          <div className="text-sm text-neutral-400">Usage snippet</div>
          <pre className="overflow-x-auto rounded-xl bg-neutral-950 p-4 ring-1 ring-neutral-800 text-xs md:text-sm whitespace-pre-wrap">
{`import { ParticleLogo } from "./ParticleLogo";

export default function Hero() {
  return (
    <ParticleLogo
      src="/your-logo.png"
      width={1000}
      height={420}
      particleCount=${count}
      particleSize={${size}}
      particleColor="${color}"
      background="#0b0f16"
    />
  );
}`}
          </pre>
          <p className="text-xs text-neutral-500">
            Place <code>ParticleLogo.tsx</code> in your components folder and import it wherever you
            need the effect.
          </p>
        </div>

        <div className="text-xs text-neutral-500">
          Tips: Use a transparent PNG/SVG for crisp shapes. If your logo is very detailed, reduce
          particle count or increase size for performance. The component is dependency-free (plain
          Canvas2D) and SSR-safe via "use client".
        </div>
      </div>
    </div>
  );
}
