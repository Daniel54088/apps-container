import { Pet } from "@/types/pets";
import prisma from "@/lib/db";
import { User } from "@prisma/client";

export async function getPetById(petId: Pet["id"]) {
  const pet = await prisma.pet.findUnique({
    where: {
      id: petId,
    },
  });

  return pet;
}

export async function getPetsByUserId(userId: User["id"]) {
  const pets = await prisma.pet.findMany({
    where: {
      userId,
    },
  });

  return pets;
}

export async function getUserByEmail(email: User["email"]) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}
