import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function getUserAuthData() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  console.log(error);
  if (error || !data?.user) {
    const { error } = await supabase.auth.signOut();
    redirect("/login");
  }

  return data;
}

export async function getSession() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getSession();

  return data;
}
