import React from 'react';
import {
    Create, NumberInput,
    SimpleForm, TextField,
    TextInput,
} from 'react-admin';

const UnitCreate = props => {
    return (
        <Create {...props}>
            <SimpleForm>
                <NumberInput source="orderNumber"/>
                <TextInput source="name" />
                <TextInput source="description" />
            </SimpleForm>
        </Create>
    );
};

export default UnitCreate;
