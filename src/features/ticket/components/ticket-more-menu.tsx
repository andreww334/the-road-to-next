"use client";

import { Ticket, TicketStatus } from "@prisma/client";
import { LucideTrash } from "lucide-react";
import { toast } from "sonner";
import { useConfirmDialog } from "@/components/confirm-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteTicket } from "../actions/delete-ticket";
import { updateTicketStatus } from "../actions/update-ticket-status";
import { TICKET_STATUS_LABELS } from "../constants";

type TicketMoreMenuProps = {
  ticket: Ticket;
  trigger: React.ReactNode;
};

const TicketMoreMenu = ({ ticket, trigger }: TicketMoreMenuProps) => {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    action: deleteTicket.bind(null, ticket.id),
    trigger: (
      <DropdownMenuItem>
        <LucideTrash className="mr-2 h-4 w-4" />
        <span>Delete</span>
      </DropdownMenuItem>
    ),
    title: "Delete Ticket",
    description:
      "This action cannot be undone. This will permanently delete your ticket and remove your data from our servers.",
  });

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
    <>
      {deleteDialog}
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
    </>
  );
};

export { TicketMoreMenu };
