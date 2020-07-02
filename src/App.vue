<template>
  <div id="app">
    <b-container fluid>
      <h1 class="page-title">Таймеры</h1>
      <section class="section">
        <c-timer @addTimer="onAddTimer"></c-timer>
      </section>
      <section class="section timer-list">
        <h3>Список таймеров</h3>
        <b-list-group v-if="timerList.length">
          <b-list-group-item v-for="(timer, index) in timerList" :key="index">
            <span>
              {{ timer.name }}
            </span>
            <span>
              {{ timer.time }}
            </span>
          </b-list-group-item>
        </b-list-group>
        <span v-else>Список таймеров пуст</span>
      </section>
    </b-container>
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
export default class PageTimer extends Vue {
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
    }

    this.timerList.push(timer);
    localStorage.setItem("timerList", JSON.stringify(this.timerList));
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
@import "../src/assets/nprogress.css";

.container-fluid {
  max-width: 1200px;
}

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
