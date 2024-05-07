import { Comment, CommentAuthor, CommentAvatar, CommentContent, CommentMetadata, CommentText } from "semantic-ui-react";
import { IMessageModel } from "../../models/messageModel";
import moment from "moment";
import { observer } from "mobx-react-lite";

interface IProps{
    message: IMessageModel
}

function MessageDisplay(props: IProps) {
    return (
        <Comment>
            <CommentAvatar src={props.message.sender.avatar ?? 'https://www.gravatar.com/avatar/?=identicon'}/>    
            <CommentContent className="message_self">
                <CommentAuthor>{props.message.sender.userName}</CommentAuthor>
                <CommentMetadata>{moment(props.message.createdAt).format("D MMMM YYYY")}</CommentMetadata>
                <CommentText>{props.message.content}</CommentText>
            </CommentContent>
        </Comment>
    );
}

export default observer(MessageDisplay);