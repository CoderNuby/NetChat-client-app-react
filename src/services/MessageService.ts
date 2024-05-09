
import { ICreateMediaMessageModel } from "../models/createMediaMessageModel";
import { ICreateMessageModel } from "../models/createMessageModel";
import { IMessageModel } from "../models/messageModel";
import { SeedService } from "./SeedService";


class MessageServices extends SeedService {
    send(message: ICreateMessageModel): Promise<IMessageModel>{
        return this.request.post("messages", message);
    }

    uploadMedia(mediaMessage: ICreateMediaMessageModel): Promise<IMessageModel> {
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

