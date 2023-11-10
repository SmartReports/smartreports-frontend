<template>
  <v-dialog width="2100" height="500">
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
          <v-container>
            <h3 class="text-h4 mt-4">{{ modelValue.name }}</h3>
            <v-divider></v-divider>
            <v-container>

            <v-card theme="dark" flat rounded="10">
            <v-window v-model="onboarding">
              <v-window-item v-for="(page, i) in pages" :key="`card-${i}`" :value="i">
                <v-card height=100 class="d-flex justify-center align-center">
                    <template-render-page :user_type="user_type" :modelPage="page"></template-render-page>
                </v-card>
              </v-window-item>
            </v-window>

            <v-card-actions class="justify-space-between">
              <v-btn :disabled="onboarding<=1" variant="plain" icon="mdi-chevron-left" @click="prev"></v-btn>
              <v-item-group v-model="onboarding" class="text-center" mandatory>
                <v-item
                  v-for="(page, i) in pages"
                  :key="`btn-${i}`"
                  v-slot="{ isSelected, toggle }"
                  :value="i"
                >
                  <v-btn
                    :variant="isSelected ? 'outlined' : 'text'"
                    icon="mdi-record"
                    @click="toggle"
                  ></v-btn>
                </v-item>
              </v-item-group>
              <v-btn :disabled="onboarding==pages.length-1" variant="plain" icon="mdi-chevron-right" @click="next"></v-btn>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-container>
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
            pages: this.modelValue.pages,
            onboarding: 1,
        };
    },
    methods: {
        next() {
            console.log(this.onboarding>1)
            this.onboarding =
                this.onboarding + 1 > this.pages.length ? 1 : this.onboarding + 1;

        },
        prev() {
            console.log(this.onboarding)
            this.onboarding =
                this.onboarding - 1 < 1 ? this.pages.length : this.onboarding - 1;

                console.log(this.onboarding)
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
