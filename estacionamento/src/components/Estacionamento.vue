<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div id="condutorInfo"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment, { Duration } from 'moment';
import { Decimal } from 'decimal.js';
import axios, { AxiosResponse } from 'axios';


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

class MyApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async fetchData(): Promise<any> {
    try {
      const response: AxiosResponse = await axios.get(`${this.baseUrl}/data`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  public async sendData(payload: any): Promise<void> {
    try {
      await axios.post(`${this.baseUrl}/data`, payload);
      console.log('Data sent successfully');
    } catch (error) {
      console.error('Error sending data:', error);
      throw error;
    }
  }
}



@Component
export default class Estacionamento extends Vue {
  private apiClient!: MyApiClient;

  created() {
    this.apiClient = new MyApiClient('https://estacionamento.uniamerica.com.br');
  }

  async fetchDataFromServer() {
    try {
      const data = await this.apiClient.fetchData();
      console.log('Received data:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async sendDataToServer() {
    try {
      const payload = { name: 'John', age: 25 };
      await this.apiClient.sendData(payload);
    } catch (error) {
      console.error('Error sending data:', error);
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
