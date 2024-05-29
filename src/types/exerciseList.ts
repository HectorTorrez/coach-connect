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
