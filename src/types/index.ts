export interface Plant {
  id: string;
  name: string;
  scientificName?: string;
  description: string;
  imageUrl: string;
  category?: string;
  rarity?: "común" | "nativa" | "emblemática" | "en peligro";
  locationHuancayo?: string;
  pointsReward?: number;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  points: number;
  iconName: string;
  category: "identificacion" | "trivia" | "siembra" | "escaneo";
  completed?: boolean;
  plantTarget?: string;
  imageUrl?: string;
  badgeReward?: string;
}

export interface Badge {
  id: string;
  title: string;
  icon: string;
  unlocked: boolean;
  colorScheme: "green" | "gold" | "purple" | "silver" | "locked";
  description: string;
}

export interface UserProgress {
  name: string;
  avatarUrl: string;
  level: number;
  levelName: string;
  currentPoints: number;
  nextLevelPoints: number;
  knownPlantsCount: number;
  totalMissionsCompleted: number;
  badges: Badge[];
}

export interface MapPin {
  id: string;
  title: string;
  subtitle?: string;
  type: "player" | "plant" | "challenge" | "mystery";
  lat: number;
  lng: number;
  color: string;
  data?: Record<string, unknown>;
}

