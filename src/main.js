import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

Vue.config.productionTip = false

Vue.filter('priceDisplay', function (price) {
    return parseFloat(price).toFixed(2)
        .replace('.', ',') + ' SOL'
})

Vue.filter('timeStampDisplay', function (timeStamp) {
    return timeStamp.split(' ')[1]
})

new Vue({
    vuetify, router, render: h => h(App)
}).$mount('#app')
