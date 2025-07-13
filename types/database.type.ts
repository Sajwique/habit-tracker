import { Models } from "react-native-appwrite";

export interface Habit extends Models.Document {
  user_id: string;
  title: string;
  description: string;
  frequency: string;
  streak_count: number;
  last_complted: string;
  created_at: string;
}

export interface HabitCompletions extends Models.Document {
  habit_id: string;
  user_id: string;
  completed_at: string;
}

export interface RealTimeResponse {
  events: string[];
  payload: any;
}

export interface StreakData {
  streak: number;
  bestStreak: number;
  total: number;
}
