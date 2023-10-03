<template>
  <div>
    <v-row class="text-h6 mb-2 d-flex align-center">
      <v-col cols="auto">
        <h3>Page {{ index + 1 }}</h3>
      </v-col>
    </v-row>
    <div class="d-flex align-center flex-column border">
      <v-btn-toggle
        :modelValue="modelValue.layout"
        @update:model-value="onUpdate('layout', $event)"
        divided
      >
        <v-btn value="horizontal" icon="mdi-land-rows-horizontal"></v-btn>
        <v-btn value="vertical" icon="mdi-land-rows-vertical"></v-btn>
        <v-btn value="grid" icon="mdi-view-grid-outline"></v-btn>
      </v-btn-toggle>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ReportTemplatePage } from "../models";
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
  },
  computed: {},
});
</script>

<style></style>
