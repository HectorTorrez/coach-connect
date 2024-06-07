interface CoachSet {
  id: string;
  set: number;
  reps: number;
  weight: number;
  user_id: string;
  created_at: string;
  exercise_id: string;
}

interface CoachExercise {
  id: string;
  name: string;
  order: number;
  metric: string;
  user_id: string;
  coach_sets: CoachSet[];
  created_at: string;
  coach_template_id: string;
}

interface CoachTemplate {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
  coach_workout: string;
  coach_exercise: CoachExercise[];
}

export interface Workout {
  id: string;
  name: string;
  coach_templates: CoachTemplate[];
}
