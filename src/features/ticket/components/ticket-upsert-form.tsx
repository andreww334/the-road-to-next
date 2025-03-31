"use client";

import { Ticket } from "@prisma/client";
import { useActionState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "../actions/upsert-ticket";
import { FieldError } from "./field-error";
import { useActionFeedback } from "./form/hooks/use-action-feedback";
import { SubmitButton } from "./form/submit-button";
import { EMPTY_ACTION_STATE } from "./form/utils/to-action-state";

type TicketUpsertFormProps = {
  ticket?: Ticket;
};
const TicketUpsertForm = ({ ticket }: TicketUpsertFormProps) => {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE
  );

  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        console.log(`successful: ${actionState.message}`);
        toast.success(actionState.message);
      }
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        console.log(`error: ${actionState.message}`);
        toast.error(actionState.message);
      }
    },
  });

  return (
    <form action={action} className="flex flex-col gap-y-2">
      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        name="title"
        type="text"
        defaultValue={
          "payload" in actionState
            ? ((actionState.payload as FormData).get("title") as string)
            : ticket?.title
        }
      />
      <FieldError actionState={actionState} name="title" />
      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        rows={4}
        defaultValue={
          "payload" in actionState
            ? ((actionState.payload as FormData).get("content") as string)
            : ticket?.content
        }
      />
      <FieldError actionState={actionState} name="content" />
      <SubmitButton label={ticket ? "Edit" : "Create"} />
      {actionState.message}
    </form>
  );
};

export { TicketUpsertForm };
