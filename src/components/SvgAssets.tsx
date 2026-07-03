/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MobType } from '../types';
import * as Icons from 'lucide-react';

interface SvgProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

// 1. Creeper Vector SVG
export const CreeperIcon: React.FC<SvgProps> = ({ size = 64, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={`shape-rendering-crispedges ${className || ''}`}
    {...props}
  >
    {/* Background */}
    <rect width="16" height="16" fill="#3f9c35" rx="1" />
    <rect x="1" y="1" width="14" height="14" fill="#4bae4f" />
    <rect x="2" y="3" width="3" height="3" fill="#388e3c" />
    <rect x="11" y="2" width="3" height="3" fill="#388e3c" />
    <rect x="8" y="11" width="4" height="2" fill="#2e7d32" />
    <rect x="3" y="12" width="2" height="2" fill="#2e7d32" />
    
    {/* Creeper Face Pattern */}
    {/* Eyes */}
    <rect x="2" y="4" width="3" height="3" fill="#1b1c1a" />
    <rect x="11" y="4" width="3" height="3" fill="#1b1c1a" />
    {/* Nose & Mouth */}
    <rect x="5" y="7" width="6" height="4" fill="#1b1c1a" />
    <rect x="4" y="9" width="8" height="4" fill="#1b1c1a" />
    {/* Remove outer corners to shape mouth */}
    <rect x="4" y="11" width="1" height="2" fill="#1b1c1a" />
    <rect x="11" y="11" width="1" height="2" fill="#1b1c1a" />
    <rect x="5" y="12" width="6" height="1" fill="#1b1c1a" />
  </svg>
);

// 2. Steve Vector SVG
export const SteveIcon: React.FC<SvgProps> = ({ size = 64, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={`shape-rendering-crispedges ${className || ''}`}
    {...props}
  >
    {/* Face Skin */}
    <rect width="16" height="16" fill="#af7c64" rx="1" />
    {/* Hair */}
    <rect width="16" height="5" fill="#442c1c" />
    <rect x="0" y="5" width="2" height="2" fill="#442c1c" />
    <rect x="14" y="5" width="2" height="2" fill="#442c1c" />
    {/* Eyes */}
    <rect x="2" y="7" width="3" height="1" fill="#ffffff" />
    <rect x="3" y="7" width="2" height="1" fill="#261d7c" />
    <rect x="11" y="7" width="3" height="1" fill="#ffffff" />
    <rect x="11" y="7" width="2" height="1" fill="#261d7c" />
    {/* Nose */}
    <rect x="6" y="8" width="4" height="2" fill="#8e5d4a" />
    {/* Beard/Mouth */}
    <rect x="3" y="10" width="10" height="3" fill="#583c2c" />
    <rect x="4" y="10" width="8" height="1" fill="#bc8e72" />
    <rect x="5" y="11" width="6" height="1" fill="#442c1c" />
  </svg>
);

// 3. Pig Vector SVG
export const PigIcon: React.FC<SvgProps> = ({ size = 64, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={`shape-rendering-crispedges ${className || ''}`}
    {...props}
  >
    {/* Pink Head */}
    <rect width="16" height="16" fill="#f07297" rx="1" />
    {/* Spots */}
    <rect x="1" y="2" width="3" height="3" fill="#e25381" />
    <rect x="12" y="10" width="3" height="4" fill="#e25381" />
    {/* Eyes */}
    <rect x="1" y="5" width="3" height="2" fill="#ffffff" />
    <rect x="2" y="5" width="1" height="2" fill="#000000" />
    <rect x="12" y="5" width="3" height="2" fill="#ffffff" />
    <rect x="13" y="5" width="1" height="2" fill="#000000" />
    {/* Nose/Snout */}
    <rect x="4" y="8" width="8" height="5" fill="#f698b5" />
    <rect x="4" y="9" width="8" height="3" fill="#e35a84" />
    {/* Nostrils */}
    <rect x="5" y="10" width="2" height="2" fill="#9e1844" />
    <rect x="9" y="10" width="2" height="2" fill="#9e1844" />
  </svg>
);

// 4. Squid Vector SVG
export const SquidIcon: React.FC<SvgProps> = ({ size = 64, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={`shape-rendering-crispedges ${className || ''}`}
    {...props}
  >
    {/* Body */}
    <rect width="16" height="16" fill="#1d3049" rx="1" />
    <rect x="2" y="3" width="12" height="11" fill="#253e5c" />
    {/* Spots */}
    <rect x="4" y="1" width="2" height="2" fill="#395c7c" />
    <rect x="11" y="12" width="3" height="3" fill="#395c7c" />
    {/* Eyes */}
    <rect x="2" y="6" width="3" height="3" fill="#ffffff" />
    <rect x="3" y="7" width="2" height="2" fill="#1b4991" />
    <rect x="11" y="6" width="3" height="3" fill="#ffffff" />
    <rect x="11" y="7" width="2" height="2" fill="#1b4991" />
    {/* Mouth */}
    <rect x="6" y="10" width="4" height="4" fill="#a43232" />
    <rect x="7" y="11" width="2" height="2" fill="#120c0c" />
  </svg>
);

// 5. Zombie Vector SVG
export const ZombieIcon: React.FC<SvgProps> = ({ size = 64, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={`shape-rendering-crispedges ${className || ''}`}
    {...props}
  >
    {/* Face Green */}
    <rect width="16" height="16" fill="#147c47" rx="1" />
    {/* Hair */}
    <rect width="16" height="5" fill="#084224" />
    <rect x="0" y="5" width="2" height="2" fill="#084224" />
    <rect x="14" y="5" width="2" height="2" fill="#084224" />
    {/* Eyes */}
    <rect x="2" y="7" width="3" height="1" fill="#4bae4f" />
    <rect x="3" y="7" width="2" height="1" fill="#0c2c1c" />
    <rect x="11" y="7" width="3" height="1" fill="#4bae4f" />
    <rect x="11" y="7" width="2" height="1" fill="#0c2c1c" />
    {/* Nose */}
    <rect x="6" y="9" width="4" height="2" fill="#0d5430" />
    {/* Mouth */}
    <rect x="4" y="12" width="8" height="1" fill="#08381f" />
  </svg>
);

// 6. Bee Vector SVG
export const BeeIcon: React.FC<SvgProps> = ({ size = 64, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={`shape-rendering-crispedges ${className || ''}`}
    {...props}
  >
    {/* Yellow Face */}
    <rect width="16" height="16" fill="#fbb021" rx="1" />
    {/* Stripes */}
    <rect x="0" y="0" width="16" height="3" fill="#301f13" />
    <rect x="0" y="7" width="16" height="2" fill="#301f13" />
    <rect x="0" y="13" width="16" height="3" fill="#301f13" />
    {/* Eyes */}
    <rect x="2" y="4" width="3" height="3" fill="#ffffff" />
    <rect x="3" y="4" width="2" height="3" fill="#4d82b8" />
    <rect x="11" y="4" width="3" height="3" fill="#ffffff" />
    <rect x="11" y="4" width="2" height="3" fill="#4d82b8" />
    {/* Cheeks */}
    <rect x="2" y="9" width="2" height="2" fill="#ff7da8" />
    <rect x="12" y="9" width="2" height="2" fill="#ff7da8" />
    {/* Antennae */}
    <rect x="3" y="0" width="1" height="1" fill="#301f13" />
    <rect x="12" y="0" width="1" height="1" fill="#301f13" />
  </svg>
);

// 7. Enderman Vector SVG
export const EndermanIcon: React.FC<SvgProps> = ({ size = 64, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={`shape-rendering-crispedges ${className || ''}`}
    {...props}
  >
    {/* Dark Head */}
    <rect width="16" height="16" fill="#181818" rx="1" />
    <rect x="1" y="1" width="14" height="14" fill="#0d0d0d" />
    {/* Texture spots */}
    <rect x="2" y="4" width="2" height="2" fill="#1e132c" />
    <rect x="12" y="10" width="2" height="2" fill="#1e132c" />
    {/* Eyes (Glowing Purple/Teal) */}
    <rect x="1" y="7" width="4" height="2" fill="#e079f0" />
    <rect x="2" y="7" width="2" height="2" fill="#cc19cc" />
    <rect x="11" y="7" width="4" height="2" fill="#e079f0" />
    <rect x="12" y="7" width="2" height="2" fill="#cc19cc" />
  </svg>
);

// 8. Skeleton Vector SVG
export const SkeletonIcon: React.FC<SvgProps> = ({ size = 64, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={`shape-rendering-crispedges ${className || ''}`}
    {...props}
  >
    {/* Bone White Head */}
    <rect width="16" height="16" fill="#c2c2c2" rx="1" />
    <rect x="1" y="1" width="14" height="14" fill="#d9d9d9" />
    {/* Dark Details */}
    <rect x="3" y="3" width="2" height="2" fill="#aeaeae" />
    <rect x="11" y="3" width="2" height="2" fill="#aeaeae" />
    {/* Eyes */}
    <rect x="2" y="6" width="3" height="3" fill="#474747" />
    <rect x="11" y="6" width="3" height="3" fill="#474747" />
    {/* Nose */}
    <rect x="7" y="9" width="2" height="2" fill="#474747" />
    {/* Mouth */}
    <rect x="3" y="12" width="10" height="2" fill="#7d7d7d" />
    <rect x="3" y="12" width="2" height="1" fill="#474747" />
    <rect x="11" y="12" width="2" height="1" fill="#474747" />
    <rect x="7" y="12" width="2" height="2" fill="#474747" />
  </svg>
);

// 9. Chicken Vector SVG
export const ChickenIcon: React.FC<SvgProps> = ({ size = 64, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={`shape-rendering-crispedges ${className || ''}`}
    {...props}
  >
    {/* White Head */}
    <rect width="16" height="16" fill="#e3e3e3" rx="1" />
    <rect x="1" y="1" width="14" height="14" fill="#ffffff" />
    {/* Eyes */}
    <rect x="1" y="5" width="2" height="4" fill="#000000" />
    <rect x="1" y="5" width="1" height="4" fill="#ffffff" />
    <rect x="13" y="5" width="2" height="4" fill="#000000" />
    <rect x="14" y="5" width="1" height="4" fill="#ffffff" />
    {/* Beak */}
    <rect x="4" y="7" width="8" height="4" fill="#f89c16" />
    {/* Wattle (Red part below beak) */}
    <rect x="5" y="11" width="6" height="3" fill="#cc1d1d" />
  </svg>
);

// 10. Slime Vector SVG
export const SlimeIcon: React.FC<SvgProps> = ({ size = 64, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={`shape-rendering-crispedges ${className || ''}`}
    {...props}
  >
    {/* Outer Translucent Green */}
    <rect width="16" height="16" fill="#5cb85c" fillOpacity="0.75" rx="1" />
    <rect x="1" y="1" width="14" height="14" fill="#71c371" fillOpacity="0.8" />
    
    {/* Inner Core */}
    <rect x="3" y="3" width="10" height="10" fill="#328a32" />
    
    {/* Eyes */}
    <rect x="4" y="5" width="2" height="2" fill="#1b421b" />
    <rect x="10" y="5" width="2" height="2" fill="#1b421b" />
    {/* Mouth */}
    <rect x="7" y="9" width="2" height="1" fill="#1b421b" />
  </svg>
);

// 11. Alex Vector SVG
export const AlexIcon: React.FC<SvgProps> = ({ size = 64, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={`shape-rendering-crispedges ${className || ''}`}
    {...props}
  >
    {/* Face Skin */}
    <rect width="16" height="16" fill="#f4c29c" rx="1" />
    {/* Orange Hair */}
    <rect width="16" height="5" fill="#ca571e" />
    <rect x="0" y="5" width="3" height="4" fill="#ca571e" />
    <rect x="13" y="5" width="3" height="4" fill="#ca571e" />
    <rect x="3" y="5" width="1" height="2" fill="#ca571e" />
    <rect x="12" y="5" width="1" height="2" fill="#ca571e" />
    {/* Eyes */}
    <rect x="3" y="7" width="2" height="1" fill="#ffffff" />
    <rect x="4" y="7" width="1" height="1" fill="#4a7c59" />
    <rect x="11" y="7" width="2" height="1" fill="#ffffff" />
    <rect x="11" y="7" width="1" height="1" fill="#4a7c59" />
    {/* Pink lips */}
    <rect x="6" y="11" width="4" height="1" fill="#d08272" />
  </svg>
);

// 12. TNT Block Vector SVG
export const TntIcon: React.FC<SvgProps> = ({ size = 64, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={`shape-rendering-crispedges ${className || ''}`}
    {...props}
  >
    {/* Red Body */}
    <rect width="16" height="16" fill="#d93118" rx="1" />
    {/* Top fuses representation */}
    <rect x="0" y="0" width="16" height="2" fill="#3a3635" />
    <rect x="2" y="0" width="1" height="3" fill="#cccccc" />
    <rect x="7" y="0" width="1" height="3" fill="#cccccc" />
    <rect x="12" y="0" width="1" height="3" fill="#cccccc" />
    
    {/* White middle banner */}
    <rect x="0" y="5" width="16" height="6" fill="#ffffff" />
    {/* Red lines in banner */}
    <rect x="0" y="5" width="16" height="1" fill="#aaaaaa" />
    <rect x="0" y="10" width="16" height="1" fill="#aaaaaa" />
    
    {/* Black text representation: TNT */}
    {/* T */}
    <rect x="2" y="6" width="3" height="1" fill="#000000" />
    <rect x="3" y="7" width="1" height="2" fill="#000000" />
    {/* N */}
    <rect x="6" y="6" width="1" height="3" fill="#000000" />
    <rect x="7" y="7" width="1" height="1" fill="#000000" />
    <rect x="8" y="6" width="1" height="3" fill="#000000" />
    {/* T */}
    <rect x="10" y="6" width="3" height="1" fill="#000000" />
    <rect x="11" y="7" width="1" height="2" fill="#000000" />
    
    {/* Bottom detailed pixels */}
    <rect x="2" y="13" width="2" height="2" fill="#a81a05" />
    <rect x="10" y="12" width="3" height="2" fill="#a81a05" />
  </svg>
);

// 13. Diamond Vector SVG
export const DiamondIcon: React.FC<SvgProps> = ({ size = 64, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={`shape-rendering-crispedges ${className || ''}`}
    {...props}
  >
    {/* Transparent background, shape is diamond */}
    {/* Outer border dark blue */}
    <path d="M7,1 L9,1 L12,4 L14,6 L14,8 L11,11 L8,14 L5,11 L2,8 L2,6 L5,4 Z" fill="#205a75" />
    {/* Main body teal/light blue */}
    <path d="M7,2 L9,2 L11,4 L13,6 L13,7 L10,10 L8,12 L6,10 L3,7 L3,6 L5,4 Z" fill="#4dedf6" />
    {/* Shine highlight */}
    <rect x="7" y="3" width="2" height="2" fill="#ffffff" />
    <rect x="5" y="5" width="2" height="1" fill="#ffffff" />
    <rect x="10" y="5" width="1" height="2" fill="#9bfaff" />
    {/* Dark shading */}
    <path d="M8,11 L6,9 L4,7 L5,6 L6,7 L8,9 L10,7 L11,6 L12,7 L10,9 Z" fill="#2dabb2" />
  </svg>
);

// 14. Crafting Table Vector SVG
export const CraftingTableIcon: React.FC<SvgProps> = ({ size = 64, className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    className={`shape-rendering-crispedges ${className || ''}`}
    {...props}
  >
    {/* Wood base */}
    <rect width="16" height="16" fill="#754e32" rx="1" />
    {/* Planks styling */}
    <rect x="1" y="1" width="14" height="14" fill="#8d5e3c" />
    <rect x="0" y="0" width="16" height="2" fill="#442a18" />
    <rect x="0" y="14" width="16" height="2" fill="#442a18" />
    <rect x="0" y="0" width="2" height="16" fill="#442a18" />
    <rect x="14" y="0" width="2" height="16" fill="#442a18" />
    
    {/* Grid cross lines (the 3x3 crafting grid texture on top) */}
    <rect x="2" y="5" width="12" height="1" fill="#543720" />
    <rect x="2" y="10" width="12" height="1" fill="#543720" />
    <rect x="5" y="2" width="1" height="12" fill="#543720" />
    <rect x="10" y="2" width="1" height="12" fill="#543720" />
    
    {/* Side tool representations */}
    {/* Hammer symbol */}
    <rect x="3" y="3" width="1" height="1" fill="#ffffff" />
    <rect x="4" y="4" width="1" height="1" fill="#b0b0b0" />
    {/* Saw symbol */}
    <rect x="11" y="11" width="2" height="1" fill="#5a5a5a" />
    <rect x="12" y="12" width="1" height="1" fill="#3a3a3a" />
  </svg>
);

// Unified renderer helper
export const MinecraftMobIcon: React.FC<{ mob: MobType; size?: number; className?: string }> = ({
  mob,
  size = 64,
  className,
}) => {
  if (!mob) return null;

  const trimmedMob = mob.trim();

  // 1. Image URLs (http, https, base64 data URIs, or absolute paths)
  if (
    trimmedMob.startsWith('http://') ||
    trimmedMob.startsWith('https://') ||
    trimmedMob.startsWith('data:image') ||
    trimmedMob.startsWith('/')
  ) {
    return (
      <img
        src={trimmedMob}
        alt="mascote"
        width={size}
        height={size}
        className={`object-contain select-none ${className || ''}`}
        style={{ width: size, height: size }}
        referrerPolicy="no-referrer"
      />
    );
  }

  // 2. Minecraft classic mobs (preserve compatibility)
  switch (trimmedMob) {
    case 'creeper':
      return <CreeperIcon size={size} className={className} />;
    case 'steve':
      return <SteveIcon size={size} className={className} />;
    case 'pig':
      return <PigIcon size={size} className={className} />;
    case 'squid':
      return <SquidIcon size={size} className={className} />;
    case 'zombie':
      return <ZombieIcon size={size} className={className} />;
    case 'bee':
      return <BeeIcon size={size} className={className} />;
    case 'enderman':
      return <EndermanIcon size={size} className={className} />;
    case 'skeleton':
      return <SkeletonIcon size={size} className={className} />;
    case 'chicken':
      return <ChickenIcon size={size} className={className} />;
    case 'slime':
      return <SlimeIcon size={size} className={className} />;
    case 'alex':
      return <AlexIcon size={size} className={className} />;
    case 'tnt':
      return <TntIcon size={size} className={className} />;
    case 'diamond':
      return <DiamondIcon size={size} className={className} />;
    case 'crafting_table':
      return <CraftingTableIcon size={size} className={className} />;
  }

  // 3. Lucide Icons check
  // Matches exact name like "Heart" or "Smile", and normalized pascal case
  const pascalCaseName = trimmedMob.charAt(0).toUpperCase() + trimmedMob.slice(1);
  const IconComponent = (Icons as any)[trimmedMob] || (Icons as any)[pascalCaseName];
  if (IconComponent) {
    return <IconComponent size={size} className={className} />;
  }

  // 4. Default fallback: render as Emoji or direct text
  return (
    <div
      className={`flex items-center justify-center select-none font-sans leading-none ${className || ''}`}
      style={{
        width: size,
        height: size,
        fontSize: `${size * 0.75}px`,
      }}
    >
      {trimmedMob}
    </div>
  );
};
