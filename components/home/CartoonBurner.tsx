"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

/**
 * Detailed original cartoon character that morphs from chubby → slim as
 * `progress` goes 0 → 1, with animated fat-burning flames. Pure SVG +
 * Framer Motion, fully original, no external/stock assets.
 */
export default function CartoonBurner({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  // Width morph: belly + torso shrink the most, limbs trim slightly.
  const bellyScale = useTransform(progress, [0, 1], [1.55, 0.9]);
  const torsoScale = useTransform(progress, [0, 1], [1.32, 0.97]);
  const hipScale = useTransform(progress, [0, 1], [1.4, 0.98]);
  const thighScale = useTransform(progress, [0, 1], [1.45, 1]);
  const armScale = useTransform(progress, [0, 1], [1.4, 1]);
  // Flames + sweat fade out as the body slims.
  const flameOpacity = useTransform(progress, [0, 0.7, 1], [1, 0.5, 0.1]);
  // Cheerful lift as she gets fitter.
  const liftY = useTransform(progress, [0, 1], [6, -6]);

  return (
    <motion.svg
      viewBox="0 0 300 470"
      className="h-[31rem] w-auto drop-shadow-[0_18px_34px_rgba(0,0,0,0.55)]"
    >
      <defs>
        {/* skin */}
        <linearGradient id="cbSkin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffd9b0" />
          <stop offset="100%" stopColor="#f0b585" />
        </linearGradient>
        <linearGradient id="cbSkinLeg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f6c498" />
          <stop offset="100%" stopColor="#e6a877" />
        </linearGradient>
        {/* hair */}
        <linearGradient id="cbHair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a2a1a" />
          <stop offset="100%" stopColor="#241710" />
        </linearGradient>
        {/* gold shirt */}
        <linearGradient id="cbShirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8d5b0" />
          <stop offset="55%" stopColor="#c9a96e" />
          <stop offset="100%" stopColor="#a67c3d" />
        </linearGradient>
        <linearGradient id="cbShirtShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="45%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        {/* shorts */}
        <linearGradient id="cbShorts" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a3a3a" />
          <stop offset="100%" stopColor="#1f1f1f" />
        </linearGradient>
        {/* flames */}
        <linearGradient id="cbFlame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#8a5a2b" />
          <stop offset="45%" stopColor="#e8a33d" />
          <stop offset="100%" stopColor="#ffe7a8" />
        </linearGradient>
      </defs>

      {/* ── Animated fat-burning flames ───────────────────────────── */}
      <motion.g style={{ opacity: flameOpacity }}>
        {[
          { x: 92, s: 0.9, d: 0 },
          { x: 150, s: 1.2, d: 0.3 },
          { x: 208, s: 0.9, d: 0.6 },
          { x: 120, s: 0.7, d: 0.15 },
          { x: 180, s: 0.7, d: 0.45 },
        ].map((f, i) => (
          <motion.path
            key={i}
            d="M0,0 C-16,-26 -10,-50 0,-70 C10,-50 16,-26 0,0 Z"
            fill="url(#cbFlame)"
            style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
            transform={`translate(${f.x} 360) scale(${f.s})`}
            animate={{
              scaleY: [1, 1.35, 0.9, 1.2, 1],
              scaleX: [1, 0.85, 1.1, 0.9, 1],
              opacity: [0.9, 1, 0.7, 1, 0.9],
            }}
            transition={{
              duration: 1.1 + i * 0.12,
              delay: f.d,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        {[108, 150, 196].map((x, i) => (
          <motion.circle
            key={`e${i}`}
            cx={x}
            cy={340}
            r={3}
            fill="#ffd479"
            animate={{ cy: [340, 285], opacity: [0, 1, 0], r: [3, 1] }}
            transition={{
              duration: 1.8 + i * 0.4,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.g>

      {/* Gentle fitness bounce */}
      <motion.g style={{ y: liftY }}>
        {/* ── Legs ─────────────────────────────────────────────── */}
        <motion.g style={{ scaleX: thighScale, originX: "150px" }}>
          {/* thighs */}
          <path d="M126,360 q-6,40 0,72 l22,0 q4,-36 0,-72 Z" fill="url(#cbSkinLeg)" />
          <path d="M152,360 q-4,36 0,72 l22,0 q6,-32 0,-72 Z" fill="url(#cbSkinLeg)" />
          {/* calves */}
          <rect x="128" y="424" width="20" height="26" rx="9" fill="url(#cbSkinLeg)" />
          <rect x="152" y="424" width="20" height="26" rx="9" fill="url(#cbSkinLeg)" />
          {/* gold sneakers */}
          <path d="M120,448 q18,-8 30,0 l0,10 q-16,6 -30,0 Z" fill="#c9a96e" />
          <path d="M150,448 q18,-8 30,0 l0,10 q-16,6 -30,0 Z" fill="#e8d5b0" />
          <rect x="120" y="456" width="32" height="5" rx="2.5" fill="#fff" opacity="0.85" />
          <rect x="148" y="456" width="32" height="5" rx="2.5" fill="#fff" opacity="0.85" />
        </motion.g>

        {/* ── Arms ─────────────────────────────────────────────── */}
        <motion.g style={{ scaleX: armScale, originX: "150px" }}>
          {/* sleeves (shirt) */}
          <path d="M96,224 q-16,4 -22,18 l16,8 q8,-12 18,-14 Z" fill="url(#cbShirt)" />
          <path d="M204,224 q16,4 22,18 l-16,8 q-8,-12 -18,-14 Z" fill="url(#cbShirt)" />
          {/* forearms */}
          <rect x="70" y="244" width="16" height="64" rx="8" fill="url(#cbSkin)" transform="rotate(10 78 276)" />
          <rect x="214" y="244" width="16" height="64" rx="8" fill="url(#cbSkin)" transform="rotate(-10 222 276)" />
        </motion.g>

        {/* ── Hips / shorts ────────────────────────────────────── */}
        <motion.path
          d="M108,330 q42,18 84,0 l-6,44 q-36,16 -72,0 Z"
          fill="url(#cbShorts)"
          style={{ scaleX: hipScale, originX: "150px", originY: "352px" }}
        />

        {/* ── Torso (shirt) ────────────────────────────────────── */}
        <motion.g style={{ scaleX: torsoScale, originX: "150px", originY: "300px" }}>
          <path
            d="M104,222 Q150,206 196,222 L204,336 Q150,356 96,336 Z"
            fill="url(#cbShirt)"
          />
          <path
            d="M104,222 Q150,206 196,222 L200,290 Q150,304 100,290 Z"
            fill="url(#cbShirtShade)"
          />
        </motion.g>

        {/* ── Belly bulge (shrinks most) ───────────────────────── */}
        <motion.ellipse
          cx="150"
          cy="290"
          rx="54"
          ry="50"
          fill="url(#cbShirt)"
          style={{ scaleX: bellyScale, originX: "150px", originY: "292px" }}
        />
        <motion.ellipse
          cx="150"
          cy="284"
          rx="48"
          ry="40"
          fill="url(#cbShirtShade)"
          style={{ scaleX: bellyScale, originX: "150px", originY: "292px" }}
        />

        {/* ── Neck ─────────────────────────────────────────────── */}
        <rect x="138" y="186" width="24" height="26" rx="10" fill="url(#cbSkin)" />

        {/* ── Hair behind ──────────────────────────────────────── */}
        <path d="M104,150 q4,70 22,84 q-30,-2 -34,-40 q-4,-30 12,-44 Z" fill="url(#cbHair)" />
        {/* ponytail */}
        <path d="M196,128 q34,8 36,46 q4,34 -14,52 q10,-30 2,-54 q-8,-30 -24,-44 Z" fill="url(#cbHair)" />

        {/* ── Head ─────────────────────────────────────────────── */}
        <circle cx="150" cy="152" r="46" fill="url(#cbSkin)" />
        {/* hair top */}
        <path
          d="M106,148 Q108,98 150,96 Q192,98 194,148 Q196,120 168,108 Q150,102 132,108 Q104,120 106,148 Z"
          fill="url(#cbHair)"
        />
        <path d="M150,96 q44,2 44,52 q6,-44 -18,-58 q-14,-6 -26,6 Z" fill="url(#cbHair)" />

        {/* eyebrows */}
        <path d="M128,138 q8,-5 16,-1" stroke="#3a2a1a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M156,137 q8,-4 16,1" stroke="#3a2a1a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        {/* eyes */}
        <ellipse cx="136" cy="152" rx="6.5" ry="8" fill="#fff" />
        <ellipse cx="164" cy="152" rx="6.5" ry="8" fill="#fff" />
        <circle cx="137" cy="153" r="4" fill="#2a1d0e" />
        <circle cx="165" cy="153" r="4" fill="#2a1d0e" />
        <circle cx="138.5" cy="151" r="1.4" fill="#fff" />
        <circle cx="166.5" cy="151" r="1.4" fill="#fff" />
        {/* nose */}
        <path d="M149,158 q3,5 0,9" stroke="#d99a66" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* blush */}
        <ellipse cx="126" cy="166" rx="7" ry="4" fill="#f6a98a" opacity="0.55" />
        <ellipse cx="174" cy="166" rx="7" ry="4" fill="#f6a98a" opacity="0.55" />
        {/* smile */}
        <path d="M136,174 Q150,188 164,174" stroke="#7a3b28" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* sweat drop, fades as fitter */}
        <motion.path
          d="M196,150 q6,11 0,18 q-6,-7 0,-18 Z"
          fill="#9fd3ff"
          style={{ opacity: flameOpacity }}
          animate={{ y: [0, 5, 0], opacity: [0.9, 0.5, 0.9] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.g>
    </motion.svg>
  );
}
