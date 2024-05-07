import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, FormInput, Icon } from "semantic-ui-react";


interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {
}

export function InputGeneric(props: IProps){
    return(
        <FormInput
            fluid
            name={props.name}
            iconPosition="left"
            placeholder={props.placeholder}
            type={props.type}>
                {props.iconLabel && (
                    props.iconLabel
                )}
                <input {...props.input} />
                {props.icon && (
                    <Icon name={props.icon} />
                )}
        </FormInput>
    );
}