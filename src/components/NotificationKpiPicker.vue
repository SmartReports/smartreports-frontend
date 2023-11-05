<template>
      <v-card>
        <v-row>
            <v-col cols="12" md="4">
              <v-combobox
              label="Select KPI"
              :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
              variant="solo-inverted"
              />
            </v-col>
            <v-col cols="4" md="2" sm="4" xs="1">
              <v-text-field label="min"/>
            </v-col>
            <v-col  cols="4" md="2" sm="4" xs="1">
              <v-text-field label="max"/>
            </v-col>
            <v-col cols="4" md="2" sm="2" xs="2">
              <v-btn color="primary" height="55" width="100%">
              <v-icon>
                mdi-check
              </v-icon>
              Add
            </v-btn>
            </v-col>
            <v-col cols="4" md="2" sm="2" xs="2">
              <v-btn color="red" height="55" width="100%">
              <v-icon>
                mdi-delete
              </v-icon>
              Delete
            </v-btn>
            </v-col>
        </v-row>

      </v-card>
</template>
