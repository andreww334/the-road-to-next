"use client";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { signUp } from "@/features/auth/actions/sign-up";
import { FieldError } from "@/features/ticket/components/form/field-error";
import { Form } from "@/features/ticket/components/form/form";
import { SubmitButton } from "@/features/ticket/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/features/ticket/components/form/utils/to-action-state";

const SignUpForm = () => {
  const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE);
  return (
    <Form action={action} actionState={actionState}>
      <Input name="username" placeholder="Username" />
      <FieldError actionState={actionState} name="username" />
      <Input name="email" placeholder="Email" />
      <FieldError actionState={actionState} name="email" />
      <Input type="password" name="password" placeholder="Password" />
      <FieldError actionState={actionState} name="password" />
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
      />
      <FieldError actionState={actionState} name="confirmPassword" />

      <SubmitButton label="Sign Up" />
    </Form>
  );
};

export default SignUpForm;
