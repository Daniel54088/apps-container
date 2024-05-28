"use client";

import { useState, createContext, useOptimistic } from "react";
import {
  PerContextProviderProps,
  TPetContext,
  PetsMap,
  Pet,
} from "@/types/pets";
import { normalizeObjArray } from "@/utils/normalize-array-to-object";
import {
  addPetAction,
  editPetAction,
  deletePetAction,
} from "@/server-actions/pet-actions";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data,
  children,
}: PerContextProviderProps) {
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          return [...state, { ...payload }];
        case "edit":
          return state.map((pet) => {
            if (pet.id === payload.id) {
              return { ...pet, ...payload };
            }
            return pet;
          });
        case "delete":
          return state.filter((pet) => pet.id !== payload.id);
        default:
          return state;
      }
    }
  );
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const petMap: PetsMap = normalizeObjArray(optimisticPets);
  const selectedPet = selectedPetId ? petMap[selectedPetId] : null;

  const handleSelectedPetIdChange = (id: string) => {
    setSelectedPetId(id);
  };

  const handleAddPet = async (newPet: Omit<Pet, "id">) => {
    const newPetWithId = {
      id: uuid(),
      ...newPet,
    };
    setOptimisticPets({ action: "add", payload: newPetWithId });
    const result = await addPetAction(newPetWithId);
    if (result.error) {
      toast.warning(result.error);
    }
  };
  const handleEditPet = async (petId: string, newPetData: Omit<Pet, "id">) => {
    setOptimisticPets({ action: "edit", payload: { id: petId, newPetData } });
    const result = await editPetAction(petId, newPetData);
    if (result.error) {
      toast.warning(result.error);
    }
  };

  const handleDelete = async (PetId: string) => {
    setOptimisticPets({ action: "delete", payload: { id: PetId } });
    const result = await deletePetAction(selectedPet?.id);
    if (result.error) {
      toast.warning(result.error);
    }
    setSelectedPetId(null);
  };
  const handleSearchQueryChange = (newValue: string) => {
    setSearchQuery(newValue);
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetId,
        selectedPet,
        handleSelectedPetIdChange,
        searchQuery,
        handleSearchQueryChange,
        handleDelete,
        handleEditPet,
        handleAddPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
