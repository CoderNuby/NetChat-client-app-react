import { Header, Icon, Segment } from "semantic-ui-react";
import HeaderSubHeader from "semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader";
import { SearchInput } from "./SearchInput";
import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { ChannelTypeEnum } from "../../models/channelTypeEnum";
import { IChannelUpdateModel } from "../../models/channelUpdateModel";
import { IChannelModel } from "../../models/channelModel";
import RootStore from "../../stores/RootStore";
import { IMessageModel } from "../../models/messageModel";


function MessageHeader() {

    const rootStore = useContext(RootStore);
    const [usersCount, setUsersCount] = useState<number>(0);
    const [currentMessages, setMessages] = useState<IMessageModel[]>([]);

    useEffect(() => {
        const messages = rootStore.channelStore.activeChannel?.messages || [];
        setMessages(messages);
    
        const totalUsers = getTotalUsers() || 0;
        setUsersCount(totalUsers);
    }, [rootStore.channelStore.activeChannel?.messages]);

    function getTotalUsers() {
        const uniqueUsers = currentMessages?.reduce((acc: string[], message) => {
            if(!acc.includes(message.sender.userName)) {
                acc.push(message.sender.userName);
            }

            return acc;
        }, []);

        return uniqueUsers?.length;
    }

    function toggleFavorite(channel: IChannelModel){
        const channelToUpdate: IChannelUpdateModel = {
            id: channel.id,
            name: channel.name,
            description: channel.description,
            channelType: channel.channelType
        }
        rootStore.channelStore.updateChannel(channelToUpdate);
        rootStore.messageStore.setMessages([]);
        rootStore.channelStore.activeChannel = null;
    }

    return (
        <Segment clearing>
            <Header fluid="true" as={"h2"} floated="left" style={{marginBottom: 0}}>
                {rootStore.channelStore.activeChannel == null && (
                    <React.Fragment>
                        <span>
                            Welcome to channel message
                            <Icon name={"comments outline"} color="black" />
                        </span>
                        <p style={{ fontSize: "small" }}>
                            <strong>Please select a channel</strong>
                        </p>
                    </React.Fragment>
                )}
                {rootStore.channelStore.activeChannel != null && (
                    <React.Fragment>
                        <span>
                            {rootStore.channelStore.activeChannel?.channelType !== ChannelTypeEnum.Room && (
                                <>
                                    {rootStore.channelStore.activeChannel?.name}
                                    <span onClick={() => toggleFavorite(rootStore.channelStore.activeChannel!)}><Icon name={rootStore.channelStore.activeChannel?.channelType === ChannelTypeEnum.Channel ? "star outline":"star"} color={rootStore.channelStore.activeChannel?.channelType === ChannelTypeEnum.Channel ? "black":"yellow"} /></span>
                                </>
                            )}
                            {rootStore.channelStore.activeChannel?.channelType === ChannelTypeEnum.Room && (
                                <>
                                    {`Channel opened with ${rootStore.channelStore.activeChannel?.description}`}
                                    <Icon name={"users"} color="black" />
                                </>
                            )}
                        </span>
                        <HeaderSubHeader>{usersCount} Users</HeaderSubHeader>
                    </React.Fragment>
                )}
            </Header>
            {rootStore.channelStore.activeChannel != null && (
                <SearchInput />
            )}
        </Segment>
    );
}

export default observer(MessageHeader);