import H1 from "@/components/h1";
import AuthForm from "@/components/auth-form";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Signup() {
  redirect("/");
  return (
    <main>
      <H1 className="text-center mb-5">Sign up</H1>
      <AuthForm type="signup" />

      <p className="mt-6 text-sm text-zinc-500">
        Have an account already?
        <Link href="/login">Login</Link>
      </p>
    </main>
  );
}
