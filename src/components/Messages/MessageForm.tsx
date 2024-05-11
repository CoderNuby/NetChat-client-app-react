import { Button, ButtonGroup, Form, Segment } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { IMessageCreateModel } from "../../models/messageCreateModel";
import { InputGeneric } from "../Common/Forms/InputGeneric";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import FileModal from "./FileModal";
import { IMessageCreateMediaModel } from "../../models/messageCreateMediaModel";
import RootStore from "../../stores/RootStore";


export function MessageForm() {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const rootStore = useContext(RootStore);

    async function onSubmit(values: IMessageCreateModel){
        if(!rootStore.channelStore.activeChannel){
            toast.error("You should select a canal to send messages");
            return;
        }

        let channel = rootStore.channelStore.activeChannel;
        values.channelId = channel?.id || "";
        var message = await rootStore.messageStore.sendMessage(values);
    }

    async function uploadFile(image: Blob | null) {
        const media: IMessageCreateMediaModel = {
            channelId: rootStore.channelStore.activeChannel?.id || "",
            file: image || new Blob(),
        };
        let message = await rootStore.messageStore.uploadImage(media);
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