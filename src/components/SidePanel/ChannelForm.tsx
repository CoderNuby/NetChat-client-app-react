import { ChangeEvent, useContext, useState } from "react";
import { Button, Form, FormField, Header, Icon, Input, Modal, ModalActions, ModalContent } from "semantic-ui-react";
import { IChannelModel } from "../../models/channelModel";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";
import RootStore from "../../stores/RootStore";


function ChannelForm() {

    const initChannel: IChannelModel = {
        id: "",
        name: "",
        description: "",
        messages: [],
        channelType: 0,
        privateChannelId: ""
    }

    const [channel, setChannel] = useState<IChannelModel>(initChannel);

    const rootStore = useContext(RootStore);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setChannel({...channel, [event.target.name]: event.target.value});
    }

    function closeModal(){
        setChannel(initChannel);
        rootStore.channelStore.setOpenModal(false);
    }

    function saveChannel(){
        let newChannel = {
            ...channel,
            id: uuid()
        }
        if(newChannel.name.length === 0 || newChannel.description.length === 0){
            toast.error("Both name and description are require");
            return;
        }
        rootStore.channelStore.createChannel(newChannel);
        closeModal();
    }

    return(
        <Modal
            basic
            onClose={() => rootStore.channelStore.setOpenModal(false)}
            onOpen={() => rootStore.channelStore.setOpenModal(true)}
            open={rootStore.channelStore.openModal}
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