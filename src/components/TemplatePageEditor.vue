<template>
  <v-card class="mx-auto">
    <v-card-text>
      <div class="mt-n2 mb-4 d-flex align-center justify-space-between">
        <div>Page {{ index + 1 }}</div>
        <v-btn
          class="text-grey-darken-1"
          @click="onRemove()"
          icon="mdi-delete"
          variant="text"
          tooltip="Remove "
        />
      </div>

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

        <div class="mb-8 mt-n4 d-flex flex-column">
          <h3 class="text-h5">KPI</h3>
          <p class="v-card-subtitle pl-0">
            KPI's shown on page {{ index + 1 }}.
          </p>
        </div>
        <!-- kpis -->
        <v-row v-for="(element, index) in modelValue.elements" :key="index">
          <v-col cols="12">
            <TemplatePageElementEditor
              class="pb-4"
              :modelValue="element"
              @update:modelValue="onUpdateElement(index, $event)"
              @remove="onRemoveElement(index)"
              :index="index"
            />
          </v-col>
        </v-row>

        <!-- add btn -->
        <v-btn
          @click="onAddElement()"
          color="primary"
          target="_blank"
          variant="text"
          class="mt-4"
        >
          <v-icon icon="mdi-plus" start />
          Add
        </v-btn>
      </div>
    </v-card-text>
    <!-- <v-card-actions>
      <v-btn variant="text" color="deep-purple-accent-4"> Learn More </v-btn>
    </v-card-actions> -->
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
    onRemove() {
      this.$emit("remove");
    },
    onRemoveElement(index: number) {
      const elements = [...this.modelValue.elements];
      elements.splice(index, 1);
      this.onUpdate("elements", elements);
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
