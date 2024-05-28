"use server";
import { getCollection } from "@/lib/mongodb";
import { getErrorMessage } from "@/utils/get-error-message";
import { revalidatePath } from "next/cache";
import { Pet } from "@/types/pets";

export async function addPetAction(newPet: Pet) {
  try {
    const petsCollection = await getCollection("pets");

    const result = await petsCollection.insertOne({
      ...newPet,
    });
    revalidatePath("/app/", "layout");
    return {
      success: result,
    };
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
}

export async function editPetAction(
  petId: string,
  newPetData: Omit<Pet, "id">
) {
  try {
    const petsCollection = await getCollection("pets");

    const updateResult = await petsCollection.updateOne(
      { id: petId },
      {
        $set: {
          ...newPetData,
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
      success: updateResult,
    };
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
}

export async function deletePetAction(petId: string | undefined) {
  try {
    const petsCollection = await getCollection("pets");

    const deleteResult = await petsCollection.deleteOne({ id: petId });

    if (deleteResult.deletedCount === 0) {
      return {
        error: "Pet not found",
      };
    }
    revalidatePath("/app/", "layout");

    return {
      success: deleteResult,
    };
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
}
