"use client";
import { usePetContext } from "@/lib/hooks";
import { Pet } from "@/types/pets";
import PetButton from "./pet-button";
import PetImage from "./pet-image";

export default function PetDetails() {
  const { selectedPet } = usePetContext();
  return (
    <section className="flex flex-col h-full w-full">
      {selectedPet ? (
        <>
          <TopBar selectedPet={selectedPet} />
          <OtherInfo selectedPet={selectedPet} />
          <Notes selectedPet={selectedPet} />
        </>
      ) : (
        <EmptyView />
      )}
    </section>
  );
}

function EmptyView() {
  return (
    <p className="h-full flex justify-center items-center text-2xl font-medium">
      No Pets selected
    </p>
  );
}

function TopBar({ selectedPet }: { selectedPet: Pet }) {
  const { handleDelete } = usePetContext();
  return (
    <div className="flex items-center bg-white px-8 py-5 border-b border-light">
      <PetImage imageUrl={selectedPet.imageUrl} size={75} />
      <h2 className="text-3xl front-semibold leading-7 ml-5">
        {selectedPet.name}
      </h2>
      <div className="ml-auto space-x-2">
        <PetButton actionType="edit">Edit</PetButton>
        <PetButton
          actionType="delete"
          // disabled={isPending}
          onClick={async () => await handleDelete(selectedPet.id)}
        >
          Remove
        </PetButton>
      </div>
    </div>
  );
}

function OtherInfo({ selectedPet }: { selectedPet: Pet | undefined }) {
  return (
    <div className="flex justify-around py-10 px-5 text-center">
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">
          Owner name
        </h3>
        <p className="mt-1 text-lg text-zinc-800">{selectedPet?.ownerName}</p>
      </div>
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">Age</h3>
        <p className="mt-1 text-lg text-zinc-800">{selectedPet?.age}</p>
      </div>
    </div>
  );
}

function Notes({ selectedPet }: { selectedPet: Pet | undefined }) {
  return (
    <section className="flex-1 bg-white px-7 py-5 rounded-md mb-9 mx-8 border-b border-light">
      {selectedPet?.notes}
    </section>
  );
}
