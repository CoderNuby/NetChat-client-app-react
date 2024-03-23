import { Link } from "react-router-dom";
import { Button, Grid, GridColumn, Header, Icon, Segment, SegmentInline } from "semantic-ui-react";



function NotFound() {
    return (
        <Grid textAlign="center" verticalAlign="middle" className="app">
            <GridColumn style={{maxWidth: 800}}>
                <Segment>
                    <Header>
                        <Icon name="search" />
                        404 - Page Not Found
                    </Header>
                    <SegmentInline>
                        <Button as={Link} to={"/login"} primary >Login page</Button>
                    </SegmentInline>
                </Segment>
            </GridColumn>
        </Grid>
    );
}

export default NotFound;