
import { IChannelModel } from "../models/channelModel";
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
}

export default ChannelServices; 

