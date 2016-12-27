import * as axios from 'axios';

class HttpActions {
  private request: Axios.AxiosInstance;
  private host = __HOST__;

  constructor(baseURL: string) {
    const config: Axios.AxiosXHRConfigBase<null> = {
      baseURL: this.host + baseURL,
      withCredentials: true
    };

    this.request = axios.create(config);
  }

  get<T>(url: string, params?: Object, options?: Axios.AxiosXHRConfigBase<T>): Axios.IPromise<Axios.AxiosXHR<T>> {
    const config: Axios.AxiosXHRConfigBase<T> = { params, ...options };
    return this.request.get(url, config);
  }

  post<T>(url: string, data?: any, options?: Axios.AxiosXHRConfigBase<T>): Axios.IPromise<Axios.AxiosXHR<T>> {
    return this.request.post(url, data, options);
  }

  patch<T>(url: string, data: any, options: Axios.AxiosXHRConfigBase<T>): Axios.IPromise<Axios.AxiosXHR<T>> {
    return this.request.patch(url, data, options);
  }

  del<T>(url: string, data: any, params: Object, options: Axios.AxiosXHRConfigBase<T>): Axios.IPromise<Axios.AxiosXHR<T>> {
    const config: Axios.AxiosXHRConfig<T> = { url, data, params, ...options };
    return this.request.delete(url, config);
  }

  put<T>(url: string, data: any, params: Object, options: Axios.AxiosXHRConfigBase<T>): Axios.IPromise<Axios.AxiosXHR<T>> {
    return this.request.put(url, data, { params, ...options });
  }
}

export default HttpActions;