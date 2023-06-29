import { AbstractEntity } from "./AbstractEntityModel";
import { ModeloModel} from "./ModeloModel";
import { CorModel} from "./CorModel";
import { TipoModel} from "./TipoModel";

export class VeiculoModel extends AbstractEntity {
    nomeVeiculo!: string;
    placa! : string;
    modelo! : ModeloModel;
    cor! : CorModel;
    tipo! : TipoModel;
    anoModelo! : number;
}