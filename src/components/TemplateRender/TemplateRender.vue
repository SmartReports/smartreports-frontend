<template>
  <v-container>
    <h3 class="text-h4 mt-4">Report {{   }}</h3>
    <v-divider></v-divider>
    <v-container>

      <v-card theme="dark" flat rounded="0">
    <v-window v-model="onboarding">
      <v-window-item v-for="n in pages" :key="`card-${n}`" :value="n">
        <v-card height="200" class="d-flex justify-center align-center">
          <span class="text-h2"> Card {{ n }} </span>
        </v-card>
      </v-window-item>
    </v-window>

    <v-card-actions class="justify-space-between">
      <v-btn variant="plain" icon="mdi-chevron-left" @click="prev"></v-btn>
      <v-item-group v-model="onboarding" class="text-center" mandatory>
        <v-item
          v-for="n in pages"
          :key="`btn-${n}`"
          v-slot="{ isSelected, toggle }"
          :value="n"
        >
          <v-btn
            :variant="isSelected ? 'outlined' : 'text'"
            icon="mdi-record"
            @click="toggle"
          ></v-btn>
        </v-item>
      </v-item-group>
      <v-btn variant="plain" icon="mdi-chevron-right" @click="next"></v-btn>
    </v-card-actions>
  </v-card>
</v-container>

  </v-container>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ReportTemplate } from "@/models"

  export default defineComponent({
    data() {
      return {
        pages: 3,
      onboarding: 1,

      }
    },
    methods: {
      next() {
        this.onboarding =
          this.onboarding + 1 > this.pages ? 1 : this.onboarding + 1
      },
      prev() {
        this.onboarding =
          this.onboarding - 1 <= 0 ? this.pages : this.onboarding - 1
      },
    },
    props: {
      modelValue: {
        type: Object as PropType<ReportTemplate>,
        required: true,
      }
    }
  })
</script>
