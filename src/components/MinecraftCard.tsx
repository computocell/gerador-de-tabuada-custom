/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CardConfig, ThemeConfig, MobType, MathMode, AppSettings } from '../types';
import { MinecraftMobIcon } from './SvgAssets';

const WhatsAppIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-green-500"
    {...props}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.734-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.116-2.905-6.993-1.876-1.878-4.354-2.909-6.992-2.91-5.443 0-9.87 4.422-9.873 9.869-.001 1.775.462 3.51 1.342 5.043l-.955 3.485 3.578-.938zm12.72-7.142c-.29-.145-1.716-.848-1.982-.944-.265-.096-.458-.145-.65.145-.192.291-.745.944-.913 1.137-.168.193-.336.217-.626.072-.29-.145-1.223-.45-2.33-1.439-.861-.768-1.443-1.717-1.612-2.007-.168-.29-.018-.447.127-.591.13-.13.29-.338.435-.507.145-.169.193-.29.29-.483.097-.193.048-.361-.024-.506-.073-.145-.65-1.568-.892-2.148-.235-.568-.474-.49-.65-.499-.169-.008-.362-.01-.555-.01-.193 0-.507.072-.772.361-.265.291-1.012.988-1.012 2.41 0 1.422 1.036 2.795 1.18 2.99.145.193 2.039 3.114 4.939 4.363.69.297 1.229.475 1.649.608.694.22 1.327.19 1.826.115.556-.084 1.716-.7 1.959-1.374.243-.674.243-1.253.17-1.373-.073-.12-.266-.193-.556-.338z" />
  </svg>
);

const TeteLogo: React.FC<{ themeId: string }> = ({ themeId }) => {
  const isGeometric = themeId === 'geometric';

  return (
    <div className="flex flex-col items-center text-center w-full select-none gap-0.5 py-1 px-1.5 bg-white/5 rounded-xl border border-dashed border-slate-500/10">
      {/* Title */}
      <span 
        className="text-[9.5px] leading-tight font-black tracking-wide block truncate w-full uppercase"
        style={{
          fontFamily: '"Lilita One", "Fredoka", "Inter", sans-serif',
          color: isGeometric ? '#eab308' : '#1e3a8a', // vibrant yellow for dark, deep blue for MC
          textShadow: isGeometric ? '0 1px 1px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        Novidades da Teté
      </span>

      {/* QR Code */}
      <div className="bg-white p-[3px] rounded-lg border border-slate-200 shadow-sm flex items-center justify-center w-[54px] h-[54px] md:w-[60px] md:h-[60px] shrink-0">
        <img 
          src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://wa.me/5531972258752" 
          alt="WhatsApp QR Code"
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Description */}
      <span 
        className={`text-[5px] md:text-[5.5px] leading-snug tracking-tight block max-w-[120px] font-sans opacity-95 ${
          isGeometric ? 'text-slate-300' : 'text-slate-700 font-bold'
        }`}
      >
        Papelaria, terços e colares personalizados
      </span>

      {/* WhatsApp Link with logo */}
      <div className="flex items-center gap-0.5 mt-0.5">
        <WhatsAppIcon className="w-2.5 h-2.5 text-green-500 shrink-0" />
        <span 
          className={`text-[6px] md:text-[6.5px] font-bold font-mono tracking-wide ${
            isGeometric ? 'text-white' : 'text-slate-900'
          }`}
        >
          31 97225-8752
        </span>
      </div>
    </div>
  );
};

interface MinecraftCardProps {
  config: CardConfig;
  theme: ThemeConfig;
  mode: MathMode;
  showCutLines: boolean;
  fontSize: 'sm' | 'md' | 'lg';
  isCoverCard?: boolean;
  isTitleCard?: boolean;
  customTitle?: string;
  settings?: AppSettings;
}

export const MinecraftCard: React.FC<MinecraftCardProps> = ({
  config,
  theme,
  mode,
  showCutLines,
  fontSize,
  isCoverCard = false,
  isTitleCard = false,
  customTitle,
  settings,
}) => {
  // Determine text size classes
  const getTextSizeClass = () => {
    switch (fontSize) {
      case 'sm':
        return 'text-xs md:text-[11px] lg:text-[12px]';
      case 'lg':
        return 'text-sm md:text-sm lg:text-base';
      case 'md':
      default:
        return 'text-xs md:text-xs lg:text-[14px]';
    }
  };

  const getLineSpacingClass = () => {
    switch (fontSize) {
      case 'sm':
        return 'py-[1px] md:py-[1.5px]';
      case 'lg':
        return 'py-[4px] md:py-[5px]';
      case 'md':
      default:
        return 'py-[2px] md:py-[3px]';
    }
  };

  // Border and cut lines style
  const cardBorderClass = showCutLines
    ? 'border-2 border-dashed border-gray-400 p-[1px]'
    : 'p-[1px]';

  const isStraight = settings?.cardCorners === 'straight';

  // Resolve card key, name, and custom mob override
  const cardKey = isCoverCard ? 'cover' : isTitleCard ? 'title' : config.number.toString();
  const customName = settings?.cardNames?.[cardKey] || settings?.globalStudentName || '';
  const activeMob = settings?.mobsAssignment?.[cardKey] || config.mob;

  const isCustomBg = settings?.customBgType === 'image';
  const bgImageVal = settings?.customBgSource === 'upload' ? settings?.customBgUpload : settings?.customBgUrl;

  const renderCustomBgLayer = () => {
    if (!isCustomBg || !bgImageVal) return null;
    return (
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-300"
        style={{
          backgroundImage: `url(${bgImageVal})`,
          backgroundRepeat: settings?.customBgStyle === 'repeat' ? 'repeat' : 'no-repeat',
          backgroundSize: settings?.customBgStyle === 'repeat' ? 'auto' : settings?.customBgStyle,
          backgroundPosition: 'center',
          opacity: (settings?.customBgOpacity ?? 30) / 100,
          zIndex: 0,
        }}
      />
    );
  };

  // Card background style based on theme
  const cardBgStyle = {
    backgroundColor: theme.cardBg,
    borderColor: theme.primaryColor,
  };

  const isGeometric = theme.id === 'geometric';

  const renderStudentName = (location: 'header' | 'block_top' | 'block_bottom' | 'card_bottom') => {
    if (!customName || settings?.studentNameLocation !== location) return null;

    const baseStyle: React.CSSProperties = {
      transform: `translate(${settings?.studentNameXOffset ?? 0}px, ${settings?.studentNameYOffset ?? 0}px)`,
      fontSize: `${settings?.studentNameSize ?? 10}px`,
    };

    if (location === 'header') {
      return (
        <span 
          className={`text-white/90 font-bold uppercase leading-none mt-1 truncate w-full text-center block ${isGeometric ? 'font-sans tracking-widest' : 'font-pixel tracking-wider'}`}
          style={baseStyle}
        >
          • {customName} •
        </span>
      );
    }

    if (location === 'block_top') {
      return (
        <div 
          className={`text-center pb-1 w-full truncate border-b mb-1 font-bold ${isGeometric ? 'font-sans text-slate-700' : 'font-pixel text-slate-600'}`}
          style={{
            ...baseStyle,
            borderBottomColor: 'rgba(0,0,0,0.06)',
          }}
        >
          {customName}
        </div>
      );
    }

    if (location === 'block_bottom') {
      return (
        <div 
          className={`text-center pt-1 w-full truncate border-t mt-1 font-bold ${isGeometric ? 'font-sans text-slate-700' : 'font-pixel text-slate-600'}`}
          style={{
            ...baseStyle,
            borderTopColor: 'rgba(0,0,0,0.06)',
          }}
        >
          {customName}
        </div>
      );
    }

    if (location === 'card_bottom') {
      return (
        <div 
          className={`absolute bottom-2 left-1/2 -translate-x-1/2 z-20 bg-slate-950/90 border border-slate-700 px-2 py-0.5 rounded text-white text-center truncate max-w-[90%] font-semibold ${isGeometric ? 'font-sans' : 'font-pixel'}`}
          style={baseStyle}
        >
          {customName}
        </div>
      );
    }

    return null;
  };

  const getMobPositionClass = () => {
    const pos = settings?.mobPosition ?? 'bottom_right';
    switch (pos) {
      case 'bottom_left': return 'bottom-1 left-1';
      case 'top_right': return 'top-1 right-1';
      case 'top_left': return 'top-1 left-1';
      case 'bottom_right':
      default:
        return 'bottom-1 right-1';
    }
  };

  // Render Variant A: Decorative Cover Card (Card 1)
  if (isCoverCard) {
    if (theme.id === 'geometric') {
      return (
        <div className={`w-full h-full flex flex-col ${cardBorderClass} select-none`}>
          <div
            className={`w-full h-full ${isStraight ? 'rounded-none' : 'rounded-lg'} border-2 border-slate-900 flex flex-col justify-between overflow-hidden relative shadow-md bg-slate-950 p-3`}
          >
            {renderCustomBgLayer()}
            {/* Elegant Geometric Shapes Watermark Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none z-0">
              <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" stroke="currentColor" className="text-slate-700">
                <circle cx="50" cy="50" r="40" strokeWidth="0.5" strokeDasharray="2,2" />
                <circle cx="50" cy="50" r="30" strokeWidth="1" />
                <circle cx="50" cy="50" r="20" strokeWidth="0.5" />
                <rect x="25" y="25" width="50" height="50" strokeWidth="0.5" strokeDasharray="1,1" transform="rotate(45 50 50)" />
                <polygon points="50,15 80,75 20,75" strokeWidth="0.5" />
                <line x1="50" y1="0" x2="50" y2="100" strokeWidth="0.25" strokeDasharray="4,4" />
                <line x1="0" y1="50" x2="100" y2="50" strokeWidth="0.25" strokeDasharray="4,4" />
              </svg>
            </div>

            <div className="z-10 flex flex-col justify-between h-full items-center py-0.5 w-full">
              <div className="text-center font-sans">
                <span className="block text-slate-400 font-extrabold text-[9px] tracking-wider uppercase">ESTUDO</span>
                <span className="block text-white font-black text-[12px] tracking-widest leading-none mt-0.5">PRÁTICO</span>
              </div>

              {/* Tete Logo */}
              <TeteLogo themeId={theme.id} />

              {customName ? (
                <div className="bg-blue-950/80 border border-blue-500/40 rounded px-2 py-0.5 text-center w-full mt-1">
                  <span className="block text-white font-bold text-[8px] truncate">{customName}</span>
                </div>
              ) : (
                <div className="text-[7px] text-slate-500 font-mono tracking-widest uppercase">
                  Edição de Bolso
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`w-full h-full flex flex-col ${cardBorderClass} select-none`}>
        <div
          className={`w-full h-full ${isStraight ? 'rounded-none' : 'rounded-2xl'} border-4 flex flex-col justify-between overflow-hidden relative shadow-md`}
          style={cardBgStyle}
        >
          {renderCustomBgLayer()}
          {/* Minecraft sky landscape */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-sky-400 to-sky-200 flex flex-col justify-between transition-opacity duration-300"
            style={isCustomBg && bgImageVal ? { opacity: 0.15 } : {}}
          >
            {/* Sun */}
            <div className="absolute top-4 right-4 w-10 h-10 bg-yellow-300 border-2 border-yellow-500 shadow-inner shape-rendering-crispedges" />
            
            {/* Square Clouds */}
            <div className="absolute top-6 left-3 w-16 h-4 bg-white opacity-80" />
            <div className="absolute top-10 right-12 w-20 h-5 bg-white opacity-80" />

            {/* Hills vector layout */}
            <div className="absolute bottom-0 inset-x-0">
              {/* Back hills */}
              <div className="h-16 bg-green-700 opacity-60 w-full relative">
                <div className="absolute -top-3 left-4 w-12 h-6 bg-green-700" />
                <div className="absolute -top-5 right-6 w-16 h-8 bg-green-700" />
              </div>
              {/* Front hills */}
              <div className="h-10 bg-green-600 w-full relative">
                <div className="absolute -top-4 left-10 w-20 h-8 bg-green-600" />
                <div className="absolute -top-2 right-16 w-14 h-5 bg-green-600" />
              </div>
              {/* Dirt base */}
              <div className="h-6 bg-amber-800 w-full border-t-2 border-green-800 flex overflow-hidden">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-full border-r border-amber-900 opacity-20 ${
                      i % 2 === 0 ? 'bg-amber-900' : ''
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Content overlay */}
            <div className="z-10 p-2.5 flex flex-col items-center justify-between h-full w-full">
              {/* Estudo Prático Header block */}
              <div className="text-center font-pixel">
                <span className="block text-slate-800 font-extrabold text-[8px] tracking-wider uppercase drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">ESTUDO</span>
                <span className="block text-blue-900 font-black text-[10px] tracking-widest leading-none mt-0.5 drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">PRÁTICO</span>
              </div>

              {/* The Logo with QR Code */}
              <TeteLogo themeId={theme.id} />

              {customName ? (
                <div className="bg-gray-900/90 border border-gray-700 rounded px-2 py-0.5 text-center max-w-[90%] truncate mt-1">
                  <span className="block text-white font-pixel text-[7px] truncate">{customName}</span>
                </div>
              ) : (
                <div className="text-gray-800 font-pixel text-[6px] tracking-widest text-shadow-sm uppercase">
                  EDITADO A4
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Variant B: Title Card (Card 2)
  if (isTitleCard) {
    const defaultTitle = mode === 'multiplication' ? 'TABUADAS DE MULTIPLICAR' : 'TABUADAS DE DIVIDIR';
    const displayTitle = customTitle || defaultTitle;
    
    if (theme.id === 'geometric') {
      return (
        <div className={`w-full h-full flex flex-col ${cardBorderClass} select-none`}>
          <div
            className={`w-full h-full ${isStraight ? 'rounded-none' : 'rounded-lg'} border-2 border-slate-900 flex flex-col justify-between overflow-hidden relative shadow-md p-4 bg-slate-900 text-white`}
          >
            {renderCustomBgLayer()}
            <div className="z-10 flex flex-col justify-between h-full items-center text-center">
              <div className="bg-slate-800 border border-slate-700 text-slate-300 px-2 py-0.5 rounded text-[8px] font-bold tracking-[0.15em] uppercase">
                Matemática
              </div>

              <div className="my-auto w-full px-1 flex flex-col gap-1">
                <span className="text-[12px] md:text-[14px] lg:text-[16px] font-black tracking-tight leading-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  {displayTitle}
                </span>
                <div className="h-[2px] w-12 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto my-1" />
              </div>

              <div className="flex flex-col items-center gap-0.5 mt-auto mb-1 w-full">
                <span 
                  className="text-[9.5px] font-black text-yellow-400 tracking-wide uppercase block"
                  style={{ fontFamily: '"Lilita One", "Fredoka", "Inter", sans-serif' }}
                >
                  Novidades da Teté
                </span>
                <span className="text-[6.5px] text-slate-300 font-medium uppercase tracking-widest block font-sans">
                  Papelaria Personalizada
                </span>
                <div className="flex items-center gap-0.5 mt-0.5 justify-center">
                  <WhatsAppIcon className="w-2.5 h-2.5 text-green-500 shrink-0" />
                  <span className="text-[7.5px] text-white font-bold font-mono tracking-wide">
                    (31) 97225-8752
                  </span>
                </div>
                {customName && (
                  <span className="text-[6.5px] text-blue-400 font-bold tracking-wider uppercase mt-1 truncate max-w-[90px] block">
                    {customName}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Split title into words to style each separately
    const words = displayTitle.split(' ');

    return (
      <div className={`w-full h-full flex flex-col ${cardBorderClass} select-none`}>
        <div
          className={`w-full h-full ${isStraight ? 'rounded-none' : 'rounded-2xl'} border-4 flex flex-col justify-between overflow-hidden relative shadow-md p-3`}
          style={{
            ...cardBgStyle,
            backgroundImage: isCustomBg && bgImageVal ? `url(${bgImageVal})` : 'repeating-conic-gradient(#3a2211 0% 25%, #4c2d18 0% 50%)',
            backgroundSize: isCustomBg && bgImageVal ? (settings?.customBgStyle === 'repeat' ? 'auto' : settings?.customBgStyle) : '16px 16px',
            backgroundRepeat: isCustomBg && bgImageVal ? (settings?.customBgStyle === 'repeat' ? 'repeat' : 'no-repeat') : 'repeat',
            backgroundPosition: 'center',
          }}
        >
          {/* Subtle dirt pattern shading */}
          <div className="absolute inset-0 bg-black/40" style={isCustomBg && bgImageVal ? { opacity: (settings?.customBgOpacity ?? 30) / 100 } : {}} />

          <div className="z-10 flex flex-col justify-between h-full items-center text-center">
            {/* Small header */}
            <div className="bg-yellow-400 text-black border-2 border-yellow-600 px-2 py-0.5 rounded font-pixel text-[8px] tracking-widest mt-1">
              EDUCATIVO
            </div>

            {/* 3D Pixelated Title Box */}
            <div className="flex flex-col gap-1.5 my-auto w-full px-1">
              {words.map((word, index) => (
                <div key={index} className="relative group">
                  {/* Shadow Text (3D effect) */}
                  <span className="absolute -bottom-[2px] right-[2px] w-full text-black font-pixel text-[11px] md:text-[12px] lg:text-[15px] select-none block">
                    {word}
                  </span>
                  {/* Main text */}
                  <span className="relative text-yellow-300 font-pixel text-[11px] md:text-[12px] lg:text-[15px] block font-bold tracking-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                    {word}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom centerpiece crafting table or TNT + Stationery details */}
            <div className="flex flex-col items-center gap-1 mt-auto w-full">
              {/* Mini mob icon */}
              <div className="p-1 bg-black/30 rounded-lg border border-white/10 mb-0.5 shrink-0">
                <MinecraftMobIcon mob={activeMob} size={28} className="drop-shadow-lg" />
              </div>

              {/* Novidades da Teté block */}
              <div className="flex flex-col items-center gap-0.5 leading-none">
                <span 
                  className="text-yellow-400 text-[8.5px] tracking-wide text-shadow-sm font-black uppercase"
                  style={{ fontFamily: '"Lilita One", "Fredoka", "Inter", sans-serif' }}
                >
                  Novidades da Teté
                </span>
                <span className="text-white font-pixel text-[5px] tracking-wide uppercase opacity-95">
                  Papelaria Personalizada
                </span>
                <div className="flex items-center gap-0.5 mt-0.5 justify-center">
                  <WhatsAppIcon className="w-2.5 h-2.5 text-green-500 shrink-0" />
                  <span className="text-white font-pixel text-[6.5px] font-bold tracking-tight">
                    (31) 97225-8752
                  </span>
                </div>
              </div>

              {customName && (
                <span className="font-pixel text-[6px] text-yellow-300 tracking-tight mt-1 truncate max-w-[90px] block">{customName}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Variant C: Standard Math Card (Cards 3 to 12)
  const accentColor = isGeometric 
    ? (mode === 'multiplication' ? theme.secondaryColor : theme.accentColor)
    : theme.primaryColor;

  return (
    <div className={`w-full h-full flex flex-col ${cardBorderClass} select-none`}>
      <div
        className={`w-full h-full ${isStraight ? 'rounded-none' : (isGeometric ? 'rounded-lg' : 'rounded-2xl')} ${isGeometric ? 'border-2' : 'border-4'} flex flex-col overflow-hidden shadow-sm relative hover:shadow-md transition-shadow`}
        style={{
          backgroundColor: theme.cardBg,
          borderColor: isGeometric ? '#0f172a' : theme.primaryColor,
        }}
      >
        {renderCustomBgLayer()}
        {/* Card Header */}
        <div
          className="px-2 py-2 flex items-center justify-between border-b-2 text-center"
          style={{
            backgroundColor: isGeometric ? accentColor : theme.secondaryColor,
            borderColor: isGeometric ? '#0f172a' : theme.primaryColor,
          }}
        >
          <div className="flex flex-col text-center w-full">
            <h3 className={`text-white text-center truncate w-full leading-tight ${isGeometric ? 'font-sans font-black uppercase tracking-wider text-[9px] md:text-[10px] lg:text-[11px]' : 'font-pixel text-[8px] md:text-[9px] lg:text-[10px] font-semibold text-shadow-sm'}`}>
              {config.title}
            </h3>
            {renderStudentName('header')}
          </div>
        </div>

        {/* Equations Container (Customizable rounded area) */}
        <div 
          className={`flex-1 m-2 p-1.5 md:p-2 ${isGeometric ? 'rounded-md border border-slate-200' : 'rounded-xl border border-gray-100'} flex flex-col justify-center relative overflow-hidden z-10`}
          style={{
            transform: `translate(${settings?.equationsBlockXOffset ?? 0}px, ${settings?.equationsBlockYOffset ?? 0}px) scale(${(settings?.equationsBlockScale ?? 100) / 100})`,
            transformOrigin: 'center',
          }}
        >
          {/* Custom Background Color & Opacity Layer */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundColor: settings?.equationBgColor || '#ffffff',
              opacity: (settings?.equationBgOpacity ?? 100) / 100,
              zIndex: -1,
            }}
          />
          
          {/* Subtle background math grid */}
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Math Equations List with optional student name at top or bottom of block */}
          <div className="flex flex-col justify-center h-full w-full">
            {renderStudentName('block_top')}
            
            <div className="flex-1 flex flex-col justify-center">
              {config.equations.map((eq) => (
                <div
                  key={eq.id}
                  className={`grid grid-cols-[1.5fr_1fr_1.5fr_1fr_2.25fr] max-w-[135px] mx-auto w-full items-center font-mono ${getTextSizeClass()} ${getLineSpacingClass()} border-b border-gray-50 last:border-0 hover:bg-gray-50/50 rounded px-1 transition-colors`}
                >
                  {/* Left operand */}
                  <span className="text-right text-gray-700 font-medium">
                    {eq.left}
                  </span>
                  
                  {/* Operator (X or /) */}
                  <span
                    className="text-center font-bold font-sans"
                    style={{ color: accentColor }}
                  >
                    {eq.operator}
                  </span>

                  {/* Right operand */}
                  <span className="text-left text-gray-700 font-medium pl-1">
                    {eq.right}
                  </span>

                  {/* Equals sign */}
                  <span className="text-center text-gray-400 font-semibold">=</span>

                  {/* Result */}
                  <span className="text-left font-bold text-gray-900 pl-1.5">
                    {eq.result}
                  </span>
                </div>
              ))}
            </div>

            {renderStudentName('block_bottom')}
          </div>
        </div>

        {/* Floated mob icon (at same level/sibling of equations block) with dynamic position, scale, and offset */}
        {(settings?.mobEnabled ?? true) && settings?.mobPosition !== 'hidden' && (
          <div 
            className={`absolute pointer-events-none drop-shadow-md select-none transition-all ${getMobPositionClass()} z-20`}
            style={{
              transform: `translate(${settings?.mobXOffset ?? 0}px, ${settings?.mobYOffset ?? 0}px) scale(${(settings?.mobScale ?? 100) / 100})`,
              transformOrigin: settings?.mobPosition === 'bottom_left' ? 'bottom left' : 
                               settings?.mobPosition === 'top_right' ? 'top right' :
                               settings?.mobPosition === 'top_left' ? 'top left' : 'bottom right',
              opacity: (settings?.mobOpacity ?? 100) / 100,
            }}
          >
            <MinecraftMobIcon mob={activeMob} size={30} />
          </div>
        )}
        {renderStudentName('card_bottom')}
      </div>
    </div>
  );
};
