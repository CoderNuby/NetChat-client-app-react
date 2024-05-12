import { action, configure, makeObservable, observable, runInAction, toJS } from "mobx";
import UserService from "../services/UserService";
import { IUserModel } from "../models/userModel";
import { RootStore } from "./RootStore";
import { IColorPreferenceModel } from "../models/colorPreferenceModel";
import { toast } from "react-toastify";

configure({enforceActions: "always"})
class UserStore {

    userService: UserService;
    rootStore: RootStore;

    constructor(rootStore: RootStore){
        makeObservable(this);
        this.userService = new UserService();
        this.rootStore = rootStore;
    }

    @observable users: IUserModel[] = [];
    @observable appUserColorsPreferences: IColorPreferenceModel = {
        primaryAppColor: "#4c3c4c",
        secondaryAppColor: "#eee"
    }

    @action async setAll(){
        try {
            const response = await this.userService.getAll();

            runInAction(() => {
                this.users = response;
            });
        } catch (error) {
            
        }
    }

    @action async saveAppColors(colors: IColorPreferenceModel){
        try {
            const response = await this.userService.changeColorPreferences(colors);

            runInAction(() => {
                this.rootStore.authStore.CurrentUser!.primaryAppColor = response.primaryAppColor;
                this.rootStore.authStore.CurrentUser!.secondaryAppColor = response.secondaryAppColor;
                this.appUserColorsPreferences = colors;
                localStorage.setItem("user", JSON.stringify(this.rootStore.authStore.CurrentUser));
                toast.success("Color preference change");
            });
        } catch (error) {
            
        }
    }

    getUsers() {
        return toJS(this.users);
    }
}

export default UserStore;