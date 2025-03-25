import { LucideCircleCheck, LucideFileText, LucidePencil } from "lucide-react";
import Link from "next/link";
import { Heading } from "@/components/Heading";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { initialTickets } from "@/data";
import { ticketPath } from "@/paths";

const TICKET_ICONS = {
  OPEN: <LucideFileText />,
  DONE: <LucideCircleCheck />,
  IN_PROGRESS: <LucidePencil />,
};

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Tickets Page"
        description="All your tickets in one place"
      />
      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
        {initialTickets.map((ticket) => {
          return (
            <Card key={ticket.id} className="w-full max-w-[420px]">
              <CardHeader>
                <CardTitle className="flex gap-x-2">
                  <span className="flex items-center">
                    {TICKET_ICONS[ticket.status]}
                  </span>
                  <h3 className=" text-2xl truncate">{ticket.title}</h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span className="line-clamp-3 whitespace-break-spaces">
                  {ticket.content}
                </span>
              </CardContent>
              <CardFooter>
                <Link
                  href={ticketPath(ticket.id.toString())}
                  className="underline"
                >
                  View
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TicketsPage;
