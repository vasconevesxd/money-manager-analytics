import { createApp } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import App from './App.vue';
import './styles/index.css';
import HighchartsVue from 'highcharts-vue';
import router from './router';
import { createPinia } from 'pinia';

import 'vue-color/style.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(VueQueryPlugin);
app.use(HighchartsVue);

app.mount('#app');
