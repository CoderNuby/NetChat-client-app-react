import { action, configure, makeObservable, observable, runInAction, toJS } from "mobx";
import { createContext } from "react";
import { IChannelModel } from "../models/channelModel";
import ChannelService from "../services/ChannelService";
import { toast } from "react-toastify";
import { ChannelTypeEnum } from "../models/channelTypeEnum";

configure({enforceActions: "always"})
class ChannelStore {

    channelService: ChannelService;

    constructor(){
        this.channelService = new ChannelService();
        makeObservable(this);
    }

    @observable private channels: IChannelModel[] = [];
    @observable openModal: boolean = false;
    @observable private activeChannel: IChannelModel | null = null;

    @action async loadChannels() {
        try {
            var resp = await this.channelService.getChannels();
            runInAction(() => {
                this.channels = resp.filter(x => x.channelType === ChannelTypeEnum.Channel);
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

    @action async createPrivateChannel(userId: string) {
        try {
            var newChannel = await this.channelService.createPrivateChannel(userId);
            await this.setActiveChannel(newChannel.id);
        } catch (err) {
            console.error(err);
        }
    }

    @action async setActiveChannel(channelId: string){
        let result = await this.channelService.getChannel(channelId);
        runInAction(() => {
            this.activeChannel = result;
        });
    }

    getChannels() {
        return toJS(this.channels);
    }

    getActiveChannel() {
        return toJS(this.activeChannel);
    }
}


export default createContext(new ChannelStore())
