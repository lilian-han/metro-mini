import { createSSRApp } from 'vue';
import App from './App.vue';
import uviewPlus from 'uview-plus';
import * as Pinia from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
export function createApp() {
  const app = createSSRApp(App);
  app.use(Pinia.createPinia().use(piniaPluginPersistedstate));
  app.use(uviewPlus);
  return {
    app,
    Pinia,
  };
}
