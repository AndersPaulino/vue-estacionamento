import { AbstractEntity } from "./AbstractEntityModel"
import { MarcaModel } from "./MarcaModel"

export class ModeloModel extends AbstractEntity {
    nome! : string
    marca! : MarcaModel
}