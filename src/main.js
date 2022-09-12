import Vue from 'vue';
import App from './App.vue';



import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add( fas );
library.add( far );
Vue.component('font-awesome-icon', FontAwesomeIcon);



import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
// Make BootstrapVue available throughout your project
Vue.use( BootstrapVue );
// Optionally install the BootstrapVue icon components plugin
Vue.use( IconsPlugin );



Vue.config.productionTip = false;

new Vue( {
  render: h => h( App ),
} ).$mount( '#app' );