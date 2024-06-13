"use server";
import { getErrorMessage } from "@/utils/get-error-message";
import { revalidatePath } from "next/cache";
import {
  ticketFormSchema,
  ticketIdSchema,
  ticketFormSchemaWithId,
} from "@/types/ticketpilot";
import prisma from "@/lib/db";
import { getTicketById } from "@/utils/ticket-db-queries";
import logo from "../../public/icons8-logo-33.svg";

export async function addTicketAction(newTicket: unknown) {
  const validatedNewTicket = ticketFormSchemaWithId.safeParse(newTicket);

  if (!validatedNewTicket.success) {
    return {
      error: "Invalid ticket data.",
    };
  }

  const validatedNewTicketForDB = {
    ...validatedNewTicket.data,
    labels: validatedNewTicket.data.labels.map((label) => label.value),
    imageUrl: logo.src,
  };

  try {
    //adding ticket in to db
    await prisma.ticket.create({
      data: {
        ...validatedNewTicketForDB,
      },
    });

    revalidatePath("/(app)/ticketpilot", "layout");
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
  // schema validation
  const validatedUpdatedTicket = ticketFormSchema.safeParse(newTicketData);
  const validatedTicketId = ticketIdSchema.safeParse(ticketId);

  if (!validatedTicketId.success || !validatedUpdatedTicket.success) {
    return {
      error: "Invalid ticket data.",
    };
  }

  // Fetch existing ticket to get the current imageUrl
  const existingTicket = await prisma.ticket.findUnique({
    where: { id: validatedTicketId.data },
    select: { imageUrl: true },
  });

  if (!existingTicket) {
    return {
      error: "Can't find this ticket.",
    };
  }

  const validatedUpdatedTicketForDB = {
    ...validatedUpdatedTicket.data,
    labels: validatedUpdatedTicket.data.labels.map((label) => label.value),
    imageUrl: existingTicket.imageUrl,
  };

  try {
    // database mutation
    await prisma.ticket.update({
      where: {
        id: validatedTicketId.data,
      },
      data: validatedUpdatedTicketForDB,
    });

    revalidatePath("/(app)/ticketpilot", "layout");
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
    revalidatePath("/(app)/ticketpilot", "layout");

    return {
      success: "Deleted success",
    };
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
}
