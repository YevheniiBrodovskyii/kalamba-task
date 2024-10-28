import { showErrorNotification } from "components";

export const apiFetch = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T | null> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    showErrorNotification(error instanceof Error ? error.message : "Unknown error");
    return null;
  }
};
