<script setup>
  import { ref, onMounted } from 'vue';
  import { RouterLink, useRouter } from 'vue-router';
  import Steps from './Steps.vue';
  import Title from './Title.vue';
  import { storeToRefs } from 'pinia'
  import { useRegister } from '@/stores/register';

  const router = useRouter();
  const storeRegister = useRegister();
  const { dados } = storeToRefs(storeRegister)

  onMounted(() => {
    if( localStorage.dados !== undefined) {
      storeRegister.setDados(JSON.parse(localStorage.dados))
    }
  })

  const passwordError = ref(false)

  const validatePassword = () => {
    const trimmedPassword = dados._object.dados.senha.trim();

    if (trimmedPassword === '') {
      passwordError.value = 'Por favor, insira uma senha.';
      return false; // Validation failed
    }

    passwordError.value = false;
    return true; // Validation passed
  };
  
  function nextStep() {
    if (validatePassword()) {
      localStorage.dados = JSON.stringify(dados.value)
      storeRegister.setDados(dados)
      router.push('/register/resumo')
    }
  }

</script>

<template>
  <div class="password">
    <Steps :stepNumber="3" />

    <Title :title="'Senha de acesso'" />

    <form action="" class="form__class" @submit.stop.prevent="nextStep">
      <div class="form__row">
        <div class="form__controls">
          <label class="label__field">Sua senha</label>
          <input type="text" class="field" :class="{error: passwordError}" v-model="dados.senha">
          <span v-if="passwordError" class="error">{{ passwordError }}</span> 
        </div>
      </div>

      <div class="form__row buttons">
        <router-link :to="`${dados.tipoCadastro === 'Pessoa física' ? '/register/pessoa-fisica' : '/register/pessoa-juridica'}`" class="btn btn__outline__primary">Voltar</router-link>
        <button type="submit" class="btn btn__primary">Continuar</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
  .password {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    justify-content: center;

    @include form;
  }
</style>
