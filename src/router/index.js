import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from "@/views/pages/LoginPage";
import MyPage from "@/views/pages/MyPage";
import OrderListPage from "@/views/pages/OrderListPage";
import HomePage from "@/views/pages/HomePage";
import {getCurrentUserId} from "@/dataLayer/service/firebase/user";

Vue.use(VueRouter)

const routes = [{
    path: '/login', name: 'login', component: LoginPage
}, {
    path: '/', name: 'home', component: HomePage
}, {
    path: '/my', name: 'my', component: MyPage
}, {
    path: '/orderList', name: 'orderList', component: OrderListPage
},

]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'login') {
        if (!getCurrentUserId()) {
            next({name: 'login'})
        } else {
            next()
        }
    } else {
        next()
    }
})


export default router
