import { useContext, useEffect, useState } from "react";
import { Divider, Icon, MenuItem, MenuMenu } from "semantic-ui-react";
import UserStore from "../../stores/UserStore";
import { observer } from "mobx-react-lite";
import React from "react";
import { IUserModel } from "../../models/userModel";
import AuthStore from "../../stores/AuthStore";
import ChannelStore from "../../stores/ChannelStore";
import MessageStore from "../../stores/MessageStore";


function DirectMessages() {

    const [ users, setUsers ] = useState<IUserModel[]>([]);

    const userStore = useContext(UserStore);
    const authStore = useContext(AuthStore);
    const channelStore = useContext(ChannelStore);
    const messageStore = useContext(MessageStore);

    useEffect(() => {
        userStore.setAll().then(() => {
            setUsers(userStore.getUsers())
        });
    }, [userStore]);

    function displayUsers() {
        return (
            users?.length > 0 && 
            users?.filter(x => x.id !== authStore.CurrentUser?.id).map((user) => (
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
        await channelStore.createPrivateChannel(user.id);
        let messages = channelStore.getActiveChannel()?.messages;
        messageStore.setMessages(messages);
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