import { action, configure, makeObservable, observable, runInAction, toJS } from "mobx";
import { createContext, useContext } from "react";
import { IMessageModel } from "../models/messageModel";
import { ICreateMessageModel } from "../models/createMessageModel";
import MessageServices from "../services/MessageService";
import { ICreateMediaMessageModel } from "../models/createMediaMessageModel";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@aspnet/signalr";


configure({enforceActions: "always"})
class MessageStore {

    messageService: MessageServices;

    constructor(){
        this.messageService = new MessageServices();
        makeObservable(this);
    }

    @observable private messages: IMessageModel[] = [];
    @observable.ref hubConnection: HubConnection | null = null;

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

    @action async uploadImage(message: ICreateMediaMessageModel){
        try {
            let result = await this.messageService.uploadMedia(message);
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

    @action createHubConnection(token: string) {
        runInAction(() => {
            this.hubConnection = new HubConnectionBuilder().withUrl("https://localhost:44397/chat", {
                accessTokenFactory: () => token
            }).configureLogging(LogLevel.Information)
            .build();
        });

        this.hubConnection?.start().catch((error) => console.log(error));

        this.hubConnection?.on("ReceiveMessage", (message: IMessageModel) => {
            runInAction(() => {
                this.messages.push(message);
            });
        });
    }

    @action stopHubConnection() {
        this.hubConnection?.stop();
    }

    getMessages(){
        return toJS(this.messages);
    }
}


export default createContext(new MessageStore());