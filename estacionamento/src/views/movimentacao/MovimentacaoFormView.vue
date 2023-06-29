<template>
  <div class="container" style="background: ;">
    <div class="row">
      <div class="col-md-10 text-start">
        <p class="fs-3">Cadastrar Movimentação</p>
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
        <label class="form-label">Condutor*</label>
        <select :disabled="form === 'excluir' ? '' : disabled" class="form-control" v-model="movimentacao.condutor">
          <option v-for="condutor in condutores" :key="condutor.id" :value="condutor.id">{{ condutor.nome }}</option>
        </select>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 text-start">
        <label class="form-label">Veiculo*</label>
        <select :disabled="form === 'excluir' ? '' : disabled" class="form-control" v-model="movimentacao.veiculo">
          <option v-for="veiculo in veiculos" :key="veiculo.id" :value="veiculo.id">{{ veiculo.modelo }}</option>
        </select>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 text-start">
        <label class="form-label">Entrada *</label>
        <input type="text" :disabled="this.form === 'excluir' ? '' : disabled" class="form-control" v-model="movimentacao.dataEntrada">
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 text-start">
        <label class="form-label">Saida </label>
        <input type="text" :disabled="this.form === 'excluir' ? '' : disabled" class="form-control" v-model="movimentacao.dataSaida">
      </div>
    </div>

    <div class="row">
      <div class="col-md-3 offset-md-6">
        <div class="d-grid gap-2">
          <router-link type="button" class="btn btn-info" to="/movimentacao/lista">Voltar</router-link>
        </div>
      </div>
      <div class="col-md-3">
        <div class="d-grid gap-2">
          <button v-if="this.form === undefined" type="button" class="btn btn-success" @click="onClickCadastrar()">
            Cadastrar
          </button>
          <button v-if="this.form === 'editar'" type="button" class="btn btn-warning" @click="onClickEditar()">
            Editar
          </button>
          <button v-if="this.form === 'excluir'" type="button" class="btn btn-danger" @click="onClickExcluir()">
            Excluir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MovimentacaoClient from '@/client/MovimentacaoClient';
import { MovimentacaoModel } from '@/model/MovimentacaoModel';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MovimentacaoFormulario',
  data() {
    return {
      movimentacao: new MovimentacaoModel(),
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
      MovimentacaoClient.cadastrar(this.movimentacao)
        .then((sucess) => {
          this.movimentacao = new MovimentacaoModel();

          this.mensagem.ativo = true;
          this.mensagem.mensagem = sucess;
          this.mensagem.titulo = 'Parabéns. ';
          this.mensagem.css = 'alert alert-success alert-dismissible fade show';
        })
        .catch((error) => {
          this.mensagem.ativo = true;
          this.mensagem.mensagem = error;
          this.mensagem.titulo = 'Error. ';
          this.mensagem.css = 'alert alert-danger alert-dismissible fade show';
        });
    },
    findById(id: number) {
      MovimentacaoClient.findById(id)
        .then((sucess) => {
          this.movimentacao = sucess;
        })
        .catch((error) => {
          this.mensagem.ativo = true;
          this.mensagem.mensagem = error;
          this.mensagem.titulo = 'Error. ';
          this.mensagem.css = 'alert alert-danger alert-dismissible fade show';
        });
    },
    onClickEditar() {
      MovimentacaoClient.editar(this.movimentacao.id, this.movimentacao)
        .then((sucess) => {
          this.movimentacao = new MovimentacaoModel();

          this.mensagem.ativo = true;
          this.mensagem.mensagem = sucess;
          this.mensagem.titulo = 'Parabéns. ';
          this.mensagem.css = 'alert alert-success alert-dismissible fade show';
        })
        .catch((error) => {
          this.mensagem.ativo = true;
          this.mensagem.mensagem = error;
          this.mensagem.titulo = 'Error. ';
          this.mensagem.css = 'alert alert-danger alert-dismissible fade show';
        });
    },
    onClickExcluir() {
      MovimentacaoClient.excluir(this.movimentacao.id)
        .then((sucess) => {
          this.movimentacao = new MovimentacaoModel();

          this.$router.push({ name: 'movimentacao-lista-view' });
        })
        .catch((error) => {
          this.mensagem.ativo = true;
          this.mensagem.mensagem = error;
          this.mensagem.titulo = 'Error. ';
          this.mensagem.css = 'alert alert-danger alert-dismissible fade show';
        });
    },
  },
});
</script>
