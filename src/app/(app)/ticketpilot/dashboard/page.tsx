import Branding from "@/components/ticketpilot/branding";
import Stats from "@/components/ticketpilot/stats";
import TicketList from "@/components/ticketpilot/ticket-list";
import SearchForm from "@/components/ticketpilot/search-form";
import TicketDetails from "@/components/ticketpilot/ticket-details";
import ContentBlock from "@/components/content-block";
import TicketButton from "@/components/ticketpilot/ticket-button";

export default async function Dashboard({}) {
  return (
    <main>
      <div className="flex items-center justify-between text-white py-8">
        <Branding />
        <Stats />
      </div>
      <div className="grid md:grid-cols-3 md:grid-rows-[45px_1fr] grid-rows-[45px_300px_500px] gap-4 md:h-[600px]">
        <div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1">
          <SearchForm />
        </div>
        <div className="relative md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1">
          <ContentBlock>
            <TicketList />
            <div className="absolute bottom-4 right-4">
              <TicketButton actionType="add" />
            </div>
          </ContentBlock>
        </div>
        <div className="md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full">
          <ContentBlock>
            <TicketDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
}
