"use client";
import { useTicketContext } from "@/lib/hooks";
import { TicketWithOutId, TicketId } from "@/types/ticketpilot";
import TicketButton from "./ticket-button";
import TicketImage from "./ticket-owner-image";

export default function TicketDetails() {
  const { selectedTicket } = useTicketContext();
  const selectedTicketId = selectedTicket?.id as string;
  return (
    <section className="flex flex-col h-full w-full">
      {selectedTicket ? (
        <>
          <TopBar
            selectedTicket={selectedTicket}
            selectedTicketId={selectedTicketId}
          />
          <OtherInfo selectedTicket={selectedTicket} />
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

function TopBar({
  selectedTicket,
  selectedTicketId,
}: {
  selectedTicket: TicketWithOutId;
  selectedTicketId: TicketId;
}) {
  const { handleDelete } = useTicketContext();
  return (
    <div className="flex items-center bg-white px-8 py-5 border-b border-light">
      <TicketImage imageUrl={selectedTicket.imageUrl} size={75} />
      <h2 className="text-2xl front-semibold leading-7 ml-5 break-words max-w-[260px]">
        {selectedTicket.title}
      </h2>
      <div className="ml-auto space-x-2 flex-shrink-0 pl-2">
        <TicketButton actionType="edit">Edit</TicketButton>
        <TicketButton
          actionType="delete"
          onClick={async () => await handleDelete(selectedTicketId)}
        >
          Remove
        </TicketButton>
      </div>
    </div>
  );
}

function OtherInfo({
  selectedTicket,
}: {
  selectedTicket: TicketWithOutId | undefined;
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
          {selectedTicket?.labels.map((label) => {
            return (
              <div
                key={label.value}
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

function Notes({
  selectedTicket,
}: {
  selectedTicket: TicketWithOutId | undefined;
}) {
  return (
    <section className="flex-1 bg-white px-7 py-5 rounded-md mb-9 mx-8 border-b border-light">
      {selectedTicket?.content}
    </section>
  );
}
