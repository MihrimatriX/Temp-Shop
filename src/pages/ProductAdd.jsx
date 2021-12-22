import React from "react";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {Button, Label} from "semantic-ui-react";
import AfuTextInput from "../utils/formControls/AfuTextInput";

export default function ProductAdd() {

    const initValues = {
        productName: "",
        unitPrice: 10
    }

    const schema = Yup.object({
        productName: Yup.string().required("Ürün Adı Zorunlu"),
        unitPrice: Yup.number().required("Ürün Fiyatı Zorunlu")
    });

    return (
        <div>
            <Formik initialValues={initValues} validationSchema={schema} onSubmit={(values => {
                console.log(values)
            })}>
                <Form className="ui form">
                    <Label style={{marginTop: "3px", marginBottom: "5px"}}>Ürün Adı</Label>
                    <AfuTextInput name="productName" placeholder="Misal Makarna"/>
                    <Label style={{marginTop: "3px", marginBottom: "5px"}}>Ürün Fiyatı</Label>
                    <AfuTextInput name="unitPrice" placeholder="10"/>
                    <Button color="green" type="submit">TAMAM</Button>
                </Form>
            </Formik>
        </div>
    )
}
