import { ChannelTypeEnum } from "./channelTypeEnum";
import { IMessageModel } from "./messageModel";

export interface IChannelModel{
    id: string;
    name: string;
    description: string;
    messages: IMessageModel[];
    channelType: ChannelTypeEnum;
    privateChannelId: string;
}