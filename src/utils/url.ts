/**
 * Вспомогательный класс взаимодействия с Url.
 *
 * @class Url
 */
export class Url {
  /**
   * Получить базовый адрес исполнения приложения
   * (протокол + хост + порт, если есть).
   *
   * @returns {string} Базовый адрес исполнения приложения.
   */
  public static getCurrentBase(): string {
    const result = `${window.location.protocol}//${window.location.hostname}${
      window.location.port ? `:${window.location.port}` : ""
    }`;
    return result;
  }
}
