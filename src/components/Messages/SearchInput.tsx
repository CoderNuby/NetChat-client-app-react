import { Header, Input } from "semantic-ui-react";


export function SearchInput() {
    return (
        <Header floated="right">
            <Input size="mini" icon={"search"} name="searchTerm" placeholder="search message">

            </Input>
        </Header>
    );
}