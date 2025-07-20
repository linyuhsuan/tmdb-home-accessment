import axios, { AxiosResponse } from 'axios';

const VERSION = import.meta.env.VITE_API_VERSION as string;

type ApiOptions = {
  body?: any;
  isAutoFix?: boolean;
  method?: string;
};

/**
 * 單次 API 請求，不負責 retry
 */
async function apiRequest<T>(
  endpoint: string,
  method: string,
  options?: ApiOptions,
): Promise<AxiosResponse<T>> {
  try {
    // const token = tokenStorage.getToken() || '';
    const response = await axios({
      url: `/v1/${endpoint}`,
      method: method || 'GET',
      headers: {
        'Content-Type': method === 'PATCH' ? 'application/json-patch+json' : 'application/json',
        Accept: 'application/json',
        // Authorization: token ? `Bearer ${token}` : '',
      },
      data: options?.body,
      withCredentials: true, // 讓 cookie 自動帶上
    });

    return response;
  } catch (error: any) {
    const errorData = error.response?.data;
    throw {
      ...errorData,
      path: error.config?.url,
    };
  }
}

export async function getApi<T>(endpoint: string): Promise<AxiosResponse<T>> {
  return apiRequest<T>(endpoint, 'GET', {});
}

export async function postApi<T>(endpoint: string, data: any): Promise<AxiosResponse<T>> {
  return apiRequest<T>(endpoint, 'POST', { body: data });
}

export async function putApi<T>(endpoint: string, data: any): Promise<AxiosResponse<T>> {
  return apiRequest<T>(endpoint, 'PUT', { body: data });
}

export async function patchApi<T>(endpoint: string, data: any): Promise<AxiosResponse<T>> {
  return apiRequest<T>(endpoint, 'PATCH', { body: data });
}

export async function deleteApi<T>(endpoint: string): Promise<AxiosResponse<T>> {
  return apiRequest<T>(endpoint, 'DELETE', {});
}
