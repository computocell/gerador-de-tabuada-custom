/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type MathMode = 'multiplication' | 'division';

export type ThemeType = 'overworld' | 'nether' | 'end' | 'diamond' | 'classic' | 'geometric';

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  bgColor: string;
  cardBg: string;
  textColor: string;
  headerTexture: string; // Tailwind class or custom SVG reference
  borderColor: string;
}

export type MobType = string; // Can be a Minecraft mob ID ('creeper', etc.), an Emoji ('🐶', etc.), a Lucide icon name, or an image URL / base64 string

export interface Equation {
  left: number;
  operator: string;
  right: number;
  result: number;
  id: string;
}

export interface CardConfig {
  id: number;
  title: string;
  number: number; // Table number (1 to 10)
  mob: MobType;
  customColor?: string;
  equations: Equation[];
}

export interface AppSettings {
  language: 'pt' | 'es' | 'en';
  paperSize: 'a4';
  titleMulti: string;
  titleDiv: string;
  theme: ThemeType;
  showGridLines: boolean;
  fontSize: 'sm' | 'md' | 'lg';
  mobsAssignment: Record<string, MobType>; // Key can be table number '1'-'10', 'cover', or 'title'
  
  // Custom Background Options
  customBgType: 'theme' | 'image';
  customBgSource: 'url' | 'upload';
  customBgUrl: string;
  customBgUpload: string;
  customBgStyle: 'repeat' | 'cover' | 'contain';
  customBgOpacity: number; // 0 to 100

  // Custom individual card names/labels
  cardNames: Record<string, string>; // Key is card ID ('1'-'10', 'cover', 'title')
  globalStudentName: string;
  equationBgColor: string;
  equationBgOpacity: number; // 0 to 100

  // Element Positioning Properties
  equationsBlockScale: number; // 50 to 120 (percentage)
  equationsBlockYOffset: number; // in pixels, e.g. -30 to 30
  equationsBlockXOffset: number; // in pixels, e.g. -30 to 30

  studentNameLocation: 'header' | 'block_top' | 'block_bottom' | 'card_bottom';
  studentNameYOffset: number; // in pixels, e.g. -20 to 20
  studentNameXOffset: number; // in pixels, e.g. -20 to 20
  studentNameSize: number; // font size in px/rem or scale (8 to 16)

  mobPosition: 'bottom_right' | 'bottom_left' | 'top_right' | 'top_left' | 'hidden';
  mobScale: number; // percentage, e.g. 50 to 200
  mobYOffset: number; // in pixels
  mobXOffset: number; // in pixels
  mobEnabled: boolean; // default: true
  mobOpacity: number; // 0 to 100, default: 100
  cardCorners?: 'rounded' | 'straight'; // rounded corners or straight corners
  customizerSectionsOrder?: string[]; // list of section IDs in customized order
  customThemeColors?: Record<string, Partial<ThemeConfig>>;
}
