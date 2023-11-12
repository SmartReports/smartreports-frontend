<template>
  <v-dialog >
    <template v-slot:activator="{ props }">
        <v-btn
          class="text-grey-darken-1"
          icon="mdi-eye"
          variant="text"
          tooltip="View"
          v-bind="props"
        />
      </template>
      <template v-slot:default="{ isActive }">
          <v-card>
            <v-card-actions>
          <v-card-text class="text-h4 mt-4">{{ modelValue.name }}</v-card-text>
          <v-spacer></v-spacer>
          <v-btn
          text="Close"
          icon="mdi-close"
          color="error"
          @click="isActive.value = false"
          ></v-btn>
        </v-card-actions>
        <v-divider :elevation="3"></v-divider>
            <v-divider></v-divider>
            <v-container>
            <v-container  flat rounded="10">
            <v-window v-model="onboarding"    direction="vertical" >
              <v-window-item v-for="(page, i) in pages" :key="`card-${i}`" :value="i">
                <v-divider></v-divider>
                <div class="pt-12"></div>
                <v-container>
                  <v-container class="d-flex justify-center align-center">
                    <template-render-page :user_type="user_type" :modelPage="page"></template-render-page>
                  </v-container>
                </v-container>
                <div class="pt-12"></div>
                <v-card-subtitle class="d-flex justify-center align-center">Page: {{ i + 1  }}</v-card-subtitle>
              </v-window-item>
            </v-window>
            <v-card-actions class="justify-space-between">
              <v-btn :disabled="onboarding<=0" variant="plain" icon="mdi-chevron-left" @click="prev"></v-btn>
              <v-btn :disabled="onboarding==pages.length-1" variant="plain" icon="mdi-chevron-right" @click="next"></v-btn>
            </v-card-actions>
          </v-container>
        </v-container>
      </v-card>
</template>
</v-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ReportTemplate, ReportTemplatePage } from "@/models"
import TemplateRenderPage from './TemplateRenderPage.vue';

  export default defineComponent({
    data() {
        return {
            pages: this.modelValue.pages as ReportTemplatePage[],
            onboarding: 0,
        };
    },
    methods: {
        next() {
            this.onboarding =
                this.onboarding + 1 > this.pages.length ? 1 : this.onboarding + 1;

        },
        prev() {
            this.onboarding =
                this.onboarding - 1 < 0 ? this.pages.length : this.onboarding - 1;
              },
    },
    props: {
        modelValue: {
            type: Object as PropType<ReportTemplate>,
            required: true,
        },
        user_type: {
            type: String as PropType<string>,
            required: true,
        }
    },
    components: { TemplateRenderPage }
})
</script>
