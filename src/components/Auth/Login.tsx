import { Link } from "react-router-dom";
import { Button, Form, Grid, GridColumn, Header, Icon, Message, Segment } from "semantic-ui-react";

import { Form as FinalForm, Field } from "react-final-form";
import { InputGeneric } from "../Common/Forms/InputGeneric";
import AuthStore from "../../stores/AuthStore";
import { useContext } from "react";
import { IUserLoginModel } from "../../models/userLoginModel";
import { toast } from "react-toastify";

function Login() {
    const authStore = useContext(AuthStore);

    function onSubmit(values: IUserLoginModel){
        if(!values.email || !values.password){
            toast.error("Both email and password are require");
            return;
        }
        authStore.Login(values);
    }

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
                <FinalForm
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit} size="large">
                        <Segment stacked>
                            <Field
                                name="email"
                                placeholder="Email address"
                                type="email"
                                icon="mail"
                                component={InputGeneric}/>
                            <Field
                                name="password"
                                placeholder="Password"
                                type="password"
                                icon="lock"
                                component={InputGeneric}/>
                            
                            <Button color="violet" fluid size="large">Login</Button>
                        </Segment>
                    </Form>
                )}
                />
                <Message>
                    Don't you have an account? <Link to={"/register"}>Create an account</Link>
                </Message>
            </GridColumn>
        </Grid>
    );
}

export default Login;