import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { IUserModel } from "../models/userModel";

export class SeedService {
    constructor(){
        axios.defaults.baseURL = "https://localhost:44397/api/";
        axios.interceptors.response.use(undefined, (err) => {
            if(err.message === "Network Error"){
                toast.error("The API is not running");
                return;
            }

            if(err.response.status === 404){
                toast.error("Not found");
            }

            if(err.response.status === 401){
                toast.error("Unauthorized");
            }

            if(err.response.status === 500){
                toast.error("Internal error server");
            }
        });

        axios.interceptors.request.use((config) => {
            config.headers.setAuthorization(`Bearer ${this.getToken()}`);
            return config;
        });
    }

    protected request = {
        get: <TResponse>(url: string) => axios.get(url).then(this.responseBody<TResponse>),
        post: <TRequest, TResponse>(url: string, modelClass: TRequest, config?: AxiosRequestConfig) => axios.post(url, modelClass, config).then(this.responseBody<TResponse>),
        put: <TRequest, TResponse>(url: string, modelClass: TRequest) => axios.put(url, modelClass).then(this.responseBody<TResponse>),
        delete: <TReasponse>(url: string) => axios.delete(url).then(this.responseBody<TReasponse>)
    }
    
    protected responseBody<TResponse>(response: AxiosResponse<TResponse>) { return response.data };

    private getToken(){
        const userJson = localStorage.getItem("user");
        if (userJson) {
            let user: IUserModel = JSON.parse(userJson);
            return user.token;
        } else {
            return null;
        }
    }
}