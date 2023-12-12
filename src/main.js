import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import maska from "maska";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(maska);

app.mount('#app')
