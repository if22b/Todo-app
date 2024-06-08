<!-- src/components/Login.vue -->
<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input v-model="username" type="text" placeholder="Username" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import { loginUser } from '@/api';
  import { useRouter } from 'vue-router';
  
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    setup() {
      const router = useRouter();
      return { router };
    },
    methods: {
      async login() {
        try {
          const response = await loginUser(this.username, this.password);
          localStorage.setItem('token', response.token);
          console.log('Login successful');
          this.router.push('/todos');
        } catch (error) {
          console.error('Login failed:', error);
        }
      }
    }
  };
  </script>
  