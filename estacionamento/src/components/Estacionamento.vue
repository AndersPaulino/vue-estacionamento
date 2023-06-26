<template>
  <div class="hello">
    <header>
      <div class="logo">
        <h1 class="main-text">PS Express</h1>
        <h2 class="sub-text">ParkingSmart<br>Express</h2>
      </div>
      <button class="condutor">
        Condutor
      </button>
      <button class="veiculo">
        Veiculo
      </button>
      <button class="movimentacao">
        Movimentacao
      </button>
      <button class="configuracao">
        Configuracao
      </button>
    </header>
    <nav></nav>
    <aside>
    </aside>
    <main>
      <article></article>
      <section></section>
    </main>
    <footer></footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment, { Duration } from 'moment';
import { Decimal } from 'decimal.js';
import axios, { AxiosResponse } from 'axios';
import api from './Api';




interface Condutor {
  id: number;
  nomeCondutor: string;
  cpf: string;
  telefone: string;
  tempoDesconto: moment.Moment;
  tempoPago: moment.Moment;
}

interface Item {
  id: number;
  name: string;
}

@Component
export default class Estacionamento extends Vue {
  items: Item[] = [];

  async getData() {
    try {
      const response: AxiosResponse<Item[]> = await axios.get('http://localhost:8080'); // Substitua pelo endpoint correto da sua API Java
      this.items = response.data;
      console.log('Dados recebidos:', this.items); // Exibe os dados no console para verificar se foram recebidos corretamente
    } catch (error) {
      console.error('Erro ao obter os dados:', error);
    }
  }


  mounted() {
    const tempoPago = moment('2023-06-15T10:30:00');
    const tempoDesconto = moment();

    const condutor: Condutor = {
      id: 1,
      nomeCondutor: 'Alex',
      cpf: '106003004750',
      telefone: '45 222522540',
      tempoDesconto,
      tempoPago
    };

    const condutorInfoElement = document.getElementById('condutorInfo');

    if (condutorInfoElement) {
      const idElement = document.createElement('p');
      idElement.innerText = `ID: ${condutor.id}`;
      condutorInfoElement.appendChild(idElement);

      const nomeElement = document.createElement('p');
      nomeElement.innerText = `Nome: ${condutor.nomeCondutor}`;
      condutorInfoElement.appendChild(nomeElement);

      const cpfElement = document.createElement('p');
      cpfElement.innerText = `CPF: ${condutor.cpf}`;
      condutorInfoElement.appendChild(cpfElement);

      const telefoneElement = document.createElement('p');
      telefoneElement.innerText = `Telefone: ${condutor.telefone}`;
      condutorInfoElement.appendChild(telefoneElement);

      const tempoDescontoElement = document.createElement('p');
      tempoDescontoElement.innerText = `Tempo de Desconto: ${condutor.tempoDesconto.toString()}`;
      condutorInfoElement.appendChild(tempoDescontoElement);

      const tempoPagoElement = document.createElement('p');
      tempoPagoElement.innerText = `Tempo Pago: ${condutor.tempoPago.toString()}`;
      condutorInfoElement.appendChild(tempoPagoElement);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{  
    padding: 0;
    margin: 0;
    border: 0;
    box-sizing: border-box;
}
header{
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: #F5F5F5;
  width: 100%;
  height: 7%;
}
header button {
  margin-top: 15px;
  font-size: 16px;
  border-style: solid;
  border-width: 2px;
  height: 40px;
  width: 130px;
  border-radius: 7px;
  margin: 5px;
  background-color: #FFFFFF;
  border-color: #30A2FF;
  color: #30A2FF;
}
header button:hover{
  background-color: #30A2FF;
  color: #FFFFFF;
}
header button:active{
  background-color: grey;
  border-color: grey;
}
.logo {
  position: relative;
  text-align: center;
  padding-right: 100px;
  width: 300px;
  transition: opacity 0.3s ease-in-out;
}

.sub-text {
  position: absolute;
  top: -10px;
  left: 25px;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.logo .main-text {
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
}

.logo:hover .main-text {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.logo:hover .sub-text {
  position: absolute;
  top: -10px;
  color: #42b983;
  opacity: 1;
}

.menu {
  display: flex;
}

input[type="radio"] {
  display: none;
}

label {
  display: inline-block;
  padding: 10px 20px;
  background-color: #eee;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

label:hover {
  background-color: #ddd;
}
#condutorInfo{
  color: #42b983;
}

.sidebar {
  width: 200px;
  background-color: #f1f1f1;
  padding: 20px;
  box-sizing: border-box;
}

.sidebar-header {
  margin-bottom: 20px;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
}

.sidebar-content ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.sidebar-content li {
  margin-bottom: 10px;
}

.sidebar-content a {
  text-decoration: none;
  color: #333;
}

.sidebar-content a:hover {
  color: #000;
}
</style>
