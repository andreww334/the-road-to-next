import Link from "next/link";
import { Placeholder } from "@/components/Placeholder";
import { Button } from "@/components/ui/button";
import { initialTickets } from "@/data";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { ticketsPath } from "@/paths";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};

const TicketsPage = async ({ params }: TicketPageProps) => {
  const { ticketId } = await params;
  const foundTicket = initialTickets.find(
    (ticket) => ticket.id === Number(ticketId)
  );
  if (!foundTicket) {
    return (
      <Placeholder
        label="Ticket Not Found"
        button={
          <Button asChild variant="outline">
            <Link href={ticketsPath()}>Go back to tickets</Link>
          </Button>
        }
      />
    );
  }
  return (
    <div className="flex justify-center animate-fade-from-top">
      <TicketItem ticket={foundTicket} isDetail={true} />
    </div>
  );
};

export default TicketsPage;
