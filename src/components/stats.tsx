"use client";
import { useTicketContext } from "@/lib/hooks";

export default function Stats() {
  const { tickets } = useTicketContext();
  return (
    <section className="text-center">
      <p className="text-2xl font-bold leading-6" data-testid="ticket-length">
        {tickets.length | 0}
      </p>
      <p className="opacity-80">Current Tickets</p>
    </section>
  );
}
