<template>
    <div class="container" style="background: ;">
  
      <div class="row">
        <div class="col-md-10 text-start"> <p class="fs-3"> Cadastrar de Veículo </p> </div>
        <div class="col-md-2"> </div>
      </div>
  
      <hr/>
  
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
          <label class="form-label">Placa *</label>
          <input type="text" :disabled="this.form === 'excluir' ? '' : disabled" class="form-control" v-model="veiculo.placa">
        </div>
      </div>
  
      <div class="row">
        <div class="col-md-12 text-start">
          <label class="form-label">Modelo *</label>
          <input type="text" :disabled="this.form === 'excluir' ? '' : disabled" class="form-control" v-model="veiculo.modelo">
        </div>
      </div>
  
      <div class="row">
        <div class="col-md-12 text-start">
            <label class="form-label">Cor *</label>
            <select :disabled="form === 'excluir' ? '' : disabled" class="form-control" v-model="veiculo.cor">
            <option value="AZUL">Azul</option>
            <option value="BRANCO">Branco</option>
            <option value="CINZA">Cinza</option>
            <option value="FANTASIA">Fantasia</option>
            <option value="PRETO">Preto</option>
            <option value="VERDE">Verde</option>
            <option value="VERMELHO">Vermelho</option>
            </select>
        </div>
        </div>

        <div class="row">
        <div class="col-md-12 text-start">
            <label class="form-label">Tipo de Veículo *</label>
            <select :disabled="form === 'excluir' ? '' : disabled" class="form-control" v-model="veiculo.tipoVeiculo">
            <option value="CARRO">Carro</option>
            <option value="MOTO">Moto</option>
            <option value="CAMINHAO">Caminhão</option>

            </select>
        </div>
        </div>

  
      <div class="row">
        <div class="col-md-12 text-start">
          <label class="form-label">Ano do Modelo *</label>
          <input type="number" :disabled="this.form === 'excluir' ? '' : disabled" class="form-control" v-model="veiculo.anoModelo">
        </div>
      </div>
  
      <div class="row">
        <div class="col-md-3 offset-md-6"> 
          <div class="d-grid gap-2">
            <router-link type="button" class="btn btn-info" 
              to="/veiculo/lista">Voltar
            </router-link>
          </div>
        </div>
        <div class="col-md-3 "> 
          <div class="d-grid gap-2">
            <button v-if="this.form === undefined" type="button" 
                class="btn btn-success" @click="onClickCadastrar()">
              Cadastrar 
            </button>
            <button v-if="this.form === 'editar'" type="button" 
                class="btn btn-warning" @click="onClickEditar()">
              Editar 
            </button>
            <button v-if="this.form === 'excluir'" type="button" 
                class="btn btn-danger" @click="onClickExcluir()">
              Excluir 
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import VeiculoClient from '@/client/VeiculoClient';
  import { VeiculoModel } from '@/model/VeiculoModel';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'VeiculoFormulario',
    data() {
      return { 
        veiculo: new VeiculoModel(),
        mensagem: {
          ativo: false as boolean,
          titulo: "" as string,
          mensagem: "" as string,
          css: "" as string
        }
      }
    },
    computed: {
      id () {
        return this.$route.query.id
      },
      form () {
        return this.$route.query.form
      }
    },
    mounted() { 
      if(this.id !== undefined){
        this.findById(Number(this.id));
      }
    },
    methods: {
      onClickCadastrar(){
        VeiculoClient.cadastrar(this.veiculo)
          .then(sucess => {
            this.veiculo = new VeiculoModel()
            
            this.mensagem.ativo = true;
            this.mensagem.mensagem = sucess;
            this.mensagem.titulo = "Parabens. ";
            this.mensagem.css = "alert alert-success alert-dismissible fade show";
          })
          .catch(error => {
            this.mensagem.ativo = true;
            this.mensagem.mensagem = error;
            this.mensagem.titulo = "Error. ";
            this.mensagem.css = "alert alert-danger alert-dismissible fade show";
          });
      },
      findById(id: number){
        VeiculoClient.findById(id)
          .then(sucess => {
            this.veiculo = sucess
          })
          .catch(error => {
            this.mensagem.ativo = true;
            this.mensagem.mensagem = error;
            this.mensagem.titulo = "Error. ";
            this.mensagem.css = "alert alert-danger alert-dismissible fade show";
          });
      },
      onClickEditar(){
        VeiculoClient.editar(this.veiculo.id, this.veiculo)
          .then(sucess => {
            this.veiculo = new VeiculoModel()
            
            this.mensagem.ativo = true;
            this.mensagem.mensagem = sucess;
            this.mensagem.titulo = "Parabens. ";
            this.mensagem.css = "alert alert-success alert-dismissible fade show";
          })
          .catch(error => {
            this.mensagem.ativo = true;
            this.mensagem.mensagem = error;
            this.mensagem.titulo = "Error. ";
            this.mensagem.css = "alert alert-danger alert-dismissible fade show";
          });
      },
      onClickExcluir(){
        VeiculoClient.excluir(this.veiculo.id)
          .then(sucess => {
            this.veiculo = new VeiculoModel()
            
            this.$router.push({ name: 'veiculo-lista-view' });
          })
          .catch(error => {
            this.mensagem.ativo = true;
            this.mensagem.mensagem = error;
            this.mensagem.titulo = "Error. ";
            this.mensagem.css = "alert alert-danger alert-dismissible fade show";
          });
      }
    }
  });
  </script>
  