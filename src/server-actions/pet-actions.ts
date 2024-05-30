"use server";
import { getCollection } from "@/lib/mongodb";
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

export async function addPetAction(newPet: unknown) {
  try {
    const validatedNewPet = petSchemaWithId.safeParse(newPet);
    if (!validatedNewPet.success) {
      return {
        error: "Invalid pet data.",
      };
    }

    const petsCollection = await getCollection("pets");

    await petsCollection.insertOne({
      ...validatedNewPet.data,
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
    if (!validatedUpdatedPet.success) {
      return {
        error: "Invalid pet data.",
      };
    }

    const petsCollection = await getCollection("pets");
    const updateResult = await petsCollection.updateOne(
      { id: validatedPetId.data },
      {
        $set: {
          ...validatedUpdatedPet.data,
        },
      }
    );
    if (updateResult.matchedCount === 0) {
      return {
        error: "Pet not found",
      };
    }
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

    const petsCollection = await getCollection("pets");

    const deleteResult = await petsCollection.deleteOne({
      id: validatedPetId.data,
    });

    if (deleteResult.deletedCount === 0) {
      return {
        error: "Pet not found",
      };
    }
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
