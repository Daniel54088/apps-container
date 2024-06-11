import { useContext } from "react";
import { PetContext } from "@/contexts/pet-context-provider";
import { TicketContext } from "@/contexts/ticketpilot-context-provider";

export function usePetContext() {
  const context = useContext(PetContext);

  if (!context) {
    throw new Error(" UsePetContext must be used within a PetContextProvider");
  }
  return context;
}

export function useTicketContext() {
  const context = useContext(TicketContext);

  if (!context) {
    throw new Error(
      " UseTicketContext must be used within a TicketContextProvider"
    );
  }
  return context;
}
