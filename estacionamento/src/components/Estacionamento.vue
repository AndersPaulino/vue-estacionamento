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
    <aside></aside>
    <main>
      <article>
        <h1>Teste</h1>
        <p>
          HelloWorld!<br>
          HelloWorld!<br>
          HelloWorld!<br>
          HelloWorld!<br>
          HelloWorld!<br>
          HelloWorld!<br>
        </p>
        <div id="condutorInfo"></div>
        <button @click="getData">Obter Dados</button>
      </article>
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


class Condutor {
  id: number;
  nomeCondutor: string;
  cpf: string;
  telefone: string;
  tempoDesconto: moment.Moment;
  tempoPago: moment.Moment;

  constructor(
    id: number,
    nomeCondutor: string,
    cpf: string,
    telefone: string,
    tempoDesconto: moment.Moment,
    tempoPago: moment.Moment
  ) {
    this.id = id;
    this.nomeCondutor = nomeCondutor;
    this.cpf = cpf;
    this.telefone = telefone;
    this.tempoDesconto = tempoDesconto;
    this.tempoPago = tempoPago;
  }
}

class Marca {
  id: number;
  nome: string;

  constructor(id: number, nome: string) {
    this.id = id;
    this.nome = nome;
  }
}

class Modelo {
  id: number;
  nomeModelo: string;
  marcaId: number;

  constructor(id: number, nomeModelo: string, marcaId: number) {
    this.id = id;
    this.nomeModelo = nomeModelo;
    this.marcaId = marcaId;
  }
}

class Veiculo {
  id: number;
  placa: string;
  modeloId: number;
  corId: number;
  tipoId: number;
  anoModelo: number;

  constructor(id: number, placa: string, modeloId: number, corId: number, tipoId: number, anoModelo: number) {
    this.id = id;
    this.placa = placa;
    this.modeloId = modeloId;
    this.corId = corId;
    this.tipoId = tipoId;
    this.anoModelo = anoModelo;
  }
}

class Cor {
  id: number;
  nomeCor: string;

  constructor(id: number, nomeCor: string) {
    this.id = id;
    this.nomeCor = nomeCor;
  }
}

class Tipo {
  id: number;
  nomeTipo: string;

  constructor(id: number, nomeTipo: string){
    this.id = id;
    this.nomeTipo = nomeTipo;
  }
}

class Configuracao {
  id: number;
  valorMinutoMulta: number;
  inicioExpediente: Date;
  fimExpediente: Date;
  tempoParaDesconto: Date;
  tempoDeDesconto: Date;
  gerarDesconto: boolean;
  vagasMoto: number;
  vagasCarro: number;
  vagasVan: number;

  constructor(
    id: number,
    valorMinutoMulta: number,
    inicioExpediente: Date,
    fimExpediente: Date,
    tempoParaDesconto: Date,
    tempoDeDesconto: Date,
    gerarDesconto: boolean,
    vagasMoto: number,
    vagasCarro: number,
    vagasVan: number
  ) {
    this.id = id;
    this.valorMinutoMulta = valorMinutoMulta;
    this.inicioExpediente = inicioExpediente;
    this.fimExpediente = fimExpediente;
    this.tempoParaDesconto = tempoParaDesconto;
    this.tempoDeDesconto = tempoDeDesconto;
    this.gerarDesconto = gerarDesconto;
    this.vagasMoto = vagasMoto;
    this.vagasCarro = vagasCarro;
    this.vagasVan = vagasVan;
  }
}

class Movimentacao {
  id: number;
  condutorId: number;
  veiculoId: number;
  dataEntrada: moment.Moment;
  dataSaida: moment.Moment;
  tempo: Duration;
  tempoDesconto: Duration;
  valorDesconto: Decimal;
  valorHora: Decimal;
  valorTotal: Decimal;
  valorMulta: Decimal;
  valorHoraMulta: Decimal;

  constructor(
    id: number,
    condutorId: number,
    veiculoId: number,
    dataEntrada: moment.Moment,
    dataSaida: moment.Moment,
    tempo: Duration,
    tempoDesconto: Duration,
    valorDesconto: Decimal,
    valorHora: Decimal,
    valorTotal: Decimal,
    valorMulta: Decimal,
    valorHoraMulta: Decimal
  ) {
    this.id = id;
    this.condutorId = condutorId;
    this.veiculoId = veiculoId;
    this.dataEntrada = dataEntrada;
    this.dataSaida = dataSaida;
    this.tempo = tempo;
    this.tempoDesconto = tempoDesconto;
    this.valorDesconto = valorDesconto;
    this.valorHora = valorHora;
    this.valorTotal = valorTotal;
    this.valorMulta = valorMulta;
    this.valorHoraMulta = valorHoraMulta;
  }
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

    const condutor = new Condutor(
      1,
      'Alex',
      '106003004750',
      '45 222522540',
      tempoDesconto,
      tempoPago
    );

    const condutorInfoElement = document.getElementById('condutorInfo');

    const idElement = document.createElement('p');
    idElement.innerText = `ID: ${condutor.id}`;

    const nomeElement = document.createElement('p');
    nomeElement.innerText = `Nome: ${condutor.nomeCondutor}`;

    const cpfElement = document.createElement('p');
    cpfElement.innerText = `CPF: ${condutor.cpf}`;

    const telefoneElement = document.createElement('p');
    telefoneElement.innerText = `Telefone: ${condutor.telefone}`;

    const tempoDescontoElement = document.createElement('p');
    tempoDescontoElement.innerText = `Tempo de Desconto: ${condutor.tempoDesconto}`;

    const tempoPagoElement = document.createElement('p');
    tempoPagoElement.innerText = `Tempo Pago: ${condutor.tempoPago}`;

    if (condutorInfoElement) {
      condutorInfoElement.appendChild(idElement);
      condutorInfoElement.appendChild(nomeElement);
      condutorInfoElement.appendChild(cpfElement);
      condutorInfoElement.appendChild(telefoneElement);
      condutorInfoElement.appendChild(tempoDescontoElement);
      condutorInfoElement.appendChild(tempoPagoElement);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  text-align: center;
  margin-top: 50px;
}

.main-text {
  position:absolute;
  font-size: 36px;
  font-weight: bold;
  position: relative;
  z-index: 2;
  transition: opacity 0.3s;
  opacity: 1;
}

.sub-text {
  font-size: 18px;
  color: #888;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  opacity: 0;
  z-index: 1;
  transition: opacity 0.3s;
}

.logo:hover .main-text {
  opacity: 0;
}

.logo:hover .sub-text {
  opacity: 1;
}


h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
#condutorInfo{
  color: #42b983;
}
</style>
