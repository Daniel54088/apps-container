"use client";
import React from "react";
import { useTicketContext } from "@/lib/hooks";
import { cn } from "@/utils/cn";
import TicketImage from "./ticket-owner-image";

export default function TicketList() {
  const {
    tickets,
    handleSelectedTicketIdChange,
    selectedTicketId,
    searchQuery,
  } = useTicketContext();

  return (
    <ul className="bg-white border-b border-light">
      {tickets
        .filter((ticket) => ticket.title.toLowerCase().includes(searchQuery))
        .map((ticket) => (
          <li key={ticket.id}>
            <button
              onClick={() => {
                handleSelectedTicketIdChange(ticket.id);
              }}
              className={cn(
                `flex items-center justify-start h-[70px] w-full cursor-pointer px-5 text-base gap-3 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition`,
                {
                  "bg-[#EFF1F2]": ticket.id === selectedTicketId,
                }
              )}
            >
              <TicketImage imageUrl={ticket.imageUrl} size={45} />
              <h4 className="font-semibold text-left max-w-[200px] break-words">
                {ticket.title}
              </h4>
            </button>
          </li>
        ))}
    </ul>
  );
}
