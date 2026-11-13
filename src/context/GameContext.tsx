"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import confetti from "canvas-confetti";

export interface UserAccount {
  name: string;
  email: string;
  school: string;
  city: string;
  avatarUrl: string;
}

export const DEFAULT_CREDENTIALS = {
  email: "geraldine@biowanka.edu.pe",
  password: "wanka",
};

export const DEFAULT_USER: UserAccount = {
  name: "Geraldine Huamán",
  email: "geraldine@biowanka.edu.pe",
  school: "Colegio Santa Isabel - Huancayo",
  city: "Huancayo, Junín",
  avatarUrl: "/assets/avatar-geraldine.png",
};

export interface CompletedObjective {
  id: string;
  name: string;
  completedAt: string;
  pointsEarned: number;
  verificationMethod: "code" | "photo" | "quiz" | "qr";
  notes?: string;
}

export interface UserStats {
  points: number;
  maxPoints: number;
  level: number;
  levelName: string;
  knownPlantsCount: number;
  completedMissionsCount: number;
  completedObjectives: Record<string, CompletedObjective>;
  discoveredPlantIds: string[];
}

interface GameContextType {
  // Auth state
  isAuthenticated: boolean;
  currentUser: UserAccount | null;
  login: (email: string, pass: string) => { success: boolean; error?: string };
  logout: () => void;

  // Gamification state
  stats: UserStats;
  verifyAndCompleteObjective: (
    objectiveId: string,
    title: string,
    points: number,
    method: "code" | "photo" | "quiz" | "qr",
    plantId?: string
  ) => boolean;
  isObjectiveCompleted: (id: string) => boolean;
  resetProgress: () => void;
}

const INITIAL_STATS: UserStats = {
  points: 0,
  maxPoints: 250,
  level: 1,
  levelName: "Explorador Novato",
  knownPlantsCount: 0,
  completedMissionsCount: 0,
  completedObjectives: {},
  discoveredPlantIds: [],
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("biowanka_auth") === "true";
    }
    return false;
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("biowanka_user");
      if (savedUser) {
        try {
          return JSON.parse(savedUser);
        } catch {
          // ignore
        }
      }
    }
    return DEFAULT_USER;
  });

  // Game Stats
  const [stats, setStats] = useState<UserStats>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("biowanka_stats");
        if (saved) {
          return JSON.parse(saved);
        }
      } catch {
        // use initial
      }
    }
    return INITIAL_STATS;
  });

  useEffect(() => {
    try {
      localStorage.setItem("biowanka_stats", JSON.stringify(stats));
    } catch {
      // ignore
    }
  }, [stats]);

  const login = (email: string, pass: string): { success: boolean; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (
      cleanEmail === DEFAULT_CREDENTIALS.email.toLowerCase() &&
      cleanPass === DEFAULT_CREDENTIALS.password
    ) {
      setIsAuthenticated(true);
      setCurrentUser(DEFAULT_USER);
      if (typeof window !== "undefined") {
        localStorage.setItem("biowanka_auth", "true");
        localStorage.setItem("biowanka_user", JSON.stringify(DEFAULT_USER));
      }
      return { success: true };
    }

    return {
      success: false,
      error: "Credenciales incorrectas. Revisa el correo o la contraseña de prueba.",
    };
  };

  const logout = () => {
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("biowanka_auth");
    }
  };

  const calculateLevel = (points: number): { level: number; name: string } => {
    if (points >= 200) return { level: 4, name: "Maestro Guardián Wanka" };
    if (points >= 120) return { level: 3, name: "Protector de Bosques" };
    if (points >= 50) return { level: 2, name: "Explorador Verde" };
    return { level: 1, name: "Explorador Novato" };
  };

  const verifyAndCompleteObjective = (
    objectiveId: string,
    title: string,
    points: number,
    method: "code" | "photo" | "quiz" | "qr",
    plantId?: string
  ): boolean => {
    if (stats.completedObjectives[objectiveId]) {
      return false;
    }

    const newPoints = stats.points + points;
    const { level, name } = calculateLevel(newPoints);

    const updatedDiscovered = plantId && !stats.discoveredPlantIds.includes(plantId)
      ? [...stats.discoveredPlantIds, plantId]
      : stats.discoveredPlantIds;

    const newObjective: CompletedObjective = {
      id: objectiveId,
      name: title,
      completedAt: new Date().toISOString(),
      pointsEarned: points,
      verificationMethod: method,
    };

    setStats((prev) => ({
      ...prev,
      points: newPoints,
      level,
      levelName: name,
      knownPlantsCount: updatedDiscovered.length,
      completedMissionsCount: prev.completedMissionsCount + 1,
      completedObjectives: {
        ...prev.completedObjectives,
        [objectiveId]: newObjective,
      },
      discoveredPlantIds: updatedDiscovered,
    }));

    confetti({
      particleCount: 65,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#3E7E36", "#52A447", "#E6A728", "#865DFF"],
    });

    return true;
  };

  const isObjectiveCompleted = (id: string): boolean => {
    return Boolean(stats.completedObjectives[id]);
  };

  const resetProgress = () => {
    setStats(INITIAL_STATS);
    if (typeof window !== "undefined") {
      localStorage.removeItem("wanka_verde_stats");
    }
  };

  return (
    <GameContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        logout,
        stats,
        verifyAndCompleteObjective,
        isObjectiveCompleted,
        resetProgress,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
