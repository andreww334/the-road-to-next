"use client";

import React, {
  cloneElement,
  ReactElement,
  useActionState,
  useState,
} from "react";
import { Form } from "@/features/ticket/components/form/form";
import { SubmitButton } from "@/features/ticket/components/form/submit-button";
import {
  ActionState,
  EMPTY_ACTION_STATE,
} from "@/features/ticket/components/form/utils/to-action-state";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

type UseConfirmDialogArgs = {
  action: () => Promise<ActionState>;
  trigger: React.ReactNode;
  title?: string;
  description?: string;
};

const useConfirmDialog = ({
  action,
  trigger,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. Make sure you understand the consequences.",
}: UseConfirmDialogArgs) => {
  const [isOpen, setIsOpen] = useState(false);

  const dialogTrigger = cloneElement(
    trigger as ReactElement,
    {
      onClick: () => setIsOpen((state) => !state),
    } as React.HTMLAttributes<HTMLElement>
  );

  const handleSuccess = () => {
    setIsOpen(false);
  };

  const [actionState, formAction] = useActionState(action, EMPTY_ACTION_STATE);
  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Form
              action={formAction}
              actionState={actionState}
              onSuccess={handleSuccess}
            >
              <SubmitButton label="Confirm" />
            </Form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  return [dialogTrigger, dialog];
};

export { useConfirmDialog };
