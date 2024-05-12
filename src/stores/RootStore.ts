import AuthStore from "./AuthStore";
import ChannelStore from "./ChannelStore";
import MessageStore from "./MessageStore";
import UserStore from "./UserStore";
import { action, configure, observable, runInAction } from "mobx";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@aspnet/signalr";
import { createContext } from "react";
import { IMessageModel } from "../models/messageModel";
import { ITypingNotificationModel } from "../models/typingNotificationModel";


configure({enforceActions: "always"})
export class RootStore {
    authStore: AuthStore = new AuthStore(this);
    channelStore: ChannelStore = new ChannelStore(this);
    messageStore: MessageStore = new MessageStore(this);
    userStore: UserStore = new UserStore(this);

    
    @observable.ref hubConnection: HubConnection | null = null;

    @action createHubConnection(token: string) {
        runInAction(() => {
            this.hubConnection = new HubConnectionBuilder().withUrl("https://localhost:44397/chat", {
                accessTokenFactory: () => token
            }).configureLogging(LogLevel.Information)
            .build();
        });

        this.hubConnection?.start().then(async () => {
            this.channelStore.loadChannels();
            this.messageStore.deleteTypingNotificationByCurrentUser();
        }).catch((error) => console.log(error));

        this.hubConnection?.on("ReceiveMessage", (response) => {
            runInAction(async () => {
                let message: IMessageModel = response;
                this.messageStore.messages.push(message);
                await this.channelStore.addNotification(message.channelId, message);
            });
        });

        this.hubConnection?.on("ReceiveTypingNotification", (response) => {
            runInAction(async () => {
                let typingNotification: ITypingNotificationModel = response;
                this.messageStore.typingNotifications.push(typingNotification);
            });
        });

        this.hubConnection?.on("ReceiveDeleteTypingNotification", (response) => {
            runInAction(async () => {
                let typingNotification: ITypingNotificationModel = response;
                this.messageStore.typingNotifications = this.messageStore.typingNotifications.filter(x => x.id !== typingNotification.id);
            });
        });
    }

    @action stopHubConnection() {
        this.hubConnection?.stop();
    }
}

export default createContext(new RootStore());