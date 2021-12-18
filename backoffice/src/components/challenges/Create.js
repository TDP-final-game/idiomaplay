import React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
} from 'react-admin';

const ChallengeCreate = props => {
    const redirect = '/challenges';

    return (
        <Create {...props}>
            <SimpleForm redirect={redirect}>
				<TextInput source="name"/>
				<TextInput source="description" />
                <TextInput source="difficulty" />
                <TextInput source="language" />
            </SimpleForm>
        </Create>
    );
};

export default ChallengeCreate;
