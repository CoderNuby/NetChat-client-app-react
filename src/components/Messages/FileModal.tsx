import { toast } from "react-toastify";
import { Button, Icon, Input, Modal, ModalActions, ModalContent, ModalHeader } from "semantic-ui-react";


interface IProps {
    isOpen: boolean;
    showModal: (show: boolean) => void;
    uploadFile: (file: Blob | null) => void;
}

function FileModal(props: IProps) {

    var file: any = null;

    function addFile(event: any) {
        let selectedFile = event.target.files[0];
        let fileSplited = selectedFile.name.split(".");
        let fileExtention = fileSplited[fileSplited.length - 1];
        if(!(fileExtention === "jpg" || fileExtention === "png")){
            file = null;
            toast.error("The file should be an image");
            return;
        }

        file = selectedFile;
    }

    function sendImage() {
        if(!file){
            toast.error("The file should be an image");
            return;
        }

        props.uploadFile(file);
        props.showModal(false);
    }

    return (
        <Modal
            basic
            open={props.isOpen}
            onClose={() => props.showModal(false)}>
                <ModalHeader>Select an Image</ModalHeader>
                <ModalContent>
                    <Input onChange={addFile} fluid label="File tyep: jpg, png" name="file" type="file" />
                </ModalContent>
                <ModalActions>
                    <Button onClick={sendImage} color="green" inverted>
                        <Icon name="checkmark" />Send
                    </Button>
                    <Button color="red" inverted onClick={() => props.showModal(false)}>
                        <Icon name="remove" />
                    </Button>
                </ModalActions>
        </Modal>
    );
}

export default FileModal;