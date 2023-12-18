import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LookFor from '../components/LookFor.vue'
import MainPage from '../components/MainPage.vue'
import ReturnCar from '../components/ReturnCar.vue'
import LoginContain from '../views/LoginContain.vue'
import LoginCa from '../components/LoginCa.vue'
import RegisterCa from '../components/RegisterCa.vue'
import AdminView from '../views/AdminView.vue'
import AddCar from '../components/AddCar.vue'
import AdminMainPage from '../components/AdminMainPage.vue'
import ShowTurnover from '../components/ShowTurnover.vue'
import store from '../store/index.js'
import { Message } from 'element-ui'
Vue.use(VueRouter)

const routes = [
  {
    path: '/AdminView',
    name: 'adminView',
    redirect: '/AdminView',
    component: AdminView,
    children: [
      {
        path: '/',
        name: 'AdminMainPage',
        redirect: '/AdminMainPage'
      },
      {
        path: '/AdminMainPage',
        name: 'AdminMainPage',
        component: AdminMainPage
      },
      {
        path: '/AddCar',
        name: 'AddCar',
        component: AddCar
      },
      {
        path: '/ShowTurnover',
        name: 'ShowTurnover',
        component: ShowTurnover
      }
    ]
  },
  {
    path: '/',
    redirect: '/LoginContain',
    component: LoginContain,
    children: [{
      path: '/',
      redirect: '/LoginCa'
    }, {
      path: '/LoginCa',
      name: 'LoginCa',
      component: LoginCa
    }, {
      path: '/RegisterCa',
      name: 'RegisterCa',
      component: RegisterCa
    }]
  },
  {
    path: '/LoginContain',
    name: 'LoginContain',
    redirect: '/LoginContain',
    component: LoginContain,
    children: [{
      path: '/',
      redirect: '/LoginCa'
    }, {
      path: '/LoginCa',
      name: 'LoginCa',
      component: LoginCa
    }, {
      path: '/RegisterCa',
      name: 'RegisterCa',
      component: RegisterCa
    }]
  },
  {
    path: '/AdminView',
    name: 'adminView',
    component: AdminView,
    children: [
      {
        path: '/',
        name: 'AdminMainPage',
        redirect: '/AdminMainPage'
      },
      {
        path: '/AdminMainPage',
        name: 'AdminMainPage',
        component: AdminMainPage
      },
      {
        path: '/AddCar',
        name: 'AddCar',
        component: AddCar
      }
    ]
  },
  {
    path: '/HomeView',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '/',
        name: 'MainPage',
        redirect: '/MainPage',
        component: MainPage
      },
      {
        path: '/LookFor',
        name: 'LookFor',
        component: LookFor
      },
      {
        path: '/Mainpage',
        name: 'MainPage',
        component: MainPage
      },
      {
        path: '/ReturnCar',
        name: 'ReturnCar',
        component: ReturnCar
      }

    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminView.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log(from, to, next)
  // const a = ['/ShowTurnover','./AddCar','']
  if (to.name !== 'LoginCa') {
    if (store.state.token === '') {
	  Message({
		  message: '没有登录哦！请先登录'
		    // type: 'success'
		  })
		  next('/LoginCa')
    } else {
		  next()
    }
  } else {
	  next()
  }
})
export default router
