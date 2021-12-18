import React from 'react';
import {
	Create,
	SimpleForm,
	TextInput,
	RadioButtonGroupInput,
	ArrayInput,
	SimpleFormIterator,
	BooleanInput, required, maxLength
} from 'react-admin';

import { useLocation } from 'react-router';

const optionsValidations = (value, allValues) => {
	if (!allValues?.type) {
		return undefined
	}
	if (!value) {
		return 'Se deben indicar al menos seis opciones';
	}
	if (allValues.type === 'complete_sentence' && value.length < 4) {
		return 'Se deben indicar al menos cuatro opciones';
	}
	if (allValues.type !== 'complete_sentence' && value.length < 6) {
		return 'Se deben indicar al menos seis opciones';
	}

	const numberOfCorrectAnswers = value.filter(option => option?.correct).length
	if (numberOfCorrectAnswers !== 1) {
		return 'Se debe indicar una única opción correcta'
	}
	return undefined;
}

const ExerciseCreate = props => {
	const location = useLocation();
	const {challengeId, unitOrderNumber, lessonOrderNumber} = location.state.record;

	const auxUrl = `challenges-${challengeId}-units-${unitOrderNumber}-lessons-${lessonOrderNumber}`;
	const redirect = `/lessons/${auxUrl}/show`;

	return (
		<Create {...props}>
			<SimpleForm redirect={redirect} initialValues={{challengeId, unitOrderNumber, lessonOrderNumber}}>
				<TextInput source="challengeId" label="Identificador del Desafio" disabled/>
				<TextInput source="unitOrderNumber" label="Número de orden de la Unidad" disabled/>
				<TextInput source="lessonOrderNumber" label="Número de orden de la Leccion" disabled/>
				<TextInput source="statement" fullWidth validate={[required(), maxLength(100)]}/>

				<RadioButtonGroupInput source="type" choices={[
					{id: 'listening', name: 'Escuchar audio'},
					{id: 'complete_sentence', name: 'Completar la frase'},
					{id: 'translate_to_native', name: 'Traducir a idioma nativo'},
					{id: 'translate_to_foreign', name: 'Traducir a idioma extranjero'},
				]} validate={[required()]}/>

				<ArrayInput source="options" validate={[optionsValidations]}>
					<SimpleFormIterator disableReordering>
						<TextInput source="text" label="Opción" fullWidth validate={[required(), maxLength(100)]}/>
						<BooleanInput source="correct" label="Correcta"/>
					</SimpleFormIterator>
				</ArrayInput>
			</SimpleForm>
		</Create>
	);
};

export default ExerciseCreate;
