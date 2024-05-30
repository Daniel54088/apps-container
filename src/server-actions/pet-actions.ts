"use server";
import { getErrorMessage } from "@/utils/get-error-message";
import { revalidatePath } from "next/cache";
import {
  Pet,
  PetWithoutId,
  petSchemaWithoutId,
  petSchemaWithId,
  PetWithId,
  petIdSchema,
} from "@/types/pets";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/db";

export async function addPetAction(newPet: unknown) {
  try {
    const validatedNewPet = petSchemaWithId.safeParse(newPet);
    if (!validatedNewPet.success) {
      return {
        error: "Invalid pet data.",
      };
    }

    // database mutation
    await prisma.pet.create({
      data: {
        ...validatedNewPet.data,
      },
    });
    revalidatePath("/app/", "layout");
    return {
      success: "Added success",
    };
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
}

export async function editPetAction(petId: unknown, newPetData: unknown) {
  try {
    const validatedUpdatedPet = petSchemaWithoutId.safeParse(newPetData);
    const validatedPetId = petIdSchema.safeParse(petId);

    if (!validatedPetId.success || !validatedUpdatedPet.success) {
      return {
        error: "Invalid pet data.",
      };
    }

    // database mutation
    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedUpdatedPet.data,
    });

    revalidatePath("/app/", "layout");
    return {
      success: "Updated success",
    };
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
}

export async function deletePetAction(petId: unknown) {
  try {
    const validatedPetId = petIdSchema.safeParse(petId);
    if (!validatedPetId.success) {
      return {
        error: "Invalid pet data.",
      };
    }

    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    });
    revalidatePath("/app/", "layout");

    return {
      success: "Deleted success",
    };
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
}
