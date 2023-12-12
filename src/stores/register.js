import { defineStore } from "pinia";

export const useRegister = defineStore('storeRegister', {
  id: 'useRegister',
  state: () => ({
    dados: {
      email: '',
      tipoCadastro: '',
      nome: '',
      cpf: '',
      dataNascimento: '',
      razaoSocial: '',
      cnpj: '',
      dataAbertura: '',
      telefone: '',
      senha: ''
    }
  }),
  actions: {
    setDados (payload) {
      this.dados = payload
    }
  }
})