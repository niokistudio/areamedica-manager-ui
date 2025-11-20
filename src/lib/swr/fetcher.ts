import { axiosClient } from "@/lib/axios/client"

/**
 * Default fetcher for GET requests
 * @param url - The URL to fetch (can be relative to baseURL)
 * @returns The response data
 */
export async function fetcher<T = unknown>(url: string): Promise<T> {
  return axiosClient.get<T>(url).then((res) => res.data)
}
