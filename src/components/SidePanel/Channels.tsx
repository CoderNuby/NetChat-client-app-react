import React, { useContext, useEffect, useState } from "react";
import { Divider, Icon, MenuItem, MenuMenu } from "semantic-ui-react";
import { IChannelModel } from "../../models/channelModel";
import { ChannelItem } from "./ChannelItem";
import ChannelForm from "./ChannelForm";
import ChannelStore from "../../stores/ChannelStore";
import { observer } from "mobx-react-lite";


function Channels () {

    const [channels, setChannels] = useState<IChannelModel[]>([]);
    const channelStore = useContext(ChannelStore);

    useEffect(() => {
        channelStore.loadChannels();
        setChannels(channelStore.channels);
    }, [channelStore]);

    function displayChannels(channels: IChannelModel[]) {
        return (
            channels.length > 0 &&
            channels.map((channel) => (<ChannelItem key={channel.id} channel={channel} />))
        );
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
                        />
                </MenuItem>
                <Divider />
                {displayChannels(channels)}
            </MenuMenu>
        </React.Fragment>
    );
}

export default observer(Channels);
