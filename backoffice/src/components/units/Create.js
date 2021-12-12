import React from 'react';
import {
    Create,
    SimpleForm, TextField,
    TextInput,
} from 'react-admin';

const UnitCreate = props => {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextField source="orderNumber"/>
                <TextInput source="name" />
                <TextInput source="description" />
            </SimpleForm>
        </Create>
    );
};

export default UnitCreate;
