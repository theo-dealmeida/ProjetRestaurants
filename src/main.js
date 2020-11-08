import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/default.css'
import AjouterRestaurants from "@/components/AjouterRestaurants";
import ListeDesRestaurants from "@/components/ListeDesRestaurants";
import RestaurantDetail from "@/components/RestaurantDetail";
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

Vue.use(VueMaterial);
Vue.use(VueRouter);

Vue.config.productionTip = false

const routes = [
  {path: '/RestaurantDetail', component:RestaurantDetail},
  {path: '/AjouterRestaurants', component:AjouterRestaurants},
  {path: '/', component: ListeDesRestaurants}
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')
