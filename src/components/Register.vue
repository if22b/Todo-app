<!-- src/components/Register.vue -->
<template>
    <div>
      <h2>Register</h2>
      <form @submit.prevent="register">
        <input v-model="username" type="text" placeholder="Username" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import { registerUser } from '@/api';
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
      async register() {
        try {
          await registerUser(this.username, this.password);
          console.log('Registration successful');
          this.router.push('/login');
        } catch (error) {
          console.error('Registration failed:', error);
        }
      }
    }
  };
  </script>
  