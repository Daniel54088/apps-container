"use server";
import bcrypt from "bcryptjs";
import { getErrorMessage } from "@/utils/get-error-message";
import prisma from "@/lib/db";
import { signIn, signOut } from "@/lib/auth";
import { authFormSchema } from "@/types/auth";
import { AuthError } from "next-auth";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function logIn(prevState: unknown, formData: unknown) {
  // check form data is valid Form type
  if (!(formData instanceof FormData)) {
    return {
      error: "Invalid form data",
    };
  }

  try {
    //await signIn("credentials", formData, { callbackUrl: "/app/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          return {
            error: "Invalid credentials.",
          };
        }
        default: {
          return {
            error: "Error. Could not sign in.",
          };
        }
      }
    }

    throw error; // nextjs redirects throws error, so we need to rethrow it
  }
}

export async function logOut() {
  // await signOut({ redirectTo: "/" });
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

  // create user in db
  try {
    await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
  } catch (error) {
    // if (error instanceof Prisma.PrismaClientKnownRequestError) {
    //   if (error.code === "P2002") {
    //     return {
    //       error: "Email already exist",
    //     };
    //   }
    return {
      error: "Could not create user",
    };
  }
  //await signIn("credentials", formData);
}
