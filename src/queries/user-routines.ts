"use server";
import supabase from "@/db/api/server-with-role";

export async function userRoutine(routine_id: string, coachId: string) {
  const {data: routine, error} = await supabase
    .from("coach_workout")
    .select("id, name, coach_templates(*, coach_exercise(*, coach_sets(*)))")
    .eq("id", routine_id)
    .eq("user_id", coachId)
    .single();

  return {
    routine,
    error,
  };
}

export async function insertUserRoutine(userId: string, routineId: string, user_id: string) {
  const {data, error} = await supabase
    .from("user_routine")
    .insert({
      userID: userId,
      user_id,
      routine_id: routineId,
    })
    .select("*");

  if (error) {
    return {
      error: "An error occurred while adding the routine to the user",
      data: null,
    };
  }

  return {
    error: null,
    data,
  };
}

export async function clientHasRoutine(clientId: string, user_id: string) {
  const {data, error} = await supabase
    .from("user_routine")
    .select("*")
    .eq("userID", clientId)
    .eq("user_id", user_id)
    .select()
    .single();

  if (error) {
    return {
      error: "An error occurred while fetching the routine",
      data: null,
    };
  }

  return {
    error: null,
    data,
  };
}

export async function DeleteClientRoutine(clientId: string, user_id: string, routineId: string) {
  const {data, error} = await supabase
    .from("user_routine")
    .delete()
    .eq("userID", clientId)
    .eq("id", routineId)
    .eq("user_id", user_id)
    .select();

  if (error) {
    return {
      error: "An error occurred while deleting the routine",
      data: null,
    };
  }

  return {
    error: null,
    data,
  };
}
