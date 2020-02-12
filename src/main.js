import Vue from 'vue';
import App from './App';
import router from './router';
import { Button, Select } from 'element-ui';

Vue.use(Button);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
