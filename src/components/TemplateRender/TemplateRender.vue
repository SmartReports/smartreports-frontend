<template>
  <v-container>
    <h3 class="text-h4 mt-4">Report {{   }}</h3>
    <v-divider></v-divider>
    <v-container>

    <v-carousel
    cycle
    progress="primary"
    hide-delimiter-background
    show-arrows="hover"
  >
    <v-carousel-item
      v-for="(slide, i) in pages"
      :key="i"
    >

      <template>
        <DashboardElement
        />
        <!-- :chart-configuration="item.chart" -->
      </template>
    </v-carousel-item>
  </v-carousel>
</v-container>

  </v-container>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ReportTemplate } from "@/models"

  export default {
    data() {
      return {
        pages: 3,
      }
    },
    props: {
      modelValue: {
        type: Object as PropType<ReportTemplate>,
        required: true,
      }
    }
  }
</script>
