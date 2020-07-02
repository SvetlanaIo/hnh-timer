import { AxiosRequestConfig } from "axios";

type Headers = {
  [key: string]: string | number;
};

/**
 * Предзаданные опции HTTP клиента.
 *
 * @export
 * @class HttpClientOptions
 */
export class HttpClientOptions {
  private readonly baseUrl: string;
  private readonly headers: Headers;

  /**
   * Создать экземпляр HttpClientOptions.
   *
   * @param {string} baseURL Базовый URL запросов.
   * @param {any} headers Заголовки, пробрасываемые в запросах.
   * @memberof HttpClientOptions
   */
  constructor(baseUrl: string, headers: Headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  /**
   * Создать экземпляр axios опций запроса с заданной конфигурацией.
   *
   * @returns {AxiosRequestConfig} Опции маршрутизации axios.
   * @memberof HttpClientOptions
   */
  public create(): AxiosRequestConfig {
    return {
      baseURL: this.baseUrl,
      headers: this.headers,
    };
  }
}
