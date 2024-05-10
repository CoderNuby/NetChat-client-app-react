import { MessageTypeEnum } from "./messageTypeEnum";
import { IUserModel } from "./userModel";

export interface IMessageModel{
    id: string;
    channelId: string;
    content: string;
    createdAt: Date;
    sender: IUserModel;
    senderId: string;
    messageType: MessageTypeEnum;
}