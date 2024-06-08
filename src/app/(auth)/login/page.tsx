import H1 from "@/components/h1";
import AuthForm from "@/components/auth-form";
import Link from "next/link";
import { getSession } from "@/utils/supabase/get-supabase-auth";
import { redirect } from "next/navigation";

export default async function Login() {
  redirect("/");
  return (
    <main>
      <H1 className="text-center mb-5">Log In</H1>
      <AuthForm type="login" />

      <p className="mt-6 text-sm text-zinc-500">
        Not account yet?
        <Link href="/signup">Sign up</Link>
      </p>
    </main>
  );
}
