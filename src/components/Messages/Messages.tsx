import React from "react";
import { CommentGroup, Segment } from "semantic-ui-react";
import { MessageHeader } from "./MessagesHeader";
import { MessageForm } from "./MessageForm";

function Messages() {
    return (
        <React.Fragment>
            <MessageHeader />

            <Segment>
                <CommentGroup className="messages">
                    
                </CommentGroup>
            </Segment>
            <MessageForm />
        </React.Fragment>
    );
}

export default Messages;