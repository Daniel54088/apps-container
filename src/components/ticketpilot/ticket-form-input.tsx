import React from "react";
import Select from "react-select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  TTicketFormInput,
  TicketFormWithOutId,
  LabelSelectBox,
} from "@/types/ticketpilot";
import { Controller, UseFormRegister, Control } from "react-hook-form";

type TicketFormInputProp = {
  inputConfig: TTicketFormInput;
  register: UseFormRegister<TicketFormWithOutId>;
  control: Control<TicketFormWithOutId>;
  labels: LabelSelectBox[];
  error?: string | undefined;
  actionType: string;
};

export default function TicketFormInput({
  inputConfig,
  register,
  labels,
  control,
  actionType,
  error,
}: TicketFormInputProp) {
  const labelOptions = labels.map((item) => {
    return { label: item.label, value: item.value, color: item.color };
  });
  console.log("actionType", actionType);
  console.log("labelOptions", labelOptions);
  return (
    <div className="space-y-1">
      <Label htmlFor={inputConfig.name}>{inputConfig.label}</Label>
      {inputConfig.inputType === "drop-down" && (
        <Controller
          control={control}
          name="labels"
          render={({ field: { onChange, value } }) => {
            console.log("value", value);
            let selectedOptions = value;
            if (actionType === "edit") {
            }

            return (
              <Select
                value={selectedOptions}
                id={inputConfig.name}
                onChange={onChange}
                options={labelOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                isMulti
              />
            );
          }}
        />
      )}

      {inputConfig.inputType === "text" && (
        <Input id={inputConfig.name} {...register(inputConfig.name)} />
      )}

      {inputConfig.inputType === "text-area" && (
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
