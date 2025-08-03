import { createApp } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import App from './App.vue';
import './styles/index.css';
import HighchartsVue from 'highcharts-vue';
import router from './router';

const app = createApp(App);

app.use(router);
app.use(VueQueryPlugin);
app.use(HighchartsVue);

app.mount('#app');
