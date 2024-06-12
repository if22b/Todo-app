<template>
  <div>
    <h2>{{ headline }}</h2>
    <form @submit.prevent="register">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required>
      </div>
      <button :style="{ backgroundColor: buttonColor }" type="submit">{{ buttonText }}</button>
    </form>
  </div>
</template>

<script>
import { registerUser } from '@/api';

export default {
  name: 'RegisterForm',
  data() {
    return {
      username: '',
      password: '',
      headline: 'Register', // Default headline
      buttonText: 'Register', // Default button text
      buttonColor: '#007BFF', // Default button color (blue)
    };
  },
  methods: {
    async register() {
      try {
        await registerUser(this.username, this.password);
        this.$router.push('/login'); // Redirect to login after successful registration
      } catch (error) {
        console.error('Registration failed:', error);
      }
    }
  },
  created() {
    const variant = this.$posthog.getFeatureFlag('register-button-variant');
    if (variant === 'variant-a') {
      this.headline = 'Join Us Now!';
      this.buttonText = 'Sign Up';
      this.buttonColor = '#FF5733'; // Example color A red
    } else if (variant === 'variant-b') {
      this.headline = 'Get Started Today!';
      this.buttonText = 'Register';
      this.buttonColor = '#33FF57'; // Example color B green
    }
  }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
