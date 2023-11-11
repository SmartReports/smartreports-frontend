/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
}

// (vuetify.theme as any).global.name._value = 'dark'
function setTheme(theme: string) { 
  (vuetify.theme as any).global.name._value = theme;
}

export function getTheme() {
  if (localStorage.getItem('theme') == null) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      localStorage.setItem('theme', 'dark')
    } else {
      localStorage.setItem('theme', 'light')
    }
  }
  return localStorage.getItem('theme')
}

setTheme(getTheme() as string)