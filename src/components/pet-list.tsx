"use client";
import Image from "next/image";
import React from "react";
import { usePetContext } from "@/lib/hooks";
import { cn } from "@/utils/cn";
import PetImage from "./pet-image";

export default function PetList() {
  const { pets, handleSelectedPetIdChange, selectedPetId, searchQuery } =
    usePetContext();

  return (
    <ul className="bg-white border-b border-light">
      {pets
        .filter((pet) => pet.name.toLowerCase().includes(searchQuery))
        .map((pet) => (
          <li key={pet.id}>
            <button
              onClick={() => {
                handleSelectedPetIdChange(pet.id);
              }}
              className={cn(
                `flex items-center h-[70px] w-full cursor-pointer px-5 text-base gap-3 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition`,
                {
                  "bg-[#EFF1F2]": pet.id === selectedPetId,
                }
              )}
            >
              <PetImage imageUrl={pet.imageUrl} size={45} />
              <p className="font-semibold ">{pet.name}</p>
            </button>
          </li>
        ))}
    </ul>
  );
}
