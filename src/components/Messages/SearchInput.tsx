import { useContext, useEffect, useState } from "react";
import { Header, Input } from "semantic-ui-react";
import RootStore from "../../stores/RootStore";


interface ISearchFormState {
    searchTerm: string;
    searchLoading: boolean;
}

export function SearchInput() {

    const rootStore = useContext(RootStore);

    const [searchState, setSearchState] = useState<ISearchFormState>({searchTerm: "", searchLoading: false});

    useEffect(() => {
        renderMessage();
    }, [searchState]);

    function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchState({searchTerm: event.target.value, searchLoading: true});
    }

    async function renderMessage() {
        if(searchState.searchTerm === ""){
            searchState.searchLoading = false;
            rootStore.messageStore.setMessages(rootStore.channelStore.activeChannel?.messages);
        }else{
            rootStore.messageStore.setMessages(rootStore.channelStore.activeChannel?.messages.filter(x => x.content.toUpperCase().includes(searchState.searchTerm.toUpperCase())));
        }
    }

    return (
        <Header floated="right">
            <Input
                onChange={(event) => handleSearchChange(event)}
                size="mini"
                icon={"search"}
                name="searchTerm"
                placeholder="search message" />
        </Header>
    );
}