import axios from 'axios';

export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT';

const API_URL = 'http://localhost:8080/api';

type Props = {
  path: string;
  params?: Record<string, unknown>;
  method: HttpMethod;
  signal?: AbortSignal;
  data?: unknown;
};

export async function apiCall<T>({
  path,
  params,
  method,
  signal,
  data,
}: Props): Promise<T> {
  const url = `${API_URL}/${path}`;

  try {
    const response = await axios({ url, method, params, data, signal });
    return response.data as unknown as T;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
}
