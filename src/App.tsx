/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { MathMode, AppSettings, ThemeConfig } from './types';
import { THEMES, DEFAULT_SETTINGS, generateCardConfig } from './utils';
import { A4Sheet } from './components/A4Sheet';
import { PracticeMode } from './components/PracticeMode';
import { CustomizePanel } from './components/CustomizePanel';
import { MinecraftCard } from './components/MinecraftCard';
import { MinecraftMobIcon } from './components/SvgAssets';
import { 
  Printer, 
  Scissors, 
  Sparkles, 
  Eye, 
  LayoutGrid, 
  Award, 
  FileText, 
  HelpCircle, 
  RotateCcw,
  Check,
  GripVertical,
  Move,
  ZoomIn,
  ZoomOut,
  Maximize2
} from 'lucide-react';

const A4Wrapper = ({ children, scale }: { children: React.ReactNode, scale: number }) => {
  const width = Math.round(794 * scale);
  const height = Math.round(1123 * scale);

  return (
    <div 
      className="relative shrink-0 shadow-2xl rounded-lg overflow-hidden border border-slate-200/50 dark:border-slate-850/50 bg-white"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <div 
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: '794px',
          height: '1123px',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <div style={{ width: '210mm', height: '297mm' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeView, setActiveView] = useState<'multi' | 'div' | 'both' | 'practice'>('both');
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('mc_tabuadas_settings_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_SETTINGS,
          ...parsed,
          mobsAssignment: {
            ...DEFAULT_SETTINGS.mobsAssignment,
            ...(parsed.mobsAssignment || {}),
          },
          cardNames: {
            ...DEFAULT_SETTINGS.cardNames,
            ...(parsed.cardNames || {}),
          },
        };
      } catch (e) {
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  const [showCutLines, setShowCutLines] = useState<boolean>(settings.showGridLines);
  const [activeTheme, setActiveTheme] = useState<ThemeConfig>(() => {
    const baseTheme = THEMES[settings.theme];
    const customColors = settings.customThemeColors?.[settings.theme];
    return customColors ? { ...baseTheme, ...customColors } : baseTheme;
  });
  const [copiedInfo, setCopiedInfo] = useState<boolean>(false);

  // States for Real-time Floating Viewfinder (Resizable and stretchable)
  const [floatingPreviewOpen, setFloatingPreviewOpen] = useState<boolean>(true);
  const [floatingCardType, setFloatingCardType] = useState<'cover' | 'title' | 'table-5' | 'table-9'>('table-5');
  const [floatingScale, setFloatingScale] = useState<number>(1.0);
  const [visorWidth, setVisorWidth] = useState<number>(300);
  const [visorHeight, setVisorHeight] = useState<number>(460);
  const [autoFit, setAutoFit] = useState<boolean>(true);
  const [workspaceZoom, setWorkspaceZoom] = useState<number>(75);

  const [visorPos, setVisorPos] = useState<{ x: number; y: number }>(() => {
    const defaultX = typeof window !== 'undefined' ? window.innerWidth - 340 : 850;
    return { x: Math.max(20, defaultX), y: 140 };
  });

  // Track window width for responsive preview scaling
  const [windowWidth, setWindowWidth] = useState<number>(() => typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate dynamic scale for the preview sheets so they never clip or spill over
  const previewScale = useMemo(() => {
    const panelWidth = windowWidth >= 1280 ? 480 : (windowWidth >= 1024 ? 450 : 0);
    const containerPadding = windowWidth >= 768 ? 120 : 48;
    const availableWidth = windowWidth - panelWidth - containerPadding;
    
    // Width of A4 is 210mm. At 96 DPI, 210mm is approx 794px.
    const targetScale = availableWidth / 794;
    
    // Clamp the scale so it feels visually perfect (minimum 0.35, maximum 1.0)
    return Math.max(0.35, Math.min(1.0, targetScale));
  }, [windowWidth]);

  const currentScale = useMemo(() => {
    if (autoFit) {
      return previewScale;
    }
    return workspaceZoom / 100;
  }, [autoFit, previewScale, workspaceZoom]);

  const displayZoomPercent = useMemo(() => {
    return Math.round(currentScale * 100);
  }, [currentScale]);

  const handleZoomIn = () => {
    setAutoFit(false);
    setWorkspaceZoom(prev => Math.min(150, Math.round((prev + 10) / 10) * 10));
  };

  const handleZoomOut = () => {
    setAutoFit(false);
    setWorkspaceZoom(prev => Math.max(35, Math.round((prev - 10) / 10) * 10));
  };

  const handleDragMouseDown = (e: React.MouseEvent) => {
    // Prevent dragging if interactive elements inside the header are clicked
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('select') || target.closest('input')) {
      return;
    }
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startPosX = visorPos.x;
    const startPosY = visorPos.y;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      
      const newX = Math.max(0, Math.min(window.innerWidth - 120, startPosX + deltaX));
      const newY = Math.max(0, Math.min(window.innerHeight - 120, startPosY + deltaY));
      
      setVisorPos({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleDragTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('select') || target.closest('input')) {
      return;
    }
    const touch = e.touches[0];
    const startX = touch.clientX;
    const startY = touch.clientY;
    const startPosX = visorPos.x;
    const startPosY = visorPos.y;

    const handleTouchMove = (moveEvent: TouchEvent) => {
      const moveTouch = moveEvent.touches[0];
      const deltaX = moveTouch.clientX - startX;
      const deltaY = moveTouch.clientY - startY;

      const newX = Math.max(0, Math.min(window.innerWidth - 120, startPosX + deltaX));
      const newY = Math.max(0, Math.min(window.innerHeight - 120, startPosY + deltaY));

      setVisorPos({ x: newX, y: newY });
    };

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  const handleResizeMouseDown = (e: React.MouseEvent, direction: 'width' | 'height' | 'both') => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = visorWidth;
    const startHeight = visorHeight;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (direction === 'width' || direction === 'both') {
        const newWidth = Math.max(220, Math.min(900, startWidth + (moveEvent.clientX - startX)));
        setVisorWidth(newWidth);
      }
      if (direction === 'height' || direction === 'both') {
        const newHeight = Math.max(280, Math.min(1000, startHeight - (moveEvent.clientY - startY)));
        setVisorHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleResizeTouchStart = (e: React.TouchEvent, direction: 'width' | 'height' | 'both') => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    const startY = touch.clientY;
    const startWidth = visorWidth;
    const startHeight = visorHeight;

    const handleTouchMove = (moveEvent: TouchEvent) => {
      const moveTouch = moveEvent.touches[0];
      if (direction === 'width' || direction === 'both') {
        const newWidth = Math.max(220, Math.min(900, startWidth + (moveTouch.clientX - startX)));
        setVisorWidth(newWidth);
      }
      if (direction === 'height' || direction === 'both') {
        const newHeight = Math.max(280, Math.min(1000, startHeight - (moveTouch.clientY - startY)));
        setVisorHeight(newHeight);
      }
    };

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  // Sync settings with localStorage and state
  useEffect(() => {
    const isDefault = JSON.stringify(settings) === JSON.stringify(DEFAULT_SETTINGS);
    if (isDefault) {
      localStorage.removeItem('mc_tabuadas_settings_v1');
    } else {
      localStorage.setItem('mc_tabuadas_settings_v1', JSON.stringify(settings));
    }
    setShowCutLines(settings.showGridLines);
    
    const baseTheme = THEMES[settings.theme];
    const customColors = settings.customThemeColors?.[settings.theme];
    if (customColors) {
      setActiveTheme({
        ...baseTheme,
        ...customColors,
      });
    } else {
      setActiveTheme(baseTheme);
    }
  }, [settings]);

  const handleResetSettings = () => {
    if (window.confirm('Deseja mesmo redefinir todas as personalizações para o padrão?')) {
      setSettings(DEFAULT_SETTINGS);
    }
  };

  const handlePrint = () => {
    // In our print-specific stylesheet, we've set everything with .no-print to display: none.
    // However, if the activeView is 'both', both sheets will print consecutively (page break in between).
    // If the activeView is 'multi', only the multiplication sheet will print.
    // If the activeView is 'div', only the division sheet will print.
    // If the activeView is 'practice', we can gently prompt them to select one of the sheet views.
    if (activeView === 'practice') {
      setActiveView('both');
      setTimeout(() => {
        window.print();
      }, 300);
    } else {
      window.print();
    }
  };

  const isGeometric = settings.theme === 'geometric';

  return (
    <div className={`min-h-screen ${isGeometric ? 'bg-slate-200 text-slate-950' : 'bg-slate-950 text-slate-100'} font-sans flex flex-col antialiased transition-colors duration-200`}>
      
      {/* 1. Header (Hidden in Print) */}
      <header className={`no-print ${isGeometric ? 'bg-white border-b border-slate-300 text-slate-900 shadow-sm' : 'bg-slate-900 border-b border-slate-800'} shrink-0 sticky top-0 z-50 transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3">
            <div className={`p-1.5 ${isGeometric ? 'bg-slate-900 border border-slate-950' : 'bg-green-600 border border-green-500'} rounded-xl shadow-inner`}>
              <MinecraftMobIcon mob="crafting_table" size={36} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`${isGeometric ? 'font-sans font-black text-slate-900 tracking-wider text-xs' : 'font-pixel text-[10px] md:text-xs text-yellow-400 font-bold tracking-wider'}`}>
                  CRAFT TABUADAS
                </span>
                <span className={`${isGeometric ? 'bg-blue-600 text-white' : 'bg-green-500 text-slate-950 font-pixel text-[6px]'} px-1.5 py-0.5 rounded uppercase font-bold text-[8px]`}>
                  v2.0 A4
                </span>
              </div>
              <h1 className={`text-xs ${isGeometric ? 'text-slate-500' : 'text-slate-400'} font-medium`}>
                Gerador de Tabuadas de Alta Resolução em Tamanho A4
              </h1>
            </div>
          </div>

          {/* Core Controls */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleResetSettings}
              className={`px-3 py-2 ${isGeometric ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-400 hover:text-white'} active:translate-y-0.5 rounded-xl border text-xs transition-all flex items-center gap-1.5 cursor-pointer`}
              title="Redefinir ajustes"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Limpar</span>
            </button>

            <button
              onClick={handlePrint}
              className={`px-5 py-2.5 ${isGeometric ? 'bg-slate-900 hover:bg-slate-800 border-slate-900 hover:border-slate-800 text-white font-sans font-bold text-xs' : 'bg-green-600 hover:bg-green-500 border-green-500 hover:border-green-400 text-white font-pixel text-[8px]'} active:translate-y-0.5 tracking-wide rounded-xl border-2 transition-all shadow-lg flex items-center gap-2 cursor-pointer`}
            >
              <Printer className="w-4 h-4" />
              <span>IMPRIMIR BARALHO (A4)</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. View TABS / Subnavigation (Hidden in Print) */}
      <nav className={`no-print ${isGeometric ? 'bg-slate-50 border-b border-slate-200 shadow-xs' : 'bg-slate-900/40 border-b border-slate-800/60'} py-2.5 shrink-0 transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveView('both')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeView === 'both'
                ? isGeometric ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-800 text-white shadow-md border border-slate-700'
                : isGeometric ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
            }`}
          >
            <LayoutGrid className={`w-4 h-4 ${isGeometric ? 'text-blue-600' : 'text-yellow-500'}`} />
            <span>Visualizar Ambas (2 Páginas A4)</span>
          </button>

          <button
            onClick={() => setActiveView('multi')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeView === 'multi'
                ? isGeometric ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-800 text-white shadow-md border border-slate-700'
                : isGeometric ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
            }`}
          >
            <FileText className="w-4 h-4 text-blue-500" />
            <span>Somente Multiplicação (1 Pág)</span>
          </button>

          <button
            onClick={() => setActiveView('div')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
              activeView === 'div'
                ? isGeometric ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-800 text-white shadow-md border border-slate-700'
                : isGeometric ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
            }`}
          >
            <FileText className="w-4 h-4 text-indigo-500" />
            <span>Somente Divisão (1 Pág)</span>
          </button>

          <button
            onClick={() => setActiveView('practice')}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ml-auto cursor-pointer ${
              activeView === 'practice'
                ? isGeometric ? 'bg-blue-600 text-white shadow-md' : 'bg-yellow-500 text-slate-950 font-semibold shadow-md border border-yellow-400'
                : isGeometric ? 'text-blue-600 hover:bg-blue-50 hover:text-blue-750' : 'text-yellow-400 hover:bg-yellow-500/10 hover:text-yellow-300'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>⚔️ Modo Praticar (Mini-Game)</span>
          </button>
        </div>
      </nav>

      {/* 3. Main Workspace Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Workspace Display Left (Preview Paper or Quiz Game) */}
        <div className="flex-1 w-full flex flex-col items-center justify-center min-h-[50vh] relative">
          
          {/* A4 Sheet Preview wrapper with exact aspect ratio display */}
          {activeView !== 'practice' && (
            <div className="no-print w-full flex flex-col items-center mb-6">
              {/* Workspace Toolbar with Interactive Zoom (Figma Style) */}
              <div className={`flex flex-wrap items-center justify-between gap-3 w-full text-xs ${isGeometric ? 'bg-white border border-slate-200 shadow-sm text-slate-600' : 'bg-slate-900 border border-slate-800 text-slate-300'} mb-3 px-4 py-2 rounded-2xl`}>
                <div className="flex items-center gap-3">
                  <span className={`flex items-center gap-1.5 ${isGeometric ? 'text-blue-600 font-bold' : 'text-yellow-500'}`}>
                    <Eye className="w-4 h-4" />
                    Mesa de Trabalho (Workspace)
                  </span>
                  <span className="hidden sm:inline text-slate-300 dark:text-slate-750">|</span>
                  <span className="text-[10px] opacity-80 hidden sm:inline">A4: 210 × 297 mm</span>
                </div>

                {/* Interactive Zoom Controls */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono opacity-70 uppercase tracking-wider mr-1">Zoom:</span>
                  
                  {/* Zoom Out Button */}
                  <button
                    type="button"
                    onClick={handleZoomOut}
                    disabled={currentScale <= 0.35}
                    title="Zoom Out (Diminuir)"
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isGeometric 
                        ? 'hover:bg-slate-100 text-slate-600 active:bg-slate-200' 
                        : 'hover:bg-slate-800 text-slate-300 active:bg-slate-700'
                    } disabled:opacity-30 disabled:pointer-events-none`}
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>

                  {/* Zoom Value Button with dropdown overlay */}
                  <div className="relative group flex items-center">
                    <button
                      type="button"
                      className={`px-2.5 py-1 text-[11px] font-mono font-bold rounded-lg ${
                        isGeometric ? 'bg-slate-50 border border-slate-200 text-slate-700' : 'bg-slate-950 border border-slate-800 text-slate-200'
                      }`}
                    >
                      {displayZoomPercent}%
                    </button>
                    
                    {/* Presets dropdown on hover/click */}
                    <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1.5 hidden group-hover:flex group-focus-within:flex flex-col rounded-xl border p-1 shadow-xl z-50 min-w-[70px] ${
                      isGeometric ? 'bg-white border-slate-250 text-slate-700' : 'bg-slate-950 border-slate-800 text-slate-200'
                    }`}>
                      {[40, 50, 60, 75, 90, 100, 120].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => {
                            setAutoFit(false);
                            setWorkspaceZoom(preset);
                          }}
                          className={`px-2 py-1 text-[10px] text-center rounded-lg font-mono transition-colors cursor-pointer ${
                            isGeometric ? 'hover:bg-slate-100' : 'hover:bg-slate-800'
                          } ${workspaceZoom === preset && !autoFit ? 'font-bold text-indigo-500' : ''}`}
                        >
                          {preset}%
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Zoom In Button */}
                  <button
                    type="button"
                    onClick={handleZoomIn}
                    disabled={currentScale >= 1.5}
                    title="Zoom In (Aumentar)"
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isGeometric 
                        ? 'hover:bg-slate-100 text-slate-600 active:bg-slate-200' 
                        : 'hover:bg-slate-800 text-slate-300 active:bg-slate-700'
                    } disabled:opacity-30 disabled:pointer-events-none`}
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>

                  {/* Auto-Fit Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setAutoFit(!autoFit)}
                    title={autoFit ? "Desativar Ajuste Automático" : "Ativar Ajuste Automático (Fit)"}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                      autoFit
                        ? isGeometric ? 'bg-indigo-50 text-indigo-600 border border-indigo-200' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 shadow-inner'
                        : isGeometric ? 'bg-slate-50 text-slate-400 border border-slate-200 hover:text-slate-600' : 'bg-slate-950 text-slate-500 border border-slate-850 hover:text-slate-300'
                    }`}
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Auto Fit</span>
                  </button>
                </div>

                {/* Additional quick toggle: Grid Lines display */}
                <button
                  type="button"
                  onClick={() => setShowCutLines(!showCutLines)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                    showCutLines
                      ? isGeometric ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-green-500/10 text-green-400 border border-green-500/20'
                      : isGeometric ? 'bg-slate-50 text-slate-400 border border-slate-200' : 'bg-slate-950 text-slate-500 border border-slate-850'
                  }`}
                >
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Linhas de Corte</span>
                </button>
              </div>

              {/* Wooden Desk / Crafting table background for sheet preview */}
              <div className={`w-full ${isGeometric ? 'bg-slate-100 border-slate-300' : 'bg-amber-950/20 border-amber-900/30'} border-2 rounded-3xl p-6 md:p-10 flex flex-col gap-10 overflow-auto items-center justify-start py-10 md:py-16 shadow-inner relative max-h-[85vh] scrollbar-thin`}>
                {/* Visual Ruler indicators for A4 precision */}
                <div className={`absolute top-2 left-10 text-[10px] ${isGeometric ? 'text-slate-400' : 'text-amber-800'} font-mono hidden md:block select-none`}>
                  ◄────────────── 21.0 Centímetros (Largura A4) ──────────────►
                </div>
                <div className={`absolute top-1/2 left-2 text-[10px] ${isGeometric ? 'text-slate-400' : 'text-amber-800'} font-mono hidden md:block vertical-text select-none rotate-90 transform -translate-y-1/2`}>
                  ◄──────────────────── 29.7 Centímetros (Altura A4) ────────────────────►
                </div>

                {/* Render Multiplication Sheet */}
                {(activeView === 'multi' || activeView === 'both') && (
                  <A4Wrapper scale={currentScale}>
                    <A4Sheet
                      mode="multiplication"
                      theme={activeTheme}
                      settings={settings}
                      showCutLines={showCutLines}
                    />
                  </A4Wrapper>
                )}

                {/* Separator indicator if both sheets are shown */}
                {activeView === 'both' && (
                  <div className="w-full max-w-xl border-t-2 border-dashed border-slate-400 my-2 relative">
                    <span className={`absolute left-1/2 -top-3 transform -translate-x-1/2 ${isGeometric ? 'bg-slate-200 border border-slate-300 text-slate-600 font-sans font-black tracking-wider' : 'bg-slate-900 border border-slate-700 text-slate-400 font-pixel text-[6px]'} text-[10px] px-3 py-1 rounded-full`}>
                      PÁGINA 2 (CORTE DA FOLHA)
                    </span>
                  </div>
                )}

                {/* Render Division Sheet */}
                {(activeView === 'div' || activeView === 'both') && (
                  <A4Wrapper scale={currentScale}>
                    <A4Sheet
                      mode="division"
                      theme={activeTheme}
                      settings={settings}
                      showCutLines={showCutLines}
                    />
                  </A4Wrapper>
                )}

                {/* Visual margin bottom spacing filler to enable smooth finite scrolling */}
                <div className="h-12 w-full shrink-0 block no-print" />
              </div>
            </div>
          )}

          {/* Render Quiz Practice Mode */}
          {activeView === 'practice' && (
            <div className="w-full mb-6 no-print">
              <PracticeMode settings={settings} theme={activeTheme} />
            </div>
          )}

          {/* Actual Print elements (This is what is actually rendered to printer, hidden in web view) */}
          <div className="hidden print:block w-full">
            {(activeView === 'multi' || activeView === 'both') && (
              <A4Sheet
                mode="multiplication"
                theme={activeTheme}
                settings={settings}
                showCutLines={showCutLines}
              />
            )}
            {(activeView === 'div' || activeView === 'both') && (
              <A4Sheet
                mode="division"
                theme={activeTheme}
                settings={settings}
                showCutLines={showCutLines}
              />
            )}
          </div>
        </div>

        {/* Workspace Controls Right (Hidden in Print) */}
        <div className="no-print w-full lg:w-[450px] xl:w-[480px] shrink-0 space-y-6">
          
          {/* Quick Stats Panel */}
          <div className={`${isGeometric ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-100'} border p-5 rounded-2xl transition-colors`}>
            <h4 className={`text-[9px] mb-3 tracking-wider ${isGeometric ? 'font-sans font-black text-blue-600' : 'font-pixel text-[8px] text-yellow-400'}`}>RESUMO DO CONTEÚDO</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-xl border ${isGeometric ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                <span className="text-[10px] text-slate-500 block mb-0.5">Cartas Totais</span>
                <span className={`text-[12px] font-bold ${isGeometric ? 'font-sans text-slate-800' : 'font-pixel text-[11px] text-slate-100'}`}>24 Cartas</span>
              </div>
              <div className={`p-3 rounded-xl border ${isGeometric ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'}`}>
                <span className="text-[10px] text-slate-500 block mb-0.5">Operações</span>
                <span className={`text-[12px] font-bold ${isGeometric ? 'font-sans text-green-600' : 'font-pixel text-[11px] text-green-400'}`}>200 Contas</span>
              </div>
            </div>
          </div>

          {/* Customize Controls */}
          {activeView !== 'practice' && (
            <CustomizePanel 
              settings={settings} 
              setSettings={setSettings} 
              floatingPreviewOpen={floatingPreviewOpen}
              setFloatingPreviewOpen={setFloatingPreviewOpen}
            />
          )}

          {/* Fun Fact / Creative Guide Panel */}
          <div className={`${isGeometric ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-100'} border p-5 rounded-3xl relative overflow-hidden transition-colors`}>
            <div className="absolute top-2 right-2 opacity-5">
              <MinecraftMobIcon mob="creeper" size={72} />
            </div>
            
            <h4 className="font-semibold text-xs mb-2 flex items-center gap-1.5">
              <Sparkles className={`w-4 h-4 ${isGeometric ? 'text-blue-600' : 'text-yellow-500'} animate-pulse`} />
              Como recortar e jogar?
            </h4>
            <p className={`text-xs ${isGeometric ? 'text-slate-600' : 'text-slate-400'} leading-relaxed`}>
              Imprima esta folha em papel de alta gramatura (ou cartolina). Recorte cada retângulo seguindo as <strong>linhas de corte pontilhadas</strong> para obter cartas individuais! Cole uma frente e verso de papel se quiser fazer cartas ultra rígidas.
            </p>
          </div>
        </div>

      </main>

      {/* Real-time Floating Viewfinder HUD */}
      {activeView !== 'practice' && (
        <div className="no-print">
          {floatingPreviewOpen ? (
            <div 
              className={`fixed z-40 ${
                isGeometric 
                  ? 'bg-white border-2 border-slate-300 shadow-2xl text-slate-855' 
                  : 'bg-slate-900/95 border-2 border-slate-700 shadow-2xl text-slate-100 backdrop-blur-md'
              } rounded-2xl p-4 flex flex-col gap-3 transition-all duration-150 animate-fade-in select-none`}
              style={{
                width: `${visorWidth}px`,
                height: `${visorHeight}px`,
                left: `${visorPos.x}px`,
                top: `${visorPos.y}px`,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)'
              }}
            >
              {/* Header (Drag Handle) */}
              <div 
                onMouseDown={handleDragMouseDown}
                onTouchStart={handleDragTouchStart}
                className={`flex items-center justify-between border-b border-dashed border-slate-700/50 pb-2 cursor-grab active:cursor-grabbing select-none`}
                title="Clique e segure para arrastar o visor para qualquer lugar!"
              >
                <span className={`text-[10px] font-bold tracking-wider flex items-center gap-1 ${isGeometric ? 'text-blue-600' : 'text-yellow-400 font-pixel text-[8px]'}`}>
                  <GripVertical className="w-3.5 h-3.5 text-slate-400 animate-pulse" />
                  <Sparkles className="w-3 h-3 text-yellow-500" />
                  VISOR (ARRASTE)
                </span>
                <span className="text-[9px] font-mono text-slate-400 px-1 bg-slate-850/50 rounded">
                  {visorWidth}x{visorHeight}px
                </span>
                <button
                  type="button"
                  onClick={() => setFloatingPreviewOpen(false)}
                  className="text-xs text-slate-400 hover:text-slate-200 cursor-pointer p-0.5 bg-transparent border-0 ml-1.5"
                  title="Minimizar"
                >
                  ✕
                </button>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-[1fr_1.2fr] gap-2 text-[10px] items-end">
                <div className="flex flex-col gap-1">
                  <span className="text-slate-400 font-semibold uppercase text-[8px]">Visualizar:</span>
                  <select
                    value={floatingCardType}
                    onChange={(e: any) => setFloatingCardType(e.target.value)}
                    className={`rounded px-1.5 py-1 text-[10px] focus:outline-none ${
                      isGeometric 
                        ? 'bg-slate-50 border border-slate-300 text-slate-900' 
                        : 'bg-slate-950 border border-slate-800 text-slate-100'
                    }`}
                  >
                    <option value="cover">Capa</option>
                    <option value="title">Título</option>
                    <option value="table-5">Tabuada do 5</option>
                    <option value="table-9">Tabuada do 9</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-semibold uppercase text-[8px]">Escala:</span>
                    <button
                      type="button"
                      onClick={() => setAutoFit(!autoFit)}
                      className={`px-1.5 py-0.5 rounded text-[7px] font-bold tracking-wider transition-colors uppercase ${
                        autoFit 
                          ? isGeometric 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-yellow-400 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                      title={autoFit ? "Escala se auto-ajusta ao tamanho da tela" : "Ativar escala auto-ajustável"}
                    >
                      {autoFit ? 'AUTO ✓' : 'MANUAL'}
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {(() => {
                      const paddingX = 32;
                      const paddingY = 135;
                      const containerW = Math.max(100, visorWidth - paddingX);
                      const containerH = Math.max(100, visorHeight - paddingY);
                      const calculatedScale = Math.min(containerH / 205, containerW / 117.14);
                      const activeScale = autoFit 
                        ? Math.max(0.4, Math.min(3.5, calculatedScale))
                        : floatingScale;

                      return (
                        <>
                          <input
                            type="range"
                            min="0.4"
                            max="3.0"
                            step="0.05"
                            value={activeScale}
                            onChange={(e) => {
                              setFloatingScale(parseFloat(e.target.value));
                              setAutoFit(false);
                            }}
                            className="w-full accent-blue-500 cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none"
                          />
                          <span className="font-mono text-[9px] w-6 text-right">{(activeScale * 100).toFixed(0)}%</span>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* Card Container frame with scaled dimensions */}
              {(() => {
                const paddingX = 32;
                const paddingY = 135;
                const containerW = Math.max(100, visorWidth - paddingX);
                const containerH = Math.max(100, visorHeight - paddingY);
                const calculatedScale = Math.min(containerH / 205, containerW / 117.14);
                const activeScale = autoFit 
                  ? Math.max(0.4, Math.min(3.5, calculatedScale))
                  : floatingScale;

                return (
                  <div className={`relative flex-1 flex items-center justify-center p-3 rounded-xl border overflow-hidden ${
                    isGeometric ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
                  }`}
                  >
                    <div 
                      className="absolute origin-center transition-all duration-150"
                      style={{
                        width: '180px',
                        height: '315px',
                        transform: `scale(${(205 * activeScale) / 315})`
                      }}
                    >
                      {(() => {
                        // Create representative card config
                        const tableNum = floatingCardType === 'table-9' ? 9 : 5;
                        const sampleConfig = generateCardConfig(tableNum, activeView === 'div' ? 'division' : 'multiplication', settings.mobsAssignment);
                        const isCover = floatingCardType === 'cover';
                        const isTitle = floatingCardType === 'title';
                        const sheetTitle = activeView === 'div' ? settings.titleDiv : settings.titleMulti;

                        return (
                          <MinecraftCard
                            config={sampleConfig}
                            theme={activeTheme}
                            mode={activeView === 'div' ? 'division' : 'multiplication'}
                            showCutLines={showCutLines}
                            fontSize={settings.fontSize}
                            isCoverCard={isCover}
                            isTitleCard={isTitle}
                            customTitle={sheetTitle}
                            settings={settings}
                          />
                        );
                      })()}
                    </div>
                  </div>
                );
              })()}

              <div className="text-[9px] text-slate-500 text-center leading-normal">
                💡 Arraste o topo para mover. Estique os cantos para redimensionar!
              </div>

              {/* Resize Grab Handles */}
              {/* Top Handle */}
              <div 
                className="absolute top-0 inset-x-3 h-2 cursor-ns-resize hover:bg-blue-500/10 active:bg-blue-500/30 z-50 select-none"
                onMouseDown={(e) => handleResizeMouseDown(e, 'height')}
                onTouchStart={(e) => handleResizeTouchStart(e, 'height')}
              />
              {/* Right Handle */}
              <div 
                className="absolute right-0 inset-y-3 w-2 cursor-ew-resize hover:bg-blue-500/10 active:bg-blue-500/30 z-50 select-none"
                onMouseDown={(e) => handleResizeMouseDown(e, 'width')}
                onTouchStart={(e) => handleResizeTouchStart(e, 'width')}
              />
              {/* Top-Right Drag Corner */}
              <div 
                className="absolute top-0 right-0 w-5 h-5 cursor-nesw-resize hover:bg-blue-500/25 active:bg-blue-500/50 z-50 select-none rounded-tr-2xl flex items-center justify-center border-t border-r border-transparent"
                onMouseDown={(e) => handleResizeMouseDown(e, 'both')}
                onTouchStart={(e) => handleResizeTouchStart(e, 'both')}
                title="Esticar largura e altura livremente"
              >
                <div className="w-2 h-2 border-t-2 border-r-2 border-slate-400 rotate-45 transform translate-x-0.5 -translate-y-0.5 opacity-60 hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setFloatingPreviewOpen(true)}
              className={`fixed bottom-6 left-6 z-40 px-4 py-2.5 rounded-full flex items-center gap-2 shadow-2xl transition-all cursor-pointer ${
                isGeometric 
                  ? 'bg-blue-600 hover:bg-blue-500 text-white border border-blue-700' 
                  : 'bg-yellow-500 hover:bg-yellow-400 text-slate-950 border border-yellow-600 font-bold font-pixel text-[8px]'
              } active:translate-y-0.5`}
            >
              <Eye className="w-4 h-4" />
              <span>Ver Visor de Detalhes (Zoom)</span>
            </button>
          )}
        </div>
      )}

      {/* 4. Footer (Hidden in Print) */}
      <footer className={`no-print ${isGeometric ? 'bg-white border-t border-slate-200 text-slate-500' : 'bg-slate-900 border-t border-slate-800/80'} mt-auto py-6 text-center text-xs shrink-0 transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            Desenvolvido com tecnologia de vetorização de alta resolução para impressão em 300+ DPI.
          </p>
          <p className={`text-[11px] ${isGeometric ? 'text-slate-400 font-sans font-bold' : 'text-slate-600 font-pixel text-[6px]'}`}>
            {isGeometric ? 'TEMA BALANÇO GEOMÉTRICO • MODELOS DE APRENDIZADO DE MATEMÁTICA' : 'TEMA MINECRAFT • MODELOS DE APRENDIZADO DE MATEMÁTICA'}
          </p>
        </div>
      </footer>
    </div>
  );
}
