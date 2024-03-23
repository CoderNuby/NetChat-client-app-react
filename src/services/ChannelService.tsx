import axios, { AxiosResponse } from "axios";
import { IChannel } from "../models/channel";
import { toast } from "react-toastify";


class ChannelServices{

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

            if(err.response.status === 500){
                toast.error("Internal error server");
            }
        });
    }

    request = {
        get: (url: string) => axios.get(url).then(this.responseBody),
        post: (url: string, channel: IChannel) => axios.post(url, channel).then(this.responseBody).then(() => toast.success("Channel created successfull")),
        put: (url: string, channel: IChannel) => axios.put(url, channel).then(this.responseBody),
        delete: (url: string) => axios.delete(url).then(this.responseBody)
    }

    responseBody(response: AxiosResponse) { return response.data };

    getChannels(): Promise<IChannel[]> {
        return this.request.get("channels/all")
    }

    createChannel(channel: IChannel){
        return this.request.post("channels", channel);
    }

}

export default ChannelServices; 

