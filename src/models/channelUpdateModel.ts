import { ChannelTypeEnum } from "./channelTypeEnum";


export interface IChannelUpdateModel{
    id: string;
    name: string;
    description: string;
    channelType: ChannelTypeEnum;
}