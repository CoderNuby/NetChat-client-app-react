
import { IChannelModel } from "../models/channelModel";
import { SeedService } from "./SeedService";


class ChannelServices extends SeedService<IChannelModel>{
    getChannels(): Promise<IChannelModel[]> {
        return this.request.get("channels/all");
    }

    createChannel(channel: IChannelModel){
        return this.request.create("channels", channel);
    }
}

export default ChannelServices; 

