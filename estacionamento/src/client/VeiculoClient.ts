import { VeiculoModel } from "@/model/VeiculoModel";
import axios, { AxiosInstance } from "axios";

class VeiculoClient {

    private axiosClient : AxiosInstance

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/veiculo',
            headers: {'Content-type' : 'application/json'}
        });
    }

    public async findById(id: number): Promise<VeiculoModel> {
        try {
            return (await this.axiosClient.get<VeiculoModel>(`/${id}`)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async listAll(): Promise<VeiculoModel[]> {
        try {
            return (await this.axiosClient.get<VeiculoModel[]>(``)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }

    public async listarTodos(): Promise<VeiculoModel[]>{
        try{
            return (await this.axiosClient.get<VeiculoModel[]>(`/listar`)).data
        
        } catch(error: any){
            return Promise.reject(error.response)
        }
    }

    public async cadastrar(veiculo: VeiculoModel): Promise<string> {
        try {
            return (await this.axiosClient.post<string>(``, veiculo)).data
        } catch (error:any) {
            return Promise.reject(error.response)
        }
    }
    public async editar(id: number, veiculo: VeiculoModel): Promise<string> {
        try {
            return (await this.axiosClient.put<string>(`/${id}`, veiculo)).data
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

export default new VeiculoClient();
