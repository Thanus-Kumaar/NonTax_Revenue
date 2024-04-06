import { createApp } from 'vue'
import App from './App.vue'
import Add from './components/Add.vue'
import Update from './components/Update.vue'
import Router from './router/router.js'

const app = createApp(App)
app.use(Router)
app.component('add',Add)
app.component('update',Update)
app.mount('#app')
