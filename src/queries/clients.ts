"use server";

import supabase from "@/db/api/server-with-role";

export async function getCategories() {
  const {data: categories, error} = await supabase.from("exercise_list").select("category");

  if (error) throw new Error("Error fetching categories");

  return categories;
}

export async function getClient(userId: string) {
  const {data: client, error} = await supabase
    .from("users")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    return {
      client: null,
      error: "Client not found",
    };
  }

  return {
    client,
    error,
  };
}

export async function getClients(userId: string) {
  const {data: clients, error} = await supabase
    .from("friends")
    .select(
      `
      reciever_id, 
      status,
      users!friends_reciever_id_fkey (
        username, 
        name, 
        email,
        image
      )
    `,
    )
    .eq("sender_id", userId)
    .in("status", ["accepted", "pending"]);

  if (clients === null) {
    return {
      clients: [],
      error: "No clients found",
    };
  }

  return {
    clients,
    error,
  };
}

export async function PostAddClient(sender_id: string, username: string) {
  const {data: reciever_id, error} = await supabase
    .from("users")
    .select("*")
    .eq("username", username);

  if (reciever_id?.length === 0) {
    return {
      friends: null,
      friendsError: "User not found",
    };
  }

  const clientId = reciever_id?.[0]?.user_id;

  if (error) throw new Error("Error fetching clients");

  const {data: friends, error: friendsError} = await supabase
    .from("friends")
    .insert({
      reciever_id: clientId ?? "",
      sender_id,
      status: "pending",
      user_id: sender_id,
    })
    .select();

  if (friendsError) {
    return {
      friends: null,
      friendsError: "User already sent a friend request",
    };
  }

  return {
    friends,
    friendsError,
  };
}

export async function DeleteClient(user_id: string, reciever_id: string) {
  const {data, error} = await supabase
    .from("friends")
    .delete()
    .eq("sender_id", user_id)
    .eq("reciever_id", reciever_id)
    .select();

  if (error) {
    return {
      error: "Error deleting client",
      data: null,
    };
  }

  return {
    error: null,
    data,
  };
}
