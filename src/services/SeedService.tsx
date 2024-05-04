import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { IUserModel } from "../models/userModel";

export class SeedService<T> {
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
        get: (url: string) => axios.get(url).then(this.responseBody),
        create: (url: string, modelClass: T) => axios.post(url, modelClass).then(this.responseBody),
        post: (url: string, modelClass: T) => axios.post(url, modelClass).then(this.responseBody),
        put: (url: string, modelClass: T) => axios.put(url, modelClass).then(this.responseBody),
        delete: (url: string) => axios.delete(url).then(this.responseBody)
    }
    
    protected responseBody(response: AxiosResponse) { return response.data };

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