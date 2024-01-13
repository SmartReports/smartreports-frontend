<template>
    <v-icon
        v-if="!isMobile"
        id="dark-mode-switch"
        :model-value="darkMode"
        :v-model="darkMode"
        @click="toggleDarkMode"
        :icon="darkMode? 'mdi-white-balance-sunny': 'mdi-weather-night'"
        :color="darkMode? 'white':'black'">
      </v-icon>

    <v-text id="dark-mode-switch" v-if="isMobile" @click="toggleDarkMode" :v-model="darkMode" :model-value="darkMode"></v-text>
</template>

<script lang="ts">

import { getTheme } from '../plugins/index';

export default {
  data() {
    return {
      darkMode: false,
    }
  },
  methods: {
    toggleDarkMode: function () {
          this.darkMode = !this.darkMode;
          localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
          // Don't ask, it works
          (this.$vuetify.theme as any).global.name = !this.darkMode ? 'dark' : 'light';
          (this.$vuetify.theme as any).global.name = this.darkMode ? 'dark' : 'light';
    },
  },
  computed: {
    isMobile() { return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); },
      switchLabel: function () {
        return this.darkMode ? 'light' : 'dark';
      }
    },
  mounted() {
    this.darkMode = getTheme() === 'dark';
  }
}
</script>
