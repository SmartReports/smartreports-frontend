<template>

      <v-card height="55">
      <v-row>
          <v-col cols="12" md="4">
            <v-combobox chips label="California">
            </v-combobox>
          </v-col>
          <v-col cols="4" md="2" sm="4" xs="1">
              <v-text-field label="Max: 1"/>
            </v-col>
            <v-col  cols="4" md="2" sm="4" xs="1">
              <v-text-field label="Min: 2"/>
            </v-col>
          <v-col cols="4" md="2" sm="2" xs="2">
              <v-switch
              inset
              color="green"
              :model-value="true"
              height="55" width="50%"
              label="On"
                ></v-switch>
          </v-col>
          <v-col cols="4" md="2" sm="2" xs="2">
              <v-btn color="red" height="54" width="100%">
              <v-icon>
                mdi-delete
              </v-icon>
              Delete
            </v-btn>
            </v-col>
      </v-row>
  </v-card>

</template>


<script lang="ts">
export default {
  data() {
    return {
      min: 1,
      max: 2,
    }
  }
}
</script>
