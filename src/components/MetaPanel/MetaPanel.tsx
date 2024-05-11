import { useContext } from "react";
import { Accordion, AccordionContent, AccordionTitle, Header, Icon, Segment } from "semantic-ui-react";
import RootStore from "../../stores/RootStore";
import { observer } from "mobx-react-lite";

function MetaPanel() {

    const rootStore = useContext(RootStore);

    return (
        <Segment>
            {rootStore.channelStore.activeChannel && (
                <>
                    <Header as={"h3"} attached="top">
                        About # {rootStore.channelStore.activeChannel && rootStore.channelStore.activeChannel.name}
                    </Header>
                    <Accordion styled attached="true">
                        <AccordionTitle index={0}>
                            <Icon name="dropdown" />
                            <Icon name="info" />
                            Channel details
                        </AccordionTitle>
                        <AccordionContent>
        
                        </AccordionContent>
        
                        <AccordionTitle index={1}>
                            <Icon name="dropdown" />
                            <Icon name="user circle" />
                            Top posters
                        </AccordionTitle>
                        <AccordionContent>
                            
                        </AccordionContent>
                    </Accordion>
                </>
            )}
        </Segment>
    );
}

export default observer(MetaPanel);