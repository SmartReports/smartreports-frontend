<template>
      <v-card>
        <v-row>
            <v-col cols="12" md="6">
              <v-combobox
              label="Select KPI"
              :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
              variant="solo-inverted"
              />
            </v-col>
            <v-col cols="4" md="2" sm="4" xs="2">
              <v-text-field label="min"/>
            </v-col>
            <v-col  cols="4" md="2" sm="4" xs="2">
              <v-text-field label="max"/>
            </v-col>
            <v-col cols="4" md="2" sm="4" xs="1">
              <v-btn color="primary" height="55" width="100%" @click="onAdd">
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

export default defineComponent ({
  methods: {
    onAdd(item: any) {
      this.$emit('onAddItem', {KPI:"ciao", min:10, max:100})
    }
  },
})
</script>
