import React, { useContext, useState } from "react";
import { CommentGroup, Segment } from "semantic-ui-react";
import MessageHeader from "./MessagesHeader";
import { MessageForm } from "./MessageForm";
import { observer } from "mobx-react-lite";
import MessageDisplay from "./MessageDisplay";
import RootStore from "../../stores/RootStore";

function Messages() {

    const rootStore = useContext(RootStore);

    
    function displayMessages(){
        let messages = rootStore.messageStore.getMessages();

        return(messages.length > 0 &&
            messages.filter(x => x.channelId === rootStore.channelStore.activeChannel?.id).map((message) => (
                <MessageDisplay key={message.id} message={message}></MessageDisplay>
            ))
        );
    }



    return (
        <React.Fragment>
            <MessageHeader />
            {rootStore.channelStore.activeChannel != null && (
                <React.Fragment>
                    <Segment>
                        <CommentGroup className="messages">
                            {displayMessages()}
                        </CommentGroup>
                    </Segment>
                    <MessageForm />
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default observer(Messages);