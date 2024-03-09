import { Button, ButtonGroup, Input, Segment } from "semantic-ui-react";


export function MessageForm() {
    return (
        <Segment>
            <Input 
                fluid 
                name="message" 
                style={{marginBottom: "0.7rem"}}
                label={<Button icon={"add"} />}
                labelPosition="left"
                placeholder="Write your message"
            ></Input>

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
    );
}