import React, { useContext, useState } from "react";
import { SliderPicker } from "react-color";
import { Button, Divider, Icon, Label, Menu, Modal, ModalActions, ModalContent, ModalHeader, Segment, Sidebar } from "semantic-ui-react";
import RootStore from "../../stores/RootStore";
import { observer } from "mobx-react-lite";
import { IColorPreferenceModel } from "../../models/colorPreferenceModel";
import { toJS } from "mobx";


interface IState {
    modal?: boolean,
    primary?: string,
    secondary?: string
}

function ColorPanel(){

    const initState: IState = {
        modal: false,
        primary: '',
        secondary: ''
    }

    const [state, setState] = useState<IState>(initState);

    const rootStore = useContext(RootStore);

    function openModal() {
        setState({modal: true})
    }

    function closeModal() { setState({modal: false})}

    function handleChangePrimary(color: any) {
        setState({modal: state.modal, primary: color.hex, secondary: state.secondary});
    }

    function handleChangeSecondary(color: any) {
        setState({modal: state.modal, primary: state.primary, secondary: color.hex});
    }

    async function changeValues() {
        if(state.primary && state.secondary){
            let colors: IColorPreferenceModel = {
                primaryAppColor: state.primary,
                secondaryAppColor: state.secondary
            }

            await rootStore.userStore.saveAppColors(colors);
            closeModal();
        }
    }

    function displayUserColors() {

        return (
            <React.Fragment>
                <Divider />
                <div className="color__container">
                    <div 
                        className="color__square"
                        style={{background: rootStore.authStore.CurrentUser?.primaryAppColor}}>
                        <div className="color__overlay"
                            style={{background: rootStore.authStore.CurrentUser?.secondaryAppColor}}>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    return (
        <Sidebar
        as={Menu}
        icon="labeled"
        inverted
        vertical
        visible
        width="very thin"
        >
            <Divider />
            <Button onClick={openModal} icon="add" side="small" color="blue"/>
            {displayUserColors()}
            <Modal basic open={state.modal} onClose={() => closeModal}>
                <ModalHeader>Choose App Colors</ModalHeader>
                <ModalContent>
                    <Segment inverted>
                        <Label content="Primary color"></Label>
                        <SliderPicker onChange={handleChangePrimary} color={state.primary} />
                    </Segment>
                    <Segment inverted>
                        <Label content="Primary secondary"></Label>
                        <SliderPicker onChange={handleChangeSecondary} color={state.secondary} />
                    </Segment>
                    <ModalActions>
                        <Button onClick={changeValues} color="green" inverted>
                            <Icon name="checkmark" /> Save Colors
                        </Button>
                        <Button onClick={closeModal} color="red" inverted>
                            <Icon name="remove" /> Cancel
                        </Button>
                    </ModalActions>
                </ModalContent>
            </Modal>
        </Sidebar>
    );
}

export default observer(ColorPanel);