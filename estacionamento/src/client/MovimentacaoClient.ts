import { MovimentacaoModel } from "@/model/MovimentacaoModel";
import axios, { AxiosInstance } from "axios";

class MovimentacaoClient {

    private axiosClient : AxiosInstance

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/movimentacao',
            headers: {'Content-type' : 'application/json'}
        });
    }

    public async findById(id: number): Promise<MovimentacaoModel> {
        try {
            return (await this.axiosClient.get<MovimentacaoModel>(`/${id}`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async listaAll(): Promise<MovimentacaoModel[]> {
        try {
            return (await this.axiosClient.get<MovimentacaoModel[]>(``)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async listarTodos(): Promise<MovimentacaoModel[]>{
        try{
            return (await this.axiosClient.get<MovimentacaoModel[]>(`/listar`)).data
        
        } catch(error: any){
            return Promise.reject(error.response)
        }
    }

    public async cadastrar(movimentacao: MovimentacaoModel): Promise<string> {
        try {
            return (await this.axiosClient.post<string>(``, movimentacao)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }
    
    public async editar(id: number, movimentacao: MovimentacaoModel): Promise<string> {
        try {
            return (await this.axiosClient.put<string>(`/${id}`, movimentacao)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }
    
    public async excluir(id: number): Promise<string> {
        try {
            return (await this.axiosClient.delete<string>(`/${id}`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }
}

export default new MovimentacaoClient();
