import { AbstractEntity } from "./AbstractEntityModel";

export class CondutorModel extends AbstractEntity {
    nome!: string;
    cpf! : string;
    telefone! : string;
    tempoDesconto! : Date;
    tempoPago! : Date;
}