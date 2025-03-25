import Link from "next/link";
import { Placeholder } from "@/components/Placeholder";
import { Button } from "@/components/ui/button";
import { initialTickets } from "@/data";
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
    <div>
      <div>
        <h2 className="text-lg">{foundTicket.title}</h2>
        <p className="text-sm">{foundTicket.content}</p>
        <p className="text-sm">{foundTicket.status}</p>
      </div>
    </div>
  );
};

export default TicketsPage;
