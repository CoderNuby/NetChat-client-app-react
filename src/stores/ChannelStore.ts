import { action, configure, makeObservable, observable, runInAction, toJS } from "mobx";
import { createContext } from "react";
import { IChannelModel } from "../models/channelModel";
import ChannelService from "../services/ChannelService";
import { toast } from "react-toastify";

configure({enforceActions: "always"})
class ChannelStore {

    channelService: ChannelService;

    constructor(){
        this.channelService = new ChannelService();
        makeObservable(this);
    }

    @observable channels: IChannelModel[] = [];
    @observable openModal: boolean = false;
    @observable private activeChannel: IChannelModel | null = null;

    @action async loadChannels() {
        try {
            var resp = await this.channelService.getChannels();
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

    @action async createChannel(channel: IChannelModel){
        try {
            var newChannel = await this.channelService.createChannel(channel);
            runInAction(() => {
                this.channels.push(newChannel);
                toast.success("Channel created successfuly");
            });
        } catch (err) {
            console.error(err);
        }
    }

    @action async setActiveChannel(channel: IChannelModel){
        let result = await this.channelService.getChannel(channel.id);
        runInAction(() => {
            this.activeChannel = result;
        });
    }

    getActiveChannel(){
        return toJS(this.activeChannel);
    }
}


export default createContext(new ChannelStore())
