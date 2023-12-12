<script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import Steps from './Steps.vue';
  import Title from './Title.vue';
  import { storeToRefs } from 'pinia'
  import { useRegister } from '@/stores/register';

  const storeRegister = useRegister();
  const { dados } = storeToRefs(storeRegister);

  const router = useRouter();
  const radio = ref(null);
  const emailError = ref(null);
  const radioError = ref(null);

  onMounted(() => {
    if( localStorage.dados !== undefined) {
      storeRegister.setDados(JSON.parse(localStorage.dados))
    }
  })


  function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(dados._object.dados.email)) {
      emailError.value = 'Por favor, insira um endereço de e-mail válido.';
      return false;
    }
    emailError.value = null;
    return true;
  }

  function validateRadio() {
    if (!dados._object.dados.tipoCadastro) {
      radioError.value = 'Por favor, selecione uma opção.';
      return false;
    }
    radioError.value = null;
    return true;
  }

  const selectPerson = (param) => {
    storeRegister.setDados({
      email: dados._object.dados.email,
      tipoCadastro: param,
      nome: '',
      cpf: '',
      dataNascimento: '',
      razaoSocial: '',
      cnpj: '',
      dataAbertura: '',
      telefone: '',
      telefoneCnpj: '',
      senha: ''
    })
  }

  function sendFirtStep() {
    if (!validateEmail() || !validateRadio()) {
      return;
    }

    localStorage.dados = JSON.stringify(dados.value)
    storeRegister.setDados(dados)

    if (dados._object.dados.tipoCadastro === 'Pessoa física') {
      router.push('/register/pessoa-fisica');
    } else if (dados._object.dados.tipoCadastro === 'Pessoa jurídica') {
      router.push('/register/pessoa-juridica');
    }
  }
</script>

<template>
  <div class="register">
    <Steps :stepNumber="1" />

    <Title :title="'Seja bem vindo(a)'" />

    <form action="" class="form__class" @submit.stop.prevent="sendFirtStep">
      <div class="form__row">
        <div class="form__controls">
          <label class="label__field">
            Endereço de e-mail
          </label>

          <input type="email" class="field" :class="{error: emailError}" v-model="dados.email">
          <span v-if="emailError" class="error">{{ emailError }}</span> 
        </div>
      </div>

      <div class="form__row radios">
        <div class="form__controls" @click.stop.prevent="selectPerson('Pessoa física')">
          <input v-model="dados.tipoCadastro" type="radio" class="field__radio" :class="{error: radioError}" name="pessoaFisica" value="Pessoa física" id="pessoaFisica">

          <label for="pessoaFisica" class="label__radio" :class="{error: radioError}">
            Pessoa física
          </label>
        </div>

        <div class="form__controls" @click.stop.prevent="selectPerson('Pessoa jurídica')">
          <input v-model="dados.tipoCadastro" type="radio" class="field__radio" :class="{error: radioError}" name="pessoaJuridica" value="Pessoa jurídica" id="pessoaJuridica">

          <label for="pessoaJuridica" class="label__radio" :class="{error: radioError}">
            Pessoa jurídica
          </label>
        </div>
      </div>

      <div class="form__row button">
        <button type="submit" class="btn btn__primary">Continuar</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
  .register {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    align-items: center;

    @include form;
  }
</style>