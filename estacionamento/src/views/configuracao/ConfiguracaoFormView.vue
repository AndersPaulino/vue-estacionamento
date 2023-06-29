<template>
    <div class="container" style="background:;">
      <div class="row">
        <div class="col-md-10 text-start">
          <p class="fs-3"> Cadastrar de Configuração </p>
        </div>
        <div class="col-md-2"></div>
      </div>
      <hr />
      <div v-if="mensagem.ativo" class="row">
        <div class="col-md-12 text-start">
          <div :class="mensagem.css" role="alert">
            <strong>{{ mensagem.titulo }}</strong> {{ mensagem.mensagem }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-start">
          <label class="form-label">Valor da Hora *</label>
          <input type="number" :disabled="this.form === 'excluir' ? '' : disabled" class="form-control" v-model="configuracao.valorHora" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-start">
          <label class="form-label">Valor do Minuto de Multa *</label>
          <input type="number" :disabled="this.form === 'excluir' ? '' : disabled" class="form-control" v-model="configuracao.valorMinutoMulta" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-start">
          <label class="form-label">Início do Expediente *</label>
          <input type="text" :disabled="this.form === 'excluir' ? '' : disabled" class="form-control" v-model="configuracao.inicioExpediente" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-start">
          <label class="form-label">Fim do Expediente *</label>
          <input type="text" :disabled="this.form === 'excluir' ? '' : disabled" class="form-control" v-model="configuracao.fimExpediente" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-start">
          <label class="form-label">Tempo para Desconto *</label>
          <input type="number" :disabled="this.form === 'excluir' ? '' : disabled" class="form-control" v-model="configuracao.tempoParaDesconto" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-start">
          <label class="form-label">Tempo de Desconto *</label>
          <input type="number" :disabled="this.form === 'excluir' ? '' : disabled" class="form-control" v-model="configuracao.tempoDeDesconto" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-start">
          <label class="form-label">Gerar Desconto *</label>
          <input type="checkbox" :disabled="this.form === 'excluir' ? '' : disabled" v-model="configuracao.gerarDesconto" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-start">
          <label class="form-label">Vagas para Moto *</label>
          <input type="number" :disabled="this.form === 'excluir' ? '' : disabled" class="form-control" v-model="configuracao.vagasMoto" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-start">
          <label class="form-label">Vagas para Carro *</label>
          <input type="number" :disabled="this.form === 'excluir' ? '' : disabled" class="form-control" v-model="configuracao.vagasCarro" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-start">
          <label class="form-label">Vagas para Van *</label>
          <input type="number" :disabled="this.form === 'excluir' ? '' : disabled" class="form-control" v-model="configuracao.vagasVan" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 offset-md-6">
          <div class="d-grid gap-2">
            <router-link type="button" class="btn btn-info" to="/configuracao/lista">Voltar</router-link>
          </div>
        </div>
        <div class="col-md-3">
          <div class="d-grid gap-2">
            <button v-if="this.form === undefined" type="button" class="btn btn-success" @click="onClickCadastrar()">Cadastrar</button>
            <button v-if="this.form === 'editar'" type="button" class="btn btn-warning" @click="onClickEditar()">Editar</button>
            <button v-if="this.form === 'excluir'" type="button" class="btn btn-danger" @click="onClickExcluir()">Excluir</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import ConfiguracaoClient from '@/client/ConfiguracaoClient';
  import { ConfiguracaoModel } from '@/model/ConfiguracaoModel';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'ConfiguracaoFormulario',
    data() {
      return {
        configuracao: new ConfiguracaoModel(),
        mensagem: {
          ativo: false as boolean,
          titulo: '' as string,
          mensagem: '' as string,
          css: '' as string
        }
      };
    },
    computed: {
      id() {
        return this.$route.query.id;
      },
      form() {
        return this.$route.query.form;
      }
    },
    mounted() {
      if (this.id !== undefined) {
        this.findById(Number(this.id));
      }
    },
    methods: {
      onClickCadastrar() {
        ConfiguracaoClient.cadastrar(this.configuracao)
          .then(sucesso => {
            this.configuracao = new ConfiguracaoModel();
  
            this.mensagem.ativo = true;
            this.mensagem.mensagem = sucesso;
            this.mensagem.titulo = 'Parabens. ';
            this.mensagem.css = 'alert alert-success alert-dismissible fade show';
          })
          .catch(error => {
            this.mensagem.ativo = true;
            this.mensagem.mensagem = error;
            this.mensagem.titulo = 'Error. ';
            this.mensagem.css = 'alert alert-danger alert-dismissible fade show';
          });
      },
      findById(id: number) {
        ConfiguracaoClient.findById(id)
          .then(sucesso => {
            this.configuracao = sucesso;
          })
          .catch(error => {
            this.mensagem.ativo = true;
            this.mensagem.mensagem = error;
            this.mensagem.titulo = 'Error. ';
            this.mensagem.css = 'alert alert-danger alert-dismissible fade show';
          });
      },
      onClickEditar() {
        ConfiguracaoClient.editar(this.configuracao.id, this.configuracao)
          .then(sucesso => {
            this.configuracao = new ConfiguracaoModel();
  
            this.mensagem.ativo = true;
            this.mensagem.mensagem = sucesso;
            this.mensagem.titulo = 'Parabens. ';
            this.mensagem.css = 'alert alert-success alert-dismissible fade show';
          })
          .catch(error => {
            this.mensagem.ativo = true;
            this.mensagem.mensagem = error;
            this.mensagem.titulo = 'Error. ';
            this.mensagem.css = 'alert alert-danger alert-dismissible fade show';
          });
      },
      onClickExcluir() {
        ConfiguracaoClient.excluir(this.configuracao.id)
          .then(sucesso => {
            this.configuracao = new ConfiguracaoModel();
  
            this.$router.push({ name: 'configuracao-lista-view' });
          })
          .catch(error => {
            this.mensagem.ativo = true;
            this.mensagem.mensagem = error;
            this.mensagem.titulo = 'Error. ';
            this.mensagem.css = 'alert alert-danger alert-dismissible fade show';
          });
      }
    }
  });
  </script>
  