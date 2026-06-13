import { useState, useEffect, useRef } from 'react';
import { GameState, PlayerStats } from './types';
import { ThreeCanvas } from './components/ThreeCanvas';
import { GameUI } from './components/GameUI';
import { Garage, SKINS } from './components/Garage';
import { ControlsOverlay } from './components/ControlsOverlay';
import { audio } from './utils/audio';

const STORAGE_KEY = 'cyber_racer_player_stats';

const defaultStats: PlayerStats = {
  coins: 100, // head-start for immediately buying a custom upgrade/skin
  highScore: 0,
  maxDistance: 0,
  gamesPlayed: 0,
  selectedSkin: 'cyber_blue',
  purchasedSkins: ['cyber_blue'],
  upgrades: {
    engine: 0,
    handling: 0,
    shield: 0,
    magnet: 0
  }
};

export default function App() {
  const [gameState, setGameState] = useState<GameState>('MENU');
  const [stats, setStats] = useState<PlayerStats>(defaultStats);
  const [isMuted, setIsMuted] = useState(false);

  // Active game indicators and Stage telemetry
  const [score, setScore] = useState(0);
  const [distance, setDistance] = useState(0);
  const [coinsCollected, setCoinsCollected] = useState(0);
  const [exactSpeed, setExactSpeed] = useState(90);
  const [stageLevel, setStageLevel] = useState(1);
  const [startThemeOffset, setStartThemeOffset] = useState(0);
  const [showStageUpNotification, setShowStageUpNotification] = useState<string | null>(null);

  const getStageFromDistance = (dist: number) => {
    // Exactly 600m per stage level (e.g. Lvl 1 under 600, Lvl 2 under 1200, etc.) up to peak stage level 8
    const level = Math.min(8, Math.floor(dist / 600) + 1);
    const names = [
      "Kunduzgi Ochiq Magistral",
      "Oshnolik Quyosh Botishi",
      "Tungi O‘tish Yo‘li",
      "Zaharli Kiber Hudud",
      "Muzlagan Alp Dovoni",
      "Tilla Qum Kanyon Yo‘li",
      "Plazma Toʻlqini Olov Yo‘li",
      "Koinotning Cheksiz Matrixi"
    ];
    return { level, name: names[level - 1] };
  };

  // Power-ups state tracking
  const [cameraView, setCameraView] = useState<'chase' | 'cockpit'>('chase');
  const [shieldCount, setShieldCount] = useState(0);
  const [maxShields, setMaxShields] = useState(0);
  
  const [turboActive, setTurboActive] = useState(false);
  const [magnetActive, setMagnetActive] = useState(false);
  
  const [turboTimeRemaining, setTurboTimeRemaining] = useState(1);
  const [magnetTimeRemaining, setMagnetTimeRemaining] = useState(1);

  // Keyboard and Mobile Controls Shared Ref to feed directly to the Three.js tick loop without React lag
  const controlsRef = useRef({
    left: false,
    right: false,
    brake: false,
    gas: false
  });

  // Track invulnerability frames after hit to avoid instant multiple-lives deletion
  const [isInvulnerable, setIsInvulnerable] = useState(false);

  // 1. Initial State Load from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const loadedShield = Math.min(2, parsed.upgrades?.shield ?? 0);
        setStats({
          ...defaultStats,
          ...parsed,
          upgrades: {
            ...defaultStats.upgrades,
            ...(parsed.upgrades || {}),
            shield: loadedShield
          },
          purchasedSkins: parsed.purchasedSkins || ['cyber_blue']
        });
      }
    } catch (e) {
      console.warn("Could not load stats from localStorage", e);
    }
    
    // Set audio mute status match
    setIsMuted(audio.getMuteStatus());
  }, []);

  // Save changes helper
  const saveStats = (newStats: PlayerStats) => {
    setStats(newStats);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newStats));
    } catch (e) {
      console.warn("Could not save stats to localStorage", e);
    }
  };

  // Keyboard Event Binding
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid steering key-binding overrides during settings/forms editing
      if (gameState !== 'PLAYING') return;

      const key = e.key.toLowerCase();
      if (key === 'a' || key === 'arrowleft') controlsRef.current.left = true;
      if (key === 'd' || key === 'arrowright') controlsRef.current.right = true;
      if (key === 's' || key === 'arrowdown' || key === ' ') {
        controlsRef.current.brake = true;
        e.preventDefault(); // Stop scroll
      }
      if (key === 'w' || key === 'arrowup' || key === 'shift') {
        controlsRef.current.gas = true;
      }
      if (key === 'v' || key === 'c') {
        setCameraView(prev => prev === 'chase' ? 'cockpit' : 'chase');
        audio.playClick();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'a' || key === 'arrowleft') controlsRef.current.left = false;
      if (key === 'd' || key === 'arrowright') controlsRef.current.right = false;
      if (key === 's' || key === 'arrowdown' || key === ' ') controlsRef.current.brake = false;
      if (key === 'w' || key === 'arrowup' || key === 'shift') controlsRef.current.gas = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  // Powerups duration decays
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const interval = setInterval(() => {
      if (turboActive) {
        setTurboTimeRemaining((prev) => {
          if (prev <= 0.01) {
            setTurboActive(false);
            controlsRef.current.gas = false; // Turn off gas override
            return 1;
          }
          return prev - 0.02;
        });
      }

      if (magnetActive) {
        setMagnetTimeRemaining((prev) => {
          if (prev <= 0.01) {
            setMagnetActive(false);
            return 1;
          }
          return prev - 0.02;
        });
      }
    }, 150);

    return () => clearInterval(interval);
  }, [gameState, turboActive, magnetActive]);

  // 2. Start Game Logic
  const handleStartGame = () => {
    audio.playClick();
    audio.startMusic();

    // Reset parameters
    setScore(0);
    setDistance(0);
    setCoinsCollected(0);
    setExactSpeed(90);
    setTurboActive(false);
    setMagnetActive(false);
    setTurboTimeRemaining(1);
    setMagnetTimeRemaining(1);
    setIsInvulnerable(false);
    
    // Choose random startup theme offset and reset stage
    setStartThemeOffset(Math.floor(Math.random() * 8));
    setStageLevel(1);
    setShowStageUpNotification(null);

    // Initial shield amount maps to current purchased shield upgrade lvl
    const startingShields = stats.upgrades.shield;
    setShieldCount(startingShields);
    setMaxShields(startingShields);

    // Enter active state
    setGameState('PLAYING');

    // Trigger synthetic loop starter event triggers for controls (to prevent key sticky holdovers)
    controlsRef.current = { left: false, right: false, brake: false, gas: false };
  };

  // 3. Collision Logic
  const handleCollision = () => {
    if (isInvulnerable) return; // ignore hit to avoid multi-clash instant deaths

    if (shieldCount > 0) {
      // Substract shield charge
      setShieldCount((prev) => prev - 1);
      
      // Flash red frame / dynamic indicator warning feedback
      setIsInvulnerable(true);
      setTimeout(() => {
        setIsInvulnerable(false);
      }, 1200); // 1.2s safety shield recovery

    } else {
      // NO Shields left: GAME OVER!
      audio.stopMusic();
      setGameState('GAMEOVER');

      // Update and write stats - plus bonus coins calculated by score so wallet grows over 100!
      const bonusCoins = Math.floor(score / 40);
      const nextHighScore = Math.max(stats.highScore, score);
      const nextMaxDistance = Math.max(stats.maxDistance, distance);
      const nextCoins = stats.coins + coinsCollected + bonusCoins;

      saveStats({
        ...stats,
        coins: nextCoins,
        highScore: nextHighScore,
        maxDistance: nextMaxDistance,
        gamesPlayed: stats.gamesPlayed + 1
      });
    }
  };

  // 4. Coin Collect/Powerup Picked up Logic
  const handleCoinCollected = (type: 'gold' | 'shield_powerup' | 'turbo_powerup') => {
    if (type === 'gold') {
      // Standard gold coin. Turbo doubles coin intake!
      const bonus = turboActive ? 2 : 1;
      setCoinsCollected((prev) => prev + bonus);
    } else if (type === 'shield_powerup') {
      audio.playPowerup();
      // Restore shield point up to upgraded maximum capacity, capped strictly at 2
      setShieldCount((prev) => Math.min(2, maxShields, prev + 1));
    } else if (type === 'turbo_powerup') {
      audio.playPowerup();
      // Activate hyper-speed turbo gas simulator override
      setTurboActive(true);
      setTurboTimeRemaining(1);
      controlsRef.current.gas = true; // Auto accelerate
    }
  };

  const handleScoreTick = (scoreIncrement: number, distanceIncrement: number, currentSpeed: number) => {
    setScore((prev) => prev + scoreIncrement);
    setDistance((prev) => {
      const nextDist = prev + distanceIncrement;
      
      const oldStage = getStageFromDistance(prev);
      const newStage = getStageFromDistance(nextDist);
      if (newStage.level > oldStage.level) {
        audio.playPowerup();
        setShowStageUpNotification(newStage.name);
        setStageLevel(newStage.level);
        setTimeout(() => {
          setShowStageUpNotification(null);
        }, 3000);
      }
      return nextDist;
    });
    setExactSpeed(Math.round(currentSpeed));
  };

  const handleMuteToggle = () => {
    const isMutedNow = audio.toggleMute();
    setIsMuted(isMutedNow);
  };

  // Custom on-screen Mobile control event maps
  const handlePressLeft = (active: boolean) => {
    controlsRef.current.left = active;
  };

  const handlePressRight = (active: boolean) => {
    controlsRef.current.right = active;
  };

  const handlePressBrake = (active: boolean) => {
    controlsRef.current.brake = active;
  };

  const handlePressGas = (active: boolean) => {
    // If turbo powerup is active, force override remains true
    if (turboActive) {
      controlsRef.current.gas = true;
    } else {
      controlsRef.current.gas = active;
    }
  };

  // Find physical color coordinates of selected vehicle skin
  const currentSkin = SKINS.find(s => s.id === stats.selectedSkin) || SKINS[0];
  const currentRoadThemeIndex = (startThemeOffset + stageLevel - 1) % 8;

  return (
    <main className="relative w-screen h-screen bg-slate-950 overflow-hidden font-sans">
      
      {/* Visual background CRT/scanline cyber overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none border-[3px] border-slate-900/10 shadow-[inner_0_0_80px_rgba(0,0,0,0.3)] bg-[radial-gradient(rgba(18,24,38,0)_60%,rgba(2,4,10,0.6)_100%)]" />

      {/* Screen hit flashing element (Invulnerability shield active/red indicator) */}
      {isInvulnerable && (
        <div className="absolute inset-0 z-30 pointer-events-none border-[12px] md:border-[20px] border-cyan-400/40 animate-pulse bg-cyan-400/5" />
      )}

      {/* 3D WebGL Canvas Layer */}
      <ThreeCanvas
        isPlaying={gameState === 'PLAYING'}
        selectedSkinColor={currentSkin.color}
        selectedSkinId={stats.selectedSkin}
        upgrades={stats.upgrades}
        onCoinCollected={handleCoinCollected}
        onObstacleCrash={handleCollision}
        onScoreTick={handleScoreTick}
        controlsRef={controlsRef}
        roadThemeIndex={currentRoadThemeIndex}
        stageLevel={stageLevel}
        shieldCount={shieldCount}
        cameraView={cameraView}
      />

      {/* Primary HUD overlaid UI Layer */}
      <GameUI
        gameState={gameState}
        score={score}
        distance={distance}
        coinsCollected={coinsCollected}
        multiplier={turboActive ? 2 : 1}
        shieldCount={shieldCount}
        maxShields={maxShields}
        turboActive={turboActive}
        magnetActive={magnetActive}
        turboTimeRemaining={turboTimeRemaining}
        magnetTimeRemaining={magnetTimeRemaining}
        stats={stats}
        isMuted={isMuted}
        onMuteToggle={handleMuteToggle}
        onStartGame={handleStartGame}
        onOpenGarage={() => setGameState('GARAGE')}
        onBackToMenu={() => setGameState('MENU')}
        exactSpeed={exactSpeed}
        stageLevel={stageLevel}
        stageName={getStageFromDistance(distance).name}
        cameraView={cameraView}
        onChangeCameraView={() => {
          audio.playClick();
          setCameraView(prev => prev === 'chase' ? 'cockpit' : 'chase');
        }}
      />

      {/* Dynamic Bosqich Yangilandi (Level Up) corner indicator */}
      {showStageUpNotification && (
        <div className="absolute top-[152px] left-4 md:left-8 z-50 pointer-events-none select-none animate-stage-toast-left">
          <div className="bg-zinc-950/95 border border-emerald-500/30 border-l-4 border-l-emerald-400 p-4 rounded-r-xl rounded-l-sm shadow-[0_4px_30px_rgba(16,185,129,0.25)] flex items-center gap-3.5 max-w-sm backdrop-blur-md">
            {/* Glowing neon green active indicator */}
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-950/80 border border-emerald-400/50">
              <span className="text-emerald-400 font-bold text-sm animate-pulse">▲</span>
              <span className="absolute inline-flex h-full w-full rounded-lg bg-emerald-400/10 animate-ping opacity-75"></span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-[9px] font-mono font-bold tracking-[0.3em] text-emerald-400 uppercase leading-none mb-1">
                YANGI BOSQICHGA O'TDINGIZ!
              </span>
              <h2 className="text-base font-black italic text-white uppercase tracking-wide leading-tight">
                {showStageUpNotification}
              </h2>
              <span className="text-[8px] font-mono text-zinc-400 mt-0.5 leading-none">
                TEZLIK VA MULTIPLIER MULTI-OSHIQLIGI ▲
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Sub-view: Upgrades and Skins Store (Garaj) */}
      {gameState === 'GARAGE' && (
        <Garage
          stats={stats}
          onUpdateStats={saveStats}
          onBack={() => setGameState('MENU')}
        />
      )}

      {/* On-screen touch layout handles for mobiles / pads */}
      {gameState === 'PLAYING' && (
        <ControlsOverlay
          onPressLeft={handlePressLeft}
          onPressRight={handlePressRight}
          onPressBrake={handlePressBrake}
          onPressGas={handlePressGas}
          hasTurboAvailable={turboActive}
        />
      )}

    </main>
  );
}
