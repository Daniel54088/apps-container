import { TPetFormInput } from "@/types/pets";

export const PetButtonTypes = {
  ADD: "add",
  EDIT: "edit",
  DELETE: "delete",
};

export const userTestId = "a189d059-488d-4eb0-8c62-8c1e4fc693d6";

export const petFormInputs: TPetFormInput[] = [
  {
    label: "Name",
    name: "name",
    inputType: "text",
    required: true,
  },
  {
    label: "Owner Name",
    name: "ownerName",
    inputType: "text",
    required: true,
  },
  {
    label: "Image Url",
    name: "imageUrl",
    inputType: "text",
    required: false,
  },
  {
    label: "Age",
    name: "age",
    inputType: "text",
    required: true,
  },
  {
    label: "Notes",
    name: "notes",
    inputType: "text-area",
    required: false,
  },
];
