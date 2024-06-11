"use client";
import { useTicketContext } from "@/lib/hooks";

export default function Stats() {
  const { tickets } = useTicketContext();
  return (
    <section className="text-center">
      <p className="text-2xl font-bold leading-6">{tickets.length}</p>
      <p className="opacity-80">Current Tickets</p>
    </section>
  );
}
