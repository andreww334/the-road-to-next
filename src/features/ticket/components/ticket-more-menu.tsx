"use client";

import { Ticket, TicketStatus } from "@prisma/client";
import { LucideTrash } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateTicketStatus } from "../actions/update-ticket-status";
import { TICKET_STATUS_LABELS } from "../constants";

type TicketMoreMenuProps = {
  ticket: Ticket;
  trigger: React.ReactNode;
};

const TicketMoreMenu = ({ ticket, trigger }: TicketMoreMenuProps) => {
  const deleteButton = (
    <DropdownMenuItem>
      <LucideTrash className="mr-2 h-4 w-4" />
      <span>Delete</span>
    </DropdownMenuItem>
  );

  const handleUpdateTicketStatus = async (status: string) => {
    const promise = updateTicketStatus(ticket.id, status as TicketStatus);
    toast.promise(promise, {
      loading: "Updating status...",
    });
    const result = await promise;
    if (result.status === "ERROR") {
      toast.error(result.message);
    } else if (result.status === "SUCCESS") {
      toast.success(result.message);
    }
  };

  const ticketStatusRadioGroupItems = Object.keys(TICKET_STATUS_LABELS).map(
    (status) => (
      <DropdownMenuRadioItem key={status} value={status}>
        {TICKET_STATUS_LABELS[status as TicketStatus]}
      </DropdownMenuRadioItem>
    )
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="w-56">
        {deleteButton}
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={ticket.status}
          onValueChange={handleUpdateTicketStatus}
        >
          {ticketStatusRadioGroupItems}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { TicketMoreMenu };
