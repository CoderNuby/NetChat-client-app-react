import { Button, ButtonGroup, Form, Segment } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { IMessageCreateModel } from "../../models/messageCreateModel";
import { InputGeneric } from "../Common/Forms/InputGeneric";
import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import FileModal from "./FileModal";
import { IMessageCreateMediaModel } from "../../models/messageCreateMediaModel";
import RootStore from "../../stores/RootStore";
import { OnBlur, OnChange,  } from "react-final-form-listeners";
import { ITypingNotificationModel } from "../../models/typingNotificationModel";
import { observer } from "mobx-react-lite";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { FormApi } from "final-form";

function MessageForm() {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [typing, setTyping] = useState<ITypingNotificationModel | null>(null);
    const [showEmojiPanel, setShowEmojiPanel] = useState<boolean>(false);

    const textInputRef = useRef(null);
    const inputElement = textInputRef.current;

    const rootStore = useContext(RootStore);

    async function onSubmit(values: IMessageCreateModel){
        if(!rootStore.channelStore.activeChannel){
            toast.error("You should select a canal to send messages");
            return;
        }

        let channel = rootStore.channelStore.activeChannel;
        values.channelId = channel?.id || "";
        var message = await rootStore.messageStore.sendMessage(values);
        await killCurrentTypingNotification();
        setShowEmojiPanel(false);
    }

    async function uploadFile(image: Blob | null) {
        const media: IMessageCreateMediaModel = {
            channelId: rootStore.channelStore.activeChannel?.id || "",
            file: image || new Blob(),
        };
        let message = await rootStore.messageStore.uploadImage(media);
        await killCurrentTypingNotification();
        setShowEmojiPanel(false);
    }

    async function createTypingNotification(){
        if(!typing){
            let typingNotification = await rootStore.messageStore.createTypingNotification() || null;
            setTyping(typingNotification);
        }
    }

    async function killCurrentTypingNotification() {
        if(typing){
            let typingNotification = await rootStore.messageStore.deleteTypingNotification(typing.id) || null;
            setTyping(null);
        }
    }

    function handleTogglePicker() {
        setShowEmojiPanel(!showEmojiPanel);
    }

    function emojiPickedChange(event: any, form: FormApi<IMessageCreateModel, Partial<IMessageCreateModel>>) {
        const currentContent = form.getState().values.content || '';
        const newContent = currentContent + event.native;
        form.change('content', newContent);
        if(inputElement !== undefined){
            setFocus(inputElement!);
        }
    }

    function setFocus(el: HTMLElement) {
        el.focus();
    }

    return (
        <FinalForm
        onSubmit={onSubmit}
        render={({ handleSubmit, form, invalid, dirtyFieldsSinceLastSubmit, pristine }) => (
            <Form onSubmit={() => handleSubmit()!.then(() => form.reset())} size="large">
                <Segment>
                    {showEmojiPanel && (
                        <Picker  data={data} onEmojiSelect={(e: any)=> {emojiPickedChange(e, form)}} />
                    )}
                    <Field
                        fluid 
                        name="content"
                        type="text"
                        style={{marginBottom: "0.7rem"}}
                        iconLabel={<Button onClick={() => handleTogglePicker()} type="button"  icon={showEmojiPanel ? "close" : "add"} />}
                        labelPosition="left"
                        placeholder="Write your message"
                        component={InputGeneric}
                        inputRef={textInputRef}
                        />
                    <OnChange name="content">
                        {(value) => {
                            if(value.length === 0){
                                killCurrentTypingNotification()
                            }else{
                                createTypingNotification()
                            }
                        }}
                    </OnChange>
                    <OnBlur name="content">
                        {() => killCurrentTypingNotification()}
                    </OnBlur>
                    <ButtonGroup icon widths={2}>
                        <Button
                            color="orange"
                            content="Add Replay"
                            labelPosition="left"
                            icon="edit"
                            type="submit"
                            disabled={(invalid && !dirtyFieldsSinceLastSubmit) || pristine}
                        ></Button>
                        <Button
                            color="teal"
                            content="Upload Media"
                            labelPosition="right"
                            icon="cloud upload"
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                        ></Button>
                    </ButtonGroup>
                    <FileModal uploadFile={uploadFile} isOpen={isModalOpen} showModal={setIsModalOpen}></FileModal>
                </Segment>
            </Form>
        )}
        />
    );
}

export default observer(MessageForm);