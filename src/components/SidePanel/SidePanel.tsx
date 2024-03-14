import { MenuMenu } from "semantic-ui-react";


import UserPanel from "./UserPanel";
import Channels from "./Channels";


function SidePanel() {
    return (
        <MenuMenu
        size="large"
        inverted="true"
        fixed="left"
        vertical="true"
        style={{ background: "#4c3c4c", fontSize: "1.2rem", marginLeft: "5rem"}}
        >
            <UserPanel />
            <Channels />
        </MenuMenu>
    );
}

export default SidePanel;