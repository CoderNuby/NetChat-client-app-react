import { Link } from "react-router-dom";
import { Button, Form, FormInput, Grid, GridColumn, Header, Icon, Message, Segment } from "semantic-ui-react";


function Register() {
    return(
        <Grid
            textAlign="center"
            verticalAlign="middle"
            className="app"
        >
            <GridColumn style={{ maxWidth: "45rem"}}>
                <Header as={"h1"} icon color="orange" textAlign="center">
                    <Icon name="puzzle piece" color="orange" />
                    Create an account for NetChat
                </Header>
                <Form size="large">
                    <Segment stacked>
                        <FormInput 
                            fluid
                            name="username"
                            icon={"user"}
                            iconPosition="left"
                            placeholder="User Name"
                            type="text">
                        </FormInput>
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
                        <FormInput 
                            fluid
                            name="passwordconfirmation"
                            icon={"lock"}
                            iconPosition="left"
                            placeholder="Confirm Password"
                            type="password">
                        </FormInput>

                        <Button color="orange" fluid size="large">Create Account</Button>

                        <Message>
                            Do you already have an account? <Link to={"/login"} >Go to Login</Link>
                        </Message>
                    </Segment>
                </Form>
            </GridColumn>
        </Grid>
    );
}


export default Register;