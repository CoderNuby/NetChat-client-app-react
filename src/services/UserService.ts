import { IColorPreferenceModel } from "../models/colorPreferenceModel";
import { IUserModel } from "../models/userModel";
import { SeedService } from "./SeedService";

class UserService extends SeedService {
    getAll(): Promise<IUserModel[]>{
        return this.request.get("user/all");
    }

    changeColorPreferences(colors: IColorPreferenceModel): Promise<IUserModel>{
        return this.request.put("user/update-colors", colors);
    }
}

export default UserService;