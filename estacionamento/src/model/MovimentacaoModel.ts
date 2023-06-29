import { AbstractEntity } from "./AbstractEntityModel";
import { CondutorModel } from "./CondutorModel";
import { VeiculoModel } from "./VeiculoModel";

export class MovimentacaoModel extends AbstractEntity {
    condutor!: CondutorModel;
    veiculo!: VeiculoModel;
    dataEntrada!: Date;
    dataSaida!: Date;
    tempo!: number;
    tempoDesconto!: Date;
    tempoMulta!: Date;
    valorDesconto!: number;
    valorHora!: number;
    valorMulta!: number;
    valorHoraMulta!: number;
    valorTotal!: number;
}
