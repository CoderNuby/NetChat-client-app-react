import { ChangeEvent, useState } from "react";
import { Button, Form, FormField, Header, Icon, Input, Modal, ModalActions, ModalContent } from "semantic-ui-react";
import { IChannel } from "../../models/channel";
import { v4 as uuid } from "uuid";

interface IProp {
    open: boolean;
    setOpen: (value: boolean) => void;
    createChannel: (channel: IChannel) => void;
}


export function ChannelForm(props: IProp) {

    const initChannel = {
        id: "",
        name: "",
        description: ""
    }

    const [channel, setChannel] = useState<IChannel>(initChannel);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setChannel({...channel, [event.target.name]: event.target.value});
    }

    function closeModal(){
        setChannel(initChannel);
        props.setOpen(false);
    }

    function saveChannel(){
        let newChannel = {
            ...channel,
            id: uuid()
        }
        props.createChannel(newChannel);
        closeModal();
    }

    return(
        <Modal
            basic
            onClose={() => props.setOpen(false)}
            onOpen={() => props.setOpen(true)}
            open={props.open}
            size='small'
            trigger={<Icon name="add" style={{ paddingLeft: "3rem" }}/>}
        >
            <Header icon>
                <Icon name='add' />
                Add Channel
            </Header>
            <ModalContent>
                <Form>
                    <FormField>
                        <Input
                            onChange={handleInputChange}
                            fluid 
                            label="Channel Name" 
                            name="name" />
                    </FormField>
                    <FormField>
                        <Input
                            onChange={handleInputChange}
                            fluid
                            label="Description"
                            name="description" />
                    </FormField>
                </Form>
            </ModalContent>
            <ModalActions>
                <Button basic color='red' inverted onClick={() => closeModal()}>
                    <Icon name='remove' /> Cancel
                </Button>
                <Button color='green' inverted onClick={() => saveChannel()}>
                    <Icon name='checkmark' /> Add
                </Button>
            </ModalActions>
        </Modal>
    );
}