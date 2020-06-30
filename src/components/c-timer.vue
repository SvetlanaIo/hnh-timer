<template>
  <div id="app">
    <input type="text" v-model="timer.name" placeholder="Введите название" />
    <input
      style="width: 400px;"
      v-model="timer.time"
      type="text"
      placeholder="Введите время в формате HH:MM:SS"
    />
    <button @click="addTimer()">Добавить таймер</button>
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
