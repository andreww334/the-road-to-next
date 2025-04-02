"use server";

import { TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import {
  fromErrorToActionState,
  toActionState,
} from "../components/form/utils/to-action-state";
export const updateTicketStatus = async (
  ticketId: string,
  status: TicketStatus
) => {
  try {
    await prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        status,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }
  revalidatePath(ticketsPath());
  return toActionState("SUCCESS", "Status updated successfully");
};
