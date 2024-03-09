import axios, { AxiosResponse } from "axios";
import { IChannel } from "../models/channel";


axios.defaults.baseURL = "https://localhost:44397/api/";

const responseBody = (response: AxiosResponse) => response.data;

const request = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, channel: IChannel) => axios.post(url, channel).then(responseBody),
    put: (url: string, channel: IChannel) => axios.put(url, channel).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}


function getChannels(): Promise<IChannel[]> {
    return request.get("channels/all")
}

function createChannel(channel: IChannel){
    return request.post("channels", channel);
}

const channelServices = {
    getChannels,
    createChannel
}

export default channelServices; 

