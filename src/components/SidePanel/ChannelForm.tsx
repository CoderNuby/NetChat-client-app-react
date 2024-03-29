import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Button, Form, FormField, Header, Icon, Input, Modal, ModalActions, ModalContent } from "semantic-ui-react";
import { IChannel } from "../../models/channel";
import { v4 as uuid } from "uuid";
import ChannelStore from "../../stores/ChannelStore";
import { observer } from "mobx-react-lite";


function ChannelForm() {

    const initChannel = {
        id: "",
        name: "",
        description: ""
    }

    const [channel, setChannel] = useState<IChannel>(initChannel);

    const channelStore = useContext(ChannelStore)

    useEffect(() => {

    }, [channelStore]);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setChannel({...channel, [event.target.name]: event.target.value});
    }

    function closeModal(){
        setChannel(initChannel);
        channelStore.setOpenModal(false);
    }

    function saveChannel(){
        let newChannel = {
            ...channel,
            id: uuid()
        }
        channelStore.createChannel(newChannel);
        closeModal();
    }

    return(
        <Modal
            basic
            onClose={() => channelStore.setOpenModal(false)}
            onOpen={() => channelStore.setOpenModal(true)}
            open={channelStore.openModal}
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

export default observer(ChannelForm)