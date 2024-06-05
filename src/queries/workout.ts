"use server";

import supabase from "@/db/api/server-with-role";

export async function getWorkouts(user_id: string) {
  const {data: workouts, error} = await supabase
    .from("coach_workout")
    .select("name, id")
    .eq("user_id", user_id)
    .order("created_at", {ascending: false});

  if (error) {
    return {
      error: "Error fetching workouts. Please try again.",
      workouts: null,
    };
  }

  return {
    workouts,
    error,
  };
}

export async function getWorkout(id: string, user_id: string) {
  const {data: workout, error} = await supabase
    .from("coach_workout")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();

  if (error) {
    return {
      error: "Error fetching workout. Please try again.",
      workout: null,
    };
  }

  return {
    workout,
    error,
  };
}

export async function PostCreateWorkout(name: string, user_id: string) {
  const {data: workouts, error} = await supabase
    .from("coach_workout")
    .insert({
      name,
      user_id,
    })
    .select();

  if (error) {
    return {
      error: "Error creating workouts. Please try again.",
      workouts: null,
    };
  }

  return {
    workouts,
    error,
  };
}

export async function PutUpdateWorkout(name: string, id: string) {
  const {data: workouts, error} = await supabase
    .from("coach_workout")
    .update({
      name,
    })
    .eq("id", id)
    .select();

  if (error) {
    return {
      error: "Error updating workouts. Please try again.",
      workouts: null,
    };
  }

  return {
    workouts,
    error,
  };
}

export async function DeleteWorkout(id: string, user_id: string) {
  const {data, error} = await supabase
    .from("coach_workout")
    .delete()
    .eq("id", id)
    .eq("user_id", user_id)
    .select();

  if (error) {
    return {
      error: "Error deleting workouts. Please try again.",
      data: null,
    };
  }

  return {
    data,
    error,
  };
}
