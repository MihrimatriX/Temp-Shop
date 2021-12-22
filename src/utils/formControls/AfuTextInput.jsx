import React from "react";
import {FormField, Label} from "semantic-ui-react";
import {useField} from "formik";

export default function AfuTextInput({...props}) {

    const [field, meta] = useField(props);

    return (
        <div>
            <FormField error={meta.touched && !!meta.error}>
                <input {...field} {...props}/>
                {
                    meta.touched && !!meta.error ? (<Label pointing basic color="red" content={meta.error}/>) : null
                }
            </FormField>
        </div>
    )
}
