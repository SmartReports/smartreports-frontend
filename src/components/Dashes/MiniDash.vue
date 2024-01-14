<template>
      <div class="pt-2"></div>
      <v-card elevation="8" height="100%">
        <router-link to="/dash"  @click="setModel(modelValue)">
          <v-card height="100%" class="d-flex justify-center align-center">
            <v-icon size="48" v-if="modelValue.pages[0].layout=='grid'">mdi-view-grid-outline</v-icon>
            <v-icon size="48" v-if="modelValue.pages[0].layout!='grid'">mdi-land-rows-{{modelValue.pages[0].layout}}</v-icon>
          </v-card>
      </router-link>
      <v-toolbar color="background">
        <v-card-text>{{ modelValue.name }}</v-card-text >
        <v-spacer></v-spacer>
        <v-btn
        v-if="options && false"
        class="text-grey-darken-1"
        icon="mdi-pencil"
        variant="text"
        tooltip="Edit"
        />
        <v-btn
        v-if="options"
        class="text-grey-darken-1"
        @click="$emit('delete')"
        icon="mdi-delete"
        variant="text"
        tooltip="Remove"
          />
        </v-toolbar>
      </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted, defineAsyncComponent } from 'vue';
import { ReportTemplate } from "@/models"
import { useMainStore } from "@/store/app";
import { mapStores } from "pinia";
import Dash from './Dash.vue'

export default defineComponent({
    emits:['delete'],
    methods: {
        setModel(value: ReportTemplate){
          this.mainStore.setCurrentModelValue(value)
        },
        computedFilter: function() {
          return (this.$vuetify.theme as any).global.name == 'dark'? "container_dark" : "container"
        }

    },
    props: {
        modelValue: {
            type: Object as PropType<ReportTemplate>,
            required: true,
        },
        user_type: {
            type: String as PropType<string>,
            required: true,
        },
        options: {
          type: Boolean,
          default: true,
        }
    },
    computed:{
      ...mapStores(useMainStore),
    },
    components: { Dash }
})
</script>

<style>
.container{
  min-height: 100%;
  max-height: 100%;
  box-shadow: 0 3px 100px rgba(66, 59, 59, 0.1);
  border-radius: 15px;
}

.container_dark{
  min-height: 100%;
  max-height: 100%;
  box-shadow: 0 3px 30px rgb(0 0 0 / 0.1);
  border-radius: 15px;
  -webkit-filter: invert();
}

</style>
