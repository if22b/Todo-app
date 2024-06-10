<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <div id="app">
    <RouterView />
    <RegistrationButton />
  </div>
</template>

<script>
import RegistrationButton from './components/RegistrationButton.vue';

export default {
  components: {
    RegistrationButton
  }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>