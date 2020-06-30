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
          <label for="timerTime">Время окончания</label>
          <b-form-input
            v-model="timer.time"
            id="timerTime"
            placeholder="Введите время в формате HH:MM:SS"
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

@Component({})
export default class App extends Vue {
  public timer = {
    name: "Default",
    time: new Date(),
  } as TimerModel;

  public addTimer() {
    this.$emit("addTimer", this.timer);
  }
}
</script>
