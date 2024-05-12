
import { IMessageCreateMediaModel } from "../models/messageCreateMediaModel";
import { IMessageCreateModel } from "../models/messageCreateModel";
import { IMessageModel } from "../models/messageModel";
import { ITypingNotificationModel } from "../models/typingNotificationModel";
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

    getAllTypingNotificationByCurrentUser(): Promise<ITypingNotificationModel[]>{
        return this.request.get("messages/typing/all-by-current-user");
    }
}

export default MessageServices; 

