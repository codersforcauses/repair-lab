import axios from "axios";

import isBlank from "@/lib/is-blank";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function paramsSerializer(params: Record<string, any>) {
  const urlParams = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    if (isBlank(params[key])) {
      // remove undefined value or empty array
      return;
    } else if (Array.isArray(params[key])) {
      params[key].forEach((value: string) => {
        urlParams.append(key, value);
      });
    } else {
      urlParams.append(key, params[key]);
    }
  });

  return urlParams.toString();
}

export const httpClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json"
  },
  paramsSerializer
});
