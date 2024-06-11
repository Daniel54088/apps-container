import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { TTicketFormInput, TicketWithoutId } from "@/types/ticketpilot";
import { UseFormRegister } from "react-hook-form";

type TicketFormInputProp = {
  inputConfig: TTicketFormInput;
  register: UseFormRegister<TicketWithoutId>;
  error?: string | undefined;
};

export default function TicketFormInput({
  inputConfig,
  register,
  error,
}: TicketFormInputProp) {
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
