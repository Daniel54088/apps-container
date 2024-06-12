"use client";
import {
  TicketFormProps,
  TicketFormWithOutId,
  ticketFormSchema,
} from "@/types/ticketpilot";
import {
  TicketButtonTypes,
  ticketFormInputs,
} from "@/app/(app)/ticketpilot/constants";
import { useTicketContext } from "@/lib/hooks";
import TicketFormButton from "./ticket-form-button";
import TicketFormInput from "./ticket-form-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function TicketForm({
  actionType,
  onFormSubmission,
}: TicketFormProps) {
  const { selectedTicket, handleAddTicket, handleEditTicket, labels } =
    useTicketContext();

  const {
    register,
    trigger,
    getValues,
    control,
    formState: { errors },
  } = useForm<TicketFormWithOutId>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues:
      actionType === "edit"
        ? {
            title: selectedTicket?.title,
            ownerName: selectedTicket?.ownerName,
            labels: selectedTicket?.labels,
            content: selectedTicket?.content,
          }
        : {
            title: "",
            ownerName: "",
            labels: [],
            content: "",
          },
  });

  const handleFormAction = async () => {
    const result = await trigger();
    if (!result) return;

    const ticketData = getValues();

    if (actionType === TicketButtonTypes.ADD) {
      handleAddTicket(ticketData);
    } else if (actionType === TicketButtonTypes.EDIT) {
      handleEditTicket(selectedTicket!.id, ticketData);
    }

    onFormSubmission();
  };

  return (
    <form action={() => handleFormAction()} className="flex flex-col space-y-3">
      {ticketFormInputs.map((input) => (
        <div key={input.name}>
          <TicketFormInput
            inputConfig={input}
            labels={labels}
            register={register}
            error={errors[input.name]?.message as string | undefined}
            control={control}
            actionType={actionType}
          />
        </div>
      ))}
      <TicketFormButton actionType={actionType} />
    </form>
  );
}
