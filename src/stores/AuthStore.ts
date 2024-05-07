import { action, computed, configure, makeObservable, observable, runInAction } from "mobx";
import { createContext } from "react";
import AuthService from "../services/AuthService";
import { IUserLoginModel } from "../models/userLoginModel";
import { toast } from "react-toastify";
import { IUserModel } from "../models/userModel";
import { IUserCreateModel } from "../models/userCreateModel";
import { Md5 } from "ts-md5";

configure({enforceActions: "always"})
class AuthStore {

    authService: AuthService;

    constructor(){
        this.authService = new AuthService();
        makeObservable(this);
    }

    @observable CurrentUser: IUserModel | null = null;

    @computed get IsLoggedId(){
        return false;
    }

    @action async Login(user: IUserLoginModel){
        try {
            let userResp = await this.authService.login(user);
            runInAction(() => {
                let currentUser = userResp;
                toast.success("Correct credentials");
                window.location.href = "/";
                localStorage.setItem("user", JSON.stringify(currentUser));
            });
        } catch (err) {
            console.error(err);
        }
    }

    @action async Register(user: IUserCreateModel){
        try {
            user.avatar = `https://www.gravatar.com/avatar/${Md5.hashStr(user.email)}?d=identicon`;
            let userResp = await this.authService.register(user);
            runInAction(() => {
                console.log(userResp);
                window.location.href = "/login";
            });
        } catch (err) {
            console.error(err);
        }
    }

    @action GetUserInfo() {
        const userJson = localStorage.getItem("user");
        if (userJson) {
            let user: IUserModel = JSON.parse(userJson);
            this.CurrentUser = user;
            return user;
        } else {
            return null;
        }
    }

    @action Logout(){
        localStorage.removeItem("user");
        window.location.href = "/login";
    }

    getToken(){
        let user: IUserModel | null = this.GetUserInfo();
        return user?.token;
    }
}

export default createContext(new AuthStore());