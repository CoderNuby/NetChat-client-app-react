
import { ICreateMessageModel } from "../models/createMessageModel";
import { IMessageModel } from "../models/messageModel";
import { SeedService } from "./SeedService";


class MessageServices extends SeedService {
    send(message: ICreateMessageModel): Promise<IMessageModel>{
        return this.request.post("messages", message);
    }
}

export default MessageServices; 

