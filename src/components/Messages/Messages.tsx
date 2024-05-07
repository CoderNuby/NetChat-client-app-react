import React, { useContext } from "react";
import { CommentGroup, Segment } from "semantic-ui-react";
import MessageHeader from "./MessagesHeader";
import { MessageForm } from "./MessageForm";
import ChannelStore from "../../stores/ChannelStore";
import { observer } from "mobx-react-lite";
import MessageStore from "../../stores/MessageStore";
import MessageDisplay from "./MessageDisplay";

function Messages() {

    const channelStore = useContext(ChannelStore);
    const messageStore = useContext(MessageStore);

    function displayMessages(){
        let messages = messageStore.getMessages();

        return(messages.length > 0 &&
            messages.map((message) => (
                <MessageDisplay key={message.id} message={message}></MessageDisplay>
            ))
        );
    }

    return (
        <React.Fragment>
            <MessageHeader />
            {channelStore.getActiveChannel() != null && (
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