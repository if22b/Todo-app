<template>
    <button :class="variantClass">{{ headline }}</button>
  </template>
  
  <script>
  // import posthog from '@/plugins/posthog';
  
  export default {
    name: "RegistrationButton",
    data() {
      return {
        headline: "Register",
        variantClass: "variant-a"
      };
    },
    async created() {
      // const isVariantB = await posthog.isFeatureEnabled('register_button_variant_b');
      // this.variantClass = isVariantB ? 'variant-b' : 'variant-a';
      // this.headline = isVariantB ? 'Sign Up Now!' : 'Register';
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
  