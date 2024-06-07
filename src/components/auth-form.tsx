"use client";
import React, { useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { logIn, signUp } from "@/server-actions/auth-actions";
import AuthFormButton from "./auth-form-button";
import { useFormState } from "react-dom";

type AuthFormProps = {
  type: "login" | "signup";
};

export default function AuthForm({ type }: AuthFormProps) {
  const [signUpError, dispatchSignUpError] = useFormState(signUp, undefined);
  const [logInError, dispatchLoginError] = useFormState(logIn, undefined);

  return (
    <form action={type === "login" ? dispatchLoginError : dispatchSignUpError}>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required maxLength={50} />
      </div>
      <div className="mb-4 mt-2 space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          maxLength={100}
        />
      </div>

      <AuthFormButton type={type} />
      {signUpError && (
        <p className="text-red-500 text-sm mt-2">{signUpError.error}</p>
      )}
      {logInError && (
        <p className="text-red-500 text-sm mt-2">{logInError.error}</p>
      )}
    </form>
  );
}
