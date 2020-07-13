<template>
  <div id="app">
    <b-container fluid="md">
      <router-view class="" />
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({})
export default class App extends Vue {}
</script>

<style lang="scss" scoped></style>
