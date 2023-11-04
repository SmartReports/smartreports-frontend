<template>
    <v-dialog
      activator="parent"
      v-model="dialog"
      width="auto"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Select KPI</span>
        </v-card-title>
        <v-card-text>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="dialog = false"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script lang="ts">
export default {
  data: () => ({
    dialog: false,
  }),
}
</script>

<style scoped>

</style>
