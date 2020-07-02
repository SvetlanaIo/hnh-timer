/**
 * Вспомогательные функции для работы со строками.
 *
 * @class StringHelpers
 */
export class StringHelpers {
  // TODO: Подумать и реализовать методы, обратные двум следующим. Кроме того, сдаётся мне,
  //       было бы _крайне уместно_ создать универсальный конвертер между различными типами написания.
  /**
   * Преобразовать строку из camelCase в snake_case.
   *
   * @param {string} str Исходная строка в camelCase.
   * @returns {string} Результирующая строка в snake_case.
   */
  public static camelToSnakeCase(str: string): string {
    const result = str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    return result;
  }

  /**
   * Преобразовать строку из camelCase в lisp-case.
   *
   * @param {string} str Исходная строка в camelCase.
   * @returns {string} Результирующая строка в lisp-case.
   */
  public static camelToLispCase(str: string): string {
    const result = str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
    return result;
  }

  /**
   * Проверить вхождение подстроки.
   *
   * @param {string} str Исходная строка.
   * @param {string} value Искомая подстрока.
   * @returns {boolean} Флаг наличия подстроки.
   */
  public static contains(str: string, value: string): boolean {
    if (str.indexOf(value) != -1) return true;
    return false;
  }

  /**
   * Проверить, начинается ли строка с подстроки.
   *
   * @param {string} str Искомая строка.
   * @param {string} value Искомая подстрока.
   * @returns {boolean} Флаг наличия подстроки в начале.
   */
  public static startsWith(str: string, value: string): boolean {
    if (str.length < value.length) return false;
    return str.slice(0, value.length) == value;
  }

  /**
   * Проверить, заканчивается ли строка подстрокой.
   *
   * @param {string} str Искомая строка.
   * @param {string} value Искомая подстрока.
   * @returns {boolean} Флаг наличия подстроки в конце.
   */
  public static endsWith(str: string, value: string): boolean {
    if (str.length < value.length) return false;
    return str.slice(str.length - value.length) == value;
  }

  /**
   * Проверить объект на соответствие пустой или отсутствующей строке.
   *
   * @param {unknown} obj Объект, соответствие которого проверяется.
   * @returns {boolean} Флаг пустой или отсутствующей строки.
   */
  public static isNullOrEmpty(obj: unknown): boolean {
    if (obj == null) return true;
    if (typeof obj != "string") return true;
    const str = obj as string; // Приведение избыточно, но останется для ясности.
    if (str.length == 0) return true;
    // REM: Не используется возврат прошлого условного выражения для возможного расширения
    //      (вероятно, в связи с особенностями JS/TS придётся чем-то дополнить).
    return false;
  }

  /**
   * Проверить объект на соответствие пустой, отсутствующей строке или строке непечатных символов.
   *
   * @param {unknown} obj Объект, соответствие которого проверяется.
   * @returns {boolean} Флаг пустой, отсутствующей строки или строки непечатных символов.
   */
  public static isNullOrWhiteSpace(obj: unknown): boolean {
    if (obj == null) return true;
    if (typeof obj != "string") return true;
    const str = obj as string; // Приведение избыточно, но останется для ясности.
    if (str.trim().length == 0) return true;
    // REM: Не используется возврат прошлого условного выражения для возможного расширения
    //      (вероятно, в связи с особенностями JS/TS придётся чем-то дополнить).
    return false;
  }
}

// Объявления методов расширения.
declare global {
  // Расширение интерфейса методами вспомогательных функций.
  interface String {
    /**
     * Преобразовать строку из camelCase в snake_case.
     *
     * @returns {string} Результирующая строка в snake_case.
     */
    camelToSnakeCase(): string;

    /**
     * Преобразовать строку из camelCase в lisp-case.
     *
     * @returns {string} Результирующая строка в lisp-case.
     */
    camelToLispCase(): string;

    /**
     * Проверить вхождение подстроки.
     *
     * @param {string} value Искомая подстрока.
     * @returns {boolean} Флаг наличия подстроки.
     */
    contains(value: string): boolean;

    /**
     * Проверить, начинается ли строка с подстроки.
     *
     * @param {string} value Искомая подстрока.
     * @returns {boolean} Флаг наличия подстроки в начале.
     */
    startsWith(value: string): boolean;

    /**
     * Проверить, заканчивается ли строка подстрокой.
     *
     * @param {string} value Искомая подстрока.
     * @returns {boolean} Флаг наличия подстроки в конце.
     */
    endsWith(value: string): boolean;

    /**
     * Проверить объект на соответствие пустой или отсутствующей строке.
     *
     * @returns {boolean} Флаг пустой или отсутствующей строки.
     */
    isNullOrEmpty(): boolean;

    /**
     * Проверить объект на соответствие пустой, отсутствующей строке или строке непечатных символов.
     *
     * @returns {boolean} Флаг пустой, отсутствующей строки или строки непечатных символов.
     */
    isNullOrWhiteSpace(): boolean;
  }
}

String.prototype.camelToSnakeCase = function() {
  const caller = String(this);
  return StringHelpers.camelToSnakeCase(caller);
};

String.prototype.camelToLispCase = function() {
  const caller = String(this);
  return StringHelpers.camelToLispCase(caller);
};

String.prototype.contains = function(value: string) {
  const caller = String(this);
  return StringHelpers.contains(caller, value);
};

String.prototype.startsWith = function(value: string) {
  const caller = String(this);
  return StringHelpers.startsWith(caller, value);
};

String.prototype.endsWith = function(value: string) {
  const caller = String(this);
  return StringHelpers.endsWith(caller, value);
};

String.prototype.isNullOrEmpty = function() {
  const caller = String(this);
  return StringHelpers.isNullOrEmpty(caller);
};

String.prototype.isNullOrWhiteSpace = function() {
  const caller = String(this);
  return StringHelpers.isNullOrWhiteSpace(caller);
};

export {};
