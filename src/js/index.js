import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { routes } from './routes';
import { store } from './store/store';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'hash', // history вызывает ошибку при обновлении страницы без серверной части, можно решить установкой дополнительного модуля, но решил не делать из-за простого переключения режима
	routes
});

const app = new Vue({
	router,
	store,
    render(h) {
        return h(App);
    },
});

app.$mount(document.querySelector('#app'));
