import React from 'react';
import { ArrowLeft, ArrowRight, Skull, Zap } from 'lucide-react';

interface ControlsOverlayProps {
  onPressLeft: (active: boolean) => void;
  onPressRight: (active: boolean) => void;
  onPressBrake: (active: boolean) => void;
  onPressGas: (active: boolean) => void;
  hasTurboAvailable: boolean;
}

export const ControlsOverlay: React.FC<ControlsOverlayProps> = ({
  onPressLeft,
  onPressRight,
  onPressBrake,
  onPressGas,
  hasTurboAvailable
}) => {
  return (
    <div className="absolute inset-x-0 bottom-4 z-15 flex justify-between items-end p-4 pointer-events-none select-none font-sans">
      
      {/* Left Steering Block (Steer left and steer right) */}
      <div className="flex gap-4 pointer-events-auto">
        {/* Left Arrow Button */}
        <button
          onMouseDown={() => onPressLeft(true)}
          onMouseUp={() => onPressLeft(false)}
          onMouseLeave={() => onPressLeft(false)}
          onTouchStart={(e) => { e.preventDefault(); onPressLeft(true); }}
          onTouchEnd={(e) => { e.preventDefault(); onPressLeft(false); }}
          className="w-16 h-16 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-cyan-400 active:bg-cyan-500 active:text-slate-950 flex items-center justify-center cursor-pointer select-none shadow-[0_4px_12px_rgba(0,0,0,0.5)] active:shadow-[0_0_15px_#00f0ff] transition-all"
          title="Chapga burilish"
        >
          <ArrowLeft size={28} />
        </button>

        {/* Right Arrow Button */}
        <button
          onMouseDown={() => onPressRight(true)}
          onMouseUp={() => onPressRight(false)}
          onMouseLeave={() => onPressRight(false)}
          onTouchStart={(e) => { e.preventDefault(); onPressRight(true); }}
          onTouchEnd={(e) => { e.preventDefault(); onPressRight(false); }}
          className="w-16 h-16 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-cyan-400 active:bg-cyan-500 active:text-slate-950 flex items-center justify-center cursor-pointer select-none shadow-[0_4px_12px_rgba(0,0,0,0.5)] active:shadow-[0_0_15px_#00f0ff] transition-all"
          title="O'ngga burilish"
        >
          <ArrowRight size={28} />
        </button>
      </div>

      {/* Right Pedal Block (Brake and Gas/Turbo Boost) */}
      <div className="flex gap-4 pointer-events-auto">
        {/* Brake Button (Slowing down red button) */}
        <button
          onMouseDown={() => onPressBrake(true)}
          onMouseUp={() => onPressBrake(false)}
          onMouseLeave={() => onPressBrake(false)}
          onTouchStart={(e) => { e.preventDefault(); onPressBrake(true); }}
          onTouchEnd={(e) => { e.preventDefault(); onPressBrake(false); }}
          className="w-16 h-16 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-rose-500/20 text-rose-500 active:bg-rose-500 active:text-slate-950 flex flex-col items-center justify-center gap-0.5 cursor-pointer select-none shadow-[0_4px_12px_rgba(0,0,0,0.5)] active:shadow-[0_0_15px_#f43f5e] transition-all"
          title="Tormoz (Tezlikni pasaytirish)"
        >
          <Skull size={20} />
          <span className="text-[9px] font-black tracking-widest uppercase">TORMOZ</span>
        </button>

        {/* Gas / Speed up button / Turbo trigger */}
        <button
          onMouseDown={() => onPressGas(true)}
          onMouseUp={() => onPressGas(false)}
          onMouseLeave={() => onPressGas(false)}
          onTouchStart={(e) => { e.preventDefault(); onPressGas(true); }}
          onTouchEnd={(e) => { e.preventDefault(); onPressGas(false); }}
          className={`w-16 h-16 rounded-2xl bg-slate-950/80 backdrop-blur-md border ${
            hasTurboAvailable 
              ? 'border-yellow-400 text-yellow-400 active:bg-yellow-400 active:text-slate-950 shadow-[0_0_10px_rgba(234,179,8,0.3)]' 
              : 'border-emerald-500/30 text-emerald-400 active:bg-emerald-500 active:text-slate-950'
          } flex flex-col items-center justify-center gap-0.5 cursor-pointer select-none shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all`}
          title="Tezlash / Gaz berish"
        >
          <Zap size={22} className={hasTurboAvailable ? 'animate-bounce' : ''} />
          <span className="text-[9px] font-black tracking-widest uppercase">{hasTurboAvailable ? 'TURBO' : 'GAZ'}</span>
        </button>
      </div>

    </div>
  );
};
