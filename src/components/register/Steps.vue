<script setup>
  const props = defineProps(['stepNumber'])
</script>

<template>
  <div class="step">
    <p class="step__text">Etapa <span>{{stepNumber}}</span> de 4</p>
  </div>
</template>

<style lang="scss">
  .step {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;

    .step__text {
      color: $primary;
      @include font-roboto(1rem, 400, 0);
      
      span {
        color: $yellow;
      }
    }
  }  
</style>
