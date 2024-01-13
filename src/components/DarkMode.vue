<template>
    <v-icon
        id="dark-mode-switch"
        :model-value="darkMode"
        :v-model="darkMode"
        @click="toggleDarkMode"
        :icon="darkMode? 'mdi-white-balance-sunny': 'mdi-weather-night'"
        :color="darkMode? 'white':'black'">
      </v-icon>
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
    }
  },
  computed: {
      switchLabel: function () {
        return this.darkMode ? 'light' : 'dark';
      }
    },
  mounted() {
    this.darkMode = getTheme() === 'dark';
  }
}
</script>
