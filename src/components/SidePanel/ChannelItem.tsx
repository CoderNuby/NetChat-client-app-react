import React, { useContext } from "react";
import { Divider, Label, MenuItem } from "semantic-ui-react";
import { IChannelModel } from "../../models/channelModel";
import { observer } from "mobx-react-lite";
import RootStore from "../../stores/RootStore";

interface IProp {
    channel: IChannelModel;
    notificationCounter: (channel: IChannelModel) => number | undefined;
}

function ChannelItem(props: IProp) {

    const rootStore = useContext(RootStore);

    async function changeChannel(channel: IChannelModel){
        await rootStore.channelStore.setActiveChannel(channel.id);
        let messages = rootStore.channelStore.activeChannel?.messages;
        rootStore.messageStore.setMessages(messages);
        rootStore.channelStore.cleanNotification(channel.id);
    }

    return (
        <React.Fragment>
            <MenuItem
                key={props.channel.id}
                name={props.channel.name}
                style={{ opacity: 0.7, paddingLeft: "1.5rem", cursor: "pointer" }}
            >
                <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} onClick={() => changeChannel(props.channel)}>
                    <span>
                        # {props.channel.name}
                    </span>
                    {props.notificationCounter(props.channel) && (
                        <Label color="red">{props.notificationCounter(props.channel)}</Label>
                    )}
                </span>
            </MenuItem>
            <Divider />
        </React.Fragment>
    );
}

export default observer(ChannelItem);