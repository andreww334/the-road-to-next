import { notFound } from "next/navigation";
import CardCompact from "@/components/card-compact";
import { TicketUpdateForm } from "@/features/ticket/components/ticket-update-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";

type TicketEditPageProps = {
  params: {
    ticketId: string;
  };
};

const TicketEditPage = async ({ params }: TicketEditPageProps) => {
  const ticket = await getTicket(params.ticketId);
  if (!ticket) {
    notFound();
  }
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Edit Ticket"
        description="Edit an existing ticket"
        content={<TicketUpdateForm ticket={ticket} />}
        className="w-full max-w-[420px] animate-fade-from-top"
      />
    </div>
  );
};

export default TicketEditPage;
