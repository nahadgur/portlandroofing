"use client";

import { useState, useMemo } from "react";

// Rates updated April 2026 to reflect confirmed 5–8% manufacturer increases
const MATERIALS = [
  { label: "Asphalt Shingles", value: "asphalt", baseLow: 375, baseHigh: 535, hiked: true },
  { label: "Metal Roofing",    value: "metal",   baseLow: 700, baseHigh: 1200, hiked: false },
  { label: "Cedar Shake",      value: "cedar",   baseLow: 600, baseHigh: 900,  hiked: false },
  { label: "Flat (TPO/EPDM)", value: "flat",    baseLow: 350, baseHigh: 700,  hiked: false },
] as const;

const PITCH_MULTIPLIERS: Record<string, number> = {
  low:    1.0,
  medium: 1.15,
  steep:  1.35,
};

const STORY_MULTIPLIERS: Record<string, number> = {
  "1": 1.0,
  "2": 1.1,
  "3": 1.25,
};

type MaterialValue = (typeof MATERIALS)[number]["value"];

function fmt(n: number) {
  return "$" + n.toLocaleString();
}

export default function CostCalculator() {
  const [sqft,     setSqft]     = useState(2000);
  const [material, setMaterial] = useState<MaterialValue>("asphalt");
  const [pitch,    setPitch]    = useState("medium");
  const [stories,  setStories]  = useState("1");

  const result = useMemo(() => {
    const mat      = MATERIALS.find((m) => m.value === material)!;
    const squares  = sqft / 100;
    const pitchM   = PITCH_MULTIPLIERS[pitch];
    const storyM   = STORY_MULTIPLIERS[stories];
    const low      = Math.round(squares * mat.baseLow  * pitchM * storyM);
    const high     = Math.round(squares * mat.baseHigh * pitchM * storyM);
    return { low, high, hiked: mat.hiked };
  }, [sqft, material, pitch, stories]);

  const selectedMat = MATERIALS.find((m) => m.value === material)!;

  return (
    <div className="rounded-lg border border-[var(--bdr)] bg-white overflow-hidden">
      <div className="h-1" style={{ background: "#0066CC" }} />

      <div className="p-6 sm:p-8">
        <div className="grid md:grid-cols-2 gap-8">

          {/* ── Inputs ── */}
          <div className="space-y-6">

            {/* Roof Size */}
            <div>
              <label
                htmlFor="calc-sqft"
                className="flex items-center justify-between text-sm font-semibold mb-2"
                style={{ color: "#0F172A" }}
              >
                <span>Roof Size</span>
                <span style={{ color: "#0066CC" }}>{sqft.toLocaleString()} sq ft</span>
              </label>
              <input
                id="calc-sqft"
                type="range"
                min={1000} max={5000} step={100}
                value={sqft}
                onChange={(e) => setSqft(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #0066CC ${((sqft - 1000) / 4000) * 100}%, #E2E8F0 ${((sqft - 1000) / 4000) * 100}%)`,
                  accentColor: "#0066CC",
                }}
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: "#94A3B8" }}>
                <span>1,000 sq ft</span>
                <span>5,000 sq ft</span>
              </div>
            </div>

            {/* Material */}
            <div>
              <label
                htmlFor="calc-material"
                className="block text-sm font-semibold mb-2"
                style={{ color: "#0F172A" }}
              >
                Material
              </label>
              <select
                id="calc-material"
                value={material}
                onChange={(e) => setMaterial(e.target.value as MaterialValue)}
                className="w-full rounded-md border px-4 py-3 text-sm"
                style={{ borderColor: "#E2E8F0", color: "#0F172A", background: "#FFFFFF" }}
              >
                {MATERIALS.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>

            {/* Pitch */}
            <div>
              <span className="block text-sm font-semibold mb-2" style={{ color: "#0F172A" }}>
                Roof Pitch
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(["low", "medium", "steep"] as const).map((p) => (
                  <button
                    key={p} type="button" onClick={() => setPitch(p)}
                    className="rounded-md border px-3 py-2.5 text-sm font-medium capitalize"
                    style={{
                      background:   pitch === p ? "#0066CC" : "#FFFFFF",
                      color:        pitch === p ? "#FFFFFF" : "#475569",
                      borderColor:  pitch === p ? "#0066CC" : "#E2E8F0",
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Stories */}
            <div>
              <span className="block text-sm font-semibold mb-2" style={{ color: "#0F172A" }}>
                Stories
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(["1", "2", "3"] as const).map((s) => (
                  <button
                    key={s} type="button" onClick={() => setStories(s)}
                    className="rounded-md border px-3 py-2.5 text-sm font-medium"
                    style={{
                      background:  stories === s ? "#0066CC" : "#FFFFFF",
                      color:       stories === s ? "#FFFFFF" : "#475569",
                      borderColor: stories === s ? "#0066CC" : "#E2E8F0",
                    }}
                  >
                    {s} Story
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Result ── */}
          <div className="flex flex-col justify-center gap-4">

            {/* Price range */}
            <div
              className="rounded-lg p-6 text-center"
              style={{ background: "#EFF6FF", border: "1px solid #DBEAFE" }}
            >
              <div
                className="text-xs font-bold tracking-wider mb-3"
                style={{ color: "#94A3B8" }}
              >
                ESTIMATED COST RANGE
              </div>
              <div
                className="text-3xl sm:text-4xl font-extrabold mb-1"
                style={{ color: "#0066CC" }}
              >
                {fmt(result.low)} – {fmt(result.high)}
              </div>
              <div className="text-sm mt-1" style={{ color: "#475569" }}>
                {sqft.toLocaleString()} sq ft · {selectedMat.label} · {pitch} pitch · {stories}-storey
              </div>

              {/* April 2026 price alert — only for asphalt */}
              {result.hiked && (
                <div
                  className="mt-4 rounded-md px-3 py-2 text-xs text-left"
                  style={{ background: "#FEF3C7", color: "#92400E", border: "1px solid #FDE68A" }}
                >
                  ⚠ Asphalt shingle material costs increased 5–8% on April 15, 2026. These estimates reflect current post-hike pricing.
                </div>
              )}
            </div>

            {/* Financing note — replaces the misleading monthly calc */}
            <p className="text-xs" style={{ color: "#94A3B8", lineHeight: 1.6 }}>
              Most Oregon roofing contractors offer financing options. Ask your contractor about payment plans — terms and rates vary by lender and credit profile.
            </p>

            {/* CTA */}
            <a
              href="/contact"
              style={{
                display: "block",
                textAlign: "center",
                background: "#0066CC",
                color: "#fff",
                fontSize: "0.875rem",
                fontWeight: 700,
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                textDecoration: "none",
              }}
            >
              Get Free Quotes Within This Range →
            </a>

            <p className="text-xs text-center" style={{ color: "#94A3B8" }}>
              Estimates are approximate and may vary based on roof condition, access, and local contractor pricing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
