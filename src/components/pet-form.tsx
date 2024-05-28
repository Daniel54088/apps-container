"use client";
import { PetFormProps } from "@/types/pets";
import { PetButtonTypes, petFormInputs } from "@/app/(app)/app/constants";
import { usePetContext } from "@/lib/hooks";
import PetFormButton from "./pet-form-button";
import logo from "../../public/logo.svg";
import PetFormInput from "./pet-form-input";

export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  const handleFormAction = async (formData: FormData) => {
    const transformedPetData = {
      name: formData.get("name") as string,
      ownerName: formData.get("ownerName") as string,
      imageUrl: formData.get("imageUrl") || logo.src,
      age: Number(formData.get("age") as string),
      notes: formData.get("notes") as string,
    };

    if (actionType === PetButtonTypes.ADD) {
      handleAddPet(transformedPetData);
    } else if (actionType === PetButtonTypes.EDIT) {
      handleEditPet(selectedPet!.id, transformedPetData);
    }

    onFormSubmission();
  };

  return (
    <form
      action={(formData) => handleFormAction(formData)}
      className="flex flex-col space-y-3"
    >
      {petFormInputs.map((input) => (
        <div key={input.name}>
          <PetFormInput inputConfig={input} actionType={actionType} />
        </div>
      ))}
      <PetFormButton actionType={actionType} />
    </form>
  );
}
