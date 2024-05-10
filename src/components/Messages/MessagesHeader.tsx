import { Header, Icon, Segment } from "semantic-ui-react";
import HeaderSubHeader from "semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader";
import { SearchInput } from "./SearchInput";
import React, { useContext } from "react";
import ChannelStore from "../../stores/ChannelStore";
import { observer } from "mobx-react-lite";
import { ChannelTypeEnum } from "../../models/channelTypeEnum";


function MessageHeader() {

    const channelStore = useContext(ChannelStore);

    return (
        <Segment clearing>
            <Header fluid="true" as={"h2"} floated="left" style={{marginBottom: 0}}>
                {channelStore.getActiveChannel() == null && (
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
                {channelStore.getActiveChannel() != null && (
                    <React.Fragment>
                        <span>
                            {channelStore.getActiveChannel()?.channelType === ChannelTypeEnum.Channel && (
                                <>
                                    {channelStore.getActiveChannel()?.name}
                                    <Icon name={"star outline"} color="black" />
                                </>
                            )}
                            {channelStore.getActiveChannel()?.channelType === ChannelTypeEnum.Room && (
                                <>
                                    {`Channel opened with ${channelStore.getActiveChannel()?.description}`}
                                    <Icon name={"users"} color="black" />
                                </>
                            )}
                        </span>
                        <HeaderSubHeader>2 Users</HeaderSubHeader>
                    </React.Fragment>
                )}
            </Header>
            {channelStore.getActiveChannel() != null && (
                <SearchInput />
            )}
        </Segment>
    );
}

export default observer(MessageHeader);