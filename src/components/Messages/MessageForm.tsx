import { Button, ButtonGroup, Form, Input, Segment } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { ICreateMessageModel } from "../../models/createMessageModel";
import { InputGeneric } from "../Common/Forms/InputGeneric";
import { useContext } from "react";
import MessageStore from "../../stores/MessageStore";
import ChannelStore from "../../stores/ChannelStore";
import { toast } from "react-toastify";


export function MessageForm() {

    const messageStore = useContext(MessageStore);
    const channelStore = useContext(ChannelStore);

    async function onSubmit(values: ICreateMessageModel){
        if(!channelStore.getActiveChannel()){
            toast.error("You should select a canal to send messages");
            return;
        }

        let channel = channelStore.getActiveChannel();
        values.channelId = channel?.id || "";
        messageStore.sendMessage(values);
    }

    return (
        <FinalForm
        onSubmit={onSubmit}
        render={({ handleSubmit, form }) => (
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
                        ></Button>
                        <Button
                            color="teal"
                            content="Upload Media"
                            labelPosition="right"
                            icon="cloud upload"
                        ></Button>
                    </ButtonGroup>
                </Segment>
            </Form>
        )}
        />
    );
}