import BackGroundPattern from "@/components/background-pattern";
import AppHeader from "@/components/app-header";
import AppFooter from "@/components/app-footer";
import TicketContextProvider from "@/contexts/ticketpilot-context-provider";
import { TicketWithId, LabelSelectBox } from "@/types/ticketpilot";
import { Toaster } from "@/components/ui/sonner";
import { getAllLabels, getAllTickets } from "@/utils/ticket-db-queries";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allTickets = await getAllTickets();
  const allLabels = await getAllLabels();

  // Make data to be form friendly
  const tickets: TicketWithId[] = allTickets.map(
    (doc): TicketWithId => ({
      id: doc.id,
      title: doc.title,
      ownerName: doc.ownerName,
      content: doc.content,
      imageUrl: doc.imageUrl,
      labels: allLabels
        .filter((_label) => doc.labels.includes(_label.id))
        .map((_label) => {
          return {
            label: _label.name,
            value: _label.id,
            color: _label.color,
          };
        }),
    })
  );

  const labels: LabelSelectBox[] = allLabels.map((label) => {
    return {
      id: label.id,
      name: label.name,
      color: label.color,
      value: label.id,
      label: label.name,
    };
  });

  return (
    <>
      <BackGroundPattern />
      <div className="flex flex-col max-w-[1050px] mx-auto px-4 min-h-screen">
        <AppHeader />
        <TicketContextProvider data={tickets} labels={labels}>
          {" "}
          {children}
        </TicketContextProvider>
        <AppFooter />
      </div>
      <Toaster position="top-right" />
    </>
  );
}
