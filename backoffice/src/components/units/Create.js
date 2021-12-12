import React from 'react';
import {
    Create,
    SimpleForm, 
    TextInput
} from 'react-admin';
import { useLocation } from 'react-router';

const UnitCreate = props => {

    const location = useLocation();
    const challengeId =  location.state && location.state.record
    ? location.state.record.challengeId
    : undefined;

    const redirect = `/challenges/${challengeId}/show`

    return (
        <Create {...props}>
            <SimpleForm initialValues={{ challengeId: challengeId }} redirect={redirect}>
                <TextInput source="challengeId" label="Identificador del Desafio" disabled />
                <TextInput source="orderNumber"/>
                <TextInput source="name" />
                <TextInput source="description" />
            </SimpleForm>
        </Create>
    );
};

export default UnitCreate;
