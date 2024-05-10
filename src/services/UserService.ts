import { IUserModel } from "../models/userModel";
import { SeedService } from "./SeedService";

class UserService extends SeedService {
    getAll(): Promise<IUserModel[]>{
        return this.request.get("user/all");
    }
}

export default UserService;