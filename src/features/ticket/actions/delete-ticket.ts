"use server";

import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";
import { fromErrorToActionState } from "../components/form/utils/to-action-state";

export const deleteTicket = async (id: string) => {
  try {
    await prisma.ticket.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }
  await setCookieByKey("toast", "Ticket deleted");
  redirect(ticketsPath());
};
