export interface ExerciseList {
  created_at?: string;
  id: string;
  name: string;
  template_id?: string;
  sets?: Set[];
  metric?: string;
  order?: number;
}

export interface Set {
  created_at?: string;
  id?: string;
  weight: number;
  reps: number;
  set?: number;
  exercise_id?: string;
}

export type FieldsSet = {
  name: string;
  sets: {
    metric: string;
    dbId: string;
    weight: number;
    reps: number;
  }[];
} & Record<"id", string | number>;

export interface Exercises {
  dbId?: string;
  name: string;
  created_at?: string;
  template_id?: string;
  sets: Set[];
  metric?: string;
}
