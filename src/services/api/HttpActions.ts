import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise } from 'axios';

class HttpActions {
  private request: AxiosInstance;

  constructor(baseURL: string, headers?: AxiosRequestConfig['headers']) {
    const config: AxiosRequestConfig = {
      baseURL,
      headers,
      withCredentials: false,
    };

    this.request = axios.create(config);
  }

  public get<T>(url: string, params?: object, options?: AxiosRequestConfig): AxiosPromise<T> {
    const config: AxiosRequestConfig = { params, ...options };
    return this.request.get(url, config);
  }

  public post<T>(url: string, data?: any, options?: AxiosRequestConfig): AxiosPromise<T> {
    return this.request.post(url, data, options);
  }

  public patch<T>(url: string, data: any, options: AxiosRequestConfig): AxiosPromise<T> {
    return this.request.patch(url, data, options);
  }

  public del<T>(url: string, data: any, params: object, options: AxiosRequestConfig): AxiosPromise<T> {
    const config: AxiosRequestConfig = { url, data, params, ...options };
    return this.request.delete(url, config);
  }

  public put<T>(url: string, data: any, params: object, options: AxiosRequestConfig): AxiosPromise<T> {
    return this.request.put(url, data, { params, ...options });
  }
}

export default HttpActions;
