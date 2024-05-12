import { action, computed, makeObservable, observable, runInAction, toJS } from "mobx";
import AuthService from "../services/AuthService";
import { IUserLoginModel } from "../models/userLoginModel";
import { toast } from "react-toastify";
import { IUserModel } from "../models/userModel";
import { IUserCreateModel } from "../models/userCreateModel";
import { Md5 } from "ts-md5";
import { RootStore } from "./RootStore";


class AuthStore {

    authService: AuthService;

    rootStore: RootStore;

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
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
                window.location.href = "/login";
            });
        } catch (err) {
            console.error(err);
        }
    }

    @action GetUserInfoFromLocalStorage() {
        const userJson = localStorage.getItem("user");
        if (userJson) {
            let user: IUserModel = JSON.parse(userJson);
            runInAction(() => {
                this.CurrentUser = user;
                this.rootStore.userStore.appUserColorsPreferences = {
                    primaryAppColor: this.CurrentUser.primaryAppColor,
                    secondaryAppColor: this.CurrentUser.secondaryAppColor
                }
                return toJS(this.CurrentUser);
            });
        } else {
            return null;
        }
    }

    @action async Logout(){
        await this.authService.logout(this.CurrentUser?.id || "");
        runInAction(() => {
            this.CurrentUser = null;
        });

        localStorage.removeItem("user");
        window.location.href = "/login";
    }
}

export default AuthStore;