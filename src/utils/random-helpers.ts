// REM: Внимание! Каждый из методов должен иметь опциональный параметр типа
//      Random. При отсутствии следует использовать встроенный Math.random().
//      При передаче параметра -- использовать ГПСЧ из библиотеки расширений
//      (т.к. позволяет задавать seed, результат сходится с dotnetcore).

import { Random } from "./random";

/**
 * Вспомогательные функции для работы с ГПСЧ.
 *
 */
export class RandomHelpers {
  /**
   * Создать новую случайную буквенно-цифирную строку заданной длины.
   *
   * @param {number} length Требуемая длина строки.
   * @param {Random} random Экземпляр ГПСЧ.
   * @returns {string} Строка латинских символов и цифр заданной длины.
   */
  public static getNonce(length: number, random?: Random): string {
    let randomStr = "";
    if (length < 1) return randomStr;
    while (randomStr.length < length) {
      const randomVal = random?.nextDouble() ?? Math.random();
      randomStr += randomVal // 0.29660434090227095
        .toString(36) // 0.1efyhwrfd82
        .slice(2, 12); // 1efyhwrfd82
    }
    const result = randomStr.substr(0, length);
    return result;
  }

  /**
   * Создать новую случайную строку заданной длины с заданными символами.
   *
   * @param {number} length Требуемая длина строки.
   * @param {Random} random Экземпляр ГПСЧ.
   * @returns {string} Строка латинских символов и цифр заданной длины.
   */
  public static getRandomString(
    length: number,
    random?: Random,
    charset = "aeiouwjptksmnl", // toki pona kalama! ;^)
  ): string {
    let result = "";
    while (result.length < length) {
      const randomVal = random != null ? random.nextDouble() : Math.random();
      result += charset.charAt(Math.floor(randomVal * charset.length));
    }
    return result;
  }

  /**
   * Получить случайный 64-битный идентификатор.
   *
   * @param {number} [minValue=1] Начало диапазона идентификаторов (1 по умолчанию).
   * @param {Random} [random] Экземпляр ГПСЧ.
   * @returns {number} Случайный идентификатор.
   */
  public static getId(minValue?: number, random?: Random): number {
    if (minValue == null) minValue = 1;
    if (random == null) {
      const result = this.randomInteger(minValue, Number.MAX_SAFE_INTEGER);
      return result;
    }
    return random.nextLong(minValue);
  }

  /**
   * Сгенерировать случайное целое число.
   *
   * @param {number} min Нижняя граница (включительная).
   * @param {number} max Верхняя граница (исключительная).
   * @returns {number} Случайный результат.
   */
  private static randomInteger(min: number, max: number): number {
    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    return result;
  }

  /**
   * Сгенерировать случайное число.
   *
   * @param {number} min Нижняя граница (включительная).
   * @param {number} max Верхняя граница (исключительная).
   * @returns {number} Случайный результат.
   */
  private static randomNumber(min: number, max: number): number {
    const result = Math.random() * (max - min) + min;
    return result;
  }
}
