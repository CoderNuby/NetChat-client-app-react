import { IUserModel } from "../models/userModel";
import { IUserLoginModel } from "../models/userLoginModel";
import { SeedService } from "./SeedService";
import { IUserCreateModel } from "../models/userCreateModel";


class AuthService extends SeedService {
    login(user: IUserLoginModel): Promise<IUserModel>{
        return this.request.post("auth/login", user);
    }

    register(user: IUserCreateModel): Promise<IUserModel>{
        return this.request.post("auth/register", user);
    }

    getCurrentUser(user: IUserLoginModel): Promise<IUserModel>{
        return this.request.get("auth/current-user");
    }

    logout(id: string): Promise<any>{
        return this.request.get(`auth/logout/${id}`);
    }
}

export default AuthService;