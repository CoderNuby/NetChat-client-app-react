import React, { useContext, useEffect } from "react";
import { Divider, Icon, MenuItem, MenuMenu } from "semantic-ui-react";
import { IChannelModel } from "../../models/channelModel";
import { ChannelTypeEnum } from "../../models/channelTypeEnum";
import { observer } from "mobx-react-lite";
import RootStore from "../../stores/RootStore";



function Favorites() {
    const rootStore = useContext(RootStore);

    useEffect(() => {
        async function loadData(){
            await rootStore.channelStore.loadChannels();
        }
        loadData()
    }, [rootStore]);

    function displayUsers() {
        return (
            rootStore.channelStore.channels.filter(x => x.channelType === ChannelTypeEnum.Favorite)?.length > 0 && 
            rootStore.channelStore.channels.filter(x => x.channelType === ChannelTypeEnum.Favorite).map((channel) => (
                <React.Fragment key={channel.id}>
                    <MenuItem
                        name={channel.id + "_field_name"}
                        style={{ opacity: 0.7, paddingLeft: "1.5rem", cursor: "pointer" }}
                    >
                        <span onClick={() => changeChannel(channel)}># {channel.name}</span>
                    </MenuItem>
                    <Divider />
                </React.Fragment>
            ))
        );
    }

    async function changeChannel(channel: IChannelModel){
        await rootStore.channelStore.setActiveChannel(channel.id);
        let messages = rootStore.channelStore.activeChannel?.messages;
        rootStore.messageStore.setMessages(messages);
    }

    return (
        <React.Fragment>
            <MenuMenu style={{paddingBottom: "2rem"}}>
                <MenuItem>
                    <span style={{ paddingRight: "0.5rem" }}>
                        <Icon name="favorite" /> FAVORITES
                    </span> {' '}
                    ({rootStore.channelStore.channels.filter(x => x.channelType === ChannelTypeEnum.Favorite)?.length}) {' '}
                </MenuItem>
                <Divider />
                {displayUsers()}
            </MenuMenu>
        </React.Fragment>
    );
}

export default observer(Favorites);