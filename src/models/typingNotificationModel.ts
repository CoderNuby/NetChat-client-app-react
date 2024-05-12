import { IChannelModel } from "./channelModel";
import { IUserModel } from "./userModel";


export interface ITypingNotificationModel {
    id: string;
    sender: IUserModel;
    channel: IChannelModel;
}