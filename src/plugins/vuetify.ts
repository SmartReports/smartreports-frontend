/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        colors: {
          company_color: '#1867C0',
          primary: '#1867C0',
          secondary: '#5CBBF6',
          surface: '#FFF',
          background: '#F5F5F5',
        },
      },
      dark: {
        colors: {
          company_color: '#1867C0',
          primary: '#1867C0',
          secondary: '#303540',
          surface: '#202020',
          background: '#171616',
        }
      }
    },
  },
})
