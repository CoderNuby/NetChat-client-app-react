import { useContext, useEffect, useState } from "react";
import { Divider, Icon, MenuItem, MenuMenu } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import React from "react";
import { IUserModel } from "../../models/userModel";
import RootStore from "../../stores/RootStore";


function DirectMessages() {

    const [ users, setUsers ] = useState<IUserModel[]>([]);

    const rootStore = useContext(RootStore);

    useEffect(() => {
        rootStore.userStore.setAll().then(() => {
            setUsers(rootStore.userStore.getUsers())
        });
    }, [rootStore.userStore]);

    function displayUsers() {
        return (
            users?.length > 0 && 
            users?.filter(x => x.id !== rootStore.authStore.CurrentUser?.id).map((user) => (
                <React.Fragment key={user.id}>
                    <MenuItem
                        name={user.userName + "_field_name"}
                        style={{ opacity: 0.7, paddingLeft: "1.5rem", cursor: "pointer" }}
                    >
                        <Icon name="circle" color={user.isOnline ? "green" : "red"} />
                        <span onClick={() => selectUser(user)}>@ {user.userName}</span>
                    </MenuItem>
                    <Divider />
                </React.Fragment>
            ))
        );
    }

    async function selectUser(user: IUserModel){
        await rootStore.channelStore.createPrivateChannel(user.id);
        let messages = rootStore.channelStore.activeChannel?.messages;
        rootStore.messageStore.setMessages(messages);
    }

    return (
        <React.Fragment>
            <MenuMenu>
                <MenuItem>
                    <span style={{ paddingRight: "0.5rem" }}>
                        <Icon name="mail" /> DIRECT MESSAGES ({(users?.length - 1)})
                    </span>
                </MenuItem>
                <Divider />
                {displayUsers()}
            </MenuMenu>
        </React.Fragment>
    );
}

export default observer(DirectMessages);