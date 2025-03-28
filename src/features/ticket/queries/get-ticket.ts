import { prisma } from "@/lib/prisma";
import { Ticket } from "../types";

export const getTicket = async (ticketId: string): Promise<Ticket | null> => {
  return await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });
};
