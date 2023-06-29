import { CondutorModel } from "@/model/CondutorModel";
import axios, { AxiosInstance } from "axios";

class CondutorClient {
  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: "http://localhost:8080/api/condutor",
      headers: { "Content-type": "application/json" },
    });
  }

  public async findById(id: number): Promise<CondutorModel> {
    try {
      return (await this.axiosClient.get<CondutorModel>(`/${id}`)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async listAll(): Promise<CondutorModel[]> {
    try {
      return (await this.axiosClient.get<CondutorModel[]>(``)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async listarTodos(): Promise<CondutorModel[]>{
    try{
        return (await this.axiosClient.get<CondutorModel[]>(`/listar`)).data
    
    } catch(error: any){
        return Promise.reject(error.response)
    }
}

  public async cadastrar(condutor: CondutorModel): Promise<string> {
    try {
      return (await this.axiosClient.post<string>(``, condutor)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async editar(id: number, condutor: CondutorModel): Promise<string> {
    try {
      return (await this.axiosClient.put<string>(`/${id}`, condutor)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async excluir(id: number): Promise<string> {
    try {
      return (await this.axiosClient.delete<string>(`/${id}`)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }
}

export default new CondutorClient();
