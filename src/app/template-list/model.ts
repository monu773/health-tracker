export interface ApiResponse {
  success: boolean;
  message: string;
}

export interface Workout {
  type: string;
  minutes: number;
}

export interface templateModel {
  id: number;
  name: string;
  workouts: Workout[];
}

export interface templateListModal {
  id: number;
  name: string;
  workouts: Workout[];
}

export interface templateCreate {
  id: number;
  name: string;
  workouts: Workout[];
}

