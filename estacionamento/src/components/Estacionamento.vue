<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div id="condutorInfo"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import moment from 'moment';

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

@Component
export default class Estacionamento extends Vue {
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
a {
  color: #42b983;
}
</style>
