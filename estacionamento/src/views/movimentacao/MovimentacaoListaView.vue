<template>
    <div class="container" style="margin-top: 10px;">
  
      <div class="row">
        <div class="col-md-10 text-start"> <p class="fs-3"> Lista de Movimentações </p> </div>
        <div class="col-md-2"> 
          <div class="d-grid gap-2">
            <router-link type="button" class="btn btn-success" 
              to="/movimentacao/formulario">Cadastrar
            </router-link>
          </div>
        </div>
      </div>
  
      <div class="row">
        <div class="col-md-12">  
          <table class="table">
            <thead class="table-secondary" >
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Condutor</th>
                <th scope="col">Veículo</th>
                <th scope="col">Data de Entrada</th>
                <th scope="col">Data de Saída</th>
                <th scope="col">Total</th>
                <th scope="col">Opção</th>
              </tr>
            </thead>  
            <tbody class="table-group-divider">
              
              <tr v-for="item in movimentacoesList" :key="item.id">
                <th class="col-md-1">{{ item.id }}</th>
                <th class="text-start">{{ item.condutor.nome }}</th>
                <th class="text-start">{{ item.veiculo.placa }}</th>
                <th>{{ item.dataEntrada}}</th>
                <th>{{ item.dataSaida}}</th>
                <th>{{ "R$ " + item.valorTotal}}</th>
                <th class="col-md-2">
                  <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <router-link type="button" class="btn btn-sm btn-warning" 
                        :to="{ name: 'movimentacao-formulario-editar-view', query: { id: item.id, form: 'editar' } } "> 
                      Editar 
                    </router-link>
                    <router-link type="button" class="btn btn-sm btn-danger" 
                        :to="{ name: 'movimentacao-formulario-excluir-view', query: { id: item.id, form: 'excluir' } } ">
                      Excluir
                    </router-link>
                  </div>
                </th>
              </tr>
  
            </tbody>
          </table>
        </div>
      </div>
    </div>
  
  </template>
  
  <script lang="ts">
  
  import { defineComponent } from 'vue';
  
  import MovimentacaoClient from '@/client/MovimentacaoClient';
  import { MovimentacaoModel } from '@/model/MovimentacaoModel';
  
  export default defineComponent({
  name: 'MovimentacaoLista',
  data() {
    return {
      movimentacoesList: [] as MovimentacaoModel[],
    };
  },
  mounted() {
    this.findAll();
  },
  methods: {
      calcularTempoEValorTotal(movimentacao: MovimentacaoModel): void {
        const diffMs = movimentacao.dataSaida.getTime() - movimentacao.dataEntrada.getTime();
        const diffHours = Math.round(diffMs / (1000 * 60 * 60));

        movimentacao.tempo = diffHours;

        movimentacao.valorTotal = (15 * diffHours) + 0 - 0;
      },
      findAll() {
        MovimentacaoClient.listaAll()
          .then((success) => {
            this.movimentacoesList = success;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  });

  
  </script>
  