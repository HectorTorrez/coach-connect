"use server";

import supabase from "@/db/api/server-with-role";

export async function getRoutines(user_id: string) {
  const {data: routines, error} = await supabase
    .from("coach_workout")
    .select("name, id")
    .eq("user_id", user_id)
    .order("created_at", {ascending: false});

  if (error) {
    return {
      error: "Error fetching routines. Please try again.",
      routines: null,
    };
  }

  return {
    routines,
    error,
  };
}

export async function PostCreateRoutine(name: string, user_id: string) {
  const {data: routine, error} = await supabase
    .from("coach_workout")
    .insert({
      name,
      user_id,
    })
    .select();

  if (error) {
    return {
      error: "Error creating routine. Please try again.",
      routine: null,
    };
  }

  return {
    routine,
    error,
  };
}

export async function PutUpdateRoutine(name: string, id: string) {
  const {data: routine, error} = await supabase
    .from("coach_workout")
    .update({
      name,
    })
    .eq("id", id)
    .select();

  if (error) {
    return {
      error: "Error updating routine. Please try again.",
      routine: null,
    };
  }

  return {
    routine,
    error,
  };
}

export async function DeleteRoutine(id: string, user_id: string) {
  const {data, error} = await supabase
    .from("coach_workout")
    .delete()
    .eq("id", id)
    .eq("user_id", user_id)
    .select();

  if (error) {
    return {
      error: "Error deleting routine. Please try again.",
      data: null,
    };
  }

  return {
    data,
    error,
  };
}
