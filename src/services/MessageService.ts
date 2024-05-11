
import { IMessageCreateMediaModel } from "../models/messageCreateMediaModel";
import { IMessageCreateModel } from "../models/messageCreateModel";
import { IMessageModel } from "../models/messageModel";
import { SeedService } from "./SeedService";


class MessageServices extends SeedService {
    send(message: IMessageCreateModel): Promise<IMessageModel>{
        return this.request.post("messages", message);
    }

    uploadMedia(mediaMessage: IMessageCreateMediaModel): Promise<IMessageModel> {
        let formData: FormData = new FormData();
        formData.append("File", mediaMessage.file);
        formData.append("ChannelId", mediaMessage.channelId);
        formData.append("MessageType", "1");
        return this.request.post("messages/upload", formData, {
            headers: { 'Content-Type': 'multipart/form-data'}
        });
    }
}

export default MessageServices; 

