<template>
  <div>
    <h1 class="page-title">Timers</h1>
    <section class="section">
      <c-timer @addTimer="onAddTimer"></c-timer>
    </section>
    <section class="section timer-list">
      <h3>Timers list</h3>
      <b-list-group v-if="timerList.length">
        <b-list-group-item v-for="(timer, index) in timerList" :key="index">
          <span>
            {{ timer.name }}
          </span>
          <span>
            {{ timer.time }}
          </span>
          <b-button variant="light" @click="startTimer(timer.time)"
            ><span class="material-icons">play_arrow</span></b-button
          >
          <b-button variant="light"
            ><span class="material-icons">pause</span></b-button
          >
          <b-button variant="light"
            ><span class="material-icons">stop</span></b-button
          >
        </b-list-group-item>
      </b-list-group>
      <span v-else>Список таймеров пуст</span>
    </section>
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
export default class PageTimers extends Vue {
  private timerList: TimerModel[] = [];

  protected created(): void {
    const storeTimerList = JSON.parse(
      localStorage.getItem("timerList") || "{}",
    );

    storeTimerList.forEach((timer: TimerModel) => {
      this.timerList.push(timer);
    });
  }

  private onAddTimer(timer: TimerModel) {
    const timerExists = this.timerList.any<TimerModel>(
      (val) => val.name == timer.name,
    );

    if (timerExists) {
      alert(`Таймер с названием ${timer.name} уже существует`);
      return;
    }

    this.timerList.push(timer);
    localStorage.setItem("timerList", JSON.stringify(this.timerList));
  }

  private startTimer(time: string) {
    console.log(time);
  }
}
</script>
<style lang="scss" scoped>
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
// @import "../src/assets/nprogress.css";

.section {
  & + & {
    margin-top: 40px;
  }
}

.page-title {
  margin: 24px 0;
}

.list-group {
  margin-top: 16px;
}
</style>
