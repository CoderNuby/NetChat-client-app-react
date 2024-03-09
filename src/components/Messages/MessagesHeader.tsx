import { Header, Icon, Segment } from "semantic-ui-react";
import HeaderSubHeader from "semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader";
import { SearchInput } from "./SearchInput";


export function MessageHeader() {
    return (
        <Segment clearing>
            <Header fluid="true" as={"h2"} floated="left" style={{marginBottom: 0}}>
                <span>
                    Channel
                    <Icon name={"star outline"} color="black" />
                </span>
                <HeaderSubHeader>2 Users</HeaderSubHeader>
            </Header>
            <SearchInput />
        </Segment>
    );
}