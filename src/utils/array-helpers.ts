import { SortOrder } from "./sort-order";

/**
 * Вспомогательные функции для работы с коллекциями для расширения штатных средств
 * работы с Array<T> методами расширения LINQ и принятым сигнатурам.
 *
 * @class ArrayHelpers
 */
export class ArrayHelpers {
  /**
   * Преобразовать каждый элемент коллекции в новую форму.
   *
   * @template T Тип элементов исходной коллекции.
   * @template U Тип коллекции назначения.
   * @param {T[]} array Исходная коллекция.
   * @param {(value: T, index: number, arr: T[]) => U} selector Функция преобразования.
   * @returns {U[]} Коллекция преобразованных элементов.
   */
  public static select<T, U>(
    array: T[],
    selector: (value: T, index: number, arr: T[]) => U,
  ): U[] {
    return array.map(selector);
  }

  /**
   * Фильтровать коллекцию на основе заданного предиката.
   *
   * @template T Тип элементов исходной коллекции.
   * @param {T[]} array Исходная коллекция.
   * @param {(value: T, index: number, arr: T[]) => boolean} predicate Функция проверки элемента на соответствие условию.
   * @returns {T[]} Коллекция элементов, удовлетворяющих предикату.
   */
  public static where<T>(
    array: T[],
    predicate: (value: T, index: number, arr: T[]) => boolean,
  ): T[] {
    return array.filter(predicate);
  }

  /**
   * Проверить коллекцию на наличие элементов (или элементов, удовлетворяющих условию).
   *
   * @template T Тип элементов исходной коллекции.
   * @param {T[]} array Исходная коллекция.
   * @param {(value: T, index: number, arr: T[]) => boolean} [predicate] Функция проверки элемента на соответствие условию.
   * @returns {boolean} Флаг наличия элементов (или элементов, удовлетворяющих условию).
   */
  public static any<T>(
    array: T[],
    predicate?: (value: T, index: number, arr: T[]) => boolean,
  ): boolean {
    if (predicate == null) {
      return array.length > 0;
    }
    return array.some(predicate);
  }

  /**
   * Проверяет все ли элементы коллекции на условие.
   *
   * @template T Тип элементов исходной коллекции.
   * @param {T[]} array Исходная коллекция.
   * @param {(value: T, index: number, arr: T[]) => boolean} predicate Функция проверки элемента на соответствие условию.
   * @returns {boolean} Флаг соответствия всех элементов коллекции предикату.
   */
  public static all<T>(
    array: T[],
    predicate: (value: T, index: number, arr: T[]) => boolean,
  ): boolean {
    return array.every(predicate);
  }

  /**
   * Пропустить указанное количество элементов коллекции.
   *
   * @template T Тип элементов исходной коллекции.
   * @param {T[]} array Исходная коллекция.
   * @param {number} count Количество пропускаемых элементов.
   * @returns {T[]} Результирующая коллекция.
   */
  public static skip<T>(array: T[], count: number): T[] {
    return array.slice(count);
  }

  /**
   * Вернуть указанное количество первых последовательных элементов коллекции.
   *
   * @template T Тип элементов исходной коллекции.
   * @param {T[]} array Исходная коллекция.
   * @param {number} count Количество возвращаемых элементов.
   * @returns {T[]} Результирующая коллекция.
   */
  public static take<T>(array: T[], count: number): T[] {
    return array.slice(0, count);
  }

  /**
   * Пропустить указанное количество первых элементов последовательности и вернуть
   * заданное количество последующих.
   *
   * @template T Тип элементов исходной коллекции.
   * @param {T[]} array Исходная коллекция.
   * @param {number} skip Количество пропускаемых элементов.
   * @param {number} take Количество возвращаемых элементов.
   * @returns {T[]} Результирующая коллекция.
   */
  public static skipTake<T>(array: T[], skip: number, take: number): T[] {
    return array.slice(skip, skip + take);
  }

  /**
   * Вернуть неповторяющиеся элементы коллекции.
   *
   * @template T Тип элементов исходной коллекции.
   * @param {T[]} array Исходная коллекция.
   * @returns {T[]} Результирующая коллекция.
   */
  public static distinct<T>(array: T[]): T[] {
    if (array.length == 0) return [];
    // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates?answertab=votes#tab-top
    return [...new Set(array)];
  }

  /**
   * Вернуть элементы коллекции с неповторяющимся ключом.
   *
   * @template T Тип элементов исходной коллекции.
   * @template K Ключ неповторяющихся элементов.
   * @param {T[]} array Исходная коллекция.
   * @param {(obj: T) => K} [property] Ключ элемента исходной коллекции.
   * @returns {T[]} Результирующая коллекция.
   */
  public static distinctBy<T, K>(array: T[], property?: (obj: T) => K): T[] {
    if (array.length == 0) return [];
    if (property == null) {
      return ArrayHelpers.distinct(array);
    }
    const keys = array.map(val => property(val));
    const result = array.filter(
      (item, index) => keys.indexOf(property(item)) == index,
    );

    return result;
  }

  /**
   * Упорядочить элементы коллекции.
   *
   * @template T Тип элементов исходной коллекции.
   * @template K Ключ сортировки элементов.
   * @param {T[]} array Исходная коллекция.
   * @param {(obj: T) => K} [property] Ключ элемента исходной коллекции.
   * @param {SortOrder} [order=SortOrder.Ascending] Порядок сортировки (по умолчанию -- по возрастанию).
   * @returns {T[]} Результирующая коллекция.
   */
  public static orderBy<T, K>(
    array: T[],
    property?: (obj: T) => K,
    order: SortOrder = SortOrder.Ascending,
  ): T[] {
    if (array.length == 0) return [];
    if (array.length == 1) return array;

    const result = array.sort(this.compareBy<T, K>(property, order));
    return result;
  }

  private static compareBy<T, K>(
    property?: (obj: T) => K,
    order: SortOrder = SortOrder.Ascending,
  ): (left: T, right: T) => number {
    return (left, right) => {
      const leftArg = property != null ? property(left) : left;
      const rightArg = property != null ? property(right) : right;
      if (leftArg > rightArg) return 1 * order;
      else if (leftArg < rightArg) return -1 * order;
      else return 0;
    };
  }

  /**
   * Вернуть первый элемент коллекции (всей или подмножества, удовлетворяющего условию) или undefined.
   *
   * @template T Тип элементов исходной коллекции.
   * @param {T[]} array Исходная коллекция.
   * @param {(value: T, index: number, arr: T[]) => boolean} [predicate] Функция проверки элемента на соответствие условию.
   * @returns {(T | undefined)} Элемент коллекции или undefined.
   */
  public static firstOrUndefined<T>(
    array: T[],
    predicate?: (value: T, index: number, arr: T[]) => boolean,
  ): T | undefined {
    if (array.length == 0) return undefined;
    if (predicate == null) {
      return array[0];
    }
    const result = array.find(predicate);
    return result;
  }

  /**
   * Вернуть первый элемент коллекции (всей или подмножества, удовлетворяющего условию) или значение по умолчанию.
   *
   * @template T Тип элементов исходной коллекции.
   * @param {T[]} array Исходная коллекция.
   * @param {T} value Значение по умолчанию.
   * @param {(value: T, index: number, arr: T[]) => boolean} [predicate]
   * @returns {T} Элемент коллекции или значение по умолчанию.
   */
  public static firstOrValue<T>(
    array: T[],
    value: T,
    predicate?: (value: T, index: number, arr: T[]) => boolean,
  ): T {
    if (array.length == 0) return value;
    if (predicate == null) {
      return array[0];
    }
    const result = array.find(predicate);
    if (result == undefined) return value;
    return result;
  }

  /**
   * Преобразовать каждый элемент последовательности коллекций в результирующую коллекцию.
   *
   * @template T Тип элементов исходной коллекции.
   * @template U Тип коллекции назначения.
   * @param {T[]} array Исходная коллекция.
   * @param {(value: T, index: number, arr: T[]) => U[]} callback Селектор элементов коллекций.
   * @returns {U[]} Результирующая коллекция.
   */
  public static selectMany<T, U>(
    array: T[],
    callback: (value: T, index: number, arr: T[]) => U[],
  ): U[] {
    if (array.length == 0) return [];
    // TODO: Не выполнять фильтрацию всего массива.
    // TODO: Придумать, как избавиться от явного callback'а.
    return array.map(callback).reduce((prev, current) => prev.concat(current));
  }

  /**
   * Сгруппировать элементы коллекции по значению указанного свойства.
   *
   * @template T Тип элементов исходной коллекции.
   * @template K Тип группировки элементов.
   * @param {T[]} array Исходная коллекция.
   * @param {(obj: T) => K} [property] Ключ группировки элементов.
   * @returns {T[][]} Результирующая коллекция значений и элементов.
   */
  public static groupBy<T, K>(array: T[], property: (obj: T) => K): T[][] {
    // TODO: Отчего-то кажется, что мощь типов TS здесь слабо задействована,
    //       попробовать переписать проще и элегантнее.
    const map = new Map<K, T[]>();
    for (const item of array) {
      const key = property(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    }
    const result = [...map.values()];
    return result;
  }

  /**
   * Проверить наличие данного элемента в коллекции.
   *
   * @template T Тип элементов исходной коллекции.
   * @param {T[]} array Исходная коллекция.
   * @param {T} value Проверяемый на наличие элемент.
   * @returns {boolean} Флаг наличия элемента в коллекции.
   */
  public static contains<T>(array: T[], value: T): boolean {
    return array.includes(value);
  }

  /**
   * Применить к последовательности агрегатную функцию, используя заданный
   * элемент в качестве начального значения, а указанную функцию в качестве
   * накопителя.
   *
   * @template T Тип элементов исходной коллекции.
   * @template U Тип коллекции назначения.
   * @param {T[]} array Исходная коллекция.
   * @param {U} initialValue Начальное значение агрегатной функции.
   * @param {(prev: U, cur: T, index: number, arr: T[]) => U} callback Функция-накопитель преобразования исходной коллекции.
   * @returns {U} Результат обработки коллекции агрегаторной функцией.
   */
  public static aggregate<T, U>(
    array: T[],
    initialValue: U,
    callback: (prev: U, cur: T, index: number, arr: T[]) => U,
  ): U {
    const result = array.reduce<U>(callback, initialValue);
    return result;
  }

  /**
   * Добавить элемент в конец коллекции.
   *
   * @template T Тип элементов исходной коллекции.
   * @param {T[]} array Исходная коллекция.
   * @param {T} value Добавляемый элемент.
   * @returns {T[]} Результирующая коллекция.
   */
  public static append<T>(array: T[], value: T): T[] {
    const result = [...array, value];
    return result;
  }

  /**
   * Добавить элемент в начало коллекции.
   *
   * @template T Тип элементов исходной коллекции.
   * @param {T[]} array Исходная коллекция.
   * @param {T} value Добавляемый элемент.
   * @returns {T[]} Результирующая коллекция.
   */
  public static prepend<T>(array: T[], value: T): T[] {
    const result = [value, ...array];
    return result;
  }

  /**
   * Вернуть элементы коллекции, не встречающиеся в проверочной.
   *
   * @template T Тип коллекций.
   * @param {T[]} array Исходная коллекция.
   * @param {T[]} value Проверочная коллекция.
   * @returns {T[]} Результирующая коллекция.
   */
  public static except<T>(array: T[], value: T[]): T[] {
    const result = array.filter(val => !value.includes(val));
    return result;
  }

  /**
   * Вернуть пересечение элементов коллекций.
   *
   * @template T Тип коллекций.
   * @param {T[]} array Исходная коллекция.
   * @param {T[]} value Коллекция пересечения.
   * @returns {T[]} Результирующая коллекция.
   */
  public static intersect<T>(array: T[], value: T[]): T[] {
    const result = array.filter(val => value.includes(val));
    return result;
  }

  /**
   * Вернуть уникальные элементы коллекций.
   *
   * @template T Тип коллекций.
   * @param {T[]} array Исходная коллекция.
   * @param {T[]} value Коллекция объединения.
   * @returns {T[]} Результирующая коллекция.
   */
  public static union<T>(array: T[], value: T[]): T[] {
    const result = new Set<T>([...array, ...value]);
    return [...result];
  }

  /**
   * Вернуть последний элемент коллекции (всей или подмножества, удовлетворяющего условию) или undefined.
   *
   * @template T Тип элементов исходной коллекции.
   * @param {T[]} array Исходная коллекция.
   * @param {(value: T, index: number, arr: T[]) => boolean} [predicate] Функция проверки элемента на соответствие условию.
   * @returns {(T | undefined)} Элемент коллекции или undefined.
   */
  public static lastOrUndefined<T>(
    array: T[],
    predicate?: (value: T, index: number, arr: T[]) => boolean,
  ): T | undefined {
    if (array.length == 0) return undefined;
    if (predicate == null) {
      return array[array.length - 1];
    }
    const filteredResult = array.where(predicate);
    if (filteredResult.length == 0) return undefined;
    const result = filteredResult[filteredResult.length - 1];
    return result;
  }

  /**
   * Вернуть последний элемент коллекции (всей или подмножества, удовлетворяющего условию) или значение по умолчанию.
   *
   * @template T Тип элементов исходной коллекции.
   * @param {T[]} array Исходная коллекция.
   * @param {T} value Значение по умолчанию.
   * @param {(value: T, index: number, arr: T[]) => boolean} [predicate]
   * @returns {T} Элемент коллекции или значение по умолчанию.
   */
  public static lastOrValue<T>(
    array: T[],
    value: T,
    predicate?: (value: T, index: number, arr: T[]) => boolean,
  ): T {
    if (array.length == 0) return value;
    if (predicate == null) {
      return array[array.length - 1];
    }
    const filteredResult = array.where(predicate);
    if (filteredResult.length == 0) return value;
    const result = filteredResult[filteredResult.length - 1];
    return result;
  }

  // TODO: Следует ориентироваться на более-менее полное соответствие (в пределах разумного)
  //       исходным методам LINQ по состоянию на (и выше):
  //       https://docs.microsoft.com/en-us/dotnet/api/system.linq.enumerable?view=netcore-3.1
  // - Агрегаторы: sum, average, min, max
  // - Генерация: repeat, range
  // - Фильтр: skipWhile, takeWhile
}

declare global {
  interface Array<T> {
    /**
     * Преобразовать каждый элемент коллекции в новую форму.
     *
     * @template T Тип элементов исходной коллекции.
     * @template U Тип коллекции назначения.
     * @param {(value: T, index: number, arr: T[]) => U} selector Функция преобразования.
     * @returns {U[]} Коллекция преобразованных элементов.
     */
    select<T, U>(selector: (value: T, index: number, arr: T[]) => U): U[];

    /**
     * Фильтровать коллекцию на основе заданного предиката.
     *
     * @template T Тип элементов исходной коллекции.
     * @param {(value: T, index: number, arr: T[]) => boolean} predicate Функция проверки элемента на соответствие условию.
     * @returns {T[]} Коллекция элементов, удовлетворяющих предикату.
     */
    where<T>(predicate: (value: T, index: number, arr: T[]) => boolean): T[];

    /**
     * Проверить коллекцию на наличие элементов (или элементов, удовлетворяющих условию).
     *
     * @template T Тип элементов исходной коллекции.
     * @param {(value: T, index: number, arr: T[]) => boolean} [predicate] Функция проверки элемента на соответствие условию.
     * @returns {boolean} Флаг наличия элементов (или элементов, удовлетворяющих условию).
     */
    any<T>(predicate?: (value: T, index: number, arr: T[]) => boolean): boolean;

    /**
     * Проверяет все ли элементы коллекции на условие.
     *
     * @template T Тип элементов исходной коллекции.
     * @param {(value: T, index: number, arr: T[]) => boolean} predicate Функция проверки элемента на соответствие условию.
     * @returns {boolean} Флаг соответствия всех элементов коллекции предикату.
     */
    all<T>(predicate: (value: T, index: number, arr: T[]) => boolean): boolean;

    /**
     * Пропустить указанное количество элементов коллекции.
     *
     * @template T Тип элементов исходной коллекции.
     * @param {number} count Количество пропускаемых элементов.
     * @returns {T[]} Результирующая коллекция.
     */
    skip<T>(count: number): T[];

    /**
     * Вернуть указанное количество первых последовательных элементов коллекции.
     *
     * @template T Тип элементов исходной коллекции.
     * @param {number} count Количество возвращаемых элементов.
     * @returns {T[]} Результирующая коллекция.
     */
    take<T>(count: number): T[];

    /**
     * Вернуть неповторяющиеся элементы коллекции.
     *
     * @template T Тип элементов исходной коллекции.
     * @returns {T[]} Результирующая коллекция.
     */
    distinct<T>(): T[];

    /**
     * Вернуть элементы коллекции с неповторяющимся ключом.
     *
     * @template T Тип элементов исходной коллекции.
     * @template K Ключ неповторяющихся элементов.
     * @param {(obj: T) => K} [property]
     * @returns {T[]} Результирующая коллекция.
     */
    distinctBy<T, K>(property?: (obj: T) => K): T[];

    /**
     * Упорядочить элементы коллекции.
     *
     * @template T Тип элементов исходной коллекции.
     * @template K Ключ сортировки элементов.
     * @param {(obj: T) => K} [property] Ключ элемента исходной коллекции.
     * @param {SortOrder} [order] Порядок сортировки (по умолчанию -- по возрастанию).
     * @returns {T[]} Результирующая коллекция.
     */
    orderBy<T, K>(property?: (obj: T) => K, order?: SortOrder): T[];

    /**
     * Упорядочить элементы коллекции по убыванию.
     *
     * @template T Тип элементов исходной коллекции.
     * @template K Ключ сортировки элементов.
     * @param {(obj: T) => K} [property] Ключ элемента исходной коллекции.
     * @returns {T[]} Результирующая коллекция.
     */
    orderByDescending<T, K>(property?: (obj: T) => K): T[];

    /**
     * Вернуть первый элемент коллекции (всей или подмножества, удовлетворяющего условию) или undefined.
     *
     * @template T Тип элементов исходной коллекции.
     * @param {(value: T, index: number, arr: T[]) => boolean} [predicate] Функция проверки элемента на соответствие условию.
     * @returns {(T | undefined)} Элемент коллекции или undefined.
     */
    firstOrUndefined<T>(
      predicate?: (value: T, index: number, arr: T[]) => boolean,
    ): T | undefined;

    /**
     * Вернуть первый элемент коллекции (всей или подмножества, удовлетворяющего условию) или значение по умолчанию.
     *
     * @template T Тип элементов исходной коллекции.
     * @param {T} value Значение по умолчанию.
     * @param {(value: T, index: number, arr: T[]) => boolean} [predicate] Функция проверки элемента на соответствие условию.
     * @returns {T} Элемент коллекции или значение по умолчанию.
     */
    firstOrValue<T>(
      value: T,
      predicate?: (value: T, index: number, arr: T[]) => boolean,
    ): T;

    /**
     * Преобразовать каждый элемент последовательности коллекций в результирующую коллекцию.
     *
     * @template T Тип элементов исходной коллекции.
     * @template U Тип коллекции назначения.
     * @param {(value: T, index: number, arr: T[]) => U[]} callback Селектор элементов коллекций.
     * @returns {U[]} Результирующая коллекция.
     */
    selectMany<T, U>(callback: (value: T, index: number, arr: T[]) => U[]): U[];

    /**
     * Сгруппировать элементы коллекции по значению указанного свойства.
     *
     * @template K Тип группировки элементов.
     * @param {T[]} array Исходная коллекция.
     * @param {(obj: T) => K} [property] Ключ группировки элементов.
     * @returns {T[][]} Результирующая коллекция значений и элементов.
     */
    groupBy<T, K>(property: (obj: T) => K): T[][];

    /**
     * Проверить наличие данного элемента в коллекции.
     *
     * @template T Тип элементов исходной коллекции.
     * @param {T} value Проверяемый на наличие элемент.
     * @returns {boolean} Флаг наличия элемента в коллекции.
     */
    contains<T>(value: T): boolean;

    /**
     * Проверить наличие данного элемента в коллекции.
     *
     * @template T Тип элементов исходной коллекции.
     * @param {T} value Проверяемый на наличие элемент.
     * @param {(value: T, index: number, arr: T[]) => boolean} [predicate] Функция проверки элемента на соответствие условию.
     * @returns {boolean} Флаг наличия элемента в коллекции.
     */
    contains<T>(
      value: T,
      predicate?: (value: T, index: number, arr: T[]) => boolean,
    ): boolean;

    /**
     * Применить к последовательности агрегатную функцию, используя заданный
     * элемент в качестве начального значения, а указанную функцию в качестве
     * накопителя.
     *
     * @template T Тип элементов исходной коллекции.
     * @template U Тип коллекции назначения.
     * @param {U} initialValue Начальное значение агрегатной функции.
     * @param {(prev: U, cur: T, index: number, arr: T[]) => U} callback Функция-накопитель преобразования исходной коллекции.
     * @returns {U} Результат обработки коллекции агрегаторной функцией.
     */
    aggregate<T, U>(
      initialValue: U,
      callback: (prev: U, cur: T, index: number, arr: T[]) => U,
    ): U;

    /**
     * Добавить элемент в конец коллекции.
     *
     * @template T Тип элементов исходной коллекции.
     * @param {T} value Добавляемый элемент.
     * @returns {T[]} Результирующая коллекция.
     */
    append<T>(value: T): T[];

    /**
     * Добавить элемент в начало коллекции.
     *
     * @template T Тип элементов исходной коллекции.
     * @param {T} value Добавляемый элемент.
     * @returns {T[]} Результирующая коллекция.
     */
    prepend<T>(value: T): T[];

    /**
     * Вернуть элементы коллекции, не встречающиеся в проверочной.
     *
     * @template T Тип коллекций.
     * @param {T[]} value Проверочная коллекция.
     * @returns {T[]} Результирующая коллекция.
     */
    except<T>(value: T[]): T[];

    /**
     * Вернуть пересечение элементов коллекций.
     *
     * @template T Тип коллекций.
     * @param {T[]} value Коллекция пересечения.
     * @returns {T[]} Результирующая коллекция.
     */
    intersect<T>(value: T[]): T[];

    /**
     * Вернуть уникальные элементы коллекций.
     *
     * @template T Тип коллекций.
     * @param {T[]} value Коллекция объединения.
     * @returns {T[]} Результирующая коллекция.
     */
    union<T>(value: T[]): T[];

    /**
     * Вернуть последний элемент коллекции (всей или подмножества, удовлетворяющего условию) или undefined.
     *
     * @template T Тип элементов исходной коллекции.
     * @param {(value: T, index: number, arr: T[]) => boolean} [predicate] Функция проверки элемента на соответствие условию.
     * @returns {(T | undefined)} Элемент коллекции или undefined.
     */
    lastOrUndefined<T>(
      predicate?: (value: T, index: number, arr: T[]) => boolean,
    ): T | undefined;

    /**
     * Вернуть последний элемент коллекции (всей или подмножества, удовлетворяющего условию) или значение по умолчанию.
     *
     * @template T Тип элементов исходной коллекции.
     * @param {T} value Значение по умолчанию.
     * @param {(value: T, index: number, arr: T[]) => boolean} [predicate]
     * @returns {T} Элемент коллекции или значение по умолчанию.
     */
    lastOrValue<T>(
      value: T,
      predicate?: (value: T, index: number, arr: T[]) => boolean,
    ): T;
  }
}

Array.prototype.select = function<T, U>(
  selector: (value: T, index: number, arr: T[]) => U,
): U[] {
  const caller = this as T[];
  return ArrayHelpers.select(caller, selector);
};

Array.prototype.where = function<T>(
  predicate: (value: T, index: number, arr: T[]) => boolean,
): T[] {
  const caller = this as T[];
  return ArrayHelpers.where(caller, predicate);
};

Array.prototype.any = function<T>(
  predicate?: (value: T, index: number, arr: T[]) => boolean,
): boolean {
  const caller = this as T[];
  return ArrayHelpers.any(caller, predicate);
};

Array.prototype.all = function<T>(
  predicate: (value: T, index: number, arr: T[]) => boolean,
): boolean {
  const caller = this as T[];
  return ArrayHelpers.all(caller, predicate);
};

Array.prototype.skip = function<T>(count: number): T[] {
  const caller = this as T[];
  return ArrayHelpers.skip(caller, count);
};

Array.prototype.take = function<T>(count: number): T[] {
  const caller = this as T[];
  return ArrayHelpers.take(caller, count);
};

Array.prototype.distinct = function<T>(): T[] {
  const caller = this as T[];
  return ArrayHelpers.distinct(caller);
};

Array.prototype.distinctBy = function<T, K>(property?: (obj: T) => K): T[] {
  const caller = this as T[];
  return ArrayHelpers.distinctBy(caller, property);
};

Array.prototype.orderBy = function<T, K>(
  property?: (obj: T) => K,
  order?: SortOrder,
): T[] {
  const caller = this as T[];
  const sortOrder = order ?? SortOrder.Ascending;
  return ArrayHelpers.orderBy(caller, property, sortOrder);
};

Array.prototype.orderByDescending = function<T, K>(
  property?: (obj: T) => K,
): T[] {
  const caller = this as T[];
  const sortOrder = SortOrder.Descending;
  return ArrayHelpers.orderBy(caller, property, sortOrder);
};

Array.prototype.firstOrUndefined = function<T>(
  predicate?: (value: T, index: number, arr: T[]) => boolean,
): T | undefined {
  const caller = this as T[];
  return ArrayHelpers.firstOrUndefined(caller, predicate);
};

Array.prototype.firstOrValue = function<T>(
  value: T,
  predicate?: (value: T, index: number, arr: T[]) => boolean,
): T {
  const caller = this as T[];
  return ArrayHelpers.firstOrValue(caller, value, predicate);
};

Array.prototype.selectMany = function<T, U>(
  callback: (value: T, index: number, arr: T[]) => U[],
): U[] {
  const caller = this as T[];
  return ArrayHelpers.selectMany(caller, callback);
};

Array.prototype.groupBy = function<T, K>(property: (obj: T) => K): T[][] {
  const caller = this as T[];
  return ArrayHelpers.groupBy(caller, property);
};

Array.prototype.contains = function<T>(value: T): boolean {
  const caller = this as T[];
  return ArrayHelpers.contains(caller, value);
};

Array.prototype.contains = function<T>(
  value: T,
  predicate?: (value: T, index: number, arr: T[]) => boolean,
): boolean {
  const caller = this as T[];
  return ArrayHelpers.any(caller, predicate);
};

Array.prototype.aggregate = function<T, U>(
  initialValue: U,
  callback: (prev: U, cur: T, index: number, arr: T[]) => U,
): U {
  const caller = this as T[];
  return ArrayHelpers.aggregate(caller, initialValue, callback);
};

Array.prototype.append = function<T>(value: T): T[] {
  const caller = this as T[];
  return ArrayHelpers.append(caller, value);
};

Array.prototype.prepend = function<T>(value: T): T[] {
  const caller = this as T[];
  return ArrayHelpers.prepend(caller, value);
};

Array.prototype.except = function<T>(value: T[]): T[] {
  const caller = this as T[];
  return ArrayHelpers.except(caller, value);
};

Array.prototype.intersect = function<T>(value: T[]): T[] {
  const caller = this as T[];
  return ArrayHelpers.intersect(caller, value);
};

Array.prototype.union = function<T>(value: T[]): T[] {
  const caller = this as T[];
  return ArrayHelpers.union(caller, value);
};

Array.prototype.lastOrUndefined = function<T>(
  predicate?: (value: T, index: number, arr: T[]) => boolean,
): T | undefined {
  const caller = this as T[];
  return ArrayHelpers.lastOrUndefined(caller, predicate);
};

Array.prototype.lastOrValue = function<T>(
  value: T,
  predicate?: (value: T, index: number, arr: T[]) => boolean,
): T {
  const caller = this as T[];
  return ArrayHelpers.lastOrValue(caller, value, predicate);
};

export {};
