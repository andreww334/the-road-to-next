import Link from "next/link";
import { initialTickets } from "@/data";
import { ticketPath } from "@/paths";

const TICKET_ICONS = {
  OPEN: "O",
  DONE: "X",
  IN_PROGRESS: ">",
};

const TicketsPage = () => {
  return (
    <div>
      <h1>Tickets Page!!!!!</h1>
      {initialTickets.map((ticket) => {
        return (
          <div key={ticket.id}>
            <div> {TICKET_ICONS[ticket.status]} </div>
            <h2 className="text-lg">{ticket.title}</h2>
            <Link href={ticketPath(ticket.id.toString())} className="underline">
              View
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default TicketsPage;
