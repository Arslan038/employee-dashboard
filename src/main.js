import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import pinia from './stores';
import { registerDirectives } from './directives';

const app = createApp(App);
app.use(router);
app.use(pinia);

registerDirectives(app);

app.mount('#app')
