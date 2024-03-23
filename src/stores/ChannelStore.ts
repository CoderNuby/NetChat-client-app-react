import { action, configure, makeObservable, observable, runInAction } from "mobx";
import { createContext } from "react";
import { IChannel } from "../models/channel";
import ChannelServices from "../services/ChannelService";

configure({enforceActions: "always"})
class ChannelStore {

    channelServices: ChannelServices;

    constructor(){
        this.channelServices = new ChannelServices();
        makeObservable(this);
    }

    @observable channels: IChannel[] = [];
    @observable openModal: boolean = false;

    @action async loadChannels() {
        try {
            var resp = await this.channelServices.getChannels();
            runInAction(() => {
                resp.forEach((channel) => this.channels.push(channel));
            })
        } catch (err) {
            console.error(err);
        }
    }

    @action setOpenModal(open: boolean){
        this.openModal = open;
    }

    @action async createChannel(channel: IChannel){
        try {
            await this.channelServices.createChannel(channel);
            runInAction(() => {
                this.channels.push(channel);
            });
        } catch (err) {
            console.error(err);
        }
    }
}


export default createContext(new ChannelStore())
