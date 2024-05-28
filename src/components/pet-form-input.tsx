import React from "react";
import { PetButtonTypes } from "@/app/(app)/app/constants";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { TPetFormInput, Pet } from "@/types/pets";
import { usePetContext } from "@/lib/hooks";
import { FieldError, useForm } from "react-hook-form";

type PetFormInputProp = {
  inputConfig: TPetFormInput;
  actionType: string;
};

export default function PetFormInput({
  inputConfig,
  actionType,
}: PetFormInputProp) {
  const { selectedPet } = usePetContext();

  const {
    register,
    formState: { errors },
  } = useForm<Omit<Pet, "id">>();
  return (
    <div className="space-y-1">
      <Label htmlFor={inputConfig.name}>{inputConfig.label}</Label>
      {inputConfig.inputType === "text" ? (
        <Input id={inputConfig.name} {...register(inputConfig.name)} />
      ) : (
        <Textarea
          id={inputConfig.name}
          name={inputConfig.name}
          rows={5}
          defaultValue={
            actionType === PetButtonTypes.EDIT ? selectedPet?.notes : ""
          }
        />
      )}

      {errors && <p className="text-red-500"></p>}
    </div>
  );
}
