import { action, configure, makeObservable, observable, runInAction } from "mobx";
import { createContext } from "react";
import { IChannel } from "../models/channel";
import channelServices from "../services/ChannelService";

configure({enforceActions: "always"})
class ChannelStore {

    constructor(){
        makeObservable(this);
    }

    @observable channels: IChannel[] = [];
    @observable openModal: boolean = false;

    @action async loadChannels() {
        try {
            var resp = await channelServices.getChannels();
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
            await channelServices.createChannel(channel);
            runInAction(() => {
                this.channels.push(channel);
            });
        } catch (err) {
            console.error(err);
        }
    }
}


export default createContext(new ChannelStore())
