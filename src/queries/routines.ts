"use server";
import {z} from "zod";

import {formSchema} from "@/components/routines/create-routine.form";
import supabase from "@/db/api/server-with-role";
import {Exercises} from "@/types/exerciseList";

export async function CreateRoutine(
  values: z.infer<typeof formSchema>,
  user_id: string,
  templateName: string,
  workoutId: string,
) {
  const {data: routine} = await supabase
    .from("coach_templates")
    .insert({
      name: templateName,
      user_id,
      coach_workout: workoutId,
    })
    .select("id");

  values.exercises.forEach(async (exercise: Exercises | undefined, index) => {
    if (exercise) {
      const {data: exerciseData} = await supabase
        .from("coach_exercise")
        .insert({
          name: exercise.name, // Add the 'name' property
          coach_template_id: routine?.[0].id,
          metric: exercise.metric ?? "kg",
          order: index,
          user_id: user_id,
        })
        .select("id");

      exercise.sets.forEach(async (set, index) => {
        await supabase.from("coach_sets").insert({
          weight: set.weight,
          reps: set.reps,
          exercise_id: exerciseData?.[0].id,
          set: set.set ?? index + 1,
          user_id: user_id,
        });
      });
    }
  });
}
