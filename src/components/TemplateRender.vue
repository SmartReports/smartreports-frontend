<template>
  <v-container>
    <h3 class="text-h4 mt-4">Report {{   }}</h3>
    <v-divider></v-divider>
    <v-container>

    <v-carousel
    cycle
    progress="primary"
    hide-delimiter-background
    show-arrows="hover"
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
    <div style="margin-top: 10px">
    <GridLayout
      v-model:layout="layout"
      :col-num="colNum"
      :cols="cols"
      :breakpoints="breakpoints"
      :row-height="250"
      :is-draggable="draggable"
      :is-resizable="resizable"
      :responsive="responsive"
    >
      <template #item="{ item }">
        <DashboardElement
          :chart-configuration="item.chart"
          @remove="onChartRemove(item.i)"
          @edit="onChartEdit(item.i)"
        />
      </template>
    </GridLayout>
  </div>
    </v-carousel-item>
  </v-carousel>
</v-container>

  </v-container>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
  }
</script>
