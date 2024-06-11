"use server";

import supabase from "@/db/api/server-with-role";

export async function getNoteWorkout(user_id: string, reciever_id: string) {
  if (!user_id || !reciever_id) {
    throw new Error("All fields are required");
  }

  const {data, error} = await supabase
    .from("client_notes")
    .select("*")
    .eq("user_id", user_id)
    .eq("type", "workout")
    .eq("reciever_id", reciever_id)
    .single();

  return {
    data,
    error: error?.message,
  };
}

export async function insertNote(
  note: string,
  type: "workout" | "meal",
  user_id: string,
  reciever_id: string,
) {
  if (!note || !type || !user_id || !reciever_id) {
    throw new Error("All fields are required");
  }

  const {data, error} = await supabase
    .from("client_notes")
    .insert({
      note,
      type,
      user_id,
      reciever_id,
    })
    .select()
    .single();

  if (error?.message === 'duplicate key value violates unique constraint "client_notes_pkey"') {
    return {
      data: null,
      error: "Note already exists.",
    };
  }

  return {
    data,
    error: "Error inserting note. Please try again.",
  };
}

export async function deleteWorkoutNote(coachId: string, clientId: string) {
  const {data, error} = await supabase
    .from("client_notes")
    .delete()
    .eq("type", "workout")
    .eq("user_id", coachId)
    .eq("reciever_id", clientId)
    .select();

  return {
    data,
    error: error?.message,
  };
}
