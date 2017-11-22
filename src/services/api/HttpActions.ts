import * as axios from 'axios';

type AsyncRequest<T> = Axios.IPromise<Axios.AxiosXHR<T>>;

class HttpActions {
  private request: Axios.AxiosInstance;
  private host = process.env.__HOST__;

  constructor(baseURL: string) {
    const config: Axios.AxiosXHRConfigBase<null> = {
      baseURL: this.host + baseURL,
      withCredentials: false,
    };

    this.request = axios.create(config);
  }

  public get<T>(url: string, params?: object, options?: Axios.AxiosXHRConfigBase<T>): AsyncRequest<T> {
    const config: Axios.AxiosXHRConfigBase<T> = { params, ...options };
    return this.request.get(url, config);
  }

  public post<T>(url: string, data?: any, options?: Axios.AxiosXHRConfigBase<T>): AsyncRequest<T> {
    return this.request.post(url, data, options);
  }

  public patch<T>(url: string, data: any, options: Axios.AxiosXHRConfigBase<T>): AsyncRequest<T> {
    return this.request.patch(url, data, options);
  }

  public del<T>(url: string, data: any, params: object, options: Axios.AxiosXHRConfigBase<T>): AsyncRequest<T> {
    const config: Axios.AxiosXHRConfig<T> = { url, data, params, ...options };
    return this.request.delete(url, config);
  }

  public put<T>(url: string, data: any, params: object, options: Axios.AxiosXHRConfigBase<T>): AsyncRequest<T> {
    return this.request.put(url, data, { params, ...options });
  }
}

export default HttpActions;
