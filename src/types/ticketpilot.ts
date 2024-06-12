import { z } from "zod";
import logo from "../../public/logo.svg";

// ticket schemas
export const ticketBaseSchema = z.object({
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
  content: z.union([z.literal(""), z.string().trim().max(1000)]),
});

export const ticketSchemaWithoutId = ticketBaseSchema.and(
  z.object({
    labels: z
      .array(
        z.object({
          label: z.string().trim(),
          value: z.string().trim(),
          color: z.string().trim(),
        })
      )
      .min(1, "You have to choose at least 1 label")
      .max(3, "You can only have up to 3 labels."),
    imageUrl: z.string(),
  })
);

export const ticketIdSchema = z.string().uuid();

export const ticketFormSchema = ticketBaseSchema.and(
  z.object({
    labels: z
      .array(
        z.object({
          label: z.string().trim(),
          value: z.string().trim(),
          color: z.string().trim(),
        })
      )
      .min(1, "You have to choose at least 1 label")
      .max(3, "You can only have up to 3 labels."),
  })
);

export const ticketFormSchemaWithId = ticketFormSchema.and(
  z.object({
    id: z.string().uuid(),
  })
);

// Ticket types
export type TicketWithOutId = z.infer<typeof ticketSchemaWithoutId>;

export type TicketFormWithOutId = z.infer<typeof ticketFormSchema>;

export type TicketId = z.infer<typeof ticketIdSchema>;

export type TicketWithId = TicketWithOutId & { id: TicketId };
export type TicketFormWithId = TicketFormWithOutId & { id: TicketId };

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
  data: TicketWithId[];
  labels: LabelSelectBox[];
  children: React.ReactNode;
};

// Others

export type TTicketContext = {
  tickets: TicketWithId[];
  labels: LabelSelectBox[];
  selectedTicketId: string | null;
  selectedTicket: TicketWithId | null;
  handleSelectedTicketIdChange: (id: string) => void;
  searchQuery: string;
  handleSearchQueryChange: (newValue: string) => void;
  handleAddTicket: (newTicket: TicketFormWithOutId) => Promise<void>;
  handleEditTicket: (
    ticketId: string,
    newTicketData: TicketFormWithOutId
  ) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
};

export type TicketsMap = Record<string, TicketWithId>;

export type TTicketFormInput = {
  label: string;
  name: "title" | "ownerName" | "labels" | "content";
  inputType: "text" | "text-area" | "drop-down";
  required: boolean;
};
