/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppSettings, ThemeType, MobType, ThemeConfig } from '../types';
import { THEMES } from '../utils';
import { MinecraftMobIcon } from './SvgAssets';
import { 
  Sliders, Paintbrush, Scissors, Type, HelpCircle, 
  Eye, Image, Upload, Sparkles, User, Palette, Move,
  ArrowUp, ArrowDown, RefreshCw, CaseSensitive
} from 'lucide-react';

interface CustomizePanelProps {
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  floatingPreviewOpen?: boolean;
  setFloatingPreviewOpen?: (open: boolean) => void;
}

const ASSET_PRESETS_CATEGORIES = [
  {
    category: 'Minecraft (Pixel Art)',
    options: [
      { type: 'creeper', name: 'Creeper' },
      { type: 'steve', name: 'Steve' },
      { type: 'pig', name: 'Porco' },
      { type: 'squid', name: 'Lula' },
      { type: 'zombie', name: 'Zumbi' },
      { type: 'bee', name: 'Abelha' },
      { type: 'enderman', name: 'Enderman' },
      { type: 'skeleton', name: 'Esqueleto' },
      { type: 'chicken', name: 'Galinha' },
      { type: 'slime', name: 'Slime' },
      { type: 'alex', name: 'Alex' },
      { type: 'tnt', name: 'Dinamite (TNT)' },
      { type: 'diamond', name: 'Diamante' },
      { type: 'crafting_table', name: 'Bancada de Trabalho' },
    ]
  },
  {
    category: 'Animais Fofos (Emoji)',
    options: [
      { type: '🐶', name: '🐶 Cachorro' },
      { type: '🐱', name: '🐱 Gato' },
      { type: '🦊', name: '🦊 Raposa' },
      { type: '🦁', name: '🦁 Leão' },
      { type: '🐯', name: '🐯 Tigre' },
      { type: '🐷', name: '🐷 Porquinho' },
      { type: '🐨', name: '🐨 Coala' },
      { type: '🐼', name: '🐼 Panda' },
      { type: '🐸', name: '🐸 Sapo' },
      { type: '🦖', name: '🦖 Dinossauro' },
      { type: '🦄', name: '🦄 Unicórnio' },
      { type: '🐧', name: '🐧 Pinguim' },
      { type: '🦉', name: '🦉 Coruja' },
      { type: '🐝', name: '🐝 Abelhinha' },
    ]
  },
  {
    category: 'Aventura & Espaço (Emoji)',
    options: [
      { type: '🚀', name: '🚀 Foguete' },
      { type: '🛸', name: '🛸 OVNI' },
      { type: '🪐', name: '🪐 Planeta' },
      { type: '🧑‍🚀', name: '🧑‍🚀 Astronauta' },
      { type: '👾', name: '👾 Monstrinho Retro' },
      { type: '👑', name: '👑 Coroa' },
      { type: '⚔️', name: '⚔️ Espada' },
      { type: '🛡️', name: '🛡️ Escudo' },
      { type: '💎', name: '💎 Diamante' },
      { type: '🔮', name: '🔮 Bola de Cristal' },
      { type: '🏰', name: '🏰 Castelo' },
      { type: '🏴‍☠️', name: '🏴‍☠️ Bandeira Pirata' },
      { type: '🗺️', name: '🗺️ Mapa' },
    ]
  },
  {
    category: 'Educação & Escola (Emoji)',
    options: [
      { type: '📚', name: '📚 Livros' },
      { type: '✏️', name: '✏️ Lápis' },
      { type: '🎨', name: '🎨 Paleta de Pintura' },
      { type: '🎒', name: '🎒 Mochila' },
      { type: '🧠', name: '🧠 Cérebro' },
      { type: '🧪', name: '🧪 Poção' },
      { type: '📐', name: '📐 Régua' },
      { type: '🏆', name: '🏆 Troféu' },
      { type: '🎯', name: '🎯 Alvo' },
      { type: '🌟', name: '🌟 Estrela' },
      { type: '🧩', name: '🧩 Quebra-Cabeça' },
    ]
  },
  {
    category: 'Ícones Minimalistas (Lucide)',
    options: [
      { type: 'Heart', name: '❤️ Coração (Heart)' },
      { type: 'Star', name: '⭐ Estrela (Star)' },
      { type: 'Sparkles', name: '✨ Brilhos (Sparkles)' },
      { type: 'Smile', name: '😊 Sorriso (Smile)' },
      { type: 'Trophy', name: '🏆 Troféu (Trophy)' },
      { type: 'Flame', name: '🔥 Fogo (Flame)' },
      { type: 'Sun', name: '☀️ Sol (Sun)' },
      { type: 'Moon', name: '🌙 Lua (Moon)' },
      { type: 'Shield', name: '🛡️ Escudo (Shield)' },
      { type: 'Sword', name: '⚔️ Espada (Sword)' },
      { type: 'Gift', name: '🎁 Presente (Gift)' },
      { type: 'Music', name: '🎵 Música (Music)' },
      { type: 'Palette', name: '🎨 Paleta (Palette)' },
      { type: 'BookOpen', name: '📖 Livro Aberto (BookOpen)' },
      { type: 'Brain', name: '🧠 Cérebro (Brain)' },
      { type: 'Globe', name: '🌐 Globo (Globe)' },
    ]
  }
];

const THEMED_MASCOTS_MAPS: Record<string, Record<string, string>> = {
  minecraft: {
    '1': 'chicken',
    '2': 'pig',
    '3': 'bee',
    '4': 'slime',
    '5': 'squid',
    '6': 'skeleton',
    '7': 'zombie',
    '8': 'creeper',
    '9': 'enderman',
    '10': 'steve',
    'cover': 'crafting_table',
    'title': 'tnt',
  },
  animals: {
    '1': '🐶',
    '2': '🐱',
    '3': '🦊',
    '4': '🦁',
    '5': '🐷',
    '6': '🐸',
    '7': '🐨',
    '8': '🐼',
    '9': '🦖',
    '10': '🦄',
    'cover': '🦉',
    'title': '🐧',
  },
  space: {
    '1': '🚀',
    '2': '🪐',
    '3': '🛸',
    '4': '🧑‍🚀',
    '5': '👾',
    '6': '👑',
    '7': '⚔️',
    '8': '🛡️',
    '9': '💎',
    '10': '🏰',
    'cover': '🔮',
    'title': '🗺️',
  },
  education: {
    '1': '📚',
    '2': '✏️',
    '3': '🎨',
    '4': '🎒',
    '5': '🧠',
    '6': '🧪',
    '7': '📐',
    '8': '🏆',
    '9': '🎯',
    '10': '🌟',
    'cover': '🧩',
    'title': '🌟',
  },
  minimalist: {
    '1': 'Heart',
    '2': 'Star',
    '3': 'Sparkles',
    '4': 'Smile',
    '5': 'Trophy',
    '6': 'Flame',
    '7': 'Sun',
    '8': 'Moon',
    '9': 'Shield',
    '10': 'Rocket',
    'cover': 'BookOpen',
    'title': 'Brain',
  }
};

const AVAILABLE_MOBS: { type: MobType; name: string }[] = ASSET_PRESETS_CATEGORIES.flatMap(c => c.options);

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (val: number) => Math.max(0, Math.min(255, Math.round(val)));
  return '#' + ((1 << 24) + (clamp(r) << 16) + (clamp(g) << 8) + clamp(b)).toString(16).slice(1);
}

export const CustomizePanel: React.FC<CustomizePanelProps> = ({ 
  settings, 
  setSettings,
  floatingPreviewOpen = false,
  setFloatingPreviewOpen
}) => {
  const [selectedColorKey, setSelectedColorKey] = useState<keyof ThemeConfig | null>('primaryColor');

  const customizableColors: { key: keyof ThemeConfig; label: string; desc: string }[] = [
    { key: 'primaryColor', label: 'Borda Principal', desc: 'Usada para as bordas das cartas e acentos.' },
    { key: 'secondaryColor', label: 'Fundo do Cabeçalho', desc: 'Usada para o fundo do título de cada carta.' },
    { key: 'accentColor', label: 'Cor do Operador', desc: 'Cor do sinal de operação (× ou ÷) nas equações.' },
    { key: 'cardBg', label: 'Fundo da Carta', desc: 'Cor interna geral do corpo da carta.' },
    { key: 'bgColor', label: 'Fundo da Folha', desc: 'Cor de fundo geral do papel A4 impresso.' },
  ];

  const handleCustomColorChange = (themeKey: ThemeType, colorKey: keyof ThemeConfig, hexValue: string) => {
    setSettings((prev) => {
      const currentOverrides = prev.customThemeColors || {};
      const themeOverrides = currentOverrides[themeKey] || {};
      return {
        ...prev,
        customThemeColors: {
          ...currentOverrides,
          [themeKey]: {
            ...themeOverrides,
            [colorKey]: hexValue,
          }
        }
      };
    });
  };

  const handleResetThemeColors = (themeKey: ThemeType) => {
    setSettings((prev) => {
      const currentOverrides = { ...(prev.customThemeColors || {}) };
      delete currentOverrides[themeKey];
      return {
        ...prev,
        customThemeColors: currentOverrides,
      };
    });
  };

  const handleResetSingleColor = (themeKey: ThemeType, colorKey: keyof ThemeConfig) => {
    setSettings((prev) => {
      const currentOverrides = { ...(prev.customThemeColors || {}) };
      const themeOverrides = { ...(currentOverrides[themeKey] || {}) };
      delete themeOverrides[colorKey];
      
      if (Object.keys(themeOverrides).length === 0) {
        delete currentOverrides[themeKey];
      } else {
        currentOverrides[themeKey] = themeOverrides;
      }
      
      return {
        ...prev,
        customThemeColors: currentOverrides,
      };
    });
  };

  const handleRgbChange = (channel: 'r' | 'g' | 'b', val: number) => {
    if (!selectedColorKey) return;
    const activeColorVal = settings.customThemeColors?.[settings.theme]?.[selectedColorKey] || THEMES[settings.theme][selectedColorKey] as string;
    const currentRgb = hexToRgb(activeColorVal || '#ffffff');
    const newRgb = { ...currentRgb, [channel]: val };
    const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    handleCustomColorChange(settings.theme, selectedColorKey, hex);
  };

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleMobChange = (cardKey: string, mob: MobType) => {
    setSettings((prev) => ({
      ...prev,
      mobsAssignment: {
        ...prev.mobsAssignment,
        [cardKey]: mob,
      },
    }));
  };

  const handleNameChange = (cardKey: string, name: string) => {
    setSettings((prev) => ({
      ...prev,
      cardNames: {
        ...prev.cardNames,
        [cardKey]: name,
      },
    }));
  };

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          updateSetting('customBgUpload', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const isGeometric = settings.theme === 'geometric';

  // Section keys list
  const rawSectionsOrder = settings.customizerSectionsOrder || [
    'theme',
    'titles',
    'font_size',
    'helpers',
    'student_name',
    'equation_block',
    'positioning',
    'background',
    'individual_cards',
    'print_tips'
  ];

  // Robustly handle cached localStorage customizerSectionsOrder that might not have 'font_size'
  const sectionsOrder = React.useMemo(() => {
    const defaultOrder = [
      'theme',
      'titles',
      'font_size',
      'helpers',
      'student_name',
      'equation_block',
      'positioning',
      'background',
      'individual_cards',
      'print_tips'
    ];
    const combined = [...rawSectionsOrder];
    defaultOrder.forEach((key) => {
      if (!combined.includes(key)) {
        if (key === 'font_size' && combined.includes('helpers')) {
          const helpersIndex = combined.indexOf('helpers');
          combined.splice(helpersIndex, 0, 'font_size');
        } else {
          combined.push(key);
        }
      }
    });
    return combined;
  }, [rawSectionsOrder]);

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...sectionsOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newOrder.length) {
      const temp = newOrder[index];
      newOrder[index] = newOrder[targetIndex];
      newOrder[targetIndex] = temp;
      updateSetting('customizerSectionsOrder', newOrder);
    }
  };

  const resetSectionsOrder = () => {
    updateSetting('customizerSectionsOrder', [
      'theme',
      'titles',
      'font_size',
      'helpers',
      'student_name',
      'equation_block',
      'positioning',
      'background',
      'individual_cards',
      'print_tips'
    ]);
  };

  // Defined sections details and renderer functions
  const sectionsMap: Record<string, { title: string; subtitle: string; icon: React.ReactNode; render: () => React.ReactNode }> = {
    theme: {
      title: 'TEMA DO BARALHO',
      subtitle: 'Escolha a paleta visual principal para todas as cartas.',
      icon: <Paintbrush className="w-4 h-4 text-blue-500" />,
      render: () => (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {(Object.keys(THEMES) as ThemeType[]).map((themeKey) => {
              const th = THEMES[themeKey];
              const isSelected = settings.theme === themeKey;
              return (
                <button
                  key={themeKey}
                  type="button"
                  onClick={() => updateSetting('theme', themeKey)}
                  className={`p-3 rounded-xl border-2 text-left transition-all relative overflow-hidden flex flex-col justify-between h-20 cursor-pointer ${
                    isSelected
                      ? isGeometric 
                        ? 'border-blue-600 bg-blue-50/55 shadow-inner'
                        : 'border-yellow-400 bg-slate-700 shadow-inner ring-2 ring-yellow-400/20'
                      : isGeometric
                        ? 'border-slate-200 bg-white hover:bg-slate-50'
                        : 'border-slate-700 bg-slate-900/40 hover:bg-slate-700/50 hover:border-slate-600'
                  }`}
                >
                  <span className={`text-[10px] font-semibold block mb-1 ${isGeometric ? 'text-slate-850' : 'text-slate-100'}`}>
                    {th.name}
                  </span>
                  <div className="flex gap-1.5 items-center mt-auto">
                    <div 
                      className="w-3.5 h-3.5 rounded border border-slate-300 cursor-pointer hover:scale-115 transition-transform" 
                      style={{ backgroundColor: settings.customThemeColors?.[themeKey]?.primaryColor || th.primaryColor }}
                      onClick={(e) => {
                        e.stopPropagation();
                        updateSetting('theme', themeKey);
                        setSelectedColorKey('primaryColor');
                      }}
                      title="Customizar Borda Principal"
                    />
                    <div 
                      className="w-3.5 h-3.5 rounded border border-slate-300 cursor-pointer hover:scale-115 transition-transform" 
                      style={{ backgroundColor: settings.customThemeColors?.[themeKey]?.secondaryColor || th.secondaryColor }}
                      onClick={(e) => {
                        e.stopPropagation();
                        updateSetting('theme', themeKey);
                        setSelectedColorKey('secondaryColor');
                      }}
                      title="Customizar Fundo do Cabeçalho"
                    />
                    <div 
                      className="w-3.5 h-3.5 rounded border border-slate-300 cursor-pointer hover:scale-115 transition-transform" 
                      style={{ backgroundColor: settings.customThemeColors?.[themeKey]?.cardBg || th.cardBg }}
                      onClick={(e) => {
                        e.stopPropagation();
                        updateSetting('theme', themeKey);
                        setSelectedColorKey('cardBg');
                      }}
                      title="Customizar Fundo do Cartão"
                    />
                  </div>
                  {isSelected && (
                    <div className={`absolute top-1 right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold ${isGeometric ? 'bg-blue-600 text-white' : 'bg-yellow-400 text-slate-950'}`}>
                      ✓
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Color Palettes Customization Section */}
          <div className={`mt-3 p-3.5 rounded-2xl border ${isGeometric ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/40 border-slate-800'} transition-all`}>
            <div className="flex justify-between items-center mb-3">
              <span className={`block text-[10px] uppercase font-bold tracking-wider ${isGeometric ? 'text-slate-700' : 'text-slate-300'}`}>
                🎨 Paleta de Cores Personalizada
              </span>
              {settings.customThemeColors?.[settings.theme] && (
                <button
                  type="button"
                  onClick={() => handleResetThemeColors(settings.theme)}
                  className="text-[10px] font-bold text-red-500 hover:text-red-400 flex items-center gap-1 bg-transparent border-0 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3 animate-spin-hover" />
                  Resetar Paleta
                </button>
              )}
            </div>

            {/* Selection circles */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 mb-3">
              {customizableColors.map((colorItem) => {
                const isColorSelected = selectedColorKey === colorItem.key;
                const activeColor = settings.customThemeColors?.[settings.theme]?.[colorItem.key] || THEMES[settings.theme][colorItem.key] as string;
                return (
                  <button
                    key={colorItem.key}
                    type="button"
                    onClick={() => setSelectedColorKey(colorItem.key)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all cursor-pointer h-16 ${
                      isColorSelected
                        ? isGeometric ? 'border-blue-500 bg-blue-50/70 text-blue-900' : 'border-yellow-400 bg-slate-800 text-yellow-300 ring-2 ring-yellow-400/10'
                        : isGeometric ? 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100' : 'border-slate-800/80 bg-slate-950/70 text-slate-400 hover:bg-slate-850'
                    }`}
                  >
                    <div 
                      className="w-5 h-5 rounded-md border border-slate-300/80 shadow-xs mb-1" 
                      style={{ backgroundColor: activeColor }} 
                    />
                    <span className="text-[9px] font-bold text-center leading-tight truncate w-full">
                      {colorItem.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Inputs: Hex, Sliders, native picker */}
            {selectedColorKey && (() => {
              const activeColorVal = settings.customThemeColors?.[settings.theme]?.[selectedColorKey] || THEMES[settings.theme][selectedColorKey] as string;
              const rgbVal = hexToRgb(activeColorVal);
              const colorInfo = customizableColors.find(c => c.key === selectedColorKey);
              
              return (
                <div className={`p-3.5 rounded-xl ${isGeometric ? 'bg-white border border-slate-200' : 'bg-slate-950/80 border border-slate-800'} space-y-3`}>
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h5 className={`text-[10px] font-bold uppercase tracking-wide ${isGeometric ? 'text-slate-800' : 'text-slate-200'}`}>
                        {colorInfo?.label}
                      </h5>
                      <p className="text-[9px] text-slate-500 leading-tight mt-0.5">
                        {colorInfo?.desc}
                      </p>
                    </div>
                    {settings.customThemeColors?.[settings.theme]?.[selectedColorKey] && (
                      <button
                        type="button"
                        onClick={() => handleResetSingleColor(settings.theme, selectedColorKey)}
                        className="text-[9px] text-slate-500 hover:text-red-500 font-bold transition-colors"
                      >
                        Resetar Cor
                      </button>
                    )}
                  </div>

                  {/* Picker and Code Input */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <input 
                        type="color" 
                        value={activeColorVal} 
                        onChange={(e) => handleCustomColorChange(settings.theme, selectedColorKey, e.target.value)}
                        className="w-11 h-9 rounded-lg border border-slate-300/80 cursor-pointer bg-transparent"
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-0.5">
                      <span className="text-[8px] font-bold text-slate-500 uppercase">Hex Código</span>
                      <input 
                        type="text" 
                        value={activeColorVal} 
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val.startsWith('#') && val.length <= 7) {
                            handleCustomColorChange(settings.theme, selectedColorKey, val);
                          } else if (!val.startsWith('#') && val.length <= 6) {
                            handleCustomColorChange(settings.theme, selectedColorKey, '#' + val);
                          }
                        }}
                        placeholder="#ffffff"
                        className={`px-2.5 py-1.5 rounded-lg border font-mono text-xs uppercase w-full ${
                          isGeometric 
                            ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500' 
                            : 'bg-slate-900 border-slate-700 text-slate-100 focus:border-yellow-400'
                        } focus:outline-none`}
                      />
                    </div>
                  </div>

                  {/* RGB Controls */}
                  <div className="space-y-2 pt-1">
                    {/* R Slider */}
                    <div className="space-y-0.5">
                      <div className="flex justify-between text-[9px] font-mono">
                        <span className="text-red-500 font-bold">R (Vermelho)</span>
                        <span className={isGeometric ? 'text-slate-600' : 'text-slate-300'}>{rgbVal.r}</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="255" 
                        value={rgbVal.r} 
                        onChange={(e) => handleRgbChange('r', parseInt(e.target.value))}
                        className="w-full accent-red-500 cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none"
                      />
                    </div>

                    {/* G Slider */}
                    <div className="space-y-0.5">
                      <div className="flex justify-between text-[9px] font-mono">
                        <span className="text-green-500 font-bold">G (Verde)</span>
                        <span className={isGeometric ? 'text-slate-600' : 'text-slate-300'}>{rgbVal.g}</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="255" 
                        value={rgbVal.g} 
                        onChange={(e) => handleRgbChange('g', parseInt(e.target.value))}
                        className="w-full accent-green-500 cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none"
                      />
                    </div>

                    {/* B Slider */}
                    <div className="space-y-0.5">
                      <div className="flex justify-between text-[9px] font-mono">
                        <span className="text-blue-500 font-bold">B (Azul)</span>
                        <span className={isGeometric ? 'text-slate-600' : 'text-slate-300'}>{rgbVal.b}</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="255" 
                        value={rgbVal.b} 
                        onChange={(e) => handleRgbChange('b', parseInt(e.target.value))}
                        className="w-full accent-blue-500 cursor-pointer h-1 bg-slate-200 rounded-lg appearance-none"
                      />
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )
    },
    titles: {
      title: 'TÍTULOS DAS PÁGINAS',
      subtitle: 'Defina os títulos personalizados para as páginas de multiplicação e divisão.',
      icon: <Type className="w-4 h-4 text-indigo-500" />,
      render: () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={`block text-[10px] uppercase font-bold mb-2 ${isGeometric ? 'text-slate-600' : 'text-slate-300'}`}>
              Título (Multiplicação)
            </label>
            <input
              type="text"
              value={settings.titleMulti}
              onChange={(e) => updateSetting('titleMulti', e.target.value)}
              className={`w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-blue-500 font-sans transition-colors ${isGeometric ? 'bg-slate-50 border border-slate-300 text-slate-900' : 'bg-slate-900 border border-slate-700 text-slate-200 font-mono'}`}
              placeholder="Ex: TABUADAS DE MULTIPLICAR"
            />
          </div>
          <div>
            <label className={`block text-[10px] uppercase font-bold mb-2 ${isGeometric ? 'text-slate-600' : 'text-slate-300'}`}>
              Título (Divisão)
            </label>
            <input
              type="text"
              value={settings.titleDiv}
              onChange={(e) => updateSetting('titleDiv', e.target.value)}
              className={`w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500 font-sans transition-colors ${isGeometric ? 'bg-slate-50 border border-slate-300 text-slate-900' : 'bg-slate-900 border border-slate-700 text-slate-200 font-mono'}`}
              placeholder="Ex: TABUADAS DE DIVIDIR"
            />
          </div>
        </div>
      )
    },
    font_size: {
      title: 'TAMANHO DA FONTE DAS EQUAÇÕES',
      subtitle: 'Defina o tamanho de exibição dos números e contas em todas as cartas (Pequeno, Médio ou Grande).',
      icon: <CaseSensitive className="w-4 h-4 text-emerald-500" />,
      render: () => (
        <div>
          <p className={`text-xs mb-3 ${isGeometric ? 'text-slate-500' : 'text-slate-400'}`}>
            Configure o tamanho da fonte das equações matemáticas das tabuadas de multiplicação e divisão. Isso altera de forma global o tamanho dos números exibidos.
          </p>
          <div className="max-w-md">
            <label className={`block text-[10px] uppercase font-bold mb-2.5 ${isGeometric ? 'text-slate-600' : 'text-slate-300'}`}>
              Tamanho da Fonte das Contas
            </label>
            <div className={`flex p-1 rounded-xl border ${isGeometric ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border border-slate-700'}`}>
              {(['sm', 'md', 'lg'] as const).map((sz) => (
                <button
                  key={sz}
                  onClick={() => updateSetting('fontSize', sz)}
                  className={`flex-1 py-2 text-center text-xs rounded-lg transition-all capitalize font-medium cursor-pointer ${
                    settings.fontSize === sz
                      ? isGeometric
                        ? 'bg-white text-blue-600 shadow-sm font-bold'
                        : 'bg-slate-700 text-yellow-400 shadow font-semibold'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {sz === 'sm' ? 'Pequeno' : sz === 'md' ? 'Médio' : 'Grande'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    },
    helpers: {
      title: 'CORTE E CANTOS DO BARALHO',
      subtitle: 'Ative as linhas pontilhadas de corte e altere o estilo dos cantos (retos ou arredondados) das cartas.',
      icon: <Scissors className="w-4 h-4 text-teal-500" />,
      render: () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={`block text-[10px] uppercase font-bold mb-2.5 ${isGeometric ? 'text-slate-600' : 'text-slate-300'}`}>
              Linhas de Corte
            </label>
            <div className={`flex p-1 rounded-xl border ${isGeometric ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border border-slate-700'}`}>
              <button
                onClick={() => updateSetting('showGridLines', true)}
                className={`flex-1 py-2 text-center text-xs rounded-lg transition-all cursor-pointer ${
                  settings.showGridLines
                    ? isGeometric
                      ? 'bg-white text-indigo-600 shadow-sm font-bold'
                      : 'bg-slate-700 text-yellow-400 shadow font-semibold'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Ativar
              </button>
              <button
                onClick={() => updateSetting('showGridLines', false)}
                className={`flex-1 py-2 text-center text-xs rounded-lg transition-all cursor-pointer ${
                  !settings.showGridLines
                    ? isGeometric
                      ? 'bg-white text-indigo-600 shadow-sm font-bold'
                      : 'bg-slate-700 text-yellow-400 shadow font-semibold'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Desativar
              </button>
            </div>
          </div>

          <div>
            <label className={`block text-[10px] uppercase font-bold mb-2.5 ${isGeometric ? 'text-slate-600' : 'text-slate-300'}`}>
              Cantos do Baralho
            </label>
            <div className={`flex p-1 rounded-xl border ${isGeometric ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border border-slate-700'}`}>
              <button
                onClick={() => updateSetting('cardCorners', 'rounded')}
                className={`flex-1 py-2 text-center text-xs rounded-lg transition-all cursor-pointer ${
                  (settings.cardCorners ?? 'rounded') === 'rounded'
                    ? isGeometric
                      ? 'bg-white text-indigo-600 shadow-sm font-bold'
                      : 'bg-slate-700 text-yellow-400 shadow font-semibold'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Arredondado
              </button>
              <button
                onClick={() => updateSetting('cardCorners', 'straight')}
                className={`flex-1 py-2 text-center text-xs rounded-lg transition-all cursor-pointer ${
                  settings.cardCorners === 'straight'
                    ? isGeometric
                      ? 'bg-white text-indigo-600 shadow-sm font-bold'
                      : 'bg-slate-700 text-yellow-400 shadow font-semibold'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Reto
              </button>
            </div>
          </div>

          {setFloatingPreviewOpen && (
            <div className="sm:col-span-2 pt-3 border-t border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className={`block text-[10px] uppercase font-bold ${isGeometric ? 'text-slate-600' : 'text-slate-300'}`}>
                  Visor de Detalhes (Zoom)
                </span>
                <span className="text-[10px] text-slate-400">
                  Exibe o visor flutuante para ver as cartas de perto
                </span>
              </div>
              <button
                type="button"
                onClick={() => setFloatingPreviewOpen(!floatingPreviewOpen)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  floatingPreviewOpen
                    ? isGeometric ? 'bg-blue-600' : 'bg-yellow-400'
                    : 'bg-slate-300 dark:bg-slate-850'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full shadow ring-0 transition duration-200 ease-in-out ${
                    floatingPreviewOpen ? 'translate-x-5 bg-white' : 'translate-x-0 bg-slate-100 dark:bg-slate-400'
                  } ${!isGeometric && floatingPreviewOpen ? 'bg-slate-950' : ''}`}
                />
              </button>
            </div>
          )}
        </div>
      )
    },
    student_name: {
      title: 'NOME DO ESTUDANTE (GLOBAL)',
      subtitle: 'Caso preenchido, todas as cartas exibirão este nome por padrão.',
      icon: <User className="w-4 h-4 text-sky-500" />,
      render: () => (
        <div>
          <p className={`text-xs mb-3 ${isGeometric ? 'text-slate-500' : 'text-slate-400'}`}>
            Caso preenchido, todas as cartas exibirão este nome por padrão. Modificações individuais no final da página têm prioridade.
          </p>
          <input
            type="text"
            value={settings.globalStudentName || ''}
            onChange={(e) => updateSetting('globalStudentName', e.target.value)}
            className={`w-full rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-sky-500 font-sans transition-colors ${isGeometric ? 'bg-slate-50 border border-slate-300 text-slate-900' : 'bg-slate-900 border border-slate-700 text-slate-200 font-mono'}`}
            placeholder="Digite o nome do estudante (ex: Pedro, Maria...)"
          />
        </div>
      )
    },
    equation_block: {
      title: 'BLOCO BRANCO DAS CONTAS (COR E OPACIDADE)',
      subtitle: 'Configure a cor de fundo e a transparência do bloco central onde as equações matemáticas são exibidas.',
      icon: <Palette className="w-4 h-4 text-purple-500" />,
      render: () => (
        <div>
          <p className={`text-xs mb-3 ${isGeometric ? 'text-slate-500' : 'text-slate-400'}`}>
            Configure a cor de fundo e a transparência do bloco central onde as equações matemáticas são exibidas.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className={`block text-[10px] uppercase font-bold mb-1.5 ${isGeometric ? 'text-slate-600' : 'text-slate-300'}`}>
                Cor de Fundo
              </span>
              <div className="flex items-center gap-2.5">
                <input
                  type="color"
                  value={settings.equationBgColor}
                  onChange={(e) => updateSetting('equationBgColor', e.target.value)}
                  className={`w-10 h-10 rounded-xl cursor-pointer border-0 p-0 overflow-hidden shrink-0 ${isGeometric ? 'bg-slate-100' : 'bg-slate-900'}`}
                />
                <input
                  type="text"
                  value={settings.equationBgColor}
                  onChange={(e) => updateSetting('equationBgColor', e.target.value)}
                  placeholder="#ffffff"
                  className={`w-full rounded-xl px-3 py-2 text-xs uppercase font-mono focus:outline-none focus:border-purple-500 ${isGeometric ? 'bg-slate-50 border border-slate-300 text-slate-900' : 'bg-slate-900 border border-slate-700 text-slate-200'}`}
                />
                <button
                  onClick={() => updateSetting('equationBgColor', '#ffffff')}
                  className={`px-3 py-2 text-[10px] rounded-xl font-bold uppercase border cursor-pointer shrink-0 transition-colors ${isGeometric ? 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}
                >
                  Padrão
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className={`text-[10px] uppercase font-bold ${isGeometric ? 'text-slate-600' : 'text-slate-300'}`}>
                  Opacidade do Bloco
                </span>
                <span className={`text-xs font-mono font-bold ${isGeometric ? 'text-blue-600' : 'text-yellow-400'}`}>
                  {settings.equationBgOpacity}%
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.equationBgOpacity}
                  onChange={(e) => updateSetting('equationBgOpacity', parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <button
                  onClick={() => updateSetting('equationBgOpacity', 100)}
                  className={`px-3 py-1.5 text-[10px] rounded-xl font-bold uppercase border cursor-pointer shrink-0 transition-colors ${isGeometric ? 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}
                >
                  100%
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    positioning: {
      title: 'POSICIONAR E REDIMENSIONAR ELEMENTOS (MODELO GLOBAL)',
      subtitle: 'Configure as posições, escalas e deslocamentos do bloco central de contas, da etiqueta de nome e dos personagens.',
      icon: <Move className="w-4 h-4 text-amber-500 animate-pulse" />,
      render: () => (
        <div>
          <p className={`text-xs mb-4 ${isGeometric ? 'text-slate-500' : 'text-slate-400'}`}>
            Configure as posições, escalas e deslocamentos do bloco central de contas, da etiqueta de nome e dos personagens. Suas alterações se aplicam de forma global e uniforme a todo o baralho.
          </p>

          <div className="grid grid-cols-1 gap-5">
            {/* 1. Ajustes do Bloco de Contas */}
            <div className={`p-4 rounded-2xl border flex flex-col gap-3.5 ${isGeometric ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/40 border-slate-700'}`}>
              <div className="flex justify-between items-center pb-2 border-b border-dashed border-slate-300/50">
                <span className={`text-[10px] uppercase font-black tracking-wider ${isGeometric ? 'text-slate-800' : 'text-yellow-400 font-pixel'}`}>
                  📦 Bloco de Contas
                </span>
                <button
                  onClick={() => {
                    updateSetting('equationsBlockScale', 100);
                    updateSetting('equationsBlockYOffset', 0);
                    updateSetting('equationsBlockXOffset', 0);
                  }}
                  className={`text-[9px] font-bold uppercase hover:underline cursor-pointer ${isGeometric ? 'text-blue-600' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  Resetar
                </button>
              </div>

              {/* Scale Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-[9px] uppercase font-bold ${isGeometric ? 'text-slate-600' : 'text-slate-400'}`}>Escala (Tamanho)</span>
                  <span className="text-xs font-mono font-bold text-sky-500">{settings.equationsBlockScale}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="120"
                  value={settings.equationsBlockScale}
                  onChange={(e) => updateSetting('equationsBlockScale', parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
              </div>

              {/* Vertical Offset */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-[9px] uppercase font-bold ${isGeometric ? 'text-slate-600' : 'text-slate-400'}`}>Posição Vertical (Y)</span>
                  <span className="text-xs font-mono font-bold text-sky-500">{settings.equationsBlockYOffset}px</span>
                </div>
                <input
                  type="range"
                  min="-30"
                  max="30"
                  value={settings.equationsBlockYOffset}
                  onChange={(e) => updateSetting('equationsBlockYOffset', parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
              </div>

              {/* Horizontal Offset */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-[9px] uppercase font-bold ${isGeometric ? 'text-slate-600' : 'text-slate-400'}`}>Posição Horizontal (X)</span>
                  <span className="text-xs font-mono font-bold text-sky-500">{settings.equationsBlockXOffset}px</span>
                </div>
                <input
                  type="range"
                  min="-30"
                  max="30"
                  value={settings.equationsBlockXOffset}
                  onChange={(e) => updateSetting('equationsBlockXOffset', parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
              </div>
            </div>

            {/* 2. Ajustes da Label de Nome */}
            <div className={`p-4 rounded-2xl border flex flex-col gap-3.5 ${isGeometric ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/40 border-slate-700'}`}>
              <div className="flex justify-between items-center pb-2 border-b border-dashed border-slate-300/50">
                <span className={`text-[10px] uppercase font-black tracking-wider ${isGeometric ? 'text-slate-800' : 'text-yellow-400 font-pixel'}`}>
                  🏷️ Label do Nome
                </span>
                <button
                  onClick={() => {
                    updateSetting('studentNameLocation', 'header');
                    updateSetting('studentNameSize', 10);
                    updateSetting('studentNameYOffset', 0);
                    updateSetting('studentNameXOffset', 0);
                  }}
                  className={`text-[9px] font-bold uppercase hover:underline cursor-pointer ${isGeometric ? 'text-blue-600' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  Resetar
                </button>
              </div>

              {/* Location Select */}
              <div>
                <span className={`block text-[9px] uppercase font-bold mb-1 ${isGeometric ? 'text-slate-600' : 'text-slate-400'}`}>Posição do Nome</span>
                <select
                  value={settings.studentNameLocation}
                  onChange={(e) => updateSetting('studentNameLocation', e.target.value as any)}
                  className={`w-full border text-[11px] rounded-lg p-1.5 font-medium focus:outline-none ${isGeometric ? 'bg-white text-slate-900 border-slate-300 focus:border-blue-500' : 'bg-slate-800 text-white border-slate-700 focus:border-yellow-400'}`}
                >
                  <option value="header">No Cabeçalho (Padrão)</option>
                  <option value="block_top">Topo do Bloco de Contas</option>
                  <option value="block_bottom">Rodapé do Bloco de Contas</option>
                  <option value="card_bottom">Flutuando na Base da Carta</option>
                </select>
              </div>

              {/* Font Size */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-[9px] uppercase font-bold ${isGeometric ? 'text-slate-600' : 'text-slate-400'}`}>Tamanho da Fonte</span>
                  <span className="text-xs font-mono font-bold text-sky-500">{settings.studentNameSize}px</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="16"
                  value={settings.studentNameSize}
                  onChange={(e) => updateSetting('studentNameSize', parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
              </div>

              {/* Vertical Offset */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-[9px] uppercase font-bold ${isGeometric ? 'text-slate-600' : 'text-slate-400'}`}>Posição Vertical (Y)</span>
                  <span className="text-xs font-mono font-bold text-sky-500">{settings.studentNameYOffset}px</span>
                </div>
                <input
                  type="range"
                  min="-25"
                  max="25"
                  value={settings.studentNameYOffset}
                  onChange={(e) => updateSetting('studentNameYOffset', parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
              </div>

              {/* Horizontal Offset */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-[9px] uppercase font-bold ${isGeometric ? 'text-slate-600' : 'text-slate-400'}`}>Posição Horizontal (X)</span>
                  <span className="text-xs font-mono font-bold text-sky-500">{settings.studentNameXOffset}px</span>
                </div>
                <input
                  type="range"
                  min="-25"
                  max="25"
                  value={settings.studentNameXOffset}
                  onChange={(e) => updateSetting('studentNameXOffset', parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
              </div>
            </div>

            {/* 3. Ajustes do Personagem */}
            <div className={`p-4 rounded-2xl border flex flex-col gap-3.5 ${isGeometric ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/40 border-slate-700'}`}>
              <div className="flex justify-between items-center pb-2 border-b border-dashed border-slate-300/50">
                <span className={`text-[10px] uppercase font-black tracking-wider ${isGeometric ? 'text-slate-800' : 'text-yellow-400 font-pixel'}`}>
                  👾 Personagem (Mob)
                </span>
                <button
                  onClick={() => {
                    updateSetting('mobPosition', 'bottom_right');
                    updateSetting('mobScale', 100);
                    updateSetting('mobYOffset', 0);
                    updateSetting('mobXOffset', 0);
                    updateSetting('mobEnabled', true);
                    updateSetting('mobOpacity', 100);
                  }}
                  className={`text-[9px] font-bold uppercase hover:underline cursor-pointer ${isGeometric ? 'text-blue-600' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  Resetar
                </button>
              </div>

              {/* Status Toggle */}
              <div>
                <span className={`block text-[9px] uppercase font-bold mb-1 ${isGeometric ? 'text-slate-600' : 'text-slate-400'}`}>Status do Personagem</span>
                <div className={`flex p-0.5 rounded-lg border text-[10px] ${isGeometric ? 'bg-slate-200/50 border-slate-300' : 'bg-slate-800 border-slate-700'}`}>
                  <button
                    onClick={() => updateSetting('mobEnabled', true)}
                    className={`flex-1 py-1 text-center rounded-md font-semibold transition-all cursor-pointer ${
                      (settings.mobEnabled ?? true)
                        ? isGeometric ? 'bg-white text-blue-600 shadow-sm' : 'bg-slate-700 text-yellow-400 font-bold'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Habilitado
                  </button>
                  <button
                    onClick={() => updateSetting('mobEnabled', false)}
                    className={`flex-1 py-1 text-center rounded-md font-semibold transition-all cursor-pointer ${
                      !(settings.mobEnabled ?? true)
                        ? isGeometric ? 'bg-white text-blue-600 shadow-sm' : 'bg-slate-700 text-yellow-400 font-bold'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Desativar
                  </button>
                </div>
              </div>

              {/* Position Select */}
              <div>
                <span className={`block text-[9px] uppercase font-bold mb-1 ${isGeometric ? 'text-slate-600' : 'text-slate-400'}`}>Canto de Exibição</span>
                <select
                  value={settings.mobPosition}
                  onChange={(e) => updateSetting('mobPosition', e.target.value as any)}
                  className={`w-full border text-[11px] rounded-lg p-1.5 font-medium focus:outline-none ${isGeometric ? 'bg-white text-slate-900 border-slate-300 focus:border-blue-500' : 'bg-slate-800 text-white border-slate-700 focus:border-yellow-400'}`}
                  disabled={!(settings.mobEnabled ?? true)}
                >
                  <option value="bottom_right">Canto Inferior Direito</option>
                  <option value="bottom_left">Canto Inferior Esquerdo</option>
                  <option value="top_right">Canto Superior Direito</option>
                  <option value="top_left">Canto Superior Esquerdo</option>
                  <option value="hidden">Ocultar Personagem</option>
                </select>
              </div>

              {/* Mob Scale */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-[9px] uppercase font-bold ${isGeometric ? 'text-slate-600' : 'text-slate-400'}`}>Tamanho (Escala)</span>
                  <span className={`text-xs font-mono font-bold ${(settings.mobEnabled ?? true) ? 'text-sky-500' : 'text-slate-500'}`}>{settings.mobScale}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={settings.mobScale}
                  onChange={(e) => updateSetting('mobScale', parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-sky-500 disabled:opacity-40"
                  disabled={!(settings.mobEnabled ?? true)}
                />
              </div>

              {/* Mob Opacity */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-[9px] uppercase font-bold ${isGeometric ? 'text-slate-600' : 'text-slate-400'}`}>Transparência (Opacidade)</span>
                  <span className={`text-xs font-mono font-bold ${(settings.mobEnabled ?? true) ? 'text-sky-500' : 'text-slate-500'}`}>{settings.mobOpacity ?? 100}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.mobOpacity ?? 100}
                  onChange={(e) => updateSetting('mobOpacity', parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-sky-500 disabled:opacity-40"
                  disabled={!(settings.mobEnabled ?? true)}
                />
              </div>

              {/* Vertical Offset */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-[9px] uppercase font-bold ${isGeometric ? 'text-slate-600' : 'text-slate-400'}`}>Posição Vertical (Y)</span>
                  <span className={`text-xs font-mono font-bold ${(settings.mobEnabled ?? true) ? 'text-sky-500' : 'text-slate-500'}`}>{settings.mobYOffset}px</span>
                </div>
                <input
                  type="range"
                  min="-30"
                  max="30"
                  value={settings.mobYOffset}
                  onChange={(e) => updateSetting('mobYOffset', parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-sky-500 disabled:opacity-40"
                  disabled={!(settings.mobEnabled ?? true)}
                />
              </div>

              {/* Horizontal Offset */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-[9px] uppercase font-bold ${isGeometric ? 'text-slate-600' : 'text-slate-400'}`}>Posição Horizontal (X)</span>
                  <span className={`text-xs font-mono font-bold ${(settings.mobEnabled ?? true) ? 'text-sky-500' : 'text-slate-500'}`}>{settings.mobXOffset}px</span>
                </div>
                <input
                  type="range"
                  min="-30"
                  max="30"
                  value={settings.mobXOffset}
                  onChange={(e) => updateSetting('mobXOffset', parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-sky-500 disabled:opacity-40"
                  disabled={!(settings.mobEnabled ?? true)}
                />
              </div>
            </div>
          </div>
        </div>
      )
    },
    background: {
      title: 'FUNDO REPETIDO PARA TODOS',
      subtitle: 'Customize um plano de fundo alternativo para todo o baralho.',
      icon: <Image className="w-4 h-4 text-emerald-500" />,
      render: () => (
        <div>
          <p className={`text-xs mb-3 ${isGeometric ? 'text-slate-500' : 'text-slate-400'}`}>
            Escolha um fundo que vai se repetir para todas as cartas do baralho, podendo ser um link direto ou upload de imagem.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {/* Background Type Selection */}
            <div>
              <span className={`block text-[10px] uppercase font-bold mb-1.5 ${isGeometric ? 'text-slate-600' : 'text-slate-300'}`}>
                Tipo de Fundo
              </span>
              <div className={`flex p-1 rounded-xl border ${isGeometric ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border border-slate-700'}`}>
                <button
                  onClick={() => updateSetting('customBgType', 'theme')}
                  className={`flex-1 py-1.5 text-center text-xs rounded-lg transition-all cursor-pointer ${
                    settings.customBgType === 'theme'
                      ? isGeometric
                        ? 'bg-white text-blue-600 shadow-sm font-bold'
                        : 'bg-slate-700 text-yellow-400 shadow font-semibold'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Tema Padrão
                </button>
                <button
                  onClick={() => updateSetting('customBgType', 'image')}
                  className={`flex-1 py-1.5 text-center text-xs rounded-lg transition-all cursor-pointer ${
                    settings.customBgType === 'image'
                      ? isGeometric
                        ? 'bg-white text-blue-600 shadow-sm font-bold'
                        : 'bg-slate-700 text-yellow-400 shadow font-semibold'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Personalizado
                </button>
              </div>
            </div>

            {/* Custom Background Source (Only shown if Custom Image) */}
            {settings.customBgType === 'image' && (
              <>
                <div>
                  <span className={`block text-[10px] uppercase font-bold mb-1.5 ${isGeometric ? 'text-slate-600' : 'text-slate-300'}`}>
                    Origem da Imagem
                  </span>
                  <div className={`flex p-1 rounded-xl border ${isGeometric ? 'bg-slate-50 border-slate-200' : 'bg-slate-900 border border-slate-700'}`}>
                    <button
                      onClick={() => updateSetting('customBgSource', 'url')}
                      className={`flex-1 py-1.5 text-center text-xs rounded-lg transition-all cursor-pointer ${
                        settings.customBgSource === 'url'
                          ? isGeometric
                            ? 'bg-white text-blue-600 shadow-sm font-bold'
                            : 'bg-slate-700 text-yellow-400 shadow font-semibold'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      URL da Web
                    </button>
                    <button
                      onClick={() => updateSetting('customBgSource', 'upload')}
                      className={`flex-1 py-1.5 text-center text-xs rounded-lg transition-all cursor-pointer ${
                        settings.customBgSource === 'upload'
                          ? isGeometric
                            ? 'bg-white text-blue-600 shadow-sm font-bold'
                            : 'bg-slate-700 text-yellow-400 shadow font-semibold'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      Upload Imagem
                    </button>
                  </div>
                </div>

                <div>
                  <span className={`block text-[10px] uppercase font-bold mb-1.5 ${isGeometric ? 'text-slate-600' : 'text-slate-300'}`}>
                    Estilo de Exibição
                  </span>
                  <select
                    value={settings.customBgStyle}
                    onChange={(e) => updateSetting('customBgStyle', e.target.value as 'repeat' | 'cover' | 'contain')}
                    className={`w-full border text-[11px] rounded-xl p-2 font-medium focus:outline-none ${isGeometric ? 'bg-white text-slate-900 border-slate-300 focus:border-blue-500' : 'bg-slate-800 text-white border-slate-700 focus:border-yellow-400'}`}
                  >
                    <option value="repeat">Lado a Lado (Repetido)</option>
                    <option value="cover">Cobrir Carta (Cover)</option>
                    <option value="contain">Enquadrar Totalmente (Contain)</option>
                  </select>
                </div>
              </>
            )}
          </div>

          {settings.customBgType === 'image' && (
            <div className={`p-4 rounded-2xl border mb-4 ${isGeometric ? 'bg-slate-50 border-slate-150' : 'bg-slate-900/40 border-slate-700'}`}>
              {settings.customBgSource === 'url' ? (
                <div>
                  <span className={`block text-[10px] uppercase font-bold mb-1.5 ${isGeometric ? 'text-slate-600' : 'text-slate-300'}`}>
                    Link Direto da Imagem (URL)
                  </span>
                  <input
                    type="text"
                    value={settings.customBgUrl || ''}
                    onChange={(e) => updateSetting('customBgUrl', e.target.value)}
                    className={`w-full rounded-xl px-4 py-2 text-xs focus:outline-none ${isGeometric ? 'bg-white border border-slate-300 text-slate-900 focus:border-blue-500' : 'bg-slate-800 border border-slate-700 text-slate-200 focus:border-yellow-400'}`}
                    placeholder="Cole a URL da imagem (ex: https://site.com/fundo.png)"
                  />
                </div>
              ) : (
                <div>
                  <span className={`block text-[10px] uppercase font-bold mb-1.5 ${isGeometric ? 'text-slate-600' : 'text-slate-300'}`}>
                    Carregar Arquivo de Imagem
                  </span>
                  <div className="flex items-center gap-3">
                    <label className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer border transition-colors ${isGeometric ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100' : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'}`}>
                      <Upload className="w-4 h-4 text-blue-500" />
                      <span>Selecionar Imagem</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBgUpload}
                        className="hidden"
                      />
                    </label>
                    {settings.customBgUpload ? (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded border border-slate-300 bg-cover bg-center" style={{ backgroundImage: `url(${settings.customBgUpload})` }} />
                        <span className="text-[10px] text-green-500 font-medium">Carregado!</span>
                        <button
                          onClick={() => updateSetting('customBgUpload', '')}
                          className="text-[10px] text-red-500 hover:underline cursor-pointer"
                        >
                          Remover
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-400">Nenhum arquivo selecionado</span>
                    )}
                  </div>
                </div>
              )}

              {/* Opacity Range slider */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-[10px] uppercase font-bold ${isGeometric ? 'text-slate-600' : 'text-slate-300'}`}>
                    Opacidade do Fundo
                  </span>
                  <span className={`text-xs font-mono font-bold ${isGeometric ? 'text-blue-600' : 'text-yellow-400'}`}>
                    {settings.customBgOpacity}%
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={settings.customBgOpacity}
                  onChange={(e) => updateSetting('customBgOpacity', parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
          )}
        </div>
      )
    },
    individual_cards: {
      title: 'ILUSTRAÇÕES E MASCOTES DAS CARTAS',
      subtitle: 'Defina as figuras, emojis ou imagens para cada uma das cartas de tabuada.',
      icon: <Sparkles className="w-4 h-4 text-purple-500" />,
      render: () => (
        <div>
          <p className={`text-xs mb-4 ${isGeometric ? 'text-slate-500' : 'text-slate-400'}`}>
            Configure a ilustração (mascote) e o título personalizado de cada uma das cartas. O baralho é 100% agnóstico: você pode mudar todas as cartas de uma vez para temas populares como Animais, Espaço, Escolar, Ícones Minimalistas ou manter o clássico Minecraft!
          </p>

          {/* Global Mascot Theme Selector */}
          <div className={`p-4 mb-5 border rounded-2xl ${isGeometric ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/40 border-slate-700'}`}>
            <span className={`block text-[10px] uppercase font-bold mb-1 tracking-wider ${isGeometric ? 'text-slate-700' : 'text-slate-300'}`}>
              ⚡ MUDAR TODOS OS MASCOTES DE UMA VEZ (TEMAS GLOBAIS)
            </span>
            <p className="text-[11px] text-slate-400 mb-3.5">
              Redefina instantaneamente todas as 12 cartas para um destes temas com um único clique:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'minecraft', label: 'Minecraft 🎮', desc: 'Mobs clássicos' },
                { id: 'animals', label: 'Animais 🐶', desc: 'Emojis de animais fofos' },
                { id: 'space', label: 'Espaço 🚀', desc: 'Aventura intergaláctica' },
                { id: 'education', label: 'Escola 📚', desc: 'Estudos e aprendizado' },
                { id: 'minimalist', label: 'Ícones Minimalistas ⭐', desc: 'Símbolos vetoriais limpos' },
              ].map((themeOpt) => (
                <button
                  key={themeOpt.id}
                  onClick={() => {
                    const mascotMap = THEMED_MASCOTS_MAPS[themeOpt.id];
                    if (mascotMap) {
                      setSettings(prev => ({
                        ...prev,
                        mobsAssignment: {
                          ...prev.mobsAssignment,
                          ...mascotMap
                        }
                      }));
                    }
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl border cursor-pointer hover:scale-[1.01] active:scale-95 transition-all ${
                    isGeometric
                      ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800 hover:border-slate-300 shadow-sm'
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-yellow-400 hover:border-slate-600'
                  }`}
                  title={themeOpt.desc}
                >
                  {themeOpt.label}
                </button>
              ))}
            </div>
          </div>

          <span className={`block text-[10px] uppercase font-bold mb-3 tracking-wider ${isGeometric ? 'text-slate-700' : 'text-slate-300'}`}>
            🛠️ AJUSTAR CARTAS INDIVIDUAIS
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { key: 'cover', label: 'Capa Decorativa (Célula 1)' },
              { key: 'title', label: 'Cartão de Título (Célula 2)' },
              ...Array.from({ length: 10 }).map((_, i) => {
                const num = i + 1;
                return { key: num.toString(), label: `Tabuada do ${num}` };
              })
            ].map(({ key, label }) => {
              const activeMob = settings.mobsAssignment[key] || 'creeper';
              const customNameVal = settings.cardNames[key] || '';
              
              const isPreset = ASSET_PRESETS_CATEGORIES.some(c => c.options.some(o => o.type === activeMob));

              return (
                <div key={key} className={`p-3.5 border rounded-2xl flex flex-col gap-2.5 ${isGeometric ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-700'}`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase tracking-wide truncate ${isGeometric ? 'text-slate-700' : 'text-slate-300'}`}>
                      {label}
                    </span>
                    <MinecraftMobIcon mob={activeMob} size={24} />
                  </div>

                  {/* Character selection */}
                  <div>
                    <span className={`block text-[9px] uppercase font-semibold mb-1 ${isGeometric ? 'text-slate-500' : 'text-slate-400'}`}>
                      Mascote / Figura
                    </span>
                    <select
                      value={isPreset ? activeMob : 'custom'}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val !== 'custom') {
                          handleMobChange(key, val);
                        } else {
                          handleMobChange(key, '⭐');
                        }
                      }}
                      className={`w-full border text-[11px] rounded-lg p-1.5 font-medium focus:outline-none ${isGeometric ? 'bg-white text-slate-900 border-slate-300 focus:border-blue-500' : 'bg-slate-800 text-white border-slate-700 focus:border-yellow-400'}`}
                    >
                      {ASSET_PRESETS_CATEGORIES.map((cat) => (
                        <optgroup key={cat.category} label={cat.category}>
                          {cat.options.map((opt) => (
                            <option key={opt.type} value={opt.type}>
                              {opt.name}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                      <option value="custom">✨ Personalizado (Emoji, Ícone Lucide ou Upload)...</option>
                    </select>

                    {/* Custom asset value input / file upload */}
                    {!isPreset && (
                      <div className="mt-2 flex flex-col gap-1.5">
                        <span className={`block text-[8px] uppercase font-bold ${isGeometric ? 'text-slate-500' : 'text-slate-450'}`}>
                          Mascote Customizado
                        </span>
                        <div className="flex gap-1.5">
                          <input
                            type="text"
                            value={
                              activeMob.startsWith('data:image') || activeMob.startsWith('http')
                                ? 'Imagem Enviada'
                                : activeMob
                            }
                            disabled={activeMob.startsWith('data:image')}
                            onChange={(e) => handleMobChange(key, e.target.value)}
                            className={`flex-1 rounded-lg px-2.5 py-1 text-[11px] focus:outline-none ${isGeometric ? 'bg-white border border-slate-300 text-slate-900 focus:border-blue-500' : 'bg-slate-800 border border-slate-700 text-slate-200 focus:border-yellow-400'} disabled:opacity-75`}
                            placeholder="🦊, Rocket, Flame, Star..."
                          />
                          <label className={`px-2 py-1 text-[10px] rounded-lg border cursor-pointer hover:opacity-90 flex items-center gap-1 shrink-0 ${isGeometric ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'}`}>
                            <Upload className="w-3 h-3" />
                            <span>{activeMob.startsWith('data:image') ? 'Trocar' : 'Upload'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = () => {
                                    if (typeof reader.result === 'string') {
                                      handleMobChange(key, reader.result);
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                        </div>
                        {activeMob.startsWith('data:image') && (
                          <button
                            type="button"
                            onClick={() => handleMobChange(key, '⭐')}
                            className="text-left text-[9px] text-red-500 hover:underline"
                          >
                            Remover imagem enviada
                          </button>
                        )}
                        {!activeMob.startsWith('data:image') && !activeMob.startsWith('http') && (
                          <span className="text-[8px] text-slate-400 leading-normal">
                            Digite um emoji (ex: 🦄, 🦖) ou ícone do Lucide (ex: Heart, Sparkles, Trophy, Award, Gift, Compass).
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Custom Name */}
                  <div>
                    <span className={`block text-[9px] uppercase font-semibold mb-1 ${isGeometric ? 'text-slate-500' : 'text-slate-400'}`}>
                      Nome Personalizado da Carta
                    </span>
                    <input
                      type="text"
                      value={customNameVal}
                      onChange={(e) => handleNameChange(key, e.target.value)}
                      className={`w-full rounded-lg px-2.5 py-1 text-[11px] focus:outline-none ${isGeometric ? 'bg-white border border-slate-300 text-slate-900 focus:border-blue-500' : 'bg-slate-800 border border-slate-700 text-slate-200 focus:border-yellow-400'}`}
                      placeholder="Deixe em branco para omitir"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )
    },
    print_tips: {
      title: 'COMO IMPRIMIR PERFEITAMENTE EM FOLHA A4?',
      subtitle: 'Configurações de impressão ideais do navegador.',
      icon: <HelpCircle className="w-4 h-4 text-blue-500" />,
      render: () => (
        <div className={`p-4 rounded-2xl flex items-start gap-3 ${isGeometric ? 'bg-blue-50 text-slate-800' : 'bg-blue-950/40 text-blue-200'}`}>
          <HelpCircle className={`w-5 h-5 shrink-0 mt-0.5 ${isGeometric ? 'text-blue-600' : 'text-blue-400'}`} />
          <div className="text-xs">
            <h4 className={`font-semibold mb-1 ${isGeometric ? 'text-blue-800' : 'text-blue-300'}`}>Como Imprimir Perfeitamente em Folha A4?</h4>
            <ul className={`list-disc list-inside space-y-1 ${isGeometric ? 'text-slate-600' : 'text-blue-300'}`}>
              <li>No painel de impressão do navegador, mude o destino para <strong>Salvar como PDF</strong> ou escolha sua impressora física.</li>
              <li>Defina a orientação como <strong>Retrato (Portrait)</strong>.</li>
              <li>Ajuste o tamanho do papel para <strong>A4</strong>.</li>
              <li>Nas opções avançadas, marque <strong>Gráficos de plano de fundo (Background graphics)</strong> para imprimir as cores e texturas.</li>
              <li>Defina as margens como <strong>Nenhuma (None)</strong> ou padrão para evitar cortes.</li>
            </ul>
          </div>
        </div>
      )
    }
  };

  return (
    <div className={`w-full ${isGeometric ? 'bg-white border border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-800 border-2 border-slate-700 text-slate-100'} rounded-3xl p-6 shadow-xl transition-all duration-200`}>
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 border-b pb-4 ${isGeometric ? 'border-slate-150' : 'border-slate-700'}`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 ${isGeometric ? 'bg-blue-600' : 'bg-green-500'} rounded-xl`}>
            <Sliders className={`w-5 h-5 ${isGeometric ? 'text-white' : 'text-slate-900'}`} />
          </div>
          <div>
            <h3 className={`tracking-wider ${isGeometric ? 'font-sans font-black text-blue-600 text-xs' : 'font-pixel text-[10px] md:text-xs text-green-400'}`}>PAINEL DE PERSONALIZAÇÃO</h3>
            <p className={`text-xs ${isGeometric ? 'text-slate-500' : 'text-slate-400'}`}>Personalize e reordene os blocos de configuração do baralho!</p>
          </div>
        </div>

        {/* Global Action to Reset Order */}
        <button
          onClick={resetSectionsOrder}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold select-none cursor-pointer transition-colors ${
            isGeometric 
              ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700' 
              : 'bg-slate-900/60 hover:bg-slate-900 border-slate-700 text-slate-300'
          }`}
          title="Resetar a ordem de exibição de todos os blocos"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Resetar Ordem</span>
        </button>
      </div>

      {setFloatingPreviewOpen && (
        <div className={`mb-6 p-4 rounded-2xl border flex items-center justify-between transition-all ${
          isGeometric 
            ? 'bg-blue-50/50 border-blue-100 shadow-sm' 
            : 'bg-yellow-500/5 border-yellow-500/10 shadow'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isGeometric ? 'bg-blue-100 text-blue-600' : 'bg-slate-900/40 text-yellow-400'}`}>
              <Eye className="w-4 h-4 animate-pulse" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className={`block text-[11px] uppercase font-bold tracking-wider ${isGeometric ? 'text-slate-800' : 'text-slate-200'}`}>
                Visor do Designer (Zoom Flutuante)
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                Habilita a janela flutuante que mostra os detalhes de cada carta em zoom.
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setFloatingPreviewOpen(!floatingPreviewOpen)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              floatingPreviewOpen
                ? isGeometric ? 'bg-blue-600' : 'bg-yellow-400'
                : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full shadow ring-0 transition duration-200 ease-in-out ${
                floatingPreviewOpen ? 'translate-x-5 bg-white' : 'translate-x-0 bg-slate-100 dark:bg-slate-400'
              } ${!isGeometric && floatingPreviewOpen ? 'bg-slate-950' : ''}`}
            />
          </button>
        </div>
      )}

      {/* Overview Map/List of Sections - Interactive Mini-Manager */}
      <div className={`mb-6 p-4 rounded-2xl border ${isGeometric ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/25 border-slate-700'} text-xs`}>
        <div className="flex justify-between items-center mb-2.5">
          <span className={`font-bold uppercase tracking-wider ${isGeometric ? 'text-slate-700' : 'text-yellow-400'}`}>
            🗺️ Ordem dos Blocos (Arranjo da Coluna)
          </span>
          <span className="text-[10px] text-slate-400">Use os botões ▲ ▼ de cada bloco para mudar a ordem.</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {sectionsOrder.map((sectionId, idx) => {
            const info = sectionsMap[sectionId];
            if (!info) return null;
            return (
              <div 
                key={sectionId} 
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium border ${
                  isGeometric 
                    ? 'bg-white border-slate-200 text-slate-800' 
                    : 'bg-slate-800 border-slate-700 text-slate-200'
                }`}
              >
                <span className="font-bold opacity-40">{idx + 1}.</span>
                <span>{info.title.split(' (')[0]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Render All Sections dynamically sorted by customizerSectionsOrder */}
      <div className="space-y-6">
        {sectionsOrder.map((sectionId, index) => {
          const section = sectionsMap[sectionId];
          if (!section) return null;

          return (
            <div 
              key={sectionId} 
              className={`p-5 rounded-2xl border transition-all duration-300 ${
                isGeometric 
                  ? 'bg-white border-slate-200 shadow-sm hover:border-blue-200 hover:shadow-md' 
                  : 'bg-slate-900/25 border-slate-700/60 hover:border-slate-600/70'
              }`}
            >
              {/* Section Header with arrow controls */}
              <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-dashed border-slate-200/50 dark:border-slate-700/50">
                <div>
                  <label className={`flex items-center gap-2 text-xs uppercase tracking-wider mb-1 ${isGeometric ? 'font-sans font-black text-slate-800' : 'font-pixel text-[8px] text-yellow-400'}`}>
                    {section.icon}
                    {section.title}
                  </label>
                  <p className={`text-[11px] ${isGeometric ? 'text-slate-500' : 'text-slate-400'}`}>
                    {section.subtitle}
                  </p>
                </div>

                {/* Arrow up and down control buttons */}
                <div className="flex items-center gap-1 shrink-0 select-none no-print">
                  <button
                    onClick={() => moveSection(index, 'up')}
                    disabled={index === 0}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      index === 0 
                        ? 'opacity-30 cursor-not-allowed border-transparent text-slate-500' 
                        : isGeometric 
                          ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 active:scale-95' 
                          : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300 active:scale-95'
                    }`}
                    title="Mover Bloco para Cima"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => moveSection(index, 'down')}
                    disabled={index === sectionsOrder.length - 1}
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      index === sectionsOrder.length - 1 
                        ? 'opacity-30 cursor-not-allowed border-transparent text-slate-500' 
                        : isGeometric 
                          ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 active:scale-95' 
                          : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300 active:scale-95'
                    }`}
                    title="Mover Bloco para Baixo"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <span className={`text-[10px] font-mono font-bold ml-1.5 px-2 py-0.5 rounded ${
                    isGeometric ? 'bg-slate-100 text-slate-500' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {index + 1}º
                  </span>
                </div>
              </div>

              {/* Render actual section inputs/controls */}
              <div className="transition-all duration-300">
                {section.render()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
