import { Button } from "./ui/button";
import { PetButtonTypes } from "@/app/(app)/app/constants";

export default function PetFormButton({
  actionType,
}: {
  actionType: "add" | "edit" | "delete";
}) {
  return (
    <Button type="submit" className="mt-5 self-end">
      {actionType === PetButtonTypes.ADD ? "Add" : "Edit"}
    </Button>
  );
}
