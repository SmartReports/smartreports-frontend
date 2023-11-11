<template>
  <!-- TODO overflow visible is pretty ugly -->
  <v-responsive class="fill-height" style="overflow: visible !important">
    <!-- <v-img height="300" src="@/assets/logo.svg" /> -->

    <!-- <div class="text-body-2 font-weight-light mb-n1">Report</div> -->

    <h3 class="text-h4 mt-4">Report Template Editor</h3>

    <div class="pt-12" />

    <v-row class="d-flex align-center">
      <v-col cols="8">
        <v-text-field label="Name" v-model="modelValue.name" />
      </v-col>

      <v-col cols="4">
        <v-select
          :items="frequencyItems"
          label="Frequency"
          v-model="modelValue.frequency"
        />
      </v-col>
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

    <draggable
      animation="100"
      v-model="modelValue.pages"
      drag-class="dragging-element"
      :itemKey="'id'"
      :ghostClass="'ghost'"
      :handle="'.drag-handle'"
      @start="draggingSomeElement = true"
      @end="draggingSomeElement = false"
    >
      <template #item="{ element, index }">
        <v-row>
          <v-col cols="12">
            <TemplatePageEditor
              class="pb-10"
              :class="{ 'dragging-element': draggingSomeElement }"
              :modelValue="element"
              :index="index"
              @update:model-value="onPageUpdate(index, $event)"
              @remove="onPageRemove(index)"
            />
          </v-col>
        </v-row>
      </template>
    </draggable>

    <div v-if="modelValue.pages.length === 0" class="text-center mt-4">
      <v-icon class="text-grey-lighten-1" style="font-size: 180px !important">
        mdi-chart-bar
      </v-icon>
      <p class="text-grey">No pages yet</p>
    </div>

    <div class="mt-10 d-flex justify-end">
      <v-btn
        :loading="saving"
        :disabled="modelValue.pages.length === 0"
        @click="onSave()"
        color="success"
        target="_blank"
        variant="flat"
      >
        <v-icon icon="mdi-check" start />
        Save
      </v-btn>
    </div>

    <v-snackbar v-model="showSuccess">Template saved successfully</v-snackbar>

    <!-- {{ modelValue.pages[0].layout }} -->
  </v-responsive>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ReportTemplate, ReportTemplatePage } from "../models";
import TemplatePageEditor from "./TemplatePageEditor.vue";
import { mapStores } from "pinia";
import { useMainStore } from "../store/app";
import draggable from "vuedraggable";

export default defineComponent({
  name: "TemplateEditor",
  props: {},
  // async created() {
  //   await this.mainStore.getKpi();
  // },
  data() {
    return {
      draggingSomeElement: false,
      modelValue: {
        frequency: "weekly",
        name: "Your report",
        pages: [
          {
            elements: [
              {
                chart_type: null,
                kpi: "",
              },
            ],
            layout: "grid",
          },
        ],
      } as ReportTemplate,
      saving: false,
      showSuccess: false,
    };
  },
  methods: {
    async onSave() {
      this.saving = true;
      try {
        await this.axios.post("/report-templates/", this.modelValue);
        this.saving = false;
        this.showSuccess = true;
        setTimeout(() => {
          this.showSuccess = false;
        }, 2500);
      } catch (e) {
        this.saving = false;
        console.error(e);
      }
    },
    onPageUpdate(index: number, value: ReportTemplatePage) {
      this.modelValue.pages[index] = value;
    },
    onAddPage() {
      this.modelValue.pages.push({
        elements: [
          {
            kpi: "",
            chart_type: null,
          },
        ],
        layout: "grid",
      });
    },
    onPageRemove(index: number) {
      this.modelValue.pages.splice(index, 1);
    },
  },
  computed: {
    ...mapStores(useMainStore),
    frequencyItems() {
      return [
        { title: "Weekly", value: "weekly" },
        { title: "Monthly", value: "monthly" },
        { title: "Quarterly", value: "quarterly" },
        { title: "Yearly", value: "yearly" },
      ];
    },
  },
  components: { TemplatePageEditor, draggable },
});
</script>

<style></style>
