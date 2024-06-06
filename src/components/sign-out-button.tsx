"use client";
import { Button } from "@/components/ui/button";
import { logOut } from "@/server-actions/auth-actions";

export default function SignOutButton() {
  return <Button onClick={async () => await logOut()}>Sign out</Button>;
}
