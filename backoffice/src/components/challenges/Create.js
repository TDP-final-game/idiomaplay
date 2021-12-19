import React from 'react';
import {
	Create, maxLength, required,
	SimpleForm,
	TextInput,
} from 'react-admin';

const ChallengeCreate = props => {
	const redirect = '/challenges';

	return (
		<Create {...props}>
			<SimpleForm redirect={redirect}>
				<TextInput source="name" validate={[required(), maxLength(50)]}/>
				<TextInput source="description" validate={[required(), maxLength(100)]}/>
				<TextInput source="difficulty" validate={[required(), maxLength(50)]}/>
				<TextInput source="language" validate={[required(), maxLength(50)]}/>
			</SimpleForm>
		</Create>
	);
};

export default ChallengeCreate;
