import { Button } from "../ui/button";
import { TicketButtonTypes } from "@/app/(app)/ticketpilot/constants";

export default function TicketFormButton({
  actionType,
}: {
  actionType: "add" | "edit" | "delete";
}) {
  return (
    <Button type="submit" className="mt-5 self-end">
      {actionType === TicketButtonTypes.ADD ? "Add" : "Edit"}
    </Button>
  );
}
