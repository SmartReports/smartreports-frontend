<template>
        <v-btn v-for="item in items" class="back-btn" elevation="0" small :color="item.color" :disabled="item.disabled" :to="item.href">
          <v-icon icon="mdi-chevron-left"></v-icon>{{ item.title }}
          </v-btn>
    <v-card-text class="text-h3 mt-1">{{ modelValue.name }}</v-card-text>
    <v-card-text class="text-h6">You Receive a snapshot of this Dash {{ modelValue.frequency }}</v-card-text>
    <v-divider :elevation="0"></v-divider>
    <v-window id="TemplateRender" v-model="onboarding" direction="vertical" style="overflow:auto">
        <v-window-item v-for="(page, i) in pages" :key="`card-${i}`" :value="i">
          <div class="pt-4"></div>
            <v-container class="d-flex justify-center align-center "  style="overflow:auto">
              <dash-page :user_type="user_type" :modelPage="page"></dash-page>
            </v-container>
          <div class="pt-12"></div>
          <v-card-subtitle class="d-flex justify-center align-center">Page: {{ i + 1  }} Kind: {{ page.layout }}</v-card-subtitle>
        </v-window-item>
      </v-window>
      <v-card-actions class="justify-space-between">
        <v-btn :disabled="onboarding<=0" variant="plain" icon="mdi-chevron-left" @click="prev"></v-btn>
        <v-btn :disabled="onboarding==pages.length-1" variant="plain" icon="mdi-chevron-right" @click="next"></v-btn>
      </v-card-actions>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted } from 'vue';
import { ReportTemplate, ReportTemplatePage } from "@/models"
import { useMainStore } from "@/store/app";
import DashPage from './DashPage.vue';
import { mapStores } from "pinia";
import html2canvas from 'html2canvas'
import { it } from 'node:test';

export default defineComponent({
  data() {
    return {
        modelValue: {} as ReportTemplate,
        pages: {} as ReportTemplatePage[],
        onboarding: 0,
        items: [
          {
            title: 'Back',
            disabled: false,
            href: '/dashes',
            color: 'primary'
          },
        ],
    };
  },
  props:{
    user_type: {
      type: String,
      required: true,
    }
  },
  methods:{
    reset(){
      this.modelValue = {} as ReportTemplate,
      this.pages = {} as ReportTemplatePage[],
      this.onboarding = 0
    },
    getModel(){
      return this.mainStore.getCurrentModelValue() as ReportTemplate
    },
    getPages(){
      return this.modelValue.pages as ReportTemplatePage[]
    },
    next() {
        this.onboarding =
            this.onboarding + 1 > this.pages.length ? 1 : this.onboarding + 1;
        },
    prev() {
        this.onboarding =
            this.onboarding - 1 < 0 ? this.pages.length : this.onboarding - 1;
        },
  },
  created() {
    this.modelValue = this.mainStore.getCurrentModelValue() as ReportTemplate;
    this.pages = this.modelValue.pages as ReportTemplatePage[];
  },
  computed:{
      ...mapStores(useMainStore),
  },
  components: { DashPage }
})
</script>

<style>
</style>
