import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
} from 'react-admin';

const LessonCreate = props => {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput label="Nombre de la leccion" source="name" />
            </SimpleForm>
        </Create>
    );
};

export default LessonCreate;
