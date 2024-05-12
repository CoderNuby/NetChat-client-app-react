import React, { useContext, useEffect } from "react";
import { Divider, Icon, MenuItem, MenuMenu } from "semantic-ui-react";
import { IChannelModel } from "../../models/channelModel";
import ChannelItem from "./ChannelItem";
import ChannelForm from "./ChannelForm";
import { observer } from "mobx-react-lite";
import { ChannelTypeEnum } from "../../models/channelTypeEnum";
import RootStore from "../../stores/RootStore";


function Channels () {
    const rootStore = useContext(RootStore);

    function displayChannels(channels: IChannelModel[]) {
        return (
            channels.length > 0 &&
            channels.map((channel) => (<ChannelItem key={channel.id} channel={channel} notificationCounter={notificationCounter} />))
        );
    }

    function notificationCounter(channel: IChannelModel) {
        let count = 0;
        rootStore.channelStore.channelNotification.forEach((notification) => {
            if(notification.id === channel.id && notification.sender.userName !== rootStore.authStore.CurrentUser?.userName){
                count = notification.newMessages;
            }
        });

        if (count > 0) return count;
    }

    return (
        <React.Fragment>
            <MenuMenu style={{paddingBottom: "2rem"}}>
                <MenuItem>
                    <span style={{ paddingRight: "0.5rem" }}>
                        <Icon name="exchange" /> CHANNELS
                    </span>
                    ({rootStore.channelStore.channels.filter(x => x.channelType === ChannelTypeEnum.Channel).length})
                    
                    <ChannelForm
                        />
                </MenuItem>
                <Divider />
                {displayChannels(rootStore.channelStore.channels.filter(x => x.channelType === ChannelTypeEnum.Channel))}
            </MenuMenu>
        </React.Fragment>
    );
}

export default observer(Channels);
