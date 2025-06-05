import { createRouter, createWebHistory } from "vue-router";
import RegisterForm from "./components/RegisterForm.vue";
import LoginForm from "./components/LoginForm.vue";
import UserProfile from "./components/UserProfile.vue";
import HomeComponent from "./components/HomeComponent.vue";
import GeneratePetsName from "./components/GeneratePetsName.vue";
import ResponsePetsName from "./components/ResponsePetsName.vue";

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
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeComponent
    },
    {
      path: '/generate-name',
      name: 'GenerateName',
      component: GeneratePetsName
    },
    {
      path: '/response-name',
      name: 'ResponseName',
      component: ResponsePetsName
    }
  ]
})

export default router