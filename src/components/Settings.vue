<template>
  <v-container>
    <h3 class="text-h4 mt-4">Settings</h3>
    <v-divider></v-divider>

    <v-container>
      <v-list>
        <v-list-item>
          <v-container class="pa-4">
            <v-list-item>
              <v-switch
                :model="darkMode"
                @change="toggleDarkMode"
                :label="`toggle ${switchLabel} mode`"
                hide-details inset
                color="orange">
              </v-switch>
            </v-list-item>
          </v-container>
        </v-list-item>
      </v-list>
    </v-container>
  </v-container>

</template>

<script lang="ts">
export default {
  data() {
    return {
      darkMode: false,
    }
  },
  methods: {
    toggleDarkMode: function () {
          (this.$vuetify.theme as any).global.name = this.darkMode ? 'dark' : 'light';
          this.darkMode = !this.darkMode;
    }
  },
  computed: {
      switchLabel: function () {
        return !this.darkMode ? 'light' : 'dark';
      }
    },
}
</script>
