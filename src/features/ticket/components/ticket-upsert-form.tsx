"use client";

import { Ticket } from "@prisma/client";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertTicket } from "../actions/upsert-ticket";
import { FieldError } from "./form/field-error";
import { Form } from "./form/form";
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

  return (
    <Form action={action} actionState={actionState}>
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
      <div className="flex gap-x-2 mb-1">
        <div className="w-1/2">
          <Label htmlFor="deadline">Deadline</Label>
          <Input
            id="deadline"
            name="deadline"
            type="date"
            defaultValue={
              "payload" in actionState
                ? ((actionState.payload as FormData).get("deadline") as string)
                : ticket?.deadline
            }
          />
        </div>
        <div className="w-1/2">
          <Label htmlFor="bounty">Bounty ($)</Label>
          <Input
            id="bounty"
            name="bounty"
            type="number"
            step=".01"
            defaultValue={
              "payload" in actionState
                ? ((actionState.payload as FormData).get("bounty") as string)
                : ticket?.bounty
            }
          />
        </div>
      </div>

      <SubmitButton label={ticket ? "Edit" : "Create"} />
      {actionState.message}
    </Form>
  );
};

export { TicketUpsertForm };
