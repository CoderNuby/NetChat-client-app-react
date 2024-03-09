import React from "react";
import { Dropdown, Grid, GridColumn, GridRow, Header, HeaderContent, Icon } from "semantic-ui-react";


function dropDownOptions(){
    var res = [
        {
            key: "user",
            text: (
                <span>
                    Logged as: <strong>User</strong>
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
        }
    ];
    return res;
}

function UserPanel() {
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
                    trigger={<span>User</span>}
                    options={dropDownOptions()}
                    ></Dropdown>
                </Header>
            </GridColumn>
        </Grid>
    );
}

export default UserPanel;