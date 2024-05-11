import { useContext, useState } from "react";
import { Accordion, AccordionContent, AccordionTitle, Header, Icon, Image, ListContent, ListDescription, ListHeader, ListItem, Segment } from "semantic-ui-react";
import RootStore from "../../stores/RootStore";
import { observer } from "mobx-react-lite";
import { ChannelTypeEnum } from "../../models/channelTypeEnum";

function MetaPanel() {

    const [activeIndex, setActiveIndex] = useState(0);
    const rootStore = useContext(RootStore);

    function setCurrentIndex(event: any, props: any) {
        const { index } = props;
        const newIndex = activeIndex === index ? -1 : index;
        setActiveIndex(newIndex);
    }

    function displayTopPosters(posts: { [name: string]: {avatar: string, count: number}}) {
        return Object.entries(posts).sort((x, y) => y[1].count - x[1].count)
                        .map(([key, val], i) => (
                            <ListItem key={i} className="user__float">
                                <Image avatar src={val.avatar} />
                                <ListContent>
                                    <ListHeader as={"a"}>{key}</ListHeader>
                                    <ListDescription>{formatCount(val.count)}</ListDescription>
                                </ListContent>
                            </ListItem>
                        )).slice(0, 2);
    }

    function formatCount(count: number) {
        return count > 1 || count === 0 ? `${count} posts` : `${count} post`;
    }

    if(rootStore.channelStore.activeChannel?.channelType === ChannelTypeEnum.Room) return (<></>);
    return (
        <Segment loading={!rootStore.channelStore.channels}>
            <Header as={"h3"} attached="top">
                About # {rootStore.channelStore.activeChannel && rootStore.channelStore.activeChannel.name}
            </Header>
            <Accordion styled attached="true">
                <AccordionTitle
                    active={activeIndex === 0}
                    onClick={setCurrentIndex}
                    index={0}>
                    <Icon name="dropdown" />
                    <Icon name="info" />
                    Channel details
                </AccordionTitle>
                <AccordionContent active={activeIndex === 0}>
                    {rootStore.channelStore.activeChannel?.description}
                </AccordionContent>

                <AccordionTitle
                    active={activeIndex === 1}
                    onClick={setCurrentIndex}
                    index={1}>
                    <Icon name="dropdown" />
                    <Icon name="user circle" />
                    Top posters
                </AccordionTitle>
                <AccordionContent active={activeIndex === 1}>
                    {rootStore.messageStore.userPosts && displayTopPosters(rootStore.messageStore.userPosts)}
                </AccordionContent>
            </Accordion>
        </Segment>
    );
}

export default observer(MetaPanel);