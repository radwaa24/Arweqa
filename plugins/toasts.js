import { defineNuxtPlugin } from "#app";
import * as pk from "vue-toastification";

import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(pk.default, { timeout: 5000, position: "top-right" });
  return {
    provide: {
      toast: pk.useToast(),
    },
  };
});
