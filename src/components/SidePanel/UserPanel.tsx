import { useContext, useEffect, useState } from "react";
import { Dropdown, Grid, GridColumn, GridRow, Header, HeaderContent, Icon, Image } from "semantic-ui-react";
import { IUserModel } from "../../models/userModel";
import { observer } from "mobx-react-lite";
import RootStore from "../../stores/RootStore";

function UserPanel() {

    const [ user, setUser ] = useState<IUserModel | null>();
    const rootStore = useContext(RootStore);

    useEffect(() => {
        rootStore.authStore.GetUserInfoFromLocalStorage();
        setUser(rootStore.authStore.CurrentUser);
    }, [rootStore]);

    function dropDownOptions(){
        var res = [
            {
                key: "user",
                text: (
                    <span>
                        Logged as: <strong>{user?.email}</strong>
                    </span>
                ),
                disabled: true
            },
            {
                key: "avatar",
                text: (
                    <span>
                        Change avatar
                    </span>
                ),
                disabled: true
            },
            {
                key: "Logout",
                text: (
                    <span onClick={() => rootStore.authStore.Logout()}>
                        Logout
                    </span>
                )
            }
        ];
        return res;
    }

    return (
        <Grid style={{background: "#4c3c4c", margin: 0}}>
            <GridColumn>
                <GridRow style={{padding: "1.2rem", margin: 0}}>
                    <Header inverted floated="left" as="h2">
                        <Icon name="code" />
                        <HeaderContent>NetChat</HeaderContent>
                    </Header>
                </GridRow>
                <Header style={{padding: "0.25rem"}} as="h4" inverted>
                    <Dropdown
                    trigger={<span><Image src={user?.avatar} spaced="right" />{user?.userName}</span>}
                    options={dropDownOptions()}
                    ></Dropdown>
                </Header>
            </GridColumn>
        </Grid>
    );
}

export default observer(UserPanel);