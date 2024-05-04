import { action, computed, configure, makeObservable, runInAction } from "mobx";
import { createContext } from "react";
import AuthService from "../services/AuthService";
import { IUserLoginModel } from "../models/userLoginModel";
import { toast } from "react-toastify";
import { IUserModel } from "../models/userModel";

configure({enforceActions: "always"})
class AuthStore {

    authService: AuthService;

    constructor(){
        this.authService = new AuthService();
        makeObservable(this);
    }

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

    @action GetUserInfo() {
        const userJson = localStorage.getItem("user");
        if (userJson) {
            return JSON.parse(userJson);
        } else {
            return null;
        }
    }

    @action Logout(){
        localStorage.removeItem("user");
        window.location.href = "/login";
    }

    getToken(){
        let user: IUserModel = this.GetUserInfo();
        return user.token;
    }
}

export default createContext(new AuthStore());