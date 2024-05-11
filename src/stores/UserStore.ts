import { action, configure, makeObservable, observable, runInAction, toJS } from "mobx";
import UserService from "../services/UserService";
import { IUserModel } from "../models/userModel";

configure({enforceActions: "always"})
class UserStore {

    userService: UserService;

    constructor(){
        makeObservable(this);
        this.userService = new UserService();
    }

    @observable users: IUserModel[] = [];

    @action async setAll(){
        try {
            const response = await this.userService.getAll();

            runInAction(() => {
                this.users = response;
            });
        } catch (error) {
            
        }
    }

    getUsers() {
        return toJS(this.users);
    }
}

export default UserStore;