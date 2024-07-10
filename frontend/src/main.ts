import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// notivue 
import 'notivue/notification.css'
import 'notivue/animations.css'
import { createNotivue } from 'notivue'

const app = createApp(App)
const notivue = createNotivue

app.use(createPinia())
app.use(router)
app.use(notivue)

app.mount('#app')
