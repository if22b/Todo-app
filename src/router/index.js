// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Register from '@/components/Register.vue';
import Login from '@/components/Login.vue';
import TodoList from '@/components/TodoList.vue';

const routes = [
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/todos', component: TodoList },
  { path: '/', redirect: '/login' }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
