<template>
  <v-container class="fill-height">
    <v-responsive class="fill-height">
      <!-- <v-img height="300" src="@/assets/logo.svg" /> -->

      <!-- <div class="text-body-2 font-weight-light mb-n1">Report</div> -->

      <h3 class="text-h4 font-weight-bold mt-4">Report Template Editor</h3>

      <div class="pt-12" />

      <v-row class="d-flex align-center">
        <v-col cols="8">
          <v-text-field label="Name" v-model="modelValue.name" />
        </v-col>

        <v-col cols="4">
          <v-select
            :items="['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']"
            label="Frequency"
            v-model="modelValue.frequency"
          />
        </v-col>

        <!-- <v-col cols="auto">
          <v-btn
            color="primary"
            href="https://vuetifyjs.com/introduction/why-vuetify/#feature-guides"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            target="_blank"
            variant="flat"
          >
            <v-icon icon="mdi-speedometer" size="large" start />

            Get Started
          </v-btn>
        </v-col> -->
      </v-row>
      <v-row class="d-flex-col align-center mt-10 mb-8">
        <v-col cols="auto">
          <h4 class="text-h5">Pages ({{ modelValue.pages.length }})</h4>
        </v-col>
        <v-col cols="auto">
          <v-btn
            @click="onAddPage()"
            color="primary"
            target="_blank"
            variant="flat"
          >
            <v-icon icon="mdi-plus" start />
            Add
          </v-btn>
        </v-col>
      </v-row>

      <v-row v-for="(page, index) in modelValue.pages" :key="index">
        <v-col cols="auto">
          <TemplatePageEditor
            class="pb-10"
            :modelValue="page"
            :index="index"
            @update:model-value="onPageUpdate(index, $event)"
          />
        </v-col>
      </v-row>

      <!-- {{ modelValue.pages[0].layout }} -->
    </v-responsive>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ReportTemplate, ReportTemplatePage } from "../models";
import TemplatePageEditor from "./TemplatePageEditor.vue";
export default defineComponent({
  name: "TemplateEditor",
  props: {},
  data() {
    return {
      modelValue: {
        frequency: "weekly",
        name: "Your report",
        pages: [
          {
            elements: [],
            layout: "grid",
          },
        ],
      } as ReportTemplate,
    };
  },
  methods: {
    onPageUpdate(index: number, value: ReportTemplatePage) {
      this.modelValue.pages[index] = value;
    },
    onAddPage() {
      this.modelValue.pages.push({
        elements: [],
        layout: "grid",
      });
    },
  },
  computed: {},
  components: { TemplatePageEditor },
});
</script>

<style></style>
