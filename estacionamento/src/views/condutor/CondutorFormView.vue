<template>
  <div class="container">
    <div class="row">
      <div class="col-md-10 text-start">
        <p class="fs-3">Cadastrar de Condutor</p>
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
        <label class="form-label">Nome do Condutor *</label>
        <input type="text" :disabled="form === 'excluir' ? '' : disabled" class="form-control" v-model="condutor.nome" />
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 text-start">
        <label class="form-label">CPF *</label>
        <input type="text" :disabled="form === 'excluir' ? '' : disabled" class="form-control" v-model="condutor.cpf" />
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 text-start">
        <label class="form-label">Telefone *</label>
        <input type="text" :disabled="form === 'excluir' ? '' : disabled" class="form-control" v-model="condutor.telefone" />
      </div>
    </div>

    <div class="row">
      <div class="col-md-3 offset-md-6">
        <div class="d-grid gap-2">
          <router-link type="button" class="btn btn-info" to="/condutor/lista">Voltar</router-link>
        </div>
      </div>
      <div class="col-md-3">
        <div class="d-grid gap-2">
          <button v-if="form === undefined" type="button" class="btn btn-success" @click="onClickCadastrar()">Cadastrar</button>
          <button v-if="form === 'editar'" type="button" class="btn btn-warning" @click="onClickEditar()">Editar</button>
          <button v-if="form === 'excluir'" type="button" class="btn btn-danger" @click="onClickExcluir()">Excluir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CondutorClient from '@/client/CondutorClient';
import { CondutorModel } from '@/model/CondutorModel';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CondutorFormulario',
  data() {
    return {
      condutor: new CondutorModel(),
      mensagem: {
        ativo: false,
        titulo: '',
        mensagem: '',
        css: '',
      },
    };
  },
  computed: {
    id() {
      return this.$route.query.id;
    },
    form() {
      return this.$route.query.form;
    },
  },
  mounted() { 
    if (this.id !== undefined) {
      this.findById(Number(this.id));
    }
  },
  methods: {
    onClickCadastrar() {
      CondutorClient.cadastrar(this.condutor)
        .then(sucess => {
          this.condutor = new CondutorModel();
          this.mensagem.ativo = true;
          this.mensagem.mensagem = sucess;
          this.mensagem.titulo = 'Parabens.';
          this.mensagem.css = 'alert alert-success alert-dismissible fade show';
        })
        .catch(error => {
          this.mensagem.ativo = true;
          this.mensagem.mensagem = error;
          this.mensagem.titulo = 'Error.';
          this.mensagem.css = 'alert alert-danger alert-dismissible fade show';
        });
    },
    findById(id: number) {
      CondutorClient.findById(id)
        .then(sucess => {
          this.condutor = sucess;
        })
        .catch(error => {
          this.mensagem.ativo = true;
          this.mensagem.mensagem = error;
          this.mensagem.titulo = 'Error.';
          this.mensagem.css = 'alert alert-danger alert-dismissible fade show';
        });
    },
    onClickEditar() {
      CondutorClient.editar(this.condutor.id, this.condutor)
        .then(sucess => {
          this.condutor = new CondutorModel();
          this.mensagem.ativo = true;
          this.mensagem.mensagem = sucess;
          this.mensagem.titulo = 'Parabens.';
          this.mensagem.css = 'alert alert-success alert-dismissible fade show';
        })
        .catch(error => {
          this.mensagem.ativo = true;
          this.mensagem.mensagem = error;
          this.mensagem.titulo = 'Error.';
          this.mensagem.css = 'alert alert-danger alert-dismissible fade show';
        });
    },
    onClickExcluir() {
      CondutorClient.excluir(this.condutor.id)
        .then(sucess => {
          this.condutor = new CondutorModel();
          this.$router.push({ name: 'condutor-lista-view' });
        })
        .catch(error => {
          this.mensagem.ativo = true;
          this.mensagem.mensagem = error;
          this.mensagem.titulo = 'Error.';
          this.mensagem.css = 'alert alert-danger alert-dismissible fade show';
        });
    }
  }
});
</script>
