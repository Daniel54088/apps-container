"use server";
import { getErrorMessage } from "@/utils/get-error-message";
import { revalidatePath } from "next/cache";
import { petSchemaWithoutId, petSchemaWithId, petIdSchema } from "@/types/pets";
import prisma from "@/lib/db";
import { getPetById } from "@/utils/pet-db-queries";

export async function addPetAction(newPet: unknown) {
  const validatedNewPet = petSchemaWithId.safeParse(newPet);
  console.log("validatedNewPet", validatedNewPet);
  if (!validatedNewPet.success) {
    return {
      error: "Invalid pet data.",
    };
  }

  try {
    // database mutation
    // await prisma.pet.create({
    //   data: {
    //     ...validatedNewPet.data,
    //     user: {
    //       connect: {
    //         id: session.user.id,
    //       },
    //     },
    //   },
    // });
    revalidatePath("/app/", "layout");
    return {
      success: "Added success",
    };
  } catch (error: unknown) {
    console.log("error", error);
    return {
      error: getErrorMessage(error),
    };
  }
}

export async function editPetAction(petId: unknown, newPetData: unknown) {
  //zod validation
  const validatedUpdatedPet = petSchemaWithoutId.safeParse(newPetData);
  const validatedPetId = petIdSchema.safeParse(petId);

  if (!validatedPetId.success || !validatedUpdatedPet.success) {
    return {
      error: "Invalid pet data.",
    };
  }

  // Authorization check(user owns this pet or not)
  const foundedPet = await getPetById(validatedPetId.data);

  if (!foundedPet) {
    return {
      error: "Pet not found",
    };
  }
  // if (foundedPet.userId !== session.user.id) {
  //   return {
  //     error: "Not authorized.",
  //   };
  // }

  try {
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
  // zod validation
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return {
      error: "Invalid pet data.",
    };
  }

  // Authorization check(user owns this pet or not)
  const foundedPet = await prisma.pet.findUnique({
    where: {
      id: validatedPetId.data,
    },
  });
  if (!foundedPet) {
    return {
      error: "Pet not found",
    };
  }
  // if (foundedPet.userId !== session.user.id) {
  //   return {
  //     error: "Not authorized.",
  //   };
  // }

  try {
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
