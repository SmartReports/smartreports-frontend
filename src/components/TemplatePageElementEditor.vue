<template>
  <div>TemplatePageElementEditor</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { KpiReportElement } from "../models";
export default defineComponent({
  name: "TemplatePageElementEditor",
  props: {
    modelValue: {
      type: Object as PropType<KpiReportElement>,
      required: true,
    },
  },
  methods: {},
  computed: {},
});
</script>

<style></style>
