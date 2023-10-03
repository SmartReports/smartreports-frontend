<template>
  <v-card class="mx-auto">
    <v-card-text>
      <div>Page {{ index + 1 }}</div>
      <div class="">
        <div class="d-flex justify-end align-center">
          <p class="text-overline mr-4">Page layout</p>
          <v-btn-toggle
            class="border"
            :modelValue="modelValue.layout"
            @update:model-value="onUpdate('layout', $event)"
            divided
          >
            <v-btn value="horizontal" icon="mdi-land-rows-horizontal"></v-btn>
            <v-btn value="vertical" icon="mdi-land-rows-vertical"></v-btn>
            <v-btn value="grid" icon="mdi-view-grid-outline"></v-btn>
          </v-btn-toggle>
        </div>

        <div class="mb-8 d-flex flex-column">
          <h3 class="text-h5">KPI</h3>
          <p class="v-card-subtitle pl-0">
            KPI's shown on page {{ index + 1 }}.
          </p>
        </div>
        <!-- kpis -->
        <v-row v-for="(element, index) in modelValue.elements" :key="index">
          <v-col cols="12">
            <TemplatePageElementEditor
              class="pb-10"
              :modelValue="element"
              @update:modelValue="onUpdateElement(index, $event)"
              :index="index"
            />
          </v-col>
        </v-row>

        <!-- add btn -->
        <v-btn
          @click="onAddElement()"
          color="primary"
          target="_blank"
          variant="flat"
        >
          <v-icon icon="mdi-plus" start />
          Add
        </v-btn>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn variant="text" color="deep-purple-accent-4"> Learn More </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ReportTemplatePage } from "../models";
import TemplatePageElementEditor from "./TemplatePageElementEditor.vue";
export default defineComponent({
  name: "TemplatePageEditor",
  props: {
    modelValue: {
      type: Object as PropType<ReportTemplatePage>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  methods: {
    onUpdate<K extends keyof ReportTemplatePage>(
      key: K,
      value: ReportTemplatePage[K]
    ) {
      this.$emit("update:modelValue", {
        ...this.modelValue,
        [key]: value,
      });
    },
    onUpdateElement(index: number, value: any) {
      console.log("onUpdateElement", index, value);
      const elements = [...this.modelValue.elements];
      elements[index] = value;
      this.onUpdate("elements", elements);
    },
    onAddElement() {
      this.onUpdate("elements", [
        ...this.modelValue.elements,
        {
          kpi: "",
          chart_type: "bar",
        },
      ]);
    },
  },
  computed: {},
  components: { TemplatePageElementEditor },
});
</script>

<style></style>
