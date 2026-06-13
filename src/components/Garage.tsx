import React from 'react';
import { PlayerStats, Skin, Upgrades } from '../types';
import { Shield, Zap, Sparkles, Navigation, Coins, ArrowLeft, CheckCircle } from 'lucide-react';
import { audio } from '../utils/audio';

interface GarageProps {
  stats: PlayerStats;
  onUpdateStats: (newStats: PlayerStats) => void;
  onBack: () => void;
}

export const SKINS: Skin[] = [
  {
    id: 'cyber_blue',
    name: '1967 Shelby Mustang GT500',
    color: '#ffffff',
    price: 0,
    speedBonus: 0,
    handlingBonus: 0,
    description: 'Klassik oq rangli va qora chiziqli dabdabali afsona - 1967-yilgi Shelby Mustang GT500 V8!'
  },
  {
    id: 'toxic_green',
    name: 'Tesla Cybertruck EV',
    color: '#39ff14',
    price: 250,
    speedBonus: 5,
    handlingBonus: 5,
    description: 'Zirhlangan, zaharli yashil chiziqli va katta g\'ildirakli Cybertruck poygachisi.'
  },
  {
    id: 'hot_pink',
    name: 'Ferrari Cyber F1',
    color: '#ff007f',
    price: 500,
    speedBonus: 10,
    handlingBonus: 5,
    description: 'Uzun havo so\'rgichli, yorqin pushti Formula dizaynidagi olovli Ferrari raketa.'
  },
  {
    id: 'sun_gold',
    name: 'Bugatti Chiron Royale',
    color: '#ffd700',
    price: 1000,
    speedBonus: 15,
    handlingBonus: 15,
    description: 'Oltin rangli, 6 g\'ildirakli dabdabali Bugatti hyper-kruizeri.'
  },
  {
    id: 'laser_violet',
    name: 'Lambo Terzo Millennio',
    color: '#b000ff',
    price: 1800,
    speedBonus: 20,
    handlingBonus: 20,
    description: 'O\'tkir burchakli binafsha kiber-giperkar modeli - Lamborghini Terzo.'
  },
  {
    id: 'asphalt_fury',
    name: 'BMW M8 GTR Demolition',
    color: '#ff2a00',
    price: 3000,
    speedBonus: 28,
    handlingBonus: 15,
    description: 'Zirhli kassa, old po\'lat bamper va og\'ir kuchga ega BMW tezyurar tank-kruizer.'
  },
  {
    id: 'stellar_shadow',
    name: 'Porsche Mission Fly UFO',
    color: '#00ffcc',
    price: 5000,
    speedBonus: 38,
    handlingBonus: 35,
    description: 'G\'ildiraksiz super uchar likopcha mexanikali, havoda suzuvchi poyga Porschesi.'
  }
];

export const Garage: React.FC<GarageProps> = ({ stats, onUpdateStats, onBack }) => {
  const selectSkin = (skin: Skin) => {
    audio.playClick();
    if (stats.purchasedSkins.includes(skin.id)) {
      onUpdateStats({
        ...stats,
        selectedSkin: skin.id
      });
    } else {
      // Purchase skin
      if (stats.coins >= skin.price) {
        onUpdateStats({
          ...stats,
          coins: stats.coins - skin.price,
          purchasedSkins: [...stats.purchasedSkins, skin.id],
          selectedSkin: skin.id
        });
        audio.playPowerup();
      } else {
        // Can't afford sound
        audio.playCrash();
      }
    }
  };

  const upgradeStat = (key: keyof Upgrades, cost: number) => {
    audio.playClick();
    const maxLevel = key === 'shield' ? 2 : 5;
    if (stats.coins >= cost && stats.upgrades[key] < maxLevel) {
      const nextUpgrades = { ...stats.upgrades };
      nextUpgrades[key] += 1;

      onUpdateStats({
        ...stats,
        coins: stats.coins - cost,
        upgrades: nextUpgrades
      });
      audio.playPowerup();
    } else {
      audio.playCrash(); // Alert can't afford / maxed out
    }
  };

  // Cost function for upgrades (increases exponentially: e.g. 50, 100, 200, 400, 800)
  const getUpgradeCost = (currentLvl: number, key?: keyof Upgrades) => {
    const maxLevel = key === 'shield' ? 2 : 5;
    if (currentLvl >= maxLevel) return 0;
    return 50 * Math.pow(2, currentLvl);
  };

  return (
    <div className="absolute inset-0 bg-[#050505] text-white flex flex-col p-8 overflow-y-auto select-none font-sans">
      {/* Decorative backdrop grid overlay from theme */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 max-w-5xl mx-auto w-full border-b border-white/10 pb-6">
        <button
          onClick={() => {
            audio.playClick();
            onBack();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 hover:border-cyan-400 hover:text-cyan-400 cursor-pointer transition-colors text-xs font-bold uppercase tracking-wider"
        >
          <ArrowLeft size={14} />
          <span>Orqaga</span>
        </button>

        <div className="text-center sm:text-left">
          <div className="text-[10px] uppercase tracking-[0.4em] text-cyan-400 mb-0.5">TUNING & UPGRADES</div>
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase leading-none">
            KIBER GARAJ
          </h1>
        </div>

        <div className="flex items-center gap-2 bg-zinc-900 px-4 py-2.5 rounded-xl border border-yellow-500/30">
          <Coins className="text-yellow-400 animate-pulse" size={16} />
          <span className="font-sans font-black text-lg text-yellow-400">{stats.coins}</span>
          <span className="text-[9px] uppercase tracking-wider text-yellow-500 font-bold">TANGALAR</span>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full flex-grow pb-12">
        {/* Left column: Upgrades */}
        <div className="space-y-6">
          <div className="text-[10px] uppercase tracking-[0.4em] text-cyan-400 mb-2 font-bold">PERFORMANCE TUNING</div>
          <h2 className="text-2xl font-black italic tracking-tight text-white uppercase">
            TEXNIK YANGILANISHLAR
          </h2>

          {/* Dvigatel - Engine */}
          <div className="bg-zinc-900 p-5 rounded-2xl border border-white/10 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-black text-cyan-400 border border-white/5">
                  <Zap size={20} />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-sm uppercase tracking-wide">Dvigatel (Tezlik)</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Maksimal tezlikni oshirish: +5% har daraja</p>
                </div>
              </div>
              <span className="text-xs font-black bg-zinc-800 text-cyan-400 py-1 px-2.5 rounded-lg border border-white/5 uppercase">Daraja: {stats.upgrades.engine}/5</span>
            </div>
            
            <div className="flex gap-1.5 h-3 bg-black p-0.5 rounded-full border border-white/5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-300 ${
                    i < stats.upgrades.engine
                      ? 'bg-gradient-to-r from-cyan-400 to-cyan-500 shadow-[0_0_8px_#00f0ff]'
                      : 'bg-zinc-800'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Maks. {100 + stats.upgrades.engine * 5}% imkoniyat</span>
              {stats.upgrades.engine < 5 ? (
                <button
                  onClick={() => upgradeStat('engine', getUpgradeCost(stats.upgrades.engine))}
                  disabled={stats.coins < getUpgradeCost(stats.upgrades.engine)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    stats.coins >= getUpgradeCost(stats.upgrades.engine)
                      ? 'bg-cyan-400 text-black hover:bg-cyan-300 hover:scale-[1.03]'
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5'
                  }`}
                >
                  <Coins size={12} />
                  <span>{getUpgradeCost(stats.upgrades.engine)}</span>
                </button>
              ) : (
                <span className="text-xs font-black text-emerald-400 uppercase tracking-widest bg-emerald-900/10 px-2 py-1 rounded border border-emerald-500/20">Maksimal</span>
              )}
            </div>
          </div>

          {/* Boshqaruv - Handling */}
          <div className="bg-zinc-900 p-5 rounded-2xl border border-white/10 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-black text-pink-500 border border-white/5">
                  <Navigation size={20} className="rotate-90" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-sm uppercase tracking-wide">Boshqaruv (Rul)</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Tez burilishlar va ravon burilish kuchi</p>
                </div>
              </div>
              <span className="text-xs font-black bg-zinc-800 text-pink-500 py-1 px-2.5 rounded-lg border border-white/5 uppercase">Daraja: {stats.upgrades.handling}/5</span>
            </div>

            <div className="flex gap-1.5 h-3 bg-black p-0.5 rounded-full border border-white/5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-300 ${
                    i < stats.upgrades.handling
                      ? 'bg-gradient-to-r from-pink-500 to-pink-600 shadow-[0_0_8px_#ff007f]'
                      : 'bg-zinc-800'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Burilish tezligi: +15% har daraja</span>
              {stats.upgrades.handling < 5 ? (
                <button
                  onClick={() => upgradeStat('handling', getUpgradeCost(stats.upgrades.handling))}
                  disabled={stats.coins < getUpgradeCost(stats.upgrades.handling)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    stats.coins >= getUpgradeCost(stats.upgrades.handling)
                      ? 'bg-pink-500 text-black hover:bg-pink-400 hover:scale-[1.03]'
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5'
                  }`}
                >
                  <Coins size={12} />
                  <span>{getUpgradeCost(stats.upgrades.handling)}</span>
                </button>
              ) : (
                <span className="text-xs font-black text-emerald-400 uppercase tracking-widest bg-emerald-900/10 px-2 py-1 rounded border border-emerald-500/20">Maksimal</span>
              )}
            </div>
          </div>

          {/* Qalqon - Shield */}
          <div className="bg-zinc-900 p-5 rounded-2xl border border-white/10 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-black text-emerald-400 border border-white/5">
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-sm uppercase tracking-wide">Energetik Qalqon</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">To'qnashuvdan himoyalovchi qo'shimcha qalqon</p>
                </div>
              </div>
              <span className="text-xs font-black bg-zinc-800 text-emerald-400 py-1 px-2.5 rounded-lg border border-white/5 uppercase">Daraja: {stats.upgrades.shield}/2</span>
            </div>

            <div className="flex gap-1.5 h-3 bg-black p-0.5 rounded-full border border-white/5">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-300 ${
                    i < stats.upgrades.shield
                      ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-[0_0_8px_#10b981]'
                      : 'bg-zinc-800'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Maks. zarb energiyasi: {stats.upgrades.shield} marta</span>
              {stats.upgrades.shield < 2 ? (
                <button
                  onClick={() => upgradeStat('shield', getUpgradeCost(stats.upgrades.shield, 'shield'))}
                  disabled={stats.coins < getUpgradeCost(stats.upgrades.shield, 'shield')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    stats.coins >= getUpgradeCost(stats.upgrades.shield, 'shield')
                      ? 'bg-emerald-400 text-black hover:bg-emerald-300 hover:scale-[1.03]'
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5'
                  }`}
                >
                  <Coins size={12} />
                  <span>{getUpgradeCost(stats.upgrades.shield, 'shield')}</span>
                </button>
              ) : (
                <span className="text-xs font-black text-emerald-400 uppercase tracking-widest bg-emerald-900/10 px-2 py-1 rounded border border-emerald-500/20">Maksimal</span>
              )}
            </div>
          </div>

          {/* Magnet - Coin Magnet */}
          <div className="bg-zinc-900 p-5 rounded-2xl border border-white/10 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-black text-yellow-500 border border-white/5">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-sm uppercase tracking-wide">Kvant Magniti</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Uzoqroqdagi oltin tangalarni tortib olish kuchi</p>
                </div>
              </div>
              <span className="text-xs font-black bg-zinc-800 text-yellow-400 py-1 px-2.5 rounded-lg border border-white/5 uppercase">Daraja: {stats.upgrades.magnet}/5</span>
            </div>

            <div className="flex gap-1.5 h-3 bg-black p-0.5 rounded-full border border-white/5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-300 ${
                    i < stats.upgrades.magnet
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-[0_0_8px_#f59e0b]'
                      : 'bg-zinc-800'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Zararli radius: +{stats.upgrades.magnet * 3} kiber-metr</span>
              {stats.upgrades.magnet < 5 ? (
                <button
                  onClick={() => upgradeStat('magnet', getUpgradeCost(stats.upgrades.magnet))}
                  disabled={stats.coins < getUpgradeCost(stats.upgrades.magnet)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    stats.coins >= getUpgradeCost(stats.upgrades.magnet)
                      ? 'bg-yellow-400 text-black hover:bg-yellow-300 hover:scale-[1.03]'
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5'
                  }`}
                >
                  <Coins size={12} />
                  <span>{getUpgradeCost(stats.upgrades.magnet)}</span>
                </button>
              ) : (
                <span className="text-xs font-black text-emerald-400 uppercase tracking-widest bg-emerald-950/20 px-2 py-1 rounded border border-emerald-500/20">Maksimal</span>
              )}
            </div>
          </div>
        </div>

        {/* Right column: Skins Store */}
        <div className="space-y-6">
          <div className="text-[10px] uppercase tracking-[0.4em] text-pink-500 mb-2 font-bold">HOLOGRAPHIC HULLS</div>
          <h2 className="text-2xl font-black italic tracking-tight text-white uppercase">
            MASHINALAR DO'KONI
          </h2>

          <div className="space-y-4">
            {SKINS.map((skin) => {
              const isPurchased = stats.purchasedSkins.includes(skin.id);
              const isSelected = stats.selectedSkin === skin.id;

              return (
                <div
                  key={skin.id}
                  onClick={() => selectSkin(skin)}
                  className={`group relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'bg-zinc-900 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.15)] scale-[1.01]'
                      : 'bg-zinc-900/40 border-white/10 hover:border-white/20 hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Glowing color block representing style */}
                    <div
                      className="w-14 h-14 rounded-xl border border-white/10 flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: `${skin.color}15`,
                        boxShadow: `inset 0 0 12px ${skin.color}40`,
                        borderColor: `${skin.color}50`
                      }}
                    >
                      {/* Stylized tiny abstract car shape */}
                      <div
                        className="w-7 h-5 rounded"
                        style={{
                          backgroundColor: skin.color,
                          boxShadow: `0 0 10px ${skin.color}`
                        }}
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-white text-base uppercase tracking-wide group-hover:text-cyan-400 transition-colors">
                          {skin.name}
                        </h4>
                        {isSelected && (
                          <span className="flex items-center text-[8px] font-black uppercase bg-cyan-950 text-cyan-400 border border-cyan-400/20 px-2 py-0.5 rounded">
                            TANLANGAN
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 max-w-[280px] leading-relaxed mt-1">
                        {skin.description}
                      </p>
                      
                      {/* Mini stats badges */}
                      <div className="flex gap-2 mt-2.5">
                        {skin.speedBonus > 0 && (
                          <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded uppercase tracking-wider">
                            Tezlik: +{skin.speedBonus}%
                          </span>
                        )}
                        {skin.handlingBonus > 0 && (
                          <span className="text-[10px] font-bold text-pink-500 bg-pink-950/40 px-2 py-0.5 rounded uppercase tracking-wider">
                            Rul: +{skin.handlingBonus}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="w-full sm:w-auto self-end sm:self-center">
                    {isSelected ? (
                      <CheckCircle className="text-cyan-400 hidden sm:block" size={24} />
                    ) : isPurchased ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          selectSkin(skin);
                        }}
                        className="w-full sm:w-auto text-xs font-black bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2.5 rounded-xl border border-white/10 hover:border-white/20 transition-colors uppercase tracking-widest cursor-pointer"
                      >
                        TANLASH
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          selectSkin(skin);
                        }}
                        disabled={stats.coins < skin.price}
                        className={`w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black transition-all border ${
                          stats.coins >= skin.price
                            ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black border-yellow-400 hover:brightness-110 cursor-pointer'
                            : 'bg-zinc-950 text-zinc-500 border-white/5 cursor-not-allowed'
                        }`}
                      >
                        <Coins size={12} />
                        <span>{skin.price}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
