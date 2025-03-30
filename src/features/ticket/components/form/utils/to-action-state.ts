import { ZodError } from "zod";

export type ActionState = {
  message: string;
  payload?: FormData;
  fieldErrors: Record<string, string[] | undefined>;
};

export const fromErrorToActionState = (error: unknown, formData: FormData) => {
  if (error instanceof ZodError) {
    console.log(`errors: ${JSON.stringify(error.flatten().fieldErrors)}`);
    return {
      message: "",
      fieldErrors: error.flatten().fieldErrors,
      payload: formData,
    };
  } else if (error instanceof Error) {
    return { message: error.message, fieldErrors: {}, payload: formData };
  } else {
    return {
      message: "An unknown error occurred",
      fieldErrors: {},
      payload: formData,
    };
  }
};
