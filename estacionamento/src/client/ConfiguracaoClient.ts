import { ConfiguracaoModel } from "@/model/ConfiguracaoModel";
import axios, { AxiosInstance } from "axios";

class ConfiguracaoClient {

    private axiosClient : AxiosInstance

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/configuracao',
            headers: {'Content-type' : 'application/json'}
        });
    }

    public async findById(id: number): Promise<ConfiguracaoModel> {
        try {
            return (await this.axiosClient.get<ConfiguracaoModel>(`/${id}`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async listaAll(): Promise<ConfiguracaoModel[]> {
        try {
            return (await this.axiosClient.get<ConfiguracaoModel[]>(``)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async listarTodos(): Promise<ConfiguracaoModel[]>{
        try{
            return (await this.axiosClient.get<ConfiguracaoModel[]>(`/listar`)).data
        
        } catch(error: any){
            return Promise.reject(error.response)
        }
    }

    public async cadastrar(configuracao: ConfiguracaoModel): Promise<string> {
        try {
            return (await this.axiosClient.post<string>(``, configuracao)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }
    public async editar(id: number, configuracao: ConfiguracaoModel): Promise<string> {
        try {
            return (await this.axiosClient.put<string>(`/${id}`, configuracao)).data
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

export default new ConfiguracaoClient();
