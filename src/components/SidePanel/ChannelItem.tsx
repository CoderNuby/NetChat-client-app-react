import React, { useContext } from "react";
import { Divider, MenuItem } from "semantic-ui-react";
import { IChannelModel } from "../../models/channelModel";
import ChannelStore from "../../stores/ChannelStore";
import { observer } from "mobx-react-lite";
import MessageStore from "../../stores/MessageStore";

interface IProp {
    channel: IChannelModel
}

function ChannelItem(props: IProp) {

    const channelStore = useContext(ChannelStore);
    const messageStore = useContext(MessageStore);

    async function changeChannel(channel: IChannelModel){
        await channelStore.setActiveChannel(channel);
        let messages = channelStore.getActiveChannel()?.messages;
        messageStore.setMessages(messages);
    }

    return (
        <React.Fragment>
            <MenuItem
                key={props.channel.id}
                name={props.channel.name}
                style={{ opacity: 0.7, paddingLeft: "1.5rem", cursor: "pointer" }}
            >
                <span onClick={() => changeChannel(props.channel)}># {props.channel.name}</span>
            </MenuItem>
            <Divider />
        </React.Fragment>
    );
}

export default observer(ChannelItem)