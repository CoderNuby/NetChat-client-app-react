import React, { useContext, useEffect } from "react";
import { CommentGroup, Segment } from "semantic-ui-react";
import MessageHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import { observer } from "mobx-react-lite";
import MessageDisplay from "./MessageDisplay";
import RootStore from "../../stores/RootStore";
import Typing from "./Typing";

function Messages() {

    const rootStore = useContext(RootStore);

    let messageEnd: any;

    useEffect(() => {
        if(messageEnd){
            scrollToBottom();
        }
    });

    function scrollToBottom() {
        messageEnd.scrollIntoView({behavior: "smooth"});
    }
    
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
                            {rootStore.messageStore.typingNotifications.length !== 0 && (
                                <Typing />
                            )}
                            <div ref={(node: any) => (messageEnd = node)}></div>
                        </CommentGroup>
                    </Segment>
                    <MessageForm />
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default observer(Messages);