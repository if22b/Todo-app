<template>
    <button :class="buttonClass">{{ buttonText }}</button>
  </template>
  
  <script>
  import posthog from "posthog-js";
  
  export default {
    name: "RegisterButton",
    data() {
      return {
        buttonClass: 'variant-a',
        buttonText: 'Register'
      };
    },
    async created() {
      const isVariantB = await posthog.isFeatureEnabled('register_button_variant_b');
      this.buttonClass = isVariantB ? 'variant-b' : 'variant-a';
      this.buttonText = isVariantB ? 'Sign Up Now!' : 'Register';
    }
  };
  </script>
  
  <style scoped>
  .variant-a {
    background-color: blue;
    color: white;
  }
  
  .variant-b {
    background-color: green;
    color: yellow;
  }
  </style>
  