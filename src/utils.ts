/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CardConfig, Equation, MobType, ThemeConfig, ThemeType, AppSettings } from './types';

export const THEMES: Record<ThemeType, ThemeConfig> = {
  geometric: {
    id: 'geometric',
    name: 'Balanço Geométrico',
    primaryColor: '#0f172a',
    secondaryColor: '#2563eb',
    accentColor: '#4f46e5',
    bgColor: '#cbd5e1',
    cardBg: '#ffffff',
    textColor: '#0f172a',
    borderColor: '#e2e8f0',
    headerTexture: 'bg-slate-900 text-white border-slate-950',
  },
  classic: {
    id: 'classic',
    name: 'Papel Clássico',
    primaryColor: '#5c4033',
    secondaryColor: '#f4ecd8',
    accentColor: '#e07a5f',
    bgColor: '#fdfbf7',
    cardBg: '#ffffff',
    textColor: '#2d3748',
    borderColor: '#e2e8f0',
    headerTexture: 'bg-amber-100 border-amber-200',
  },
  overworld: {
    id: 'overworld',
    name: 'Overworld (Grama)',
    primaryColor: '#4bae4f',
    secondaryColor: '#388e3c',
    accentColor: '#8d5e3c',
    bgColor: '#1a2e1a',
    cardBg: '#ffffff',
    textColor: '#1a2e1a',
    borderColor: '#4bae4f',
    headerTexture: 'bg-green-600 border-green-700 text-white',
  },
  nether: {
    id: 'nether',
    name: 'Nether (Fogo)',
    primaryColor: '#b71c1c',
    secondaryColor: '#d32f2f',
    accentColor: '#f57c00',
    bgColor: '#2d0a0a',
    cardBg: '#fff5f5',
    textColor: '#4a0e0e',
    borderColor: '#b71c1c',
    headerTexture: 'bg-red-800 border-red-900 text-white',
  },
  end: {
    id: 'end',
    name: 'The End (Escuro)',
    primaryColor: '#4a148c',
    secondaryColor: '#7b1fa2',
    accentColor: '#cc19cc',
    bgColor: '#0f051d',
    cardBg: '#faf5ff',
    textColor: '#2e0854',
    borderColor: '#4a148c',
    headerTexture: 'bg-purple-900 border-purple-950 text-white',
  },
  diamond: {
    id: 'diamond',
    name: 'Minério de Diamante',
    primaryColor: '#00bcd4',
    secondaryColor: '#0097a7',
    accentColor: '#e0f7fa',
    bgColor: '#0e242b',
    cardBg: '#f0fbfd',
    textColor: '#083344',
    borderColor: '#00bcd4',
    headerTexture: 'bg-cyan-700 border-cyan-800 text-white',
  },
};

export const DEFAULT_MOBS_FOR_TABLES: Record<string, MobType> = {
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
};

export const DEFAULT_SETTINGS: AppSettings = {
  language: 'pt',
  paperSize: 'a4',
  titleMulti: 'TABUADAS DE MULTIPLICAÇÃO',
  titleDiv: 'TABUADAS DE DIVISÃO',
  theme: 'geometric',
  showGridLines: true,
  fontSize: 'md',
  mobsAssignment: DEFAULT_MOBS_FOR_TABLES,
  customBgType: 'theme',
  customBgSource: 'url',
  customBgUrl: '',
  customBgUpload: '',
  customBgStyle: 'cover',
  customBgOpacity: 30,
  cardNames: {},
  globalStudentName: '',
  equationBgColor: '#ffffff',
  equationBgOpacity: 100,
  equationsBlockScale: 100,
  equationsBlockYOffset: 0,
  equationsBlockXOffset: 0,
  studentNameLocation: 'header',
  studentNameYOffset: 0,
  studentNameXOffset: 0,
  studentNameSize: 10,
  mobPosition: 'bottom_right',
  mobScale: 100,
  mobYOffset: 0,
  mobXOffset: 0,
  mobEnabled: true,
  mobOpacity: 100,
  cardCorners: 'rounded',
  customizerSectionsOrder: [
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
  ],
};

export function generateEquations(tableNumber: number, mode: 'multiplication' | 'division'): Equation[] {
  const equations: Equation[] = [];
  
  if (mode === 'multiplication') {
    for (let i = 1; i <= 10; i++) {
      equations.push({
        id: `m-${tableNumber}-${i}`,
        left: tableNumber,
        operator: '×',
        right: i,
        result: tableNumber * i,
      });
    }
  } else {
    // For division table of N, we want to show:
    // (N * 1) / N = 1, (N * 2) / N = 2, ..., (N * 10) / N = 10
    // So the dividend is N * i, divisor is N, quotient is i
    for (let i = 1; i <= 10; i++) {
      equations.push({
        id: `d-${tableNumber}-${i}`,
        left: tableNumber * i,
        operator: '÷',
        right: tableNumber,
        result: i,
      });
    }
  }
  
  return equations;
}

export function generateCardConfig(tableNumber: number, mode: 'multiplication' | 'division', mobsAssignment: Record<string, MobType>): CardConfig {
  const mob = mobsAssignment[tableNumber.toString()] || 'creeper';
  return {
    id: tableNumber,
    title: `Tabuada do ${tableNumber}`,
    number: tableNumber,
    mob,
    equations: generateEquations(tableNumber, mode),
  };
}

export function generateFullSheetConfigs(mode: 'multiplication' | 'division', settings: AppSettings): CardConfig[] {
  const configs: CardConfig[] = [];
  for (let i = 1; i <= 10; i++) {
    configs.push(generateCardConfig(i, mode, settings.mobsAssignment));
  }
  return configs;
}
