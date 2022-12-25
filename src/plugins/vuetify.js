import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import LottieVuePlayer from "@lottiefiles/vue-lottie-player";

import LottieAnimation from 'lottie-web-vue'

Vue.use(LottieAnimation); // add lottie-animation to your global scope
import PayPal from 'vue-paypal-checkout'
Vue.component('paypal-checkout', PayPal)
Vue.use(Vuetify);
Vue.use(LottieVuePlayer);
export default new Vuetify({});
