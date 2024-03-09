import React, { useEffect, useState } from "react";
import { Divider, Icon, MenuItem, MenuMenu } from "semantic-ui-react";
import { IChannel } from "../../models/channel";
import { ChannelItem } from "./ChannelItem";
import { ChannelForm } from "./ChannelForm";

import channelServices from "../../services/ChannelService";

function Channels () {

    const [channels, setChannels] = useState<IChannel[]>([]);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        channelServices.getChannels().then((response) => {
            setChannels(response);
        });
    }, []);

    function displayChannels(channels: IChannel[]) {
        return (
            channels.length > 0 &&
            channels.map((channel) => (<ChannelItem key={channel.id} channel={channel} />))
        );
    }

    function handleCreate(channel: IChannel){
        channelServices.createChannel(channel);
        setChannels([...channels, channel]);
    }

    return (
        <React.Fragment>
            <MenuMenu style={{paddingBottom: "2rem", color: "#afadad"}}>
                <MenuItem>
                    <span style={{ paddingRight: "0.5rem" }}>
                        <Icon name="exchange" /> CHANNELS
                    </span>
                    ({channels.length})
                    
                    <ChannelForm
                        open={open}
                        setOpen={setOpen}
                        createChannel={handleCreate}
                        />
                </MenuItem>
                <Divider />
                {displayChannels(channels)}
            </MenuMenu>
        </React.Fragment>
    );
}

export default Channels;
