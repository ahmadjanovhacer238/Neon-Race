export interface Upgrades {
  engine: number; // Max speed multiplier
  handling: number; // Lateral movement speed multiplier
  shield: number; // Maximum shield charges (0-3)
  magnet: number; // Distance in units for coin attraction
}

export interface PlayerStats {
  coins: number;
  highScore: number;
  maxDistance: number;
  gamesPlayed: number;
  selectedSkin: string; // Hex color code or skin ID
  purchasedSkins: string[]; // List of skin IDs
  upgrades: Upgrades;
}

export interface Skin {
  id: string;
  name: string;
  color: string;
  price: number;
  speedBonus: number;
  handlingBonus: number;
  description: string;
}

export type GameState = 'MENU' | 'PLAYING' | 'GAMEOVER' | 'GARAGE' | 'INSTRUCTIONS';

export interface Obstacle {
  id: string;
  lane: number; // 0, 1, 2 (or floating X position)
  x: number;
  z: number;
  speed: number;
  type: 'sedan' | 'truck' | 'sport' | 'interceptor';
  color: string;
  mesh?: any; // Three.js Group
}

export interface Coin {
  id: string;
  lane: number;
  x: number;
  z: number;
  collected: boolean;
  type: 'gold' | 'shield_powerup' | 'turbo_powerup';
  mesh?: any; // Three.js Mesh/Group
}

export interface DustParticle {
  id: string;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  color: string;
  size: number;
  life: number; // 0 to 1
  mesh?: any;
}
