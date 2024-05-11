import { action, configure, makeObservable, observable, toJS } from "mobx";
import { IMessageModel } from "../models/messageModel";
import { IMessageCreateModel } from "../models/messageCreateModel";
import MessageServices from "../services/MessageService";
import { IMessageCreateMediaModel } from "../models/messageCreateMediaModel";
import { RootStore } from "./RootStore";

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
        this.messages = messages;
    }

    getMessages(){
        return toJS(this.messages);
    }
}


export default MessageStore;