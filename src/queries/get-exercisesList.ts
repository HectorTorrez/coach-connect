import supabase from "@/db/api/server";

export async function getExercise(user_id: string) {
  const {data: data1, error: error1} = await supabase
    .from("exercise_list")
    .select("*")
    .filter("user_id", "eq", user_id)
    .order("created_at", {ascending: false});

  const {data: data2, error: error2} = await supabase
    .from("exercise_list")
    .select("*")
    .filter("user_id", "is", null)
    .order("created_at", {ascending: false});

  if (error1 || error2) {
    throw new Error("Error fetching exercises");
  }

  return [...data1, ...data2];
}
