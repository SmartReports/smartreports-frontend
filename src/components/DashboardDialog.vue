<template>
    <v-dialog
      activator="parent"
      v-model="dialogOpenProxy"
      width="1100"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Select KPI and chart type</span>
        </v-card-title>
        <v-card-item>
          <TemplatePageElementEditor
            class="pb-4"
            :modelValue="modelValue"
            :allow_remove="false"
            @update:modelValue="onUpdateModelValue($event)"
          />
        </v-card-item>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialogOpenProxy = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="onConfirmClick()"
            :disabled="enableSave"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script lang="ts">
import TemplatePageElementEditor from "@/components/TemplatePageElementEditor.vue";
import {KpiReportElement} from "@/models";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "DashboardDialog",
  components: {TemplatePageElementEditor},
  props: {
    modelValue: {
      type: Object as PropType<KpiReportElement>,
      required: true
    },
    dialogOpen: {
      type: Boolean,
      required:true
    }
  },
  data: () => ({
  }),
  methods: {
    onUpdateModelValue(value: any) {
      this.$emit("update:modelValue", value);
    },

    onConfirmClick() {
      this.dialogOpenProxy = false;
      this.$emit("save");
    }
  },
  computed: {
    enableSave() {
      return this.modelValue.kpis.length == 0 || this.modelValue.chart_type == null;
    },

    dialogOpenProxy: {
      get() {
        return this.dialogOpen;
      },
      set(value: any) {
        this.$emit("update:dialogOpen", value);
      }
    }
  }
})
</script>

<style scoped>

</style>
