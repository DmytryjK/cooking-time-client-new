import { isAxiosError } from "axios";

export const getApiErrorMessage = (error: unknown) => {
  if (!isAxiosError(error)) {
    return error instanceof Error ? error.message : "Щось пішло не так. Спробуйте ще!";
  }

  const data = error.response?.data;

  if (typeof data === "string" && data.trim()) return data;
  if (data && typeof data === "object") {
    const { message, error: errorText } = data as { message?: string; error?: string };
    if (typeof message === "string" && message.trim()) return message;
    if (typeof errorText === "string" && errorText.trim()) return errorText;
  }

  return error.message || "Щось пішло не так. Спробуйте ще!";
};
