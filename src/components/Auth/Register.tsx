import { Link } from "react-router-dom";
import { Button, Form, Grid, GridColumn, Header, Icon, Message, Segment } from "semantic-ui-react";
import { Form as FinalForm, Field } from "react-final-form";
import { InputGeneric } from "../Common/Forms/InputGeneric";
import { useContext } from "react";
import { IUserCreateModel } from "../../models/userCreateModel";
import { toast } from "react-toastify";
import RootStore from "../../stores/RootStore";

function Register() {

    const rootStore = useContext(RootStore);

    function onSubmit(values: IUserCreateModel){
        if(invalidForm(values)){
            toast.error("Each field are require");
            return;
        }

        if(invalidPasswords(values)){
            toast.error("Passwords should be equals");
            return;
        }
        
        rootStore.authStore.Register(values);
    }

    function invalidPasswords(user: IUserCreateModel){
        return user.password !== user.passwordconfirmation;
    }

    function invalidForm(user: IUserCreateModel): boolean{
        return (
                !user.email 
                || !user.password 
                || !user.passwordconfirmation
                || !user.userName);
    }

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
                <FinalForm
                    onSubmit={onSubmit}
                    render={({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit} size="large">
                        <Segment stacked>
                            <Field
                                fluid
                                name="userName"
                                icon={"user"}
                                iconPosition="left"
                                placeholder="User Name"
                                type="text"
                                component={InputGeneric}/>
                            <Field
                                fluid
                                name="email"
                                icon={"mail"}
                                iconPosition="left"
                                placeholder="Email"
                                type="email"
                                component={InputGeneric}/>
                            <Field
                                fluid
                                name="password"
                                icon={"lock"}
                                iconPosition="left"
                                placeholder="Password"
                                type="password"
                                component={InputGeneric}/>
                            <Field
                                fluid
                                name="passwordconfirmation"
                                icon={"lock"}
                                iconPosition="left"
                                placeholder="Confirm Password"
                                type="password"
                                component={InputGeneric}/>
                            
                            <Button color="orange" fluid size="large">Create Account</Button>
                        </Segment>
                    
                        <Message>
                            Do you already have an account? <Link to={"/login"} >Go to Login</Link>
                        </Message>
                    </Form>
                )}
                />
            </GridColumn>
        </Grid>
    );
}


export default Register;