import { MenuMenu } from "semantic-ui-react";


import UserPanel from "./UserPanel";
import Channels from "./Channels";
import DirectMessages from "./DirectMessages";
import { observer } from "mobx-react-lite";
import Favorites from "./Favorites";
import { useContext } from "react";
import RootStore from "../../stores/RootStore";


function SidePanel() {

    const rootStore = useContext(RootStore);

    return (
        <MenuMenu
        size="large"
        inverted="true"
        fixed="left"
        vertical="true"
        style={{ background: rootStore.userStore.appUserColorsPreferences.primaryAppColor, fontSize: "1.2rem", marginLeft: "5rem", color: "#afadad"}}
        >
            <UserPanel />
            <Favorites />
            <Channels />
            <DirectMessages />
        </MenuMenu>
    );
}

export default observer(SidePanel);