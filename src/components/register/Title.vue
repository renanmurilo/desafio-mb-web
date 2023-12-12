<script setup>
  const props = defineProps(['title'])
</script>

<template>
  <h1 class="title__register">{{ title }}</h1>
</template>

<style lang="scss">
  .title__register {
    @include font-roboto(24px, 500, 0);
    color: $primary;
    margin: 1rem 0 2rem;
  }
</style>
