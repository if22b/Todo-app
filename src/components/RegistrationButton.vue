<template>
  <button :class="variantClass">{{ headline }}</button>
</template>

<script>
export default {
  name: "RegistrationButton",
  data() {
    return {
      headline: "Register",
      variantClass: "variant-a"
    };
  },
  created() {
    if (this.$posthog.isFeatureEnabled('register-button-variant')) {
      this.variantClass = 'variant-b';
      this.headline = 'Sign Up Now!';
    }
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
