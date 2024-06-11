"use client";

import { useState, createContext, useOptimistic } from "react";
import {
  TicketContextProviderProps,
  TTicketContext,
  TicketsMap,
  TicketWithoutId,
} from "@/types/ticketpilot";
import { normalizeObjArray } from "@/utils/normalize-array-to-object";
import {
  addTicketAction,
  editTicketAction,
  deleteTicketAction,
} from "@/server-actions/ticketpilot-actions";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";

export const TicketContext = createContext<TTicketContext | null>(null);

export default function TicketContextProvider({
  data,
  labels,
  children,
}: TicketContextProviderProps) {
  const [optimisticTickets, setOptimisticTickets] = useOptimistic(
    data,
    (state, { action, payload }) => {
      switch (action) {
        case "add":
          return [...state, { ...payload }];
        case "edit":
          return state.map((ticket) => {
            if (ticket.id === payload.id) {
              return { ...ticket, ...payload };
            }
            return ticket;
          });
        case "delete":
          return state.filter((ticket) => ticket.id !== payload.id);
        default:
          return state;
      }
    }
  );
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const ticketMap: TicketsMap = normalizeObjArray(optimisticTickets);
  const selectedTicket = selectedTicketId ? ticketMap[selectedTicketId] : null;

  const handleSelectedTicketIdChange = (id: string) => {
    setSelectedTicketId(id);
  };

  const handleAddTicket = async (newTicket: TicketWithoutId) => {
    const newTicketWithId = {
      id: uuid(),
      ...newTicket,
    };
    console.log("newTicketWithId", newTicketWithId);
    setOptimisticTickets({ action: "add", payload: newTicketWithId });
    const result = await addTicketAction(newTicketWithId);
    console.log("result", result);
    if (result?.error) {
      toast.warning(result.error);
    }
  };

  const handleEditTicket = async (
    ticketId: string,
    newTicketData: TicketWithoutId
  ) => {
    setOptimisticTickets({
      action: "edit",
      payload: { id: ticketId, newTicketData },
    });
    const result = await editTicketAction(ticketId, newTicketData);
    if (result.error) {
      toast.warning(result.error);
    }
  };

  const handleDelete = async (TicketId: string) => {
    setOptimisticTickets({ action: "delete", payload: { id: TicketId } });
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
        tickets: optimisticTickets,
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
