"use client";
import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { signUp } from "@/features/auth/actions/sign-up";

const SignUpForm = () => {
  const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE);
  return (
    <Form action={action} actionState={actionState}>
      <Input
        name="username"
        placeholder="Username"
        defaultValue={
          "payload" in actionState
            ? ((actionState.payload as FormData).get("username") as string)
            : ""
        }
      />
      <FieldError actionState={actionState} name="username" />
      <Input
        name="email"
        placeholder="Email"
        defaultValue={
          "payload" in actionState
            ? ((actionState.payload as FormData).get("email") as string)
            : ""
        }
      />
      <FieldError actionState={actionState} name="email" />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        defaultValue={
          "payload" in actionState
            ? ((actionState.payload as FormData).get("password") as string)
            : ""
        }
      />
      <FieldError actionState={actionState} name="password" />
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        defaultValue={
          "payload" in actionState
            ? ((actionState.payload as FormData).get(
                "confirmPassword"
              ) as string)
            : ""
        }
      />
      <FieldError actionState={actionState} name="confirmPassword" />

      <SubmitButton label="Sign Up" />
    </Form>
  );
};

export default SignUpForm;
