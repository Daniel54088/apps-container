import { TTicketFormInput } from "@/types/ticketpilot";

export const TicketButtonTypes = {
  ADD: "add",
  EDIT: "edit",
  DELETE: "delete",
};

export const userTestId = "a189d059-488d-4eb0-8c62-8c1e4fc693d6";

export const ticketFormInputs: TTicketFormInput[] = [
  {
    label: "Title",
    name: "title",
    inputType: "text",
    required: true,
  },
  {
    label: "Ticket Owner",
    name: "ownerName",
    inputType: "text",
    required: true,
  },
  {
    label: "Labels",
    name: "labels",
    inputType: "drop-down",
    required: false,
  },
  {
    label: "Ticket Content",
    name: "content",
    inputType: "text-area",
    required: true,
  },
];
