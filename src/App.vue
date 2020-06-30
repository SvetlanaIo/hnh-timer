<template>
  <div id="app">
    <c-timer @addTimer="onAddTimer"></c-timer>
    <ul v-for="(timer, index) in timerList" :key="index">
      <li>
        <span>
          {{ timer.name }}
        </span>
        <span>
          {{ timer.time }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { TimerModel } from "@/models/timer-models";
import Timer from "@/components/c-timer.vue";

@Component({
  components: {
    "c-timer": Timer,
  },
})
export default class App extends Vue {
  // public timer =
  public timerList: TimerModel[] = [];

  // protected created(): void {}
  public onAddTimer(timer: any) {
    console.log(timer);
    this.timerList.push(timer);
  }
}
</script>

<style>
.material-icons {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: "liga";
  -webkit-font-smoothing: antialiased;
}
@import "../src/assets/nprogress.css";
</style>
