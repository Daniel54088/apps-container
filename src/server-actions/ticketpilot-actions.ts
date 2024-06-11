"use server";
import { getErrorMessage } from "@/utils/get-error-message";
import { revalidatePath } from "next/cache";
import {
  ticketSchemaWithoutId,
  ticketSchemaWithId,
  ticketIdSchema,
} from "@/types/ticketpilot";
import prisma from "@/lib/db";
import { getTicketById } from "@/utils/ticket-db-queries";

export async function addTicketAction(newTicket: unknown) {
  const validatedNewTicket = ticketSchemaWithId.safeParse(newTicket);

  if (!validatedNewTicket.success) {
    return {
      error: "Invalid ticket data.",
    };
  }

  try {
    const labelIds = [
      "50ea3431-77fd-4a03-9a28-30f3f7e8442f",
      "78ec140f-5e3b-4bb1-815c-90f1454bc66a",
    ];

    // database mutation
    await prisma.ticket.create({
      data: {
        ...validatedNewTicket.data,
        labels: labelIds,
      },
    });

    revalidatePath("/app/", "layout");
    return {
      success: "Added success",
    };
  } catch (error: unknown) {
    console.log("error", error);
    return {
      error: getErrorMessage(error),
    };
  }
}

export async function editTicketAction(
  ticketId: unknown,
  newTicketData: unknown
) {
  //zod validation
  const validatedUpdatedTicket = ticketSchemaWithoutId.safeParse(newTicketData);
  const validatedTicketId = ticketIdSchema.safeParse(ticketId);

  if (!validatedTicketId.success || !validatedUpdatedTicket.success) {
    return {
      error: "Invalid ticket data.",
    };
  }

  // Authorization check(user owns this ticket or not)
  const foundedTicket = await getTicketById(validatedTicketId.data);

  if (!foundedTicket) {
    return {
      error: "Ticket not found",
    };
  }
  try {
    // database mutation
    await prisma.ticket.update({
      where: {
        id: validatedTicketId.data,
      },
      data: validatedUpdatedTicket.data,
    });

    revalidatePath("/app/", "layout");
    return {
      success: "Updated success",
    };
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
}

export async function deleteTicketAction(ticketId: unknown) {
  // zod validation
  const validatedTicketId = ticketIdSchema.safeParse(ticketId);
  if (!validatedTicketId.success) {
    return {
      error: "Invalid ticket data.",
    };
  }

  // Authorization check(user owns this ticket or not)
  const foundedTicket = await prisma.ticket.findUnique({
    where: {
      id: validatedTicketId.data,
    },
  });
  if (!foundedTicket) {
    return {
      error: "Ticket not found",
    };
  }

  try {
    await prisma.ticket.delete({
      where: {
        id: validatedTicketId.data,
      },
    });
    revalidatePath("/app/", "layout");

    return {
      success: "Deleted success",
    };
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
}
