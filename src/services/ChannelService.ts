
import { IChannelModel } from "../models/channelModel";
import { IChannelUpdateModel } from "../models/channelUpdateModel";
import { SeedService } from "./SeedService";


class ChannelServices extends SeedService {
    getChannels(): Promise<IChannelModel[]> {
        return this.request.get("channels/all");
    }

    getChannel(id: string): Promise<IChannelModel> {
        return this.request.get(`channels/${id}`);
    }

    createChannel(channel: IChannelModel): Promise<IChannelModel>{
        return this.request.post("channels", channel);
    }

    updateChannel(channel: IChannelUpdateModel): Promise<IChannelModel>{
        return this.request.put(`channels/${channel.id}`, channel);
    }

    createPrivateChannel(userId: string): Promise<IChannelModel> {
        return this.request.post(`channels/private/${userId}`, {});
    }
}

export default ChannelServices; 

