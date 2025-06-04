import { createRouter, createWebHistory } from "vue-router";
import RegisterForm from "./components/RegisterForm.vue";
import LoginForm from "./components/LoginForm.vue";
import UserProfile from "./components/UserProfile.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      name: 'Register',
      component: RegisterForm
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginForm
    },
    {
      path: '/profile',
      name: 'Profile',
      component: UserProfile
    }
  ]
})

export default router