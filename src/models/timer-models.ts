export type TimerModel = {
  // timerId: Number;
  name: String;
  time: String;
  type: TimerType;
};

export type TimerType = "Other" | "Smelting" | "Steel" | "Cheese";
