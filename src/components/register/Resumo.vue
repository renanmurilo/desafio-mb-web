<script setup>
  import Steps from './Steps.vue';
  import Title from './Title.vue';
  import { useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia'
  import { useRegister } from '@/stores/register';
  import { onMounted, ref } from 'vue'
  import axios from 'axios';

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
  const nomeError = ref(false);
  const cpfError = ref(false);
  const dataNascimentoError = ref(false);
  const passwordError = ref(false)
  const emailError = ref(null);

  async function registrar() {
    await axios.post('http://localhost:3000/registration',  dados.value).then(() => {
      window.open('http://localhost:3000/registration', '_blank')
      localStorage.clear();
      storeRegister.setDados({
        email: '',
        tipoCadastro: '',
        nome: '',
        cpf: '',
        dataNascimento: '',
        razaoSocial: '',
        cnpj: '',
        dataAbertura: '',
        telefone: '',
        telefoneCnpj: '',
        senha: ''
      });

      setTimeout(() => {
        router.push('/')
      }, 1000)
    }).catch((error) => {
      alert(`${error.response.data.error}`)
      validateCnpj();
      validateDataAbertura();
      validateRazaoSocial();
      validateTelefone();
      validateNome();
      validateCpf();
      validateDataNascimento();
      validatePassword();
      validateEmail();
    });
  } 

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

  const validatePassword = () => {
    const trimmedPassword = dados._object.dados.senha.trim();

    if (trimmedPassword === '') {
      passwordError.value = 'Por favor, insira uma senha.';
      return false; // Validation failed
    }

    passwordError.value = false;
    return true; // Validation passed
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(dados._object.dados.email)) {
      emailError.value = 'Por favor, insira um endereço de e-mail válido.';
      return false;
    }
    emailError.value = null;
    return true;
  }
</script>

<template>
  <div class="resumo__dados">
    <Steps :stepNumber="4" />

    <Title :title="'Revise suas informações'" />

    <form action="" class="form__class" @submit.stop.prevent="registrar">
      <div class="form__row">
        <div class="form__controls">
          <label for="" class="label__field">
            Endereço de e-mail
          </label>

          <input type="email" class="field" :class="{error: emailError}" v-model="dados.email">
          <span v-if="emailError" class="error">{{ emailError }}</span> 
        </div>
      </div>
      
      <div class="form__row" v-if="dados.tipoCadastro === 'Pessoa física'">
        <div class="form__controls">
          <label class="label__field">Nome</label>

          <input type="text" class="field" :class="{error: nomeError}" v-model="dados.nome">
          <span v-if="nomeError" class="error">{{ nomeError }}</span> 
        </div>
      </div>

      <div class="form__row" v-if="dados.tipoCadastro === 'Pessoa jurídica'">
        <div class="form__controls">
          <label class="label__field">Razão social</label>

          <input type="text" class="field" :class="{error: razaoSocialError}" v-model="dados.razaoSocial">
          <span v-if="razaoSocialError" class="error">{{ razaoSocialError }}</span> 
        </div>
      </div>

      <div class="form__row" v-if="dados.tipoCadastro === 'Pessoa física'">
        <div class="form__controls">
          <label class="label__field">CPF</label>

          <input type="text" class="field" :class="{error: cpfError}" v-model="dados.cpf"  v-maska="'###.###.###-##'">
          <span v-if="cpfError" class="error">{{ cpfError }}</span>
        </div>
      </div>

      <div class="form__row" v-if="dados.tipoCadastro === 'Pessoa jurídica'">
        <div class="form__controls">
          <label class="label__field">CNPJ</label>

          <input type="text" class="field" :class="{error: cnpjError}" v-model="dados.cnpj" v-maska="'##.###.###/####-##'">
          <span v-if="cnpjError" class="error">{{ cnpjError }}</span> 
        </div>
      </div>

      <div class="form__row" v-if="dados.tipoCadastro === 'Pessoa física'">
        <div class="form__controls">
          <label class="label__field">Data de nascimento</label>

          <input type="text" class="field" :class="{error: dataNascimentoError}" v-model="dados.dataNascimento" v-maska="'##/##/####'">
          <span v-if="dataNascimentoError" class="error">{{ dataNascimentoError }}</span> 
        </div>
      </div>

      <div class="form__row" v-if="dados.tipoCadastro === 'Pessoa jurídica'">
        <div class="form__controls">
          <label class="label__field">Data de abertura</label>

          <input type="text" class="field" :class="{error: dataAberturaError}" v-model="dados.dataAbertura" v-maska="'##/##/####'">
          <span v-if="dataAberturaError" class="error">{{ dataAberturaError }}</span> 
        </div>
      </div>

      <div class="form__row">
        <div class="form__controls">
          <label class="label__field">Telefone</label>

          <input type="text" class="field" :class="{error: telefoneError}" v-model="dados.telefone" v-maska="'(##) #####-####'">
          <span v-if="telefoneError" class="error">{{ telefoneError }}</span> 
        </div>
      </div>

      <div class="form__row">
        <div class="form__controls">
          <label class="label__field">Sua senha</label>
          <input type="text" class="field" :class="{error: passwordError}" v-model="dados.senha">
           <span v-if="passwordError" class="error">{{ passwordError }}</span> 
        </div>
      </div>

      <div class="form__row buttons">
        <router-link to="/register/password" class="btn btn__outline__primary">Voltar</router-link>
        <button type="submit" class="btn btn__primary">Cadastrar</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
  .resumo__dados {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    justify-content: center;

    @include form;
  }
</style>
