import { initialTickets } from "@/data";

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

  return (
    <div>
      {foundTicket ? (
        <div>
          <h2 className="text-lg">{foundTicket.title}</h2>
          <p className="text-sm">{foundTicket.content}</p>
          <p className="text-sm">{foundTicket.status}</p>
        </div>
      ) : (
        <h2 className="text-lg"> Ticket Not Found</h2>
      )}
    </div>
  );
};

export default TicketsPage;
