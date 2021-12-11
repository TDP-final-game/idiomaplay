import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
} from 'react-admin';

const UnitCreate = props => {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput label="Nombre de la unidad" source="name" />
            </SimpleForm>
        </Create>
    );
};

export default UnitCreate;
