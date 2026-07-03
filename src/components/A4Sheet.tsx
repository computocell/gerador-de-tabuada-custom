/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CardConfig, ThemeConfig, MathMode, AppSettings } from '../types';
import { MinecraftCard } from './MinecraftCard';
import { generateFullSheetConfigs } from '../utils';

interface A4SheetProps {
  mode: MathMode;
  theme: ThemeConfig;
  settings: AppSettings;
  showCutLines: boolean;
}

export const A4Sheet: React.FC<A4SheetProps> = ({
  mode,
  theme,
  settings,
  showCutLines,
}) => {
  // Generate the 10 math tables configs (1-10)
  const mathCards = generateFullSheetConfigs(mode, settings);

  // We need 12 cards total: 
  // Card 0: Cover Card
  // Card 1: Title Card
  // Cards 2-11: Tables 1 to 10
  
  // Arrange them in a 4-column x 3-row layout (12 items)
  // Row 1: Cover, Title, Tabuada 1, Tabuada 2
  // Row 2: Tabuada 3, Tabuada 4, Tabuada 5, Tabuada 6
  // Row 3: Tabuada 7, Tabuada 8, Tabuada 9, Tabuada 10

  const sheetTitle = mode === 'multiplication' ? settings.titleMulti : settings.titleDiv;

  return (
    <div 
      className="a4-sheet-container bg-white text-black relative shadow-2xl overflow-hidden mx-auto select-none print:shadow-none print:my-0 print:mx-0"
      style={{
        width: '210mm',
        height: '297mm',
        padding: '8mm 6mm', // Exact margins for general printers to not clip
        boxSizing: 'border-box',
        pageBreakAfter: 'always',
      }}
      id={`a4-sheet-${mode}`}
    >
      {/* Crop Marks (Geometric Balance Pattern) */}
      <div className="absolute top-1 left-1 w-5 h-5 border-l border-t border-slate-400 pointer-events-none" />
      <div className="absolute top-1 right-1 w-5 h-5 border-r border-t border-slate-400 pointer-events-none" />
      <div className="absolute bottom-1 left-1 w-5 h-5 border-l border-b border-slate-400 pointer-events-none" />
      <div className="absolute bottom-1 right-1 w-5 h-5 border-r border-b border-slate-400 pointer-events-none" />

      {/* Printable Watermark or Margin indicators (hidden in print) */}
      <div className="absolute top-1 left-2 text-[8px] text-gray-400 font-mono print:hidden">
        Folha A4 ({mode === 'multiplication' ? 'Multiplicação' : 'Divisão'}) • {theme.name}
      </div>
      <div className="absolute top-1 right-2 text-[8px] text-gray-400 font-mono print:hidden">
        Otimizado para Impressão 300 DPI
      </div>

      {/* Grid Layout: 3 Rows, 4 Columns */}
      <div className="grid grid-cols-4 grid-rows-3 h-full gap-2 w-full">
        {/* Cell 1: Decorative Cover */}
        <div className="w-full h-full">
          <MinecraftCard
            config={mathCards[0]} // Pass dummy card config
            theme={theme}
            mode={mode}
            showCutLines={showCutLines}
            fontSize={settings.fontSize}
            isCoverCard={true}
            settings={settings}
          />
        </div>

        {/* Cell 2: Title Card */}
        <div className="w-full h-full">
          <MinecraftCard
            config={mathCards[0]} // Pass dummy card config
            theme={theme}
            mode={mode}
            showCutLines={showCutLines}
            fontSize={settings.fontSize}
            isTitleCard={true}
            customTitle={sheetTitle}
            settings={settings}
          />
        </div>

        {/* Cell 3: Tabuada do 1 */}
        <div className="w-full h-full">
          <MinecraftCard
            config={mathCards[0]}
            theme={theme}
            mode={mode}
            showCutLines={showCutLines}
            fontSize={settings.fontSize}
            settings={settings}
          />
        </div>

        {/* Cell 4: Tabuada do 2 */}
        <div className="w-full h-full">
          <MinecraftCard
            config={mathCards[1]}
            theme={theme}
            mode={mode}
            showCutLines={showCutLines}
            fontSize={settings.fontSize}
            settings={settings}
          />
        </div>

        {/* Row 2: Tabuadas do 3 ao 6 */}
        {mathCards.slice(2, 6).map((cardConfig, idx) => (
          <div key={cardConfig.id} className="w-full h-full">
            <MinecraftCard
              config={cardConfig}
              theme={theme}
              mode={mode}
              showCutLines={showCutLines}
              fontSize={settings.fontSize}
              settings={settings}
            />
          </div>
        ))}

        {/* Row 3: Tabuadas do 7 ao 10 */}
        {mathCards.slice(6, 10).map((cardConfig, idx) => (
          <div key={cardConfig.id} className="w-full h-full">
            <MinecraftCard
              config={cardConfig}
              theme={theme}
              mode={mode}
              showCutLines={showCutLines}
              fontSize={settings.fontSize}
              settings={settings}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
