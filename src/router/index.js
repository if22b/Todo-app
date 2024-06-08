import { createRouter, createWebHistory } from 'vue-router';
import RegisterForm from '@/components/RegisterForm.vue';
import LoginForm from '@/components/LoginForm.vue';
import TodoList from '@/components/TodoList.vue';

const routes = [
  { path: '/', name: 'Home', component: TodoList },
  { path: '/register', name: 'Register', component: RegisterForm },
  { path: '/login', name: 'Login', component: LoginForm }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
