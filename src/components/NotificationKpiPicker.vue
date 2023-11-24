
<template>
      <v-card>
        <v-row>
            <v-col cols="12" md="6">
              <v-combobox
              :label="getLabel()"
              :items="kpiWithoutAlarms"
              variant="solo-inverted"
              v-model="kpiId"
              :disabled="kpiWithoutAlarms.length==0"
              />
            </v-col>
            <v-col cols="4" md="2" sm="4" xs="2">
              <v-text-field :disabled="kpiWithoutAlarms.length==0" type="number" v-model="min" label="min"/>
            </v-col>
            <v-col  cols="4" md="2" sm="4" xs="2">
              <v-text-field :disabled="kpiWithoutAlarms.length==0" type="number" v-model="max" label="max"/>
            </v-col>
            <v-col cols="4" md="2" sm="4" xs="1">
              <v-btn
                :loading="saving"
                variant="flat"
                color="primary"
                height="55"
                width="100%"
                @click="onAdd(kpiId, min, max)"
                :disabled="kpiWithoutAlarms.length==0"
                >
              <v-icon>
                mdi-check
              </v-icon>
              Add
            </v-btn>
            </v-col>
        </v-row>
        <v-snackbar v-model="showSuccess">Alarm added</v-snackbar>

      </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useMainStore } from "../store/app";
import { mapStores } from "pinia";
import { Kpi } from '@/models';

export default defineComponent ({
  data() {
    return {
      min: '',
      max: '',
      kpiId: '',
      showSuccess: false,
      saving: false,
    }
  },
  props: {
    accountId: {
        type: String as PropType<string>,
        required: true,
    }
  },
  methods: {
    reset(){
      this.kpiId= '',
      this.min= '',
      this.max = ''
    },
    getLabel(){
      if (this.kpiWithoutAlarms.length==0) {
        return "No Kpis to add"
      }else{
        return "Select Kpi"
      }
    },
    onAdd(kpiId: number|string, min:number|string, max:number|string) {
      this.saving = true;
      setTimeout(() => {
        this.saving = false;
        this.showSuccess=true
      }, 1500);
      this.$emit('insert', '', kpiId, min, max)
      this.showSuccess = false;
      this.reset();
    }
  },
  computed: {
    ...mapStores(useMainStore),
    kpi() {
      return this.mainStore.getKpiWithoutAlarms
    },
    kpiWithoutAlarms() {
      return this.kpi.map((kpi) => ({
        title: kpi.name,
        value: kpi.id,
      }));
    },
  }
})
</script>
