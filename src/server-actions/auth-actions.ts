"use server";
import bcrypt from "bcryptjs";
import { getErrorMessage } from "@/utils/get-error-message";
import prisma from "@/lib/db";

import { authFormSchema } from "@/types/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { createClient } from "@/utils/supabase/server";

// const supabase = createClient();

export async function logIn(prevState: unknown, formData: unknown) {
  // check form data is valid Form type
  if (!(formData instanceof FormData)) {
    return {
      error: "Invalid form data",
    };
  }
  // Convert formData to js object
  const formDataObject = Object.fromEntries(formData.entries());

  // validation with converted form object
  const validatedAuthForm = authFormSchema.safeParse(formDataObject);
  if (!validatedAuthForm.success) {
    return {
      error: "Invalid form data",
    };
  }

  // const { error } = await supabase.auth.signInWithPassword(
  //   validatedAuthForm.data
  // );
  // console.log("Login error", error);
  // if (error) {
  //   console.log("error", error.message);
  //   return {
  //     error: error.message,
  //   };
  // }

  revalidatePath("/", "layout");
  redirect("/app/dashboard");
}

export async function logOut() {
  // const { error } = await supabase.auth.signOut();
  // if (error) {
  //   return {
  //     error: "Error. Could not sign out.",
  //   };
  // }
  redirect("/login");
}

export async function signUp(prevState: unknown, formData: unknown) {
  // check form data is valid Form type
  if (!(formData instanceof FormData)) {
    return {
      error: "Invalid form data",
    };
  }

  // Convert formData to js object
  const formDataObject = Object.fromEntries(formData.entries());

  // validation with converted
  const validatedAuthForm = authFormSchema.safeParse(formDataObject);
  if (!validatedAuthForm.success) {
    return {
      error: "Invalid form data",
    };
  }
  // hash password
  const { email, password } = validatedAuthForm.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // // create user in supabase
    // const { data, error } = await supabase.auth.signUp({
    //   email,
    //   password: hashedPassword,
    // });
    // if (error) {
    //   console.log("error", error.message);
    //   return {
    //     error: error.message,
    //   };
    // }
    // // create in aws db
    // if (data.user) {
    //   await prisma.user.create({
    //     data: {
    //       id: data.user.id,
    //       email,
    //       hashedPassword,
    //     },
    //   });
    // }
  } catch (error) {
    return {
      error: "Could not create user",
    };
  }
  redirect("/login");
}
