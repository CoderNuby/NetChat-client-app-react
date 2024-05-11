import AuthStore from "./AuthStore";
import ChannelStore from "./ChannelStore";
import MessageStore from "./MessageStore";
import UserStore from "./UserStore";
import { action, configure, observable, runInAction } from "mobx";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@aspnet/signalr";
import { createContext } from "react";
import { IMessageModel } from "../models/messageModel";


configure({enforceActions: "always"})
export class RootStore {
    authStore: AuthStore = new AuthStore();
    channelStore: ChannelStore = new ChannelStore();
    messageStore: MessageStore = new MessageStore(this);
    userStore: UserStore = new UserStore();

    
    @observable.ref hubConnection: HubConnection | null = null;

    @action createHubConnection(token: string) {
        runInAction(() => {
            this.hubConnection = new HubConnectionBuilder().withUrl("https://localhost:44397/chat", {
                accessTokenFactory: () => token
            }).configureLogging(LogLevel.Information)
            .build();
        });

        this.hubConnection?.start().catch((error) => console.log(error));

        this.hubConnection?.on("ReceiveMessage", (response) => {
            runInAction(async () => {
                let message: IMessageModel = response.result;
                this.messageStore.messages.push(message);
                await this.channelStore.addNotification(message.channelId, message);
            });
        });
    }

    @action stopHubConnection() {
        this.hubConnection?.stop();
    }
}

export default createContext(new RootStore());