import { action, configure, makeObservable, observable, runInAction, toJS } from "mobx";
import { createContext } from "react";
import { IMessageModel } from "../models/messageModel";
import { ICreateMessageModel } from "../models/createMessageModel";
import MessageServices from "../services/MessageService";


configure({enforceActions: "always"})
class MessageStore {

    messageService: MessageServices;

    constructor(){
        this.messageService = new MessageServices();
        makeObservable(this);
    }

    @observable private messages: IMessageModel[] = [];

    @action async sendMessage(message: ICreateMessageModel){
        try {
            let result = await this.messageService.send(message);
            runInAction(() => {
                this.messages.push(result);
            });
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


export default createContext(new MessageStore());