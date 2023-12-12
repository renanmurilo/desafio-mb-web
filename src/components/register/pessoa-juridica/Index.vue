<script setup>
  import { reactive, ref, onMounted } from 'vue';
  import { RouterLink, useRouter } from 'vue-router';
  import Steps from '../Steps.vue';
  import Title from '../Title.vue';
  import { storeToRefs } from 'pinia'
  import { useRegister } from '@/stores/register';

  const router = useRouter();
  const storeRegister = useRegister();
  const { dados } = storeToRefs(storeRegister);

  onMounted(() => {
    if( localStorage.dados !== undefined) {
      storeRegister.setDados(JSON.parse(localStorage.dados))
    }
  })

  const razaoSocialError = ref(false);
  const cnpjError = ref(false);
  const dataAberturaError = ref(false);
  const telefoneError = ref(false);

  const validateRazaoSocial = () => {
    const trimmedRazaoSocial = dados._object.dados.razaoSocial.trim();

    if (trimmedRazaoSocial === '') {
      razaoSocialError.value = 'Por favor, insira um nome.';
      return false; // Validation failed
    }

    razaoSocialError.value = false;
    return true; // Validation passed
  };

  const validateCnpj = () => {
    const trimmedCnpj = dados._object.dados.cnpj.trim();

    if (trimmedCnpj === '') {
      cnpjError.value = 'Por favor, insira um CNPJ.';
      return false; // Validation failed
    }

    cnpjError.value = false;
    return true; // Validation passed
  };

  const validateDataAbertura = () => {
    const trimmedDataAbertura = dados._object.dados.dataAbertura.trim();

    if (trimmedDataAbertura === '') {
      dataAberturaError.value = 'Por favor, insira uma data de abertura.';
      return false; // Validation failed
    }

    dataAberturaError.value = false;
    return true; // Validation passed
  };

  const validateTelefone = () => {
    const trimmedTelefone = dados._object.dados.telefone.trim();

    if (trimmedTelefone === '') {
      telefoneError.value = 'Por favor, insira um telefone.';
      return false; // Validation failed
    }

    telefoneError.value = false;
    return true; // Validation passed
  };

  function nextStep() {
    if (validateRazaoSocial() && validateCnpj() && validateDataAbertura() && validateTelefone()) {
      localStorage.dados = JSON.stringify(dados.value)
      storeRegister.setDados(dados)
      router.push('/register/password'
      );
    }
  }
</script>

<template>
  <div class="pessoa__fisica">
    <Steps :stepNumber="2" />

    <Title :title="'Pessoa Jurídica'" />
    
    <form action="" class="form__class" @submit.stop.prevent="nextStep">
      <div class="form__row">
        <div class="form__controls">
          <label class="label__field">Razão social</label>

          <input type="text" class="field" :class="{error: razaoSocialError}" v-model="dados.razaoSocial">
          <span v-if="razaoSocialError" class="error">{{ razaoSocialError }}</span> 
        </div>
      </div>

      <div class="form__row">
        <div class="form__controls">
          <label class="label__field">CNPJ</label>

          <input type="text" class="field" :class="{error: cnpjError}" v-maska="'##.###.###/####-##'" v-model="dados.cnpj">
          <span v-if="cnpjError" class="error">{{ cnpjError }}</span> 
        </div>
      </div>

      <div class="form__row">
        <div class="form__controls">
          <label class="label__field">Data de abertura</label>

          <input type="text" class="field" :class="{error: dataAberturaError}"  v-maska="'##/##/####'" v-model="dados.dataAbertura">
          <span v-if="dataAberturaError" class="error">{{ dataAberturaError }}</span> 
        </div>
      </div>

      <div class="form__row">
        <div class="form__controls">
          <label class="label__field">Telefone</label>

          <input type="text" class="field" :class="{error: telefoneError}"  v-maska="'(##) #####-####'" v-model="dados.telefone">
          <span v-if="telefoneError" class="error">{{ telefoneError }}</span> 
        </div>
      </div>

      <div class="form__row buttons">
        <router-link to="/" class="btn btn__outline__primary">Voltar</router-link>
        <button type="submit" class="btn btn__primary">Continuar</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
  .pessoa__fisica {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    justify-content: center;

    @include form;
  }
</style>
