import React from 'react';
import {
	Create, maxLength, maxValue, minValue, number, NumberInput, required,
	SimpleForm,
	TextInput,
} from 'react-admin';
import { useLocation } from 'react-router';

const UnitCreate = props => {

	const location = useLocation();
	const challengeId = location.state && location.state.record
		? location.state.record.challengeId
		: undefined;

	const redirect = `/challenges/${challengeId}/show`

	return (
		<Create {...props}>
			<SimpleForm initialValues={{challengeId: challengeId}} redirect={redirect}>
				<TextInput source="challengeId" label="Identificador del Desafio" disabled/>
				<TextInput source="orderNumber" validate={[number(), minValue(1), maxValue(50)]}/>
				<TextInput source="name" validate={[required(), maxLength(50)]}/>
				<TextInput source="description" validate={[required(), maxLength(100)]}/>
				<NumberInput label="Duracion del examen (min)" source="durationInMinutes" validate={[required(), minValue(1), number()]}/>
				<TextInput label="Nombre del examen" source="examName" validate={[required(), maxLength(50)]}/>
				<TextInput label="Descripcion del examen" source="examDescription" validate={[required(), maxLength(100)]}/>
			</SimpleForm>
		</Create>
	);
};

export default UnitCreate;

