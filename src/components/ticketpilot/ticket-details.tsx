"use client";
import { useTicketContext } from "@/lib/hooks";
import { Ticket, LabelSelectBox } from "@/types/ticketpilot";
import TicketButton from "./ticket-button";
import TicketImage from "./ticket-owner-image";
import { cn } from "@/utils/cn";

export default function TicketDetails() {
  const { selectedTicket, labels } = useTicketContext();
  return (
    <section className="flex flex-col h-full w-full">
      {selectedTicket ? (
        <>
          <TopBar selectedTicket={selectedTicket} />
          <OtherInfo selectedTicket={selectedTicket} labels={labels} />
          <Notes selectedTicket={selectedTicket} />
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
      No Tickets selected
    </p>
  );
}

function TopBar({ selectedTicket }: { selectedTicket: Ticket }) {
  const { handleDelete } = useTicketContext();
  return (
    <div className="flex items-center bg-white px-8 py-5 border-b border-light">
      <TicketImage imageUrl={selectedTicket.imageUrl} size={75} />
      <h2 className="text-2xl front-semibold leading-7 ml-5 break-words">
        {selectedTicket.title}
      </h2>
      <div className="ml-auto space-x-2 flex-shrink-0 pl-2">
        <TicketButton actionType="edit">Edit</TicketButton>
        <TicketButton
          actionType="delete"
          onClick={async () => await handleDelete(selectedTicket.id)}
        >
          Remove
        </TicketButton>
      </div>
    </div>
  );
}

function OtherInfo({
  selectedTicket,
  labels,
}: {
  selectedTicket: Ticket | undefined;
  labels: LabelSelectBox[];
}) {
  return (
    <div className="flex justify-around py-10 px-5 text-center">
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">
          Ticket Owner
        </h3>
        <p className="mt-1 text-lg text-zinc-800">
          {selectedTicket?.ownerName}
        </p>
      </div>
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">
          Labels
        </h3>
        <div className="flex flex-wrap gap-2 max-w-[300px] mx-auto p-4">
          {labels
            .filter((label) => selectedTicket?.labels.includes(label.id))
            .map((label) => {
              return (
                <div
                  key={label.id}
                  className="rounded-md px-3 py-1 text-white text-sm font-medium"
                  style={{ backgroundColor: label.color }}
                >
                  {label.label}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

function Notes({ selectedTicket }: { selectedTicket: Ticket | undefined }) {
  return (
    <section className="flex-1 bg-white px-7 py-5 rounded-md mb-9 mx-8 border-b border-light">
      {selectedTicket?.content}
    </section>
  );
}
