// Любовно воссозданный привычный класс в чуждом и враждебном окружении.
// https://github.com/dotnet/runtime/blob/master/src/libraries/System.Private.CoreLib/src/System/Random.cs
export class Random {
  private readonly mSmall = -2147483648;
  private readonly mBig = 2147483647;
  private readonly mSeed = 161803398;
  private readonly seedArray: number[] = new Array<number>(56);

  private iNext = 0;
  private iNextP = 21;

  constructor(seed?: number) {
    if (seed == null) seed = this.generateSeed();

    const subtraction = seed == this.mSmall ? this.mBig : Math.abs(seed);
    let mj = this.mSeed - subtraction;
    this.seedArray[55] = mj;

    let mk = 1;
    let ii = 0;
    for (let i = 1; i < 55; i++) {
      if ((ii += 21) >= 55) ii -= 55;
      this.seedArray[ii] = mk;
      mk = mj - mk;
      if (mk < 0) mk += this.mBig;
      mj = this.seedArray[ii];
    }

    for (let k = 1; k < 5; k++) {
      for (let i = 1; i < 56; i++) {
        let n = i + 30;
        if (n >= 55) n -= 55;
        this.seedArray[i] -= this.seedArray[1 + n];
        if (this.seedArray[i] < 0) this.seedArray[i] += this.mBig;
      }
    }
  }

  private generateSeed(): number {
    const result = Math.floor(
      Math.random() * (this.mBig - this.mSmall) + this.mSmall,
    );
    return result;
  }

  private internalSample(): number {
    let locINext = this.iNext;
    let locINextP = this.iNextP;

    if (++locINext >= 56) locINext = 1;
    if (++locINextP >= 56) locINextP = 1;

    let result = this.seedArray[locINext] - this.seedArray[locINextP];

    if (result == this.mBig) result--;
    if (result < 0) result += this.mBig;

    this.seedArray[locINext] = result;

    this.iNext = locINext;
    this.iNextP = locINextP;

    return result;
  }

  private sample(): number {
    //Including this division at the end gives us significantly improved
    //random number distribution.
    return this.internalSample() * (1.0 / this.mBig);
  }

  public next(minValue?: number, maxValue?: number): number {
    if (minValue != null && maxValue == null) return this.sample() + minValue;
    if (minValue == null && maxValue != null) minValue = 0;
    if (minValue != null && maxValue != null) {
      const range = maxValue - minValue;
      return this.sample() * range + minValue;
    }
    return this.internalSample();
  }

  public nextInteger(minValue?: number, maxValue?: number): number {
    const doubleResult = this.next(minValue, maxValue);
    const result = Math.floor(doubleResult);
    return result;
  }

  public nextDouble(): number {
    return this.sample();
  }

  public nextBytes(buffer: number[]): void {
    for (let i = 0; i < buffer.length; i++) {
      buffer[i] = this.internalSample() % 256;
    }
  }

  public nextLong(minValue?: number, maxValue?: number): number {
    const buffer = new Array(8);
    this.nextBytes(buffer);
    const longResult = this.toNumber(buffer);

    if (minValue != null && maxValue == null) return longResult + minValue;
    if (minValue == null && maxValue != null) minValue = 0;
    if (minValue != null && maxValue != null)
      return Math.abs(longResult % (maxValue - minValue)) + minValue;

    return longResult;
  }

  // TODO: Подумать, стоит ли сделать методы публичными и вынести в отдельный класс?
  private toNumber(byteArray: number[]): number {
    let result = 0;
    for (let i = byteArray.length - 1; i >= 0; i--) {
      result = result * 256 + byteArray[i];
    }
    return result;
  }

  private toByteArray(value: number): number[] {
    const byteArray = [0, 0, 0, 0, 0, 0, 0, 0];
    for (let index = 0; index < byteArray.length; index++) {
      const byte = value & 0xff;
      byteArray[index] = byte;
      value = (value - byte) / 256;
    }
    return byteArray;
  }
}
