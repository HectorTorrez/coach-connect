import supabase from "@/db/api/server";

export async function getTypes() {
  const {data: types, error} = await supabase.from("exercise_list").select("type");

  if (error) throw new Error("Error fetching types");

  return types;
}
