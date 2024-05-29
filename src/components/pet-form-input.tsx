import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { TPetFormInput, PetWithoutId } from "@/types/pets";
import { UseFormRegister } from "react-hook-form";

type PetFormInputProp = {
  inputConfig: TPetFormInput;
  register: UseFormRegister<PetWithoutId>;
  error?: string | undefined;
};

export default function PetFormInput({
  inputConfig,
  register,
  error,
}: PetFormInputProp) {
  return (
    <div className="space-y-1">
      <Label htmlFor={inputConfig.name}>{inputConfig.label}</Label>
      {inputConfig.inputType === "text" ? (
        <Input id={inputConfig.name} {...register(inputConfig.name)} />
      ) : (
        <Textarea
          id={inputConfig.name}
          {...register(inputConfig.name)}
          rows={5}
        />
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
