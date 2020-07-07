<template>
  <div class="timer">
    <b-row>
      <b-col>
        <div class="form-group">
          <label for="timerName">Timer name</label>
          <b-form-input
            v-model="timer.name"
            id="timerName"
            placeholder="Enter the timer name"
          ></b-form-input></div
      ></b-col>
      <b-col>
        <div class="form-group">
          <label for="timerTime">Time</label>
          <b-form-input
            v-model="timer.time"
            id="timerTime"
            placeholder="Enter the formatted time HH:MM:SS"
          ></b-form-input></div
      ></b-col>
    </b-row>
    <b-button variant="primary" @click="addTimer()">Add timer</b-button>
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
    name: "Timer",
    time: "",
  } as TimerModel;

  private addTimer() {
    const newTimer = _.cloneDeep(this.timer);
    this.$emit("addTimer", newTimer);
  }
}
</script>
