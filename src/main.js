import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
// import posthogPlugin from "./plugins/posthog"; //import the plugin. 

const app = createApp(App);

// app.use(posthogPlugin); //install the plugin
app.mount('#app')