/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MathMode, MobType, AppSettings, ThemeConfig } from '../types';
import { MinecraftMobIcon } from './SvgAssets';
import { Sparkles, Heart, Award, RefreshCw, Volume2, VolumeX, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

interface PracticeModeProps {
  settings: AppSettings;
  theme: ThemeConfig;
  initialMode?: MathMode;
}

interface QuizQuestion {
  left: number;
  right: number;
  operator: string;
  result: number;
  choices: number[];
}

export const PracticeMode: React.FC<PracticeModeProps> = ({ settings, theme, initialMode = 'multiplication' }) => {
  const [mode, setMode] = useState<MathMode>(initialMode);
  const [selectedTable, setSelectedTable] = useState<number>(0); // 0 means mixed
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [hearts, setHearts] = useState<number>(3);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover' | 'victory'>('idle');
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [questionCount, setQuestionCount] = useState<number>(0);
  const TOTAL_QUESTIONS = 10;

  // Save/Load Highscore from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`mc_tabuadas_highscore_${mode}_${selectedTable}`);
    if (saved) {
      setHighScore(parseInt(saved, 10));
    } else {
      setHighScore(0);
    }
  }, [mode, selectedTable]);

  // Generate a random question
  const generateQuestion = (tableNum: number): QuizQuestion => {
    const table = tableNum === 0 ? Math.floor(Math.random() * 10) + 1 : tableNum;
    const factor = Math.floor(Math.random() * 10) + 1;
    
    let left = table;
    let right = factor;
    let operator = '×';
    let result = table * factor;

    if (mode === 'division') {
      // In division: (table * factor) / table = factor
      left = table * factor;
      right = table;
      operator = '÷';
      result = factor;
    }

    // Generate multiple choices
    const choicesSet = new Set<number>([result]);
    while (choicesSet.size < 4) {
      const offset = Math.floor(Math.random() * 9) - 4; // -4 to +4
      const wrongAnswer = Math.max(0, result + offset);
      if (wrongAnswer !== result && wrongAnswer > 0) {
        choicesSet.add(wrongAnswer);
      } else {
        choicesSet.add(result + Math.floor(Math.random() * 10) + 1);
      }
    }

    const choices = Array.from(choicesSet).sort(() => Math.random() - 0.5);

    return { left, right, operator, result, choices };
  };

  // Play a simple visual sound effect
  const playSoundEffect = (type: 'success' | 'fail' | 'click' | 'gameover') => {
    if (!soundEnabled) return;
    try {
      // We can use the browser's native AudioContext to generate high-quality synthesized sound effects!
      // This is a professional-grade solution that works inside the sandbox without loading audio files.
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'success') {
        // Double tone (major third or fifth arpeggio: perfect Minecraft style "experience pickup" sound!)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'fail') {
        // Downward buzz "Creeper fizz/explosion" tone
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);
        osc.start();
        osc.stop(ctx.currentTime + 0.45);
      } else if (type === 'click') {
        // Brief wooden click
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === 'gameover') {
        // Dramatic minor chord fall
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.8);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        osc.start();
        osc.stop(ctx.currentTime + 0.8);
      }
    } catch (e) {
      console.warn('Audio context not started/supported:', e);
    }
  };

  const startGame = (tableNum: number) => {
    playSoundEffect('click');
    setSelectedTable(tableNum);
    setScore(0);
    setHearts(3);
    setQuestionCount(1);
    setIsAnswered(false);
    setUserAnswer(null);
    setGameState('playing');
    setCurrentQuestion(generateQuestion(tableNum));
  };

  const handleAnswer = (answer: number) => {
    if (isAnswered) return;
    setUserAnswer(answer);
    setIsAnswered(true);

    const correct = answer === currentQuestion?.result;
    setIsCorrect(correct);

    if (correct) {
      const addedPoints = 10;
      setScore((prev) => {
        const newScore = prev + addedPoints;
        // Update highscore
        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem(`mc_tabuadas_highscore_${mode}_${selectedTable}`, newScore.toString());
        }
        return newScore;
      });
      playSoundEffect('success');
    } else {
      setHearts((prev) => {
        const nextHearts = prev - 1;
        if (nextHearts <= 0) {
          setGameState('gameover');
          playSoundEffect('gameover');
        } else {
          playSoundEffect('fail');
        }
        return nextHearts;
      });
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleNext = () => {
    playSoundEffect('click');
    if (questionCount >= TOTAL_QUESTIONS) {
      setGameState('victory');
      playSoundEffect('success');
    } else {
      setQuestionCount((prev) => prev + 1);
      setIsAnswered(false);
      setUserAnswer(null);
      setCurrentQuestion(generateQuestion(selectedTable));
    }
  };

  const resetMode = () => {
    playSoundEffect('click');
    setGameState('idle');
    setSelectedTable(0);
    setScore(0);
    setHearts(3);
    setUserAnswer(null);
    setIsAnswered(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-900 border-4 border-slate-700 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden select-none">
      {/* Background dirt tiles */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      {/* Header controls */}
      <div className="flex flex-wrap items-center justify-between border-b-2 border-slate-700 pb-4 mb-6 relative z-10 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-500 rounded-xl border border-yellow-600 shadow">
            <Award className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <h2 className="font-pixel text-[12px] md:text-sm text-yellow-400 tracking-wider">MODO TREINAMENTO</h2>
            <p className="text-xs text-slate-400">Pratique suas tabuadas e conquiste diamantes!</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              playSoundEffect('click');
              setSoundEnabled(!soundEnabled);
            }}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 active:translate-y-0.5 rounded-xl border border-slate-600 transition-all"
            title={soundEnabled ? 'Mutar som' : 'Ativar som'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-green-400" /> : <VolumeX className="w-4 h-4 text-gray-500" />}
          </button>

          {/* Mode Switcher */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                playSoundEffect('click');
                setMode('multiplication');
                setGameState('idle');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-pixel text-[8px] transition-all ${
                mode === 'multiplication'
                  ? 'bg-green-600 text-white shadow-inner'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Multiplicar
            </button>
            <button
              onClick={() => {
                playSoundEffect('click');
                setMode('division');
                setGameState('idle');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-pixel text-[8px] transition-all ${
                mode === 'division'
                  ? 'bg-cyan-600 text-white shadow-inner'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Dividir
            </button>
          </div>
        </div>
      </div>

      {/* Game Screens */}
      {gameState === 'idle' && (
        <div className="text-center py-8 relative z-10">
          <h3 className="font-pixel text-[11px] md:text-sm text-slate-200 mb-6">ESCOLHA UMA TABUADA PARA PRATICAR:</h3>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-w-2xl mx-auto mb-8">
            {/* Mixed option */}
            <button
              onClick={() => startGame(0)}
              className="col-span-3 sm:col-span-4 md:col-span-6 p-4 rounded-xl border-2 border-dashed border-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 font-pixel text-[10px] tracking-widest transition-all cursor-pointer transform hover:-translate-y-1"
            >
              ⚔️ MISTURADO (DO 1 AO 10)
            </button>

            {/* Individual numbers */}
            {Array.from({ length: 10 }).map((_, i) => {
              const num = i + 1;
              const mob = settings.mobsAssignment[num] || 'creeper';
              return (
                <button
                  key={num}
                  onClick={() => startGame(num)}
                  className="flex flex-col items-center justify-between p-3.5 bg-slate-800/80 hover:bg-slate-700/80 active:translate-y-0.5 rounded-xl border-2 border-slate-600 hover:border-slate-400 transition-all cursor-pointer transform hover:-translate-y-0.5 group"
                >
                  <span className="font-pixel text-[12px] text-yellow-300 mb-2">#{num}</span>
                  <div className="mb-2 group-hover:scale-110 transition-transform">
                    <MinecraftMobIcon mob={mob} size={32} />
                  </div>
                  <span className="text-[10px] text-slate-400 group-hover:text-white transition-colors">
                    Tabuada
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {gameState === 'playing' && currentQuestion && (
        <div className={`relative z-10 py-4 transition-transform ${shake ? 'animate-bounce' : ''}`}>
          {/* Info row: Hearts, Progress, Score */}
          <div className="flex items-center justify-between bg-slate-950/80 rounded-2xl p-4 border border-slate-800 mb-8">
            {/* Hearts */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400 font-pixel text-[7px] mr-1">VIDAS:</span>
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-5 h-5 transition-transform ${
                    i < hearts ? 'text-red-500 fill-red-500 scale-100 animate-pulse' : 'text-slate-700 scale-90'
                  }`}
                />
              ))}
            </div>

            {/* Question Progress */}
            <div className="hidden sm:flex flex-col items-center w-1/3">
              <div className="flex justify-between w-full text-[10px] text-slate-400 mb-1">
                <span>Progresso</span>
                <span>{questionCount}/{TOTAL_QUESTIONS}</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="bg-green-500 h-full transition-all duration-300"
                  style={{ width: `${(questionCount / TOTAL_QUESTIONS) * 100}%` }}
                />
              </div>
            </div>

            {/* Diamonds Score */}
            <div className="flex items-center gap-2">
              <MinecraftMobIcon mob="diamond" size={20} />
              <div className="text-right">
                <span className="block text-[8px] font-pixel text-slate-400">PONTUAÇÃO:</span>
                <span className="font-pixel text-[11px] text-cyan-400">{score}</span>
              </div>
            </div>
          </div>

          {/* The Challenge Card */}
          <div className="max-w-md mx-auto bg-slate-800 border-4 border-slate-600 rounded-3xl p-6 mb-8 shadow-inner relative text-center">
            {/* Corner decorative item */}
            <div className="absolute top-3 right-3 opacity-30">
              <MinecraftMobIcon mob={selectedTable === 0 ? 'crafting_table' : (settings.mobsAssignment[selectedTable] || 'creeper')} size={48} />
            </div>

            <p className="text-xs font-pixel text-[8px] text-slate-400 tracking-wider mb-2">RESOLVA A CONTA:</p>
            
            <div className="flex items-center justify-center gap-4 text-4xl md:text-5xl font-mono font-bold my-4">
              <span className="text-slate-100">{currentQuestion.left}</span>
              <span className="text-yellow-400 font-sans">{currentQuestion.operator}</span>
              <span className="text-slate-100">{currentQuestion.right}</span>
              <span className="text-slate-400 font-sans">=</span>
              <span className="text-yellow-400 font-sans">?</span>
            </div>

            <p className="text-xs text-slate-400 mt-2 italic">Selecione o bloco com a resposta correta!</p>
          </div>

          {/* Multiple Choices */}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {currentQuestion.choices.map((choice) => {
              const isUserChoice = userAnswer === choice;
              const isCorrectChoice = choice === currentQuestion.result;
              
              let btnClass = 'bg-slate-800 border-slate-600 hover:border-slate-400 text-slate-200';
              if (isAnswered) {
                if (isCorrectChoice) {
                  btnClass = 'bg-green-600 border-green-400 text-white font-bold animate-pulse';
                } else if (isUserChoice) {
                  btnClass = 'bg-red-600 border-red-400 text-white font-bold';
                } else {
                  btnClass = 'bg-slate-900 border-slate-800 text-slate-600 opacity-50';
                }
              }

              return (
                <button
                  key={choice}
                  disabled={isAnswered}
                  onClick={() => handleAnswer(choice)}
                  className={`p-4 text-xl font-mono font-bold rounded-2xl border-2 shadow-md transition-all cursor-pointer ${btnClass} flex items-center justify-center gap-2 transform active:scale-95`}
                >
                  <span>{choice}</span>
                  {isAnswered && isCorrectChoice && <CheckCircle className="w-5 h-5 text-green-200" />}
                </button>
              );
            })}
          </div>

          {/* Answer validation / Next button */}
          {isAnswered && (
            <div className="mt-8 flex flex-col items-center animate-fade-in relative z-10">
              <div className="flex items-center gap-2 mb-4">
                {isCorrect ? (
                  <div className="flex items-center gap-2 bg-green-500/20 border border-green-500 text-green-400 px-4 py-2 rounded-xl">
                    <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
                    <span className="font-pixel text-[8px] tracking-wider">CORRETO! +10 DIAMANTES</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 bg-red-500/20 border border-red-500 text-red-400 px-4 py-2 rounded-xl">
                    <AlertTriangle className="w-5 h-5 animate-bounce" />
                    <span className="font-pixel text-[8px] tracking-wider">OOPS! VOCÊ PERDEU UMA VIDA</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleNext}
                className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 border-2 border-yellow-600 text-slate-950 font-pixel text-[9px] tracking-wider rounded-xl cursor-pointer transform hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>{questionCount === TOTAL_QUESTIONS ? 'VER RESULTADO' : 'PRÓXIMA PERGUNTA'}</span>
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Game Over Screen */}
      {gameState === 'gameover' && (
        <div className="text-center py-12 relative z-10 max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <MinecraftMobIcon mob="creeper" size={80} className="drop-shadow-lg animate-bounce" />
          </div>
          
          <h2 className="font-pixel text-red-500 text-lg md:text-xl tracking-widest mb-2">SSSSssss... BOOM!</h2>
          <p className="text-sm text-slate-400 mb-6">As vidas acabaram! Mas não desanime, treinar leva à perfeição.</p>
          
          <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 mb-8 flex justify-around">
            <div>
              <span className="block text-[8px] font-pixel text-slate-500">DIAMANTES OBTIDOS:</span>
              <span className="font-pixel text-cyan-400 text-sm">{score}</span>
            </div>
            <div>
              <span className="block text-[8px] font-pixel text-slate-500">RECORDE DA TABUADA:</span>
              <span className="font-pixel text-yellow-500 text-sm">{highScore}</span>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={resetMode}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border-2 border-slate-600 font-pixel text-[8px] tracking-wider rounded-xl transition-all"
            >
              VOLTAR AO MENU
            </button>
            <button
              onClick={() => startGame(selectedTable)}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 border-2 border-red-700 font-pixel text-[8px] tracking-wider rounded-xl transition-all"
            >
              TENTAR NOVAMENTE
            </button>
          </div>
        </div>
      )}

      {/* Victory Screen */}
      {gameState === 'victory' && (
        <div className="text-center py-12 relative z-10 max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <MinecraftMobIcon mob="steve" size={80} className="drop-shadow-lg animate-bounce" />
          </div>
          
          <h2 className="font-pixel text-yellow-400 text-lg md:text-xl tracking-widest mb-2">VITÓRIA ÉPICA!</h2>
          <p className="text-sm text-slate-400 mb-6">Você dominou o desafio matemático sem perder as suas vidas!</p>
          
          <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 mb-8 flex justify-around">
            <div>
              <span className="block text-[8px] font-pixel text-slate-500">DIAMANTES CONQUISTADOS:</span>
              <span className="font-pixel text-cyan-400 text-sm">{score}</span>
            </div>
            <div>
              <span className="block text-[8px] font-pixel text-slate-500">NOVO RECORDE:</span>
              <span className="font-pixel text-yellow-500 text-sm">{highScore}</span>
            </div>
          </div>

          <div className="bg-green-500/10 border-2 border-green-500/50 rounded-2xl p-4 mb-8 flex items-center gap-3 text-left">
            <ShieldCheck className="w-8 h-8 text-green-400 shrink-0" />
            <div>
              <h4 className="font-pixel text-[8px] text-green-400">CERTIFICADO MINECRAFT</h4>
              <p className="text-xs text-slate-300">Este jogador agora possui super poderes matemáticos de tabuadas!</p>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={resetMode}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border-2 border-slate-600 font-pixel text-[8px] tracking-wider rounded-xl transition-all"
            >
              VOLTAR AO MENU
            </button>
            <button
              onClick={() => startGame(selectedTable)}
              className="px-6 py-3 bg-green-600 hover:bg-green-500 border-2 border-green-700 font-pixel text-[8px] tracking-wider rounded-xl transition-all"
            >
              JOGAR NOVAMENTE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
