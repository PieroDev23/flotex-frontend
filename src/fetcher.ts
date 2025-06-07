
type HttpApiError = { code: string, message: string, data?: unknown };

export class FetchError extends Error {
  status: number;
  data: HttpApiError

  constructor(status: number, data: HttpApiError) {
    super(data.message);
    this.status = status;
    this.data = data;
  }
}

const fetcherFactory = (
  init: RequestInit = {}
) => {
  return async (url: string) => {
    const response = await fetch(`/api/${url}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        "credentials": "includes"
      }
    });
    if (!response.ok) {
      const { code, message } = await response.json();
      throw new FetchError(response.status, { code, message });
    }
    return await response.json();
  }
}

export const sendDataFactory = (method: "POST" | "PUT" | "DELETE") =>
  (url: string, { arg }: { arg?: Record<string, unknown> }) => {
    return fetcherFactory({
      method,
      headers: {
        "Content-Type": "application/json",
        "credentials": "includes"
      },
      body: JSON.stringify(arg)
    })(url)
  }

export const getFetcher = fetcherFactory();
export const deleteFetcher = sendDataFactory("DELETE");
export const postFetcher = sendDataFactory("POST");
export const putFetcher = sendDataFactory("PUT");

// Multipart form data fetcher for file uploads
export const postMultipartFetcher = (url: string, { arg }: { arg: FormData }) => {
  return fetcherFactory({
    method: "POST",
    headers: {
      "credentials": "includes"
      // Don't set Content-Type for FormData, let browser set it with boundary
    },
    body: arg
  })(url);
};

export const putMultipartFetcher = (url: string, { arg }: { arg: FormData }) => {
  return fetcherFactory({
    method: "PUT",
    headers: {
      "credentials": "includes"
      // Don't set Content-Type for FormData, let browser set it with boundary
    },
    body: arg
  })(url);
};