import React from "react";
import { Divider, MenuItem } from "semantic-ui-react";
import { IChannelModel } from "../../models/channelModel";

interface IProp {
    channel: IChannelModel;
}

export function ChannelItem(props: IProp) {
    return (
        <React.Fragment>
            <MenuItem
                key={props.channel.id}
                name={props.channel.name}
                style={{ opacity: 0.7, paddingLeft: "1.5rem", cursor: "pointer" }}
            >
                <span onClick={() => console.log("Channel Item", props.channel)}># {props.channel.name}</span>
            </MenuItem>
            <Divider />
        </React.Fragment>
    );
}