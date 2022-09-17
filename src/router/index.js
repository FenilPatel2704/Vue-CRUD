import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: { 
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.requiresAuth)) {
//       if (localStorage.getItem('token') == null) {
//           next('/');
//       } else {
//           let user = JSON.parse(localStorage.getItem('user'))
//           if(to.matched.some(record => record.meta.is_admin)) {
//               if(user.is_admin == 1){
//                   next()
//               }
//               else{
//                   next({ name: 'userboard'})
//               }
//           }else {
//               next()
//           }
//       }
//   } else if(to.matched.some(record => record.meta.guest)) {
//       if(localStorage.getItem('jwt') == null){
//           next()
//       }
//       else{
//           next({ name: 'userboard'})
//       }
//   }else {
//       next() 
//   }
// })

export default router
