"use client";

import { useState, createContext } from "react";
import {
  TicketContextProviderProps,
  TTicketContext,
  TicketsMap,
  TicketFormWithOutId,
  TicketWithId,
} from "@/types/ticketpilot";
import { normalizeObjArray } from "@/utils/normalize-array-to-object";
import {
  addTicketAction,
  editTicketAction,
  deleteTicketAction,
} from "@/server-actions/ticketpilot-actions";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
import logo from "../../public/icons8-logo-33.svg";

export const TicketContext = createContext<TTicketContext | null>(null);

export default function TicketContextProvider({
  data,
  labels,
  children,
}: TicketContextProviderProps) {
  const [currentTickets, setCurrentTickets] = useState<TicketWithId[]>(data);
  console.log("currentTickets length");
  console.log(currentTickets.map((item) => item.title));
  console.log(currentTickets.length);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const ticketMap: TicketsMap = normalizeObjArray(currentTickets);
  const selectedTicket = selectedTicketId ? ticketMap[selectedTicketId] : null;

  const handleSelectedTicketIdChange = (id: string) => {
    setSelectedTicketId(id);
  };

  const handleAddTicket = async (newTicket: TicketFormWithOutId) => {
    const newTicketWithId = {
      id: uuid(),
      ...newTicket,
    };

    const newCurrentTickets: TicketWithId[] = currentTickets.concat({
      ...newTicketWithId,
      imageUrl: logo.src,
    });

    setCurrentTickets(newCurrentTickets);

    const result = await addTicketAction(newTicketWithId);

    if (result?.error) {
      toast.warning(result.error);
    }
    setSelectedTicketId(newTicketWithId.id);
  };

  const handleEditTicket = async (
    ticketId: string,
    newTicketData: TicketFormWithOutId
  ) => {
    const updatedTicketWithId: TicketWithId = {
      id: ticketId,
      ...newTicketData,
      imageUrl: logo.src,
    };

    const newTicketMap = {
      ...ticketMap,
      [ticketId]: updatedTicketWithId,
    };

    setCurrentTickets(Object.values(newTicketMap).map((ticket) => ticket));
    const result = await editTicketAction(ticketId, newTicketData);
    if (result.error) {
      toast.warning(result.error);
    }
  };

  const handleDelete = async (TicketId: string) => {
    delete ticketMap[TicketId];

    setCurrentTickets(Object.values(ticketMap).map((ticket) => ticket));

    const result = await deleteTicketAction(selectedTicket?.id);
    if (result.error) {
      toast.warning(result.error);
    }
    setSelectedTicketId(null);
  };
  const handleSearchQueryChange = (newValue: string) => {
    setSearchQuery(newValue);
  };

  return (
    <TicketContext.Provider
      value={{
        tickets: currentTickets,
        labels,
        selectedTicketId,
        selectedTicket,
        handleSelectedTicketIdChange,
        searchQuery,
        handleSearchQueryChange,
        handleDelete,
        handleEditTicket,
        handleAddTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}
