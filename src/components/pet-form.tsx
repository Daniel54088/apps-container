"use client";
import { PetFormProps, PetWithoutId, petSchemaWithoutId } from "@/types/pets";
import { PetButtonTypes, petFormInputs } from "@/app/(app)/app/constants";
import { usePetContext } from "@/lib/hooks";
import PetFormButton from "./pet-form-button";
import PetFormInput from "./pet-form-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<PetWithoutId>({
    resolver: zodResolver(petSchemaWithoutId),
  });

  const handleFormAction = async (formData: FormData) => {
    const result = await trigger();
    if (!result) return;

    const petData = getValues();

    if (actionType === PetButtonTypes.ADD) {
      handleAddPet(petData);
    } else if (actionType === PetButtonTypes.EDIT) {
      handleEditPet(selectedPet!.id, petData);
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
          <PetFormInput
            inputConfig={input}
            register={register}
            error={errors[input.name]?.message as string | undefined}
          />
        </div>
      ))}
      <PetFormButton actionType={actionType} />
    </form>
  );
}
