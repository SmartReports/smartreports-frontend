
<template>
      <v-card>
        <v-row>
            <v-col cols="12" md="6">
              <v-combobox
              label="Select KPI"
              :items="kpiWithoutAlarms"
              variant="solo-inverted"
              v-model="kpiId"
              />
            </v-col>
            <v-col cols="4" md="2" sm="4" xs="2">
              <v-text-field v-model="min" label="min"/>
            </v-col>
            <v-col  cols="4" md="2" sm="4" xs="2">
              <v-text-field type="number" v-model="max" label="max"/>
            </v-col>
            <v-col cols="4" md="2" sm="4" xs="1">
              <v-btn color="primary" height="55" width="100%" @click="$emit('insert', '', kpiId, min, max)">
              <v-icon>
                mdi-check
              </v-icon>
              Add
            </v-btn>
            </v-col>
        </v-row>

      </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMainStore } from "../store/app";
import { mapStores } from "pinia";
import { PropType } from 'vue';
import { Kpi } from '@/models';

export default defineComponent ({
  data() {
    return {
      min: '',
      max: '',
      kpiId: '',
    }
  },
  props: {
    accountId: {
        type: String as PropType<string>,
        required: true,
    }
  },
  methods: {
    onAdd(item: any) {
      this.$emit('onAddItem', {KPI:"ciao", min:10, max:100})
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
