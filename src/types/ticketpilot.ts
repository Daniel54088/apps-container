import { z } from "zod";
import logo from "../../public/logo.svg";

// ticket schemas and types
export const ticketSchemaWithoutId = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Ticket title is required." })
    .max(100),
  ownerName: z
    .string()
    .trim()
    .min(1, { message: "Ticket owner is required." })
    .max(100),
  labels: z.array(z.string()),
  imageUrl: z.string().url(),
  content: z.union([z.literal(""), z.string().trim().max(1000)]),
});
export type TicketWithoutId = z.infer<typeof ticketSchemaWithoutId>;

export const ticketIdSchema = z.string().uuid();
export const ticketSchemaWithId = ticketSchemaWithoutId.and(
  z.object({ id: ticketIdSchema })
);
export type TicketWithId = z.infer<typeof ticketSchemaWithId>;

export type Ticket = TicketWithoutId & {
  id: string;
};

// label schema and types
export const labelSchemaWithoutId = z.object({
  name: z.string().trim(),
  color: z.string(),
});

export type LabelWithOutId = z.infer<typeof labelSchemaWithoutId>;

export type Label = LabelWithOutId & {
  id: string;
};

export type LabelSelectBox = Label & {
  label: string;
  value: string;
};

// Props
export type TicketButtonProps = {
  actionType: "add" | "edit" | "delete";
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export type TicketFormProps = {
  actionType: "add" | "edit" | "delete";
  onFormSubmission: () => void;
};
export type TicketContextProviderProps = {
  data: Ticket[];
  labels: LabelSelectBox[];
  children: React.ReactNode;
};

// Others

export type TTicketContext = {
  tickets: Ticket[];
  labels: LabelSelectBox[];
  selectedTicketId: string | null;
  selectedTicket: Ticket | null;
  handleSelectedTicketIdChange: (id: string) => void;
  searchQuery: string;
  handleSearchQueryChange: (newValue: string) => void;
  handleAddTicket: (newTicket: TicketWithoutId) => Promise<void>;
  handleEditTicket: (
    ticketId: string,
    newTicketData: TicketWithoutId
  ) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
};

export type TicketsMap = Record<string, Ticket>;

export type TTicketFormInput = {
  label: string;
  name: "title" | "ownerName" | "labels" | "imageUrl" | "content";
  inputType: "text" | "text-area" | "drop-down";
  required: boolean;
};
