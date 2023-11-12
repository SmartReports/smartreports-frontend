import {ChartConfiguration} from "chart.js";

export let test_chart1: ChartConfiguration = {
  type: 'bar',
  data: {
    labels: ['January', 'February', 'March'],
    datasets: [{ data: [40, 20, 12],
      backgroundColor: ["red", "green", "blue"] }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
}
export let test_chart2: ChartConfiguration = {
  type: 'radar',
  data: {
    labels: [
      'Eating',
      'Drinking',
      'Sleeping',
      'Designing',
      'Coding',
      'Cycling',
      'Running'
    ],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(179,181,198,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
        data: [65, 59, 90, 81, 56, 55, 40]
      },
      {
        label: 'My Second dataset',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: 'rgba(255,99,132,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,99,132,1)',
        data: [28, 48, 40, 19, 96, 27, 100]
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
}

export let test_chart3: ChartConfiguration = {
  type: 'pie',
  data: {
    labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
        data: [40, 20, 80, 10]
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
}

export let test_chart4: ChartConfiguration = {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Data One',
        backgroundColor: '#f87979',
        data: [40, 39, 10, 40, 39, 80, 40]
      }
    ]
  },

  options: {
    responsive: true,
    maintainAspectRatio: false
  }
}

export const test_scatter: ChartConfiguration = {
  type: "scatter",
  data: {
    datasets: [
      {
        label: 'Scatter Dataset 1',
        fill: false,
        borderColor: '#f87979',
        backgroundColor: '#f87979',
        data: [
          {
            x: -2,
            y: 4
          },
          {
            x: -1,
            y: 1
          },
          {
            x: 0,
            y: 0
          },
          {
            x: 1,
            y: 1
          },
          {
            x: 2,
            y: 4
          }
        ]
      },
      {
        label: 'Scatter Dataset 2',
        fill: false,
        borderColor: '#7acbf9',
        backgroundColor: '#7acbf9',
        data: [
          {
            x: -2,
            y: -4
          },
          {
            x: -1,
            y: -1
          },
          {
            x: 0,
            y: 1
          },
          {
            x: 1,
            y: -1
          },
          {
            x: 2,
            y: -4
          }
        ]
      }
    ]
  },

  options: {
    responsive: true,
    maintainAspectRatio: false
  }
}
