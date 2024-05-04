import { useContext, useEffect, useState } from "react";
import { Dropdown, Grid, GridColumn, GridRow, Header, HeaderContent, Icon } from "semantic-ui-react";
import AuthStore from "../../stores/AuthStore";
import { IUserModel } from "../../models/userModel";

function UserPanel() {

    const [ user, setUser ] = useState<IUserModel | null>();
    const authStore = useContext(AuthStore);

    useEffect(() => {
        setUser(authStore.GetUserInfo());
    }, [authStore]);

    useEffect(() => {
    }, [user]);

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
                    <span onClick={() => authStore.Logout()}>
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
                    trigger={<span>{user?.userName}</span>}
                    options={dropDownOptions()}
                    ></Dropdown>
                </Header>
            </GridColumn>
        </Grid>
    );
}

export default UserPanel;