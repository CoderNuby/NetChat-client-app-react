import { MenuMenu } from "semantic-ui-react";


import UserPanel from "./UserPanel";
import Channels from "./Channels";
import DirectMessages from "./DirectMessages";
import { observer } from "mobx-react-lite";
import Favorites from "./Favorites";


function SidePanel() {
    return (
        <MenuMenu
        size="large"
        inverted="true"
        fixed="left"
        vertical="true"
        style={{ background: "#4c3c4c", fontSize: "1.2rem", marginLeft: "5rem", color: "#afadad"}}
        >
            <UserPanel />
            <Favorites />
            <Channels />
            <DirectMessages />
        </MenuMenu>
    );
}

export default observer(SidePanel);