import React from 'react';
import {
	Create, maxLength, maxValue, minValue, number, required,
	SimpleForm,
	TextInput,
} from 'react-admin';

import { useLocation } from 'react-router';

const LessonCreate = props => {
	const location = useLocation();
	const {challengeId, unitOrderNumber} = location.state.record;

	const auxUrl = `challenges-${challengeId}-units-${unitOrderNumber}`;
	const redirect = `/units/${auxUrl}/show`;

	return (
		<Create {...props}>
			<SimpleForm redirect={redirect} initialValues={{challengeId, unitOrderNumber}}>
				<TextInput source="challengeId" label="Identificador del Desafio" disabled/>
				<TextInput source="unitOrderNumber" label="Número de orden de la Unidad" disabled/>
				<TextInput source="orderNumber" validate={[number(), minValue(1), maxValue(50)]}/>
				<TextInput source="name" validate={[required(), maxLength(50)]}/>
				<TextInput source="description" validate={[required(), maxLength(100)]}/>
			</SimpleForm>
		</Create>
	);
};

export default LessonCreate;
