import React from 'react';
import { GameState, PlayerStats } from '../types';
import { Play, Coins, Shield, Sparkles, Volume2, VolumeX, History, Trophy, Award, HardDrive, Gamepad2, Info, Eye } from 'lucide-react';
import { audio } from '../utils/audio';

interface GameUIProps {
  gameState: GameState;
  score: number;
  distance: number;
  coinsCollected: number;
  multiplier: number;
  shieldCount: number;
  maxShields: number;
  turboActive: boolean;
  magnetActive: boolean;
  turboTimeRemaining: number; // 0 to 1
  magnetTimeRemaining: number; // 0 to 1
  stats: PlayerStats;
  isMuted: boolean;
  onMuteToggle: () => void;
  onStartGame: () => void;
  onOpenGarage: () => void;
  onResumeGame?: () => void;
  onBackToMenu: () => void;
  exactSpeed?: number;
  stageLevel?: number;
  stageName?: string;
  cameraView?: 'chase' | 'cockpit';
  onChangeCameraView?: () => void;
}

export const GameUI: React.FC<GameUIProps> = ({
  gameState,
  score,
  distance,
  coinsCollected,
  multiplier,
  shieldCount,
  maxShields,
  turboActive,
  magnetActive,
  turboTimeRemaining,
  magnetTimeRemaining,
  stats,
  isMuted,
  onMuteToggle,
  onStartGame,
  onOpenGarage,
  onBackToMenu,
  exactSpeed,
  stageLevel = 1,
  stageName = "Neon Kiber Shahor",
  cameraView = 'chase',
  onChangeCameraView
}) => {
  const getSkinColor = () => {
    if (stats.selectedSkin === 'toxic_green') return 'text-emerald-400';
    if (stats.selectedSkin === 'hot_pink') return 'text-pink-500';
    if (stats.selectedSkin === 'sun_gold') return 'text-yellow-400';
    if (stats.selectedSkin === 'laser_violet') return 'text-violet-400';
    if (stats.selectedSkin === 'asphalt_fury') return 'text-red-500';
    if (stats.selectedSkin === 'stellar_shadow') return 'text-teal-400';
    return 'text-cyan-400';
  };

  const getSkinHex = () => {
    if (stats.selectedSkin === 'toxic_green') return '#39ff14';
    if (stats.selectedSkin === 'hot_pink') return '#ff007f';
    if (stats.selectedSkin === 'sun_gold') return '#ffd700';
    if (stats.selectedSkin === 'laser_violet') return '#b000ff';
    if (stats.selectedSkin === 'asphalt_fury') return '#ff2a00';
    if (stats.selectedSkin === 'stellar_shadow') return '#00ffcc';
    return '#00f0ff';
  };

  if (gameState === 'MENU') {
    return (
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-between p-8 bg-[#050505]/95 text-white select-none font-sans overflow-y-auto">
        {/* Decorative backdrop grid overlay from theme */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        {/* Top bar with audio toggle */}
        <div className="relative z-10 w-full max-w-5xl flex justify-between items-center mt-2">
          <div className="flex items-center gap-3 bg-zinc-900 border border-white/10 px-4 py-2 rounded-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse inline-block"></span>
            <span className="text-xs font-mono font-bold tracking-widest text-zinc-300 uppercase">TELEMETRY ONLINE v1.2</span>
          </div>

          <button
            onClick={() => {
              audio.playClick();
              onMuteToggle();
            }}
            className="p-3 rounded-lg bg-zinc-900 border border-white/10 hover:border-cyan-400 transition-colors text-white cursor-pointer"
            title={isMuted ? "Ovozni yoqish" : "Ovozni o'chirish"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>

        {/* Dynamic Title Graphics - Pure Bold Typography Aesthetic */}
        <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center max-w-xl">
          <div className="text-zinc-500 font-black tracking-[0.6em] text-xs uppercase mb-3">CYBERNETIC SPEEDWAY</div>
          
          <h1 className="text-7xl md:text-8xl font-black italic tracking-tighter uppercase leading-none select-none relative pb-1">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-cyan-500 drop-shadow-[0_0_30px_rgba(34,211,238,0.4)]">
              KIBER
            </span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-pink-600 drop-shadow-[0_0_30px_rgba(255,0,127,0.4)]">
              POYGA
            </span>
          </h1>
          <p className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-[0.3em] mt-3 mb-8">
            FUTURISTIK REal-VAQT 3D NEON SIMULATORI
          </p>

          {/* Action buttons with custom scaling and glows */}
          <div className="w-full flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md">
            <button
              onClick={() => {
                audio.playClick();
                onStartGame();
              }}
              className="group relative w-full sm:w-1/2 overflow-hidden rounded-xl p-[1.5px] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl animate-spin-slow opacity-90 blur-[1px]" />
              <div className="relative bg-black text-white flex items-center justify-center gap-2 font-black py-4 px-6 rounded-xl transition hover:bg-black/90">
                <Play size={16} className="fill-cyan-400 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="uppercase tracking-widest font-sans font-black text-sm">
                  POYGANI BOSHLASH
                </span>
              </div>
            </button>

            <button
              onClick={() => {
                audio.playClick();
                onOpenGarage();
              }}
              className="w-full sm:w-1/2 py-4 px-6 rounded-xl bg-zinc-900 border border-white/10 text-white font-black hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-zinc-800 hover:scale-[1.01] active:scale-95 transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            >
              <HardDrive size={16} />
              <span>KIBER GARAJ</span>
            </button>
          </div>
        </div>

        {/* Dashboard Panels - Bento grid styled stats based precisely on Bold Typography */}
        <div className="relative z-10 w-full max-w-5xl grid grid-cols-2 lg:grid-cols-4 gap-6 mb-2 bg-zinc-900/60 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
          <div className="flex flex-col">
            <div className="text-[10px] uppercase tracking-[0.4em] text-cyan-400 mb-1">YUQORI REKORD</div>
            <div className="text-5xl font-black italic leading-none text-white font-sans">
              {stats.highScore}<span className="text-lg text-zinc-500 not-italic"> PTS</span>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-[10px] uppercase tracking-[0.4em] text-yellow-400 mb-1">BARCHA TANGALAR</div>
            <div className="text-5xl font-black italic leading-none text-yellow-400 font-sans">
              {stats.coins}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-[10px] uppercase tracking-[0.4em] text-pink-500 mb-1">MAKS. MASOFA</div>
            <div className="text-5xl font-black italic leading-none text-white font-sans">
              {stats.maxDistance}<span className="text-lg text-zinc-500 not-italic"> km</span>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-[10px] uppercase tracking-[0.4em] text-violet-400 mb-1">POYGALAR SONI</div>
            <div className="text-5xl font-black italic leading-none text-violet-400 font-sans">
              {stats.gamesPlayed}
            </div>
          </div>
        </div>

        {/* Quick Help Overlay */}
        <div className="relative z-10 text-[11px] font-mono text-zinc-500 text-center flex items-center gap-1.5 mt-2 select-none mb-1 uppercase tracking-wider">
          <Info size={12} className="text-cyan-400" />
          <span>BOSHQUV: WASD / STRELKALAR • SHIFT: TURBO • PROBEL: TORMOZ</span>
        </div>
      </div>
    );
  }

  if (gameState === 'PLAYING') {
    return (
      <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between pointer-events-none text-white font-sans select-none">
        
        {/* Top HUD indicators (Score / Speed / Distance / Powerups) */}
        <div className="flex justify-between items-start w-full">
          {/* Left Block telemetry indicators */}
          <div className="flex items-center gap-8 pointer-events-auto bg-black/90 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="flex flex-col">
              <div className="text-[10px] uppercase tracking-[0.4em] text-cyan-400 mb-0.5">BALL</div>
              <div className="text-5xl font-black italic leading-none text-white tracking-tighter">
                {score}
              </div>
            </div>

            <div className="h-10 w-px bg-white/10" />

            <div className="flex flex-col">
              <div className="text-[10px] uppercase tracking-[0.4em] text-pink-500 mb-0.5">MASOFA</div>
              <div className="text-4xl font-black italic leading-none text-zinc-100">
                {distance}<span className="text-xs text-zinc-500 not-italic"> km</span>
              </div>
            </div>

            <div className="h-10 w-px bg-white/10" />

            <div className="flex flex-col">
              <div className="text-[10px] uppercase tracking-[0.4em] text-emerald-400 mb-0.5">BOSQICH</div>
              <div className="text-3xl font-black italic leading-none text-emerald-400">
                Lvl {stageLevel} <span className="text-[10px] text-zinc-400 not-italic uppercase font-mono tracking-wider ml-1">({stageName})</span>
              </div>
            </div>

            {multiplier > 1 && (
              <>
                <div className="h-10 w-px bg-white/10" />
                <div className="flex items-center gap-1 animate-pulse">
                  <span className="text-[9px] font-black uppercase bg-pink-500 text-black px-2 py-1 rounded">
                    x{multiplier} TEZLIK BALL
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Active power-ups indicators (Triggered dynamic status-bars) */}
          <div className="flex flex-col gap-2 items-end max-w-[180px]">
            {turboActive && (
              <div className="w-full flex flex-col bg-black/90 border border-cyan-400/30 p-3 rounded-xl backdrop-blur-md">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-cyan-400 mb-1.5">
                  <span>TURBO AKTIV</span>
                  <Sparkles size={11} className="animate-spin text-cyan-400" />
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden p-[1px]">
                  <div
                    className="h-full bg-cyan-400 transition-all duration-100 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                    style={{ width: `${turboTimeRemaining * 100}%` }}
                  />
                </div>
              </div>
            )}

            {magnetActive && (
              <div className="w-full flex flex-col bg-black/90 border border-yellow-400/30 p-3 rounded-xl backdrop-blur-md">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-yellow-400 mb-1.5">
                  <span>MAGNET SHIELD</span>
                  <Coins size={11} className="animate-bounce text-yellow-400" />
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden p-[1px]">
                  <div
                    className="h-full bg-yellow-400 transition-all duration-100 rounded-full shadow-[0_0_8px_rgba(234,179,8,0.5)]"
                    style={{ width: `${magnetTimeRemaining * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Health and Coins stats right panel */}
          <div className="flex items-center gap-6 px-6 py-4 rounded-2xl bg-black/90 border border-white/10 backdrop-blur-md pointer-events-auto">
            {/* Gear Indicator precisely matching Theme */}
            <div className="flex items-end gap-3">
              <div className="flex flex-col items-center">
                <div className="w-14 h-16 bg-white text-black flex flex-col items-center justify-center rounded-t-lg">
                  <span className="text-[8px] uppercase font-black tracking-tighter">GEAR</span>
                  <span className="text-4xl font-black leading-none">{multiplier > 1 ? '5' : '3'}</span>
                </div>
                <div className="w-14 h-1 bg-pink-500"></div>
              </div>
            </div>

            <div className="h-10 w-px bg-white/10" />

            {/* Camera View Switcher */}
            <button
              onClick={() => {
                if (onChangeCameraView) onChangeCameraView();
              }}
              className="flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 hover:border-cyan-400 active:scale-95 transition-all text-white cursor-pointer w-20 h-[64px]"
              title="Kamerani uzgartirish (Hotkey: V yoki C)"
            >
              <Eye size={18} className={cameraView === 'cockpit' ? 'text-cyan-400 animate-pulse' : 'text-zinc-500'} />
              <span className="text-[7px] font-mono tracking-tighter uppercase font-black leading-none mt-1">
                {cameraView === 'cockpit' ? "Kabinadan" : "Tashqi"}
              </span>
              <span className="text-[5.5px] font-mono text-zinc-500 font-bold tracking-tighter uppercase leading-none mt-0.5">
                [V / C] KEY
              </span>
            </button>

            {/* Shield and Coins */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">TANGALAR</span>
                <span className="text-2xl font-black italic text-yellow-400 tabular-nums">{coinsCollected}</span>
              </div>
              
              <div className="flex items-center justify-between gap-4 border-t border-white/5 pt-1.5">
                <span className="text-[10px] uppercase tracking-[0.3em] text-cyan-400">QALQON</span>
                <div className="flex items-center gap-1">
                  {[...Array(maxShields)].map((_, i) => (
                    <Shield
                      key={i}
                      size={12}
                      className={`transition-all duration-300 ${
                        i < shieldCount
                          ? 'text-cyan-400 fill-cyan-400/40 drop-shadow-[0_0_4px_#22d3ee]'
                          : 'text-zinc-800'
                      }`}
                    />
                  ))}
                  {maxShields === 0 && (
                    <span className="text-[9px] font-mono text-zinc-500 uppercase">QALQONSIZ</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom indicators - Speed indicator display in center */}
        <div className="w-full flex justify-center items-end pb-24 md:pb-6">
          <div className="flex flex-col items-center p-4 bg-black/85 border border-white/10 rounded-2xl backdrop-blur-sm">
            <div className="text-[9px] font-bold uppercase tracking-[0.5em] text-cyan-400 mb-1">HAQIQIY TEZLIK / SPEED</div>
            <div className="text-6xl font-black italic tracking-tighter leading-none mb-1 text-white tabular-nums">
              {exactSpeed ?? (multiplier > 1 ? 248 : 156)} <span className="text-lg not-italic text-zinc-400 font-bold uppercase">km/h</span>
            </div>
            
            <div className="w-64 h-2 bg-zinc-800 rounded-full mt-2 overflow-hidden p-[1px]">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(5, ((exactSpeed ?? 90) / 320) * 100))}%` }}
              />
            </div>
          </div>
        </div>

      </div>
    );
  }

  if (gameState === 'GAMEOVER') {
    const isNewRecord = score > stats.highScore;

    return (
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 bg-[#050505]/95 text-white select-none font-sans overflow-y-auto">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <div className="relative z-10 w-full max-w-lg bg-zinc-900/60 border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center backdrop-blur-lg shadow-[0_20px_100px_rgba(239,68,68,0.1)]">
          
          <div className="w-16 h-16 rounded-2xl bg-rose-950 text-rose-500 border border-rose-500/20 flex items-center justify-center mb-4 animate-pulse">
            <VolumeX size={32} />
          </div>

          <h2 className="text-5xl font-black uppercase tracking-tighter text-rose-500 mb-1">
            POYGA TUGADI!
          </h2>
          <p className="text-xs font-mono font-bold text-zinc-500 mb-6 uppercase tracking-[0.3em]">
            SHOSSE TO'QNASHUVI
          </p>

          {isNewRecord && (
            <div className="flex flex-col items-center mb-6 px-6 py-2.5 rounded-xl bg-yellow-500/20 border border-yellow-400 animate-bounce">
              <span className="flex items-center gap-1.5 text-xs text-yellow-400 font-black uppercase tracking-widest">
                <Sparkles size={14} />
                YANGI YUQORI REKORD!
              </span>
            </div>
          )}

          {/* Score details grid - Telemetry Style */}
          <div className="w-full grid grid-cols-3 gap-6 bg-black border border-white/5 p-5 rounded-2xl mb-8 font-sans">
            <div className="flex flex-col items-start">
              <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">BALL</span>
              <span className="text-4xl font-black italic text-white mt-1">{score}</span>
            </div>
            
            <div className="flex flex-col items-start border-x border-white/10 px-4">
              <span className="text-[10px] text-pink-500 uppercase tracking-widest font-bold">MASOFA</span>
              <span className="text-4xl font-black italic text-pink-500 mt-1">{distance} km</span>
            </div>

            <div className="flex flex-col items-start">
              <span className="text-[10px] text-yellow-400 uppercase tracking-widest font-bold">TANGALAR</span>
              <span className="text-4xl font-black italic text-yellow-400 mt-1">{coinsCollected}</span>
            </div>
          </div>

          {/* Action controls */}
          <div className="w-full space-y-4">
            <button
              onClick={() => {
                audio.playClick();
                onStartGame();
              }}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 text-black font-black hover:brightness-110 active:scale-[0.98] transition-all uppercase tracking-widest cursor-pointer shadow-[0_4px_20px_rgba(34,211,238,0.3)] text-sm"
            >
              YANA BOSHLASH
            </button>

            <button
              onClick={() => {
                audio.playClick();
                onBackToMenu();
              }}
              className="w-full py-4 px-6 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 font-black hover:text-white hover:border-white/20 active:scale-95 transition-all uppercase tracking-wider cursor-pointer text-sm"
            >
              BOSH SAHIFAGA
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
