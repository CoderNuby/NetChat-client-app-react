import { IUserModel } from "./userModel";

export interface IChannelNotificationModel {
    id: string;
    newMessages: number;
    sender: IUserModel;
}