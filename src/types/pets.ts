export type Pet = {
  id: string;
  name: string;
  ownerName: string;
  imageUrl: string;
  age: number;
  notes: string;
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
  handleAddPet: (newPet: Omit<Pet, "id">) => Promise<void>;
  handleEditPet: (petId: string, newPetData: Omit<Pet, "id">) => Promise<void>;
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
