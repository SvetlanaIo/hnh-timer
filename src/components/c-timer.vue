<template>
  <div class="timer">
    <b-row>
      <b-col>
        <div class="form-group">
          <label for="timerName">Название таймера</label>
          <b-form-input
            v-model="timer.name"
            id="timerName"
            placeholder="Введите название"
          ></b-form-input></div
      ></b-col>
      <b-col>
        <div class="form-group">
          <label for="timerTime">Время</label>
          <b-form-input
            v-model="timer.time"
            id="timerTime"
            placeholder="Введите количество часов"
          ></b-form-input></div
      ></b-col>
    </b-row>
    <b-button variant="primary" @click="addTimer()">Добавить таймер</b-button>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { TimerModel } from "@/models/timer-models";
import _ from "lodash";

@Component({})
export default class Timer extends Vue {
  //@TODO: Требует обязательно айдишник
  private timer = {
    // timerId: 0,
    name: "Таймер",
    time: 0,
  } as TimerModel;

  private addTimer() {
    const newTimer = _.cloneDeep(this.timer);
    this.$emit("addTimer", newTimer);
  }
}
</script>
