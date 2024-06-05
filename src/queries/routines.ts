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

export async function UpdateRoutine(
  values: z.infer<typeof formSchema>,
  user_id: string,
  templateName: string,
  workoutId: string,
  metric: string,
) {
  const date = new Date().toISOString();
  const {data: routine, error} = await supabase
    .from("coach_templates")
    .upsert(
      {
        name: templateName,
        user_id,
        coach_workout: workoutId,
        created_at: values?.exercises?.[0]?.created_at ?? date,
        id: values?.exercises?.[0]?.coach_template_id,
      },
      {
        onConflict: "id",
      },
    )

    .select("id");

  console.log(error);

  values.exercises.forEach(async (exercise: Exercises | undefined, index) => {
    if (exercise) {
      const {data: exerciseData, error: errorExerciseData} = await supabase
        .from("coach_exercise")
        .upsert(
          {
            name: exercise.name,
            metric: exercise.metric ?? metric,
            order: exercise.order ?? index,
            coach_template_id: routine?.[0].id ?? values?.exercises?.[0]?.coach_template_id,
            user_id,
            created_at: exercise.created_at ?? date,
            id: exercise.dbId ?? crypto.randomUUID(),
          },
          {
            onConflict: "id",
          },
        )
        .select("id");

      console.log(errorExerciseData);

      exercise.sets.forEach(async (set, index) => {
        const {error} = await supabase.from("coach_sets").upsert(
          {
            weight: set.weight,
            reps: set.reps,
            set: set.set ?? index + 1,
            exercise_id: exerciseData?.[0].id,
            created_at: set.created_at ?? date,
            user_id,
            id: set.dbId,
          },
          {
            onConflict: "id",
          },
        );

        console.log(error);
      });
    }
  });
}

export async function GetRoutines(user_id: string, workoutId: string) {
  const {data: routines, error} = await supabase
    .from("coach_workout")
    .select("id, name, coach_templates(*, coach_exercise(*, coach_sets(*)))")
    .eq("user_id", user_id)
    .eq("id", workoutId)
    .order("created_at", {ascending: false});

  if (routines) {
    routines.forEach((t) => {
      t.coach_templates.sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      );
      t.coach_templates.forEach((e) => {
        e.coach_exercise.sort((a, b) => Number(a.order) - Number(b.order));
        e.coach_exercise.forEach((s) => {
          s.coach_sets.sort((a, b) => Number(a.set) - Number(b.set));
        });
      });
    });
  }

  return {
    routines,
    error,
  };
}

export async function DeleteRoutine(id: string, user_id: string) {
  const {data, error} = await supabase
    .from("coach_templates")
    .delete()
    .eq("id", id)
    .eq("user_id", user_id)
    .select();

  console.log(data);
  if (error) {
    return {
      error: "There was an error deleting the routine",
      data: null,
    };
  }

  return {
    data,
    error,
  };
}

export async function DeleteExercise(id: string, user_id: string) {
  const {data, error} = await supabase
    .from("coach_exercise")
    .delete()
    .eq("id", id)
    .eq("user_id", user_id)
    .select();

  console.log(data);
  if (error) {
    return {
      error: "There was an error deleting the exercise",
      data: null,
    };
  }

  return {
    data,
    error,
  };
}

export async function DeleteSet(id: string, user_id: string) {
  const {data, error} = await supabase
    .from("coach_sets")
    .delete()
    .eq("id", id)
    .eq("user_id", user_id)
    .select();

  console.log(data);
  if (error) {
    return {
      error: "There was an error deleting the set",
      data: null,
    };
  }

  return {
    data,
    error,
  };
}
