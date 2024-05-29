import supabase from "@/db/api/server";

export async function getCategories() {
  const {data: categories, error} = await supabase.from("exercise_list").select("category");

  if (error) throw new Error("Error fetching categories");

  return categories;
}
