<script setup>
  import { reactive, ref, onMounted } from 'vue';
  import { RouterLink, useRouter } from 'vue-router';
  import Steps from '../Steps.vue';
  import Title from '../Title.vue';
  import { storeToRefs } from 'pinia';
  import { useRegister } from '@/stores/register';

  const router = useRouter();
  const storeRegister = useRegister();
  const { dados } = storeToRefs(storeRegister);

  onMounted(() => {
    if( localStorage.dados !== undefined) {
      storeRegister.setDados(JSON.parse(localStorage.dados))
    }
  })

  // variaveis de erro
  const nomeError = ref(false);
  const cpfError = ref(false);
  const dataNascimentoError = ref(false);
  const telefoneError = ref(false);

  const validateNome = () => {
    const trimmedNome = dados._object.dados.nome.trim();

    if (trimmedNome === '') {
      nomeError.value = 'Por favor, insira um nome.';
      return false; // Validation failed
    }

    nomeError.value = false;
    return true; // Validation passed
  };

  const validateCpf = () => {
    const trimmedCpf = dados._object.dados.cpf.trim();

    if (trimmedCpf === '') {
      cpfError.value = 'Por favor, insira um CPF.';
      return false; // Validation failed
    }

    cpfError.value = false;
    return true; // Validation passed
  };

  const validateDataNascimento = () => {
    const trimmedDataNascimento = dados._object.dados.dataNascimento.trim();

    if (trimmedDataNascimento === '') {
      dataNascimentoError.value = 'Por favor, insira uma data de nascimento.';
      return false; // Validation failed
    }

    dataNascimentoError.value = false;
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
    if (validateNome() && validateCpf() && validateDataNascimento() && validateTelefone()) {
      localStorage.dados = JSON.stringify(dados.value)
      storeRegister.setDados(dados)
      router.push('/register/password');
    }
  }
</script>

<template>
  <div class="pessoa__fisica">
    <Steps :stepNumber="2" />

    <Title :title="'Pessoa Física'" />
    
    <form action="" class="form__class" @submit.stop.prevent="nextStep">
      <div class="form__row">
        <div class="form__controls">
          <label class="label__field">Nome</label>

          <input type="text" class="field" :class="{error: nomeError}" v-model="dados.nome">
          <span v-if="nomeError" class="error">{{ nomeError }}</span> 
        </div>
      </div>

      <div class="form__row">
        <div class="form__controls">
          <label class="label__field">CPF</label>

          <input type="text" class="field" v-model="dados.cpf" :class="{error: cpfError}" v-maska="'###.###.###-##'">
          <span v-if="cpfError" class="error">{{ cpfError }}</span> 
        </div>
      </div>

      <div class="form__row">
        <div class="form__controls">
          <label class="label__field">Data de nascimento</label>

          <input type="text" class="field" v-model="dados.dataNascimento" :class="{error: dataNascimentoError}" v-maska="'##/##/####'">
          <span v-if="dataNascimentoError" class="error">{{ dataNascimentoError }}</span> 
        </div>
      </div>

      <div class="form__row">
        <div class="form__controls">
          <label class="label__field">Telefone</label>

          <input type="text" class="field" v-model="dados.telefone" :class="{error: telefoneError}" v-maska="'(##) #####-####'">
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
