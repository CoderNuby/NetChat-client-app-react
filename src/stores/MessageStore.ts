import { action, configure, makeObservable, observable, runInAction, toJS } from "mobx";
import { IMessageModel } from "../models/messageModel";
import { IMessageCreateModel } from "../models/messageCreateModel";
import MessageServices from "../services/MessageService";
import { IMessageCreateMediaModel } from "../models/messageCreateMediaModel";
import { RootStore } from "./RootStore";
import { ITypingNotificationModel } from "../models/typingNotificationModel";

configure({enforceActions: "always"})
class MessageStore {

    messageService: MessageServices;
    rootStore: RootStore;

    constructor(rootStore: RootStore){
        this.messageService = new MessageServices();
        this.rootStore = rootStore;
        makeObservable(this);
    }

    @observable messages: IMessageModel[] = [];
    @observable userPosts: {[name: string] : { avatar: string, count: number}} = {};
    @observable typingNotifications: ITypingNotificationModel[] = [];

    @action async sendMessage(message: IMessageCreateModel){
        try {
            let result = await this.rootStore.hubConnection?.invoke<IMessageModel>("SendMessage", message);
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    @action async uploadImage(message: IMessageCreateMediaModel){
        try {
            let result = await this.messageService.uploadMedia(message);
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    @action setMessages(messages: IMessageModel[] = []){
        runInAction(() => {
            this.messages = messages;
        });
        this.countUserPosts();
    }

    @action countUserPosts() {
        let userPosts = this.messages.reduce((acc: any, message) => {
            if(message.sender.userName in acc) {
                acc[message.sender.userName].count++;
            }else{
                acc[message.sender.userName] = {
                    avatar: message.sender.avatar,
                    count: 1
                }
            }

            return acc;
        }, {});

        runInAction(() => {
            this.userPosts = userPosts;
        });
    }

    @action async createTypingNotification(){
        try {
            let channelId = this.rootStore.channelStore.activeChannel?.id;
            let result = await this.rootStore.hubConnection?.invoke<ITypingNotificationModel>("SendTypingNotification", channelId);
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    @action async deleteTypingNotification(typingId: string){
        try {
            let result = await this.rootStore.hubConnection?.invoke<ITypingNotificationModel>("DeleteTypingNotification", typingId);
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    getMessages(){
        return toJS(this.messages);
    }
}


export default MessageStore;