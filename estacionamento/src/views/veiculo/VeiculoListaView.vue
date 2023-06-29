<template>
    <div class="container" style="margin-top: 10px;">
      <div class="row">
        <div class="col-md-10 text-start"> <p class="fs-3"> Lista de Veículos </p> </div>
        <div class="col-md-2"> 
          <div class="d-grid gap-2">
            <router-link type="button" class="btn btn-success" to="/veiculo/formulario">Cadastrar</router-link>
          </div>
        </div>
      </div>
  
      <div class="row">
        <div class="col-md-12">  
          <table class="table">
            <thead class="table-secondary">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Ativo</th>
                <th scope="col" class="text-start">Placa</th>
                <th scope="col" class="text-start">Modelo</th>
                <th scope="col" class="text-start">Cor</th>
                <th scope="col" class="text-start">Tipo de Veículo</th>
                <th scope="col" class="text-start">Ano do Modelo</th>
                <th scope="col">Opção</th>
              </tr>
            </thead>  
            <tbody class="table-group-divider">
              <tr v-for="item in veiculosList" :key="item.id">
                <td>{{ item.id }}</td>
                <td>
                  <span v-if="item.ativo" class="badge text-bg-success"> Ativo </span>
                  <span v-if="!item.ativo" class="badge text-bg-danger"> Inativo </span>
                </td>
                <td class="text-start">{{ item.placa }}</td>
                <td class="text-start">{{ item.cor }}</td>
                <td class="text-start">{{ item.modelo.nome}}</td>
                <td class="text-start">{{ item.tipo }}</td>
                <td class="text-start">{{ item.anoModelo }}</td>
                <td>
                  <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <router-link type="button" class="btn btn-sm btn-warning" :to="{ name: 'veiculo-formulario-editar-view', query: { id: item.id, form: 'editar' } }">Editar</router-link>
                    <router-link type="button" class="btn btn-sm btn-danger" :to="{ name: 'veiculo-formulario-excluir-view', query: { id: item.id, form: 'excluir' } }">Excluir</router-link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import VeiculoClient from '@/client/VeiculoClient';
  import { VeiculoModel } from '@/model/VeiculoModel';
  
  export default defineComponent({
    name: 'VeiculoLista',
    data() {
      return {
        veiculosList: [] as VeiculoModel[]
      };
    },
    mounted() {
      this.findAll();
    },
    methods: {
      findAll() {
        VeiculoClient.listAll()
          .then((success: VeiculoModel[]) => {
            this.veiculosList = success;
          })
          .catch((error: any) => {
            console.log(error);
          });
      }
    }
  });
  </script>
  