import { action, configure, makeObservable, observable, runInAction } from "mobx";
import { IChannelModel } from "../models/channelModel";
import ChannelService from "../services/ChannelService";
import { toast } from "react-toastify";
import { ChannelTypeEnum } from "../models/channelTypeEnum";
import { IChannelUpdateModel } from "../models/channelUpdateModel";
import { IMessageModel } from "../models/messageModel";
import { IChannelNotificationModel } from "../models/channelNotificationModel";
import { RootStore } from "./RootStore";

configure({enforceActions: "always"})
class ChannelStore {

    channelService: ChannelService;

    constructor(){
        this.channelService = new ChannelService();
        makeObservable(this);
    }

    @observable public channels: IChannelModel[] = [];
    @observable openModal: boolean = false;
    @observable activeChannel: IChannelModel | null = null;
    @observable channelNotification: IChannelNotificationModel[] = [];

    @action async loadChannels() {
        try {
            var resp = await this.channelService.getChannels();
            runInAction(() => {
                this.channels = resp;
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

    @action async updateChannel(channel: IChannelUpdateModel) {
        try {
            channel.channelType === ChannelTypeEnum.Favorite ? channel.channelType = ChannelTypeEnum.Channel : channel.channelType = ChannelTypeEnum.Favorite;
            var newChannel = await this.channelService.updateChannel(channel);
            runInAction(() => {
                this.channels = this.channels.filter(x => x.id !== newChannel.id);
                this.channels.push(newChannel);
            });
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

    @action async addNotification(channelId: string, message: IMessageModel){
        let notification = await this.channelNotification.filter(x => x.id === channelId);

        if(notification.length === 0){
            runInAction(() => {
                this.channelNotification.push({
                    id: channelId,
                    newMessages: 1,
                    sender: message.sender
                });
            });
            return;
        }
        
        runInAction(() => {
            notification[0].newMessages += 1;
        });
    }

    @action cleanNotification(channelId: string){
        let notification = this.channelNotification.filter(x => x.id === channelId);

        if(notification.length !== 0){
            runInAction(() => {
                notification[0].newMessages = 0;
            });
        }
    }
}


export default ChannelStore;
