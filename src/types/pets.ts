import { z } from "zod";
import logo from "../../public/logo.svg";

export const petSchemaWithoutId = z
  .object({
    name: z.string().trim().min(1, { message: "Name is required." }).max(100),
    ownerName: z
      .string()
      .trim()
      .min(1, { message: "Owner name is required." })
      .max(100),
    imageUrl: z.union([
      z.literal(""),
      z.string().trim().url({ message: "Image url must be valid url" }),
    ]),
    age: z.coerce.number().int().positive().max(99999),
    notes: z.union([z.literal(""), z.string().trim().max(1000)]),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || logo.src,
  }));

export type PetWithoutId = z.infer<typeof petSchemaWithoutId>;

export type Pet = PetWithoutId & {
  id: string;
};

export type PerContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

export type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | null;
  handleSelectedPetIdChange: (id: string) => void;
  searchQuery: string;
  handleSearchQueryChange: (newValue: string) => void;
  handleAddPet: (newPet: PetWithoutId) => Promise<void>;
  handleEditPet: (petId: string, newPetData: PetWithoutId) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
};

export type PetsMap = Record<string, Pet>;

export type PetButtonProps = {
  actionType: "add" | "edit" | "delete";
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export type PetFormProps = {
  actionType: "add" | "edit" | "delete";
  onFormSubmission: () => void;
};

export type TPetFormInput = {
  label: string;
  name: "name" | "ownerName" | "imageUrl" | "age" | "notes";
  inputType: "text" | "text-area";
  required: boolean;
};
