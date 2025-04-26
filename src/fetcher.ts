
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
    const response = await fetch(`/api/${url}`, init);
    if (!response.ok) {
      const { code, message } = await response.json();
      throw new FetchError(response.status, { code, message });
    }
    return await response.json();
  }
}

export const sendDataFactory = (method: "POST" | "PUT") =>
  (url: string, { arg }: { arg: Record<string, unknown> }) => {
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
export const deleteFetcher = fetcherFactory({ method: "DELETE" });
export const postFetcher = sendDataFactory("POST");
export const putFetcher = sendDataFactory("PUT");




type GetFetcherFn = (url: string) => Promise<any>;
type PostFetcherFn = (url: string, arg: { arg: string }) => Promise<any>;




// type FetcherFactory = (init: RequestInit) =>
//   typeof init['method'] extends undefined ? GetFetcherFn :
//   typeof init['method'] extends "DELETE" ? GetFetcherFn : PostFetcherFn;


// export const newFetchFactory = (init) => {
//   const fetchFn = async (url: string, options: RequestInit = {}) => {
//     const response = await fetch(`/api/${url}`, options);
//     if (!response.ok) {
//       const { code, message } = await response.json();
//       throw new FetchError(response.status, { code, message });
//     }
//     return await response.json();
//   }


//   if (["POST", "PUT"].includes(init.method || "")) {
//     return (url: string, { arg }: { arg: Record<string, unknown> }) => {
//       return fetchFn(url, { ...init, body: JSON.stringify(arg) });
//     }
//   }

//   return (url: string) => fetchFn(url);
// }

// const newgetFetcher = newFetchFactory()