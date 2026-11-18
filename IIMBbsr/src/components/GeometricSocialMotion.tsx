'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ExternalLink,
  Play,
  Pause,
  Compass,
  Sparkles,
  Radio,
  CheckCircle2,
  Layers,
  CircleDot,
  Triangle,
  RotateCw,
} from 'lucide-react';

export interface SocialOrbItem {
  id: string;
  name: string;
  category: string;
  handle: string;
  url: string;
  brandColor: string;
  glowColor: string;
  accentBg: string;
  description: string;
  statBadge: string;
  defaultPath: 'outer-circle' | 'inner-circle' | 'triangle-down' | 'triangle-up';
  pathLabel: string;
}

export const SOCIAL_ORB_ITEMS: SocialOrbItem[] = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    category: 'Professional Network',
    handle: 'company/the-indian-institute-of-metals',
    url: 'https://www.linkedin.com/company/the-indian-institute-of-metals/',
    brandColor: '#0A66C2',
    glowColor: 'rgba(10, 102, 194, 0.6)',
    accentBg: 'bg-[#0A66C2]',
    description: 'Executive council notifications, career fellowship announcements & academic papers.',
    statBadge: '18,500+ Peers',
    defaultPath: 'outer-circle',
    pathLabel: 'Outer Circle Orbit',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    category: 'Video Lectures & Conclaves',
    handle: '@theindianinstituteofmetals4921',
    url: 'https://www.youtube.com/@theindianinstituteofmetals4921',
    brandColor: '#FF0000',
    glowColor: 'rgba(255, 0, 0, 0.6)',
    accentBg: 'bg-[#FF0000]',
    description: 'Full archival symposium recordings, AHSS plenary addresses & technical webinars.',
    statBadge: '220+ Lectures',
    defaultPath: 'outer-circle',
    pathLabel: 'Outer Circle Orbit',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    category: 'Chapter Community',
    handle: 'TheIndianInstituteofMetals',
    url: 'https://www.facebook.com/TheIndianInstituteofMetals',
    brandColor: '#1877F2',
    glowColor: 'rgba(24, 119, 242, 0.6)',
    accentBg: 'bg-[#1877F2]',
    description: 'Regional ceremonies, memorial lecture galleries & student chapter achievements.',
    statBadge: 'Regional Circle',
    defaultPath: 'inner-circle',
    pathLabel: 'Chhota Circle Orbit',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    category: 'Visual & Micrographs',
    handle: '@indianinstituteofmetals',
    url: 'https://www.instagram.com/indianinstituteofmetals',
    brandColor: '#E4405F',
    glowColor: 'rgba(228, 64, 95, 0.6)',
    accentBg: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
    description: 'Scanning electron microscope images, youth metallurgist spotlights & event photos.',
    statBadge: 'Visual Stories',
    defaultPath: 'inner-circle',
    pathLabel: 'Chhota Circle Orbit',
  },
  {
    id: 'twitter',
    name: 'Twitter (X)',
    category: 'Instant Dispatches',
    handle: '@IIM_HeadOffice',
    url: 'https://twitter.com/IIM_HeadOffice',
    brandColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.6)',
    accentBg: 'bg-sky-500',
    description: 'Gazetted notices, call for papers deadlines, NMD-ATM notices & live updates.',
    statBadge: 'Official Handle',
    defaultPath: 'triangle-down',
    pathLabel: 'Inverted Triangle ▽',
  },
  {
    id: 'portal',
    name: 'IIM HQ Portal',
    category: 'Apex Central Secretariat',
    handle: 'www.iim-india.net',
    url: 'https://www.iim-india.net/',
    brandColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.6)',
    accentBg: 'bg-amber-600',
    description: 'Central membership ledger, Kolkata council governance & charter repository.',
    statBadge: 'Est. 1946 (HQ)',
    defaultPath: 'triangle-up',
    pathLabel: 'Upright Triangle △',
  },
];

// Helper SVG brand icons
function renderSocialIcon(id: string, className = 'w-4 h-4 text-white') {
  switch (id) {
    case 'linkedin':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 0 0 1.64-1.64c0-.91-.73-1.64-1.64-1.64s-1.64.73-1.64 1.64c0 .91.73 1.64 1.64 1.64m1.39 9.74v-8.37H5.07v8.37h2.78z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'facebook':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
  }
}

export default function GeometricSocialMotion() {
  // Motion Progress (0 to 1 normalized)
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [motionMode, setMotionMode] = useState<'all' | 'triangles' | 'circles'>('all');

  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Exact sacred geometry dimensions (Center: 260, 260)
  const CX = 260;
  const CY = 260;
  const R_OUTER = 200; // Outer Circle radius
  const R_INNER = 115; // Chhota Circle radius

  // Inverted Triangle Vertices (Apex points DOWN)
  const P_INV_1 = { x: 433.2, y: 160 }; // Top Right
  const P_INV_2 = { x: 86.8, y: 160 };  // Top Left
  const P_INV_3 = { x: 260, y: 460 };   // Bottom Apex
  const TRIANGLE_DOWN_PTS = `${P_INV_1.x},${P_INV_1.y} ${P_INV_2.x},${P_INV_2.y} ${P_INV_3.x},${P_INV_3.y}`;

  // Upright Triangle Vertices (Apex points UP)
  const P_UP_1 = { x: 260, y: 60 };     // Top Apex
  const P_UP_2 = { x: 433.2, y: 360 };  // Bottom Right
  const P_UP_3 = { x: 86.8, y: 360 };   // Bottom Left
  const TRIANGLE_UP_PTS = `${P_UP_1.x},${P_UP_1.y} ${P_UP_2.x},${P_UP_2.y} ${P_UP_3.x},${P_UP_3.y}`;

  // Helper 1: Interpolate position along Inverted Triangle perimeter (3 sides of equal length)
  const getInvertedTrianglePoint = (t: number) => {
    const cycle = ((t % 1) + 1) % 1;
    if (cycle < 1 / 3) {
      // Side 1: Top Right -> Top Left (Horizontal)
      const u = cycle / (1 / 3);
      return {
        x: P_INV_1.x + u * (P_INV_2.x - P_INV_1.x),
        y: P_INV_1.y + u * (P_INV_2.y - P_INV_1.y),
      };
    } else if (cycle < 2 / 3) {
      // Side 2: Top Left -> Bottom Apex
      const u = (cycle - 1 / 3) / (1 / 3);
      return {
        x: P_INV_2.x + u * (P_INV_3.x - P_INV_2.x),
        y: P_INV_2.y + u * (P_INV_3.y - P_INV_2.y),
      };
    } else {
      // Side 3: Bottom Apex -> Top Right
      const u = (cycle - 2 / 3) / (1 / 3);
      return {
        x: P_INV_3.x + u * (P_INV_1.x - P_INV_3.x),
        y: P_INV_3.y + u * (P_INV_1.y - P_INV_3.y),
      };
    }
  };

  // Helper 2: Interpolate position along Upright Triangle perimeter (3 sides of equal length)
  const getUprightTrianglePoint = (t: number) => {
    const cycle = ((t % 1) + 1) % 1;
    if (cycle < 1 / 3) {
      // Side 1: Top Apex -> Bottom Right
      const u = cycle / (1 / 3);
      return {
        x: P_UP_1.x + u * (P_UP_2.x - P_UP_1.x),
        y: P_UP_1.y + u * (P_UP_2.y - P_UP_1.y),
      };
    } else if (cycle < 2 / 3) {
      // Side 2: Bottom Right -> Bottom Left (Horizontal)
      const u = (cycle - 1 / 3) / (1 / 3);
      return {
        x: P_UP_2.x + u * (P_UP_3.x - P_UP_2.x),
        y: P_UP_2.y + u * (P_UP_3.y - P_UP_2.y),
      };
    } else {
      // Side 3: Bottom Left -> Top Apex
      const u = (cycle - 2 / 3) / (1 / 3);
      return {
        x: P_UP_3.x + u * (P_UP_1.x - P_UP_3.x),
        y: P_UP_3.y + u * (P_UP_1.y - P_UP_3.y),
      };
    }
  };

  // Helper 3: Circular position at radius R
  const getCirclePoint = (radius: number, t: number, clockwise = true) => {
    const angleRad = (clockwise ? 1 : -1) * t * 2 * Math.PI;
    return {
      x: CX + radius * Math.cos(angleRad),
      y: CY + radius * Math.sin(angleRad),
    };
  };

  // Continuous smooth orbital loop
  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current !== null && isPlaying && hoveredId === null) {
        const delta = time - lastTimeRef.current;
        // Full cycle every 24 seconds at 1x speed
        const speed = (1 / 24000) * speedMultiplier;
        setProgress((prev) => (prev + speed * delta) % 1);
      }
      lastTimeRef.current = time;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, speedMultiplier, hoveredId]);

  // Map each social item to its dynamic coordinate based on the selected mode
  const nodePositions = SOCIAL_ORB_ITEMS.map((item, index) => {
    let coords = { x: CX, y: CY };
    let currentTrajectoryName = item.pathLabel;

    if (motionMode === 'all') {
      // All 4 Geometries in Motion simultaneously:
      switch (item.defaultPath) {
        case 'outer-circle': {
          // LinkedIn & YouTube on Outer Circle (spaced 180 degrees apart)
          const offset = item.id === 'linkedin' ? 0 : 0.5;
          coords = getCirclePoint(R_OUTER, progress + offset, true);
          currentTrajectoryName = 'Outer Circle Orbit';
          break;
        }
        case 'inner-circle': {
          // Facebook & Instagram on Chhota Circle (counter-rotating, spaced 180 deg)
          const offset = item.id === 'facebook' ? 0.25 : 0.75;
          coords = getCirclePoint(R_INNER, progress + offset, false);
          currentTrajectoryName = 'Chhota Circle Orbit (Counter-Rotational)';
          break;
        }
        case 'triangle-down': {
          // Twitter (X) gliding along the 3 edges of Inverted Triangle
          coords = getInvertedTrianglePoint(progress);
          currentTrajectoryName = 'Inverted Triangle ▽ (Edge Kinetic)';
          break;
        }
        case 'triangle-up': {
          // IIM HQ Portal gliding along the 3 edges of Upright Triangle
          coords = getUprightTrianglePoint(progress + 0.33);
          currentTrajectoryName = 'Upright Triangle △ (Edge Kinetic)';
          break;
        }
      }
    } else if (motionMode === 'triangles') {
      // Triangles Focus: 3 nodes on Inverted Triangle, 3 nodes on Upright Triangle
      if (index % 2 === 0) {
        const offset = (index / 6);
        coords = getInvertedTrianglePoint(progress + offset);
        currentTrajectoryName = 'Inverted Triangle ▽';
      } else {
        const offset = ((index - 1) / 6);
        coords = getUprightTrianglePoint(progress + offset);
        currentTrajectoryName = 'Upright Triangle △';
      }
    } else {
      // Dual Circles Focus: 3 nodes on Outer Circle, 3 nodes on Chhota Circle
      if (index % 2 === 0) {
        const offset = index / 6;
        coords = getCirclePoint(R_OUTER, progress + offset, true);
        currentTrajectoryName = 'Outer Circle Orbit';
      } else {
        const offset = (index - 1) / 6;
        coords = getCirclePoint(R_INNER, progress + offset, false);
        currentTrajectoryName = 'Chhota Circle Orbit';
      }
    }

    return {
      ...item,
      x: coords.x,
      y: coords.y,
      currentTrajectoryName,
    };
  });

  // Animated Tracer Beacons for both triangles and circles
  const tracerInv = getInvertedTrianglePoint(progress + 0.5);
  const tracerUp = getUprightTrianglePoint(progress + 0.83);
  const tracerInner = getCirclePoint(R_INNER, progress + 0.1, false);
  const tracerOuter = getCirclePoint(R_OUTER, progress + 0.25, true);

  return (
    <div className="w-full bg-gradient-to-br from-[#0a121d] via-[#0e1a2b] to-[#070e17] text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-700/60 shadow-2xl relative overflow-hidden">
      {/* Ambient background glow orbs */}
      <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#ff8c42_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      {/* Top Header Row with Status & Mode Selector */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-700/50">
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/30 border border-primary/50 text-amber-300 font-label-sm text-[11px] font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Dynamic Quad-Lattice Motion · 2 Circles &amp; 2 Triangles
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              Chhota Circle &amp; Both Triangles Active
            </span>
          </div>
          <h3 className="font-headline-md text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Harmonic Social Motion Visualizer</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Social media links are moving concurrently along the <strong className="text-amber-400">Outer Circle</strong>, the <strong className="text-sky-400">Chhota Circle</strong>, the <strong className="text-amber-400">Inverted Triangle (▽)</strong>, and the <strong className="text-sky-400">Upright Triangle (△)</strong>. Hover any node to pause &amp; click.
          </p>
        </div>

        {/* Playback & Trajectory Mode Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0 self-start md:self-center">
          {/* Motion Mode Selector */}
          <div className="flex items-center bg-slate-800/90 p-0.5 rounded-xl border border-slate-700 text-xs">
            <button
              type="button"
              onClick={() => setMotionMode('all')}
              className={`px-2.5 py-1 rounded-lg transition-all font-semibold flex items-center gap-1 ${
                motionMode === 'all'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="All 4 Geometries in Motion"
            >
              <Sparkles className="w-3 h-3" />
              <span>All 4 Shapes</span>
            </button>
            <button
              type="button"
              onClick={() => setMotionMode('triangles')}
              className={`px-2.5 py-1 rounded-lg transition-all font-semibold flex items-center gap-1 ${
                motionMode === 'triangles'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Focus on Triangles"
            >
              <Triangle className="w-3 h-3" />
              <span>2 Triangles</span>
            </button>
            <button
              type="button"
              onClick={() => setMotionMode('circles')}
              className={`px-2.5 py-1 rounded-lg transition-all font-semibold flex items-center gap-1 ${
                motionMode === 'circles'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Focus on Circles"
            >
              <CircleDot className="w-3 h-3" />
              <span>2 Circles</span>
            </button>
          </div>

          {/* Play/Pause Toggle */}
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            className={`px-3 py-1.5 rounded-xl font-label-md text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm border ${
              isPlaying
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
            }`}
            title={isPlaying ? 'Pause Motion' : 'Resume Motion'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Motion Active</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Paused</span>
              </>
            )}
          </button>

          {/* Speed Selector */}
          <div className="flex items-center bg-slate-800/80 p-0.5 rounded-xl border border-slate-700/70 text-[11px]">
            <button
              type="button"
              onClick={() => setSpeedMultiplier(0.5)}
              className={`px-2 py-1 rounded-lg transition-colors font-mono font-medium ${
                speedMultiplier === 0.5 ? 'bg-primary text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              0.5x
            </button>
            <button
              type="button"
              onClick={() => setSpeedMultiplier(1)}
              className={`px-2 py-1 rounded-lg transition-colors font-mono font-medium ${
                speedMultiplier === 1 ? 'bg-primary text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              1.0x
            </button>
            <button
              type="button"
              onClick={() => setSpeedMultiplier(2)}
              className={`px-2 py-1 rounded-lg transition-colors font-mono font-medium ${
                speedMultiplier === 2 ? 'bg-primary text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              2.0x
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage: Geometric Orbit Canvas (Left) + Companion Card Stack (Right) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
        {/* LEFT COLUMN: 2 Circles & 2 Triangles Motion Visualizer */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
          <div className="relative w-full max-w-[480px] sm:max-w-[500px] aspect-square flex items-center justify-center">
            {/* SVG Geometric Frame: 2 Circles & 2 Triangles */}
            <svg
              className="w-full h-full drop-shadow-[0_0_35px_rgba(153,65,6,0.25)] select-none pointer-events-none"
              viewBox="0 0 520 520"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Radial Glow Gradient */}
                <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#994106" stopOpacity="0.4" />
                  <stop offset="70%" stopColor="#d97706" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>

                {/* Laser Stroke Gradient for Inverted Triangle */}
                <linearGradient id="triangleDownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#994106" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#ea580c" stopOpacity="0.9" />
                </linearGradient>

                {/* Laser Stroke Gradient for Upright Triangle */}
                <linearGradient id="triangleUpGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#0284c7" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.9" />
                </linearGradient>

                {/* Outer Orbit Gradient */}
                <linearGradient id="outerOrbitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
                  <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.7" />
                </linearGradient>

                {/* Chhota Circle Inner Orbit Gradient */}
                <linearGradient id="innerOrbitGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Background ambient center aura */}
              <circle cx={CX} cy={CY} r={R_OUTER} fill="url(#centerGlow)" />

              {/* ==================== 1. OUTER CIRCLE ==================== */}
              <circle
                cx={CX}
                cy={CY}
                r={R_OUTER}
                stroke="url(#outerOrbitGrad)"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                className="opacity-75"
              />
              <circle
                cx={CX}
                cy={CY}
                r={R_OUTER + 12}
                stroke="#64748b"
                strokeWidth="1"
                strokeDasharray="2 8"
                className="opacity-40"
              />

              {/* ==================== 2. INVERTED TRIANGLE (Apex points DOWN) ==================== */}
              <polygon
                points={TRIANGLE_DOWN_PTS}
                stroke="url(#triangleDownGrad)"
                strokeWidth="2.5"
                strokeLinejoin="round"
                fill="rgba(153, 65, 6, 0.05)"
                className="filter drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
              />
              {/* Vertex pulse beacons for Inverted Triangle */}
              <circle cx="260" cy="460" r="4.5" fill="#f59e0b" className="animate-pulse" />
              <circle cx="433.2" cy="160" r="4.5" fill="#f59e0b" className="animate-pulse" />
              <circle cx="86.8" cy="160" r="4.5" fill="#f59e0b" className="animate-pulse" />

              {/* Inverted Triangle Live Laser Tracer Beam */}
              <circle
                cx={tracerInv.x}
                cy={tracerInv.y}
                r="6"
                fill="#f59e0b"
                className="filter drop-shadow-[0_0_10px_#f59e0b] opacity-80"
              />
              <circle
                cx={tracerInv.x}
                cy={tracerInv.y}
                r="2.5"
                fill="#ffffff"
              />

              {/* ==================== 3. UPRIGHT TRIANGLE (Apex points UP) ==================== */}
              <polygon
                points={TRIANGLE_UP_PTS}
                stroke="url(#triangleUpGrad)"
                strokeWidth="2.5"
                strokeLinejoin="round"
                fill="rgba(56, 189, 248, 0.04)"
                className="filter drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
              />
              {/* Vertex pulse beacons for Upright Triangle */}
              <circle cx="260" cy="60" r="4.5" fill="#38bdf8" className="animate-pulse" />
              <circle cx="433.2" cy="360" r="4.5" fill="#38bdf8" className="animate-pulse" />
              <circle cx="86.8" cy="360" r="4.5" fill="#38bdf8" className="animate-pulse" />

              {/* Upright Triangle Live Laser Tracer Beam */}
              <circle
                cx={tracerUp.x}
                cy={tracerUp.y}
                r="6"
                fill="#38bdf8"
                className="filter drop-shadow-[0_0_10px_#38bdf8] opacity-80"
              />
              <circle
                cx={tracerUp.x}
                cy={tracerUp.y}
                r="2.5"
                fill="#ffffff"
              />

              {/* ==================== 4. CHHOTA CIRCLE (Inner Circle Concentric) ==================== */}
              <circle
                cx={CX}
                cy={CY}
                r={R_INNER}
                stroke="url(#innerOrbitGrad)"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                className="opacity-85 filter drop-shadow-[0_0_6px_rgba(56,189,248,0.4)]"
              />
              <circle
                cx={CX}
                cy={CY}
                r={R_INNER - 8}
                stroke="#64748b"
                strokeWidth="1"
                strokeDasharray="2 6"
                className="opacity-50"
              />

              {/* Chhota Circle Animated Tracer Particle */}
              <circle
                cx={tracerInner.x}
                cy={tracerInner.y}
                r="5"
                fill="#38bdf8"
                className="filter drop-shadow-[0_0_8px_#38bdf8] opacity-90"
              />

              {/* Outer Circle Animated Tracer Particle */}
              <circle
                cx={tracerOuter.x}
                cy={tracerOuter.y}
                r="5"
                fill="#f59e0b"
                className="filter drop-shadow-[0_0_8px_#f59e0b] opacity-90"
              />

              {/* Central Sacred Crosshair Radial Rays */}
              <line x1={CX} y1={CY - R_INNER} x2={CX} y2={CY + R_INNER} stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="3 3" className="opacity-30" />
              <line x1={CX - R_INNER} y1={CY} x2={CX + R_INNER} y2={CY} stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="3 3" className="opacity-30" />
            </svg>

            {/* Central Institutional Core Badge (Inside Chhota Circle) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 sm:w-26 sm:h-26 rounded-full bg-slate-900/95 backdrop-blur-md border border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.3)] flex flex-col items-center justify-center p-2 text-center select-none pointer-events-auto group">
                <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/60 flex items-center justify-center text-amber-400 mb-0.5 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                <span className="font-title-md text-[10px] sm:text-[11px] font-bold text-white tracking-wider uppercase leading-tight">
                  IIM BBS
                </span>
                <span className="text-[8px] font-mono text-amber-300 uppercase tracking-widest font-semibold">
                  EST. 1978
                </span>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[8px] text-slate-300 font-mono">QUAD ORBIT</span>
                </div>
              </div>
            </div>

            {/* DYNAMIC MOVING SOCIAL MEDIA ORBS ACROSS CHHOTA CIRCLE, BOTH TRIANGLES & OUTER CIRCLE */}
            {nodePositions.map((node) => {
              const isHovered = hoveredId === node.id;
              // Percentage position relative to 520x520 canvas
              const leftPercent = `${(node.x / 520) * 100}%`;
              const topPercent = `${(node.y / 520) * 100}%`;

              return (
                <div
                  key={node.id}
                  style={{ left: leftPercent, top: topPercent }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-75"
                >
                  {/* Floating Link Target & Card */}
                  <a
                    href={node.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredId(node.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    aria-label={`Open ${node.name}`}
                    className="relative group block cursor-pointer transition-transform duration-200"
                    style={{
                      transform: isHovered ? 'scale(1.25)' : 'scale(1)',
                    }}
                  >
                    {/* Glowing pulse halo */}
                    <div
                      className="absolute -inset-2 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: node.brandColor }}
                    />

                    {/* Circular Icon Orb */}
                    <div
                      className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg border-2 transition-all ${
                        isHovered
                          ? 'border-white bg-slate-900 ring-4'
                          : 'border-white/90 bg-slate-900/90'
                      }`}
                      style={{
                        boxShadow: `0 0 20px ${node.glowColor}`,
                        borderColor: isHovered ? '#ffffff' : node.brandColor,
                      }}
                    >
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${node.accentBg} shadow-inner`}>
                        {renderSocialIcon(node.id, 'w-3.5 h-3.5 sm:w-4 sm:h-4 text-white')}
                      </div>

                      {/* Small Live Badge Dot */}
                      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
                    </div>

                    {/* Trajectory Badge Tag floating under orb */}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-1.5 py-0.5 rounded-md bg-slate-900/90 border border-slate-700/80 text-[8px] font-mono text-slate-300 whitespace-nowrap shadow-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                      {node.name}
                    </span>

                    {/* Popover Preview Card on Hover */}
                    {isHovered && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-60 p-3.5 rounded-xl bg-slate-900/95 backdrop-blur-md border border-slate-700 shadow-2xl text-left pointer-events-none z-30 animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="font-title-md text-xs font-bold text-white flex items-center gap-1">
                            {node.name}
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 font-semibold">
                            {node.statBadge}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-slate-400 truncate block mb-1">
                          {node.handle}
                        </span>
                        <div className="text-[10px] font-semibold text-emerald-400 mb-1.5 flex items-center gap-1">
                          <RotateCw className="w-3 h-3 animate-spin" />
                          <span>Trajectory: {node.currentTrajectoryName}</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-snug mb-2">
                          {node.description}
                        </p>
                        <div className="text-[10px] font-semibold text-primary-fixed flex items-center gap-1">
                          <span>Click to open official channel</span>
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </div>
                    )}
                  </a>
                </div>
              );
            })}
          </div>

          {/* Quick interactive hint below canvas */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5 text-[11px] text-slate-400 font-mono text-center">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Moving on 4 Paths: Outer Circle • Chhota Circle • Inverted ▽ • Upright △</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Channel Dossier & Direct Link Cards */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="flex items-center justify-between mb-1">
            <span className="font-label-sm text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-primary" />
              Verified Channels &amp; Moving Paths ({SOCIAL_ORB_ITEMS.length})
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Hover to locate
            </span>
          </div>

          {/* List of Channel Cards synced with the motion figure */}
          <div className="flex flex-col gap-2.5">
            {nodePositions.map((item) => {
              const isHovered = hoveredId === item.id;

              return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 group ${
                    isHovered
                      ? 'bg-slate-800/90 border-amber-400/80 shadow-lg -translate-x-1'
                      : 'bg-slate-900/60 hover:bg-slate-800/60 border-slate-700/50 hover:border-slate-600'
                  }`}
                  style={{
                    borderColor: isHovered ? item.brandColor : undefined,
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform ${item.accentBg} group-hover:scale-105 shadow-md`}
                    >
                      {renderSocialIcon(item.id, 'w-5 h-5 text-white')}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-title-md text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                          {item.name}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-amber-300/90 shrink-0 border border-slate-700">
                          {item.pathLabel}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-slate-400 truncate">
                        {item.handle}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-slate-400 group-hover:text-white shrink-0 font-label-sm text-xs transition-colors">
                    <span className="hidden sm:inline">Connect</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              );
            })}
          </div>

          {/* Regional Secretariat note */}
          <div className="mt-2 p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-[11px] text-slate-400 leading-relaxed flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
            <span>
              All social handles are officially administered by the Chapter Secretariat at CSIR-IMMT, Bhubaneswar.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
