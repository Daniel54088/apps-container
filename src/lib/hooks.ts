import { useContext } from "react";
import { TicketContext } from "@/contexts/ticketpilot-context-provider";

export function useTicketContext() {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error(
      " UseTicketContext must be used within a TicketContextProvider"
    );
  }
  return context;
}
