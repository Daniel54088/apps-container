import { TicketId } from "@/types/ticketpilot";
import prisma from "@/lib/db";

export async function getAllTickets() {
  return await prisma.ticket.findMany();
}

export async function getAllLabels() {
  return await prisma.label.findMany();
}

export async function getTicketById(ticketId: TicketId) {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });

  return ticket;
}

export async function getLabelsByLabelIds(labelIds: string[]) {
  const labels = await prisma.label.findMany({
    where: {
      id: {
        in: labelIds,
      },
    },
  });

  return labels;
}
