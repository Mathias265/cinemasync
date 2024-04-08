import { createRouter, createWebHistory } from '@ionic/vue-router';

import TabsPage from '../views/TabsPage.vue'
import MovieDetails from "../views/MovieDetails.vue"
import Practice from "../views/Practice.vue";
import Auth from "../views/Auth.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import Error from "../views/Error.vue";
import { supabase } from "../clients/supabase";

let localUser;

const routes = [
  {
    path: '/',
    redirect: '/tabs/tab1',
    meta: { requiresAuth: true },
  },
  {
    path: '/tabs/',
    name:'TabsPage',
    component: TabsPage,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/tabs/tab1',
        meta: { requiresAuth: true },
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'tab3',
        name:'tab3',
        component: () => import('@/views/Tab3Page.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'tab4',
        component: () => import('@/views/Tab4Page.vue'),
        meta: { requiresAuth: true },
      }
    ]
  },
  { 
    path: '/movie/:id',
   component: MovieDetails, 
   name: 'MovieDetails',
   props:true,
   },
   {
    path: '/Practice/:id',
    component: Practice,
    name:'Practice',
    props:true,
  },
  {
    path: '/Auth',
    component: Auth,
    name:'Auth',
    props:true,
  },
  {
    path: '/Signin',
    component: Signin,
    name:'Signin',
    props:true,
  },
  {
    path: '/Signup',
    component: Signup,
    name:'Signup',
    props:true,
  },
  {
    path: '/Error',
    component: Error,
    name:'Error',
    props:true,
  }


];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    getUser(next);
  }
  //if the log-in authentication was met user can now access the desired page page
   else {
    next();
  }
});
async function getUser(next) {
  localUser = await supabase.auth.getSession();
  if (localUser.data.session === null) {
    next("/Error");
  } else {
    next();
  }
}
export default router
