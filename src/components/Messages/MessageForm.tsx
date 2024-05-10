import { Button, ButtonGroup, Form, Segment } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { ICreateMessageModel } from "../../models/createMessageModel";
import { InputGeneric } from "../Common/Forms/InputGeneric";
import { useContext, useState } from "react";
import MessageStore from "../../stores/MessageStore";
import ChannelStore from "../../stores/ChannelStore";
import { toast } from "react-toastify";
import FileModal from "./FileModal";
import { ICreateMediaMessageModel } from "../../models/createMediaMessageModel";


export function MessageForm() {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const messageStore = useContext(MessageStore);
    const channelStore = useContext(ChannelStore);

    async function onSubmit(values: ICreateMessageModel){
        if(!channelStore.getActiveChannel()){
            toast.error("You should select a canal to send messages");
            return;
        }

        let channel = channelStore.getActiveChannel();
        values.channelId = channel?.id || "";
        await messageStore.sendMessage(values);
    }

    async function uploadFile(image: Blob | null) {
        const media: ICreateMediaMessageModel = {
            channelId: channelStore.getActiveChannel()?.id || "",
            file: image || new Blob(),
        };
        await messageStore.uploadImage(media);
    }

    return (
        <FinalForm
        onSubmit={onSubmit}
        render={({ handleSubmit, form, invalid, dirtyFieldsSinceLastSubmit, pristine }) => (
            <Form onSubmit={() => handleSubmit()!.then(() => form.reset())} size="large">
                <Segment>
                    <Field
                        fluid 
                        name="content"
                        type="text"
                        style={{marginBottom: "0.7rem"}}
                        iconLabel={<Button  icon={"add"} />}
                        labelPosition="left"
                        placeholder="Write your message"
                        component={InputGeneric}/>

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