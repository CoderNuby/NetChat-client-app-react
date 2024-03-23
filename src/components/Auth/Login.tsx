import { Link } from "react-router-dom";
import { Button, Form, FormInput, Grid, GridColumn, Header, Icon, Message, Segment } from "semantic-ui-react";


function Login() {
    return(
        <Grid
            textAlign="center"
            verticalAlign="middle"
            className="app"
        >
            <GridColumn style={{maxWidth: "45rem"}}>
                <Header as={"h1"} icon color="violet" textAlign="center">
                    <Icon name="code branch" color="violet" />
                    Login to NetChat
                </Header>
                <Form size="large">
                    <Segment stacked>
                        <FormInput
                            fluid
                            name="email"
                            icon={"mail"}
                            iconPosition="left"
                            placeholder="Email"
                            type="email">
                        </FormInput>
                        <FormInput
                            fluid
                            name="password"
                            icon={"lock"}
                            iconPosition="left"
                            placeholder="Password"
                            type="password">
                        </FormInput>
                        <Button color="violet" fluid size="large">Login</Button>
                    </Segment>
                </Form>
                <Message>
                    Don't you have an account? <Link to={"/register"}>Create an account</Link>
                </Message>
            </GridColumn>
        </Grid>
    );
}

export default Login;