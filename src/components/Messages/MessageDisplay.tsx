import { Comment, CommentAuthor, CommentAvatar, CommentContent, CommentMetadata, CommentText } from "semantic-ui-react";
import { IMessageModel } from "../../models/messageModel";
import moment from "moment";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import AuthStore from "../../stores/AuthStore";

interface IProps{
    message: IMessageModel
}

function MessageDisplay(props: IProps) {

    const authStore = useContext(AuthStore);

    return (
        <Comment>
            <CommentAvatar src={props.message.sender.avatar ?? 'https://www.gravatar.com/avatar/?=identicon'}/>    
            <CommentContent  className={props.message.sender.email === authStore.CurrentUser?.email ? "message_self" : "message_other"}>
                <CommentAuthor>{props.message.sender.userName}</CommentAuthor>
                <CommentMetadata>{moment(props.message.createdAt).format("D MMMM YYYY")}</CommentMetadata>
                {props.message.messageType === 0 && (
                    <CommentText>{props.message.content}</CommentText>
                )}

                {props.message.messageType === 1 && (
                    <CommentText><img style={{width: "30rem"}} src={props.message.content} alt="Img"/></CommentText>
                )}
            </CommentContent>
        </Comment>
    );
}

export default observer(MessageDisplay);