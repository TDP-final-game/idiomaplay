import React from 'react';
import {
	Create,
	SimpleForm,
	TextInput,
	RadioButtonGroupInput,
	ArrayInput,
	SimpleFormIterator,
	BooleanInput
} from 'react-admin';

import { useLocation } from 'react-router';

const ExerciseCreate = props => {
    const location = useLocation();
    const { challengeId, unitOrderNumber } = location.state.record;

    const auxUrl = `challenges-${challengeId}-units-${unitOrderNumber}`;
    const redirect = `/units/${auxUrl}/show`;

    return (
        <Create {...props}>
			<SimpleForm redirect={redirect} initialValues={{challengeId, unitOrderNumber}}>
		   		<TextInput source="challengeId" label="Identificador del Desafio" disabled/>
				<TextInput source="unitOrderNumber" label="Número de orden de la Unidad" disabled/>
				<TextInput source="statement" label="Texto" fullWidth/>

				<RadioButtonGroupInput source="type" choices={[
					{id: 'listening', name: 'Escuchar audio'},
					{id: 'complete_sentence', name: 'Completar la frase'},
					{id: 'translate_to_native', name: 'Traducir a idioma nativo'},
					{id: 'translate_to_foreign', name: 'Traducir a idioma extranjero'},
				]}/>

                <ArrayInput source="options">
					<SimpleFormIterator disableReordering>
						<TextInput source="text" label="Opcion" fullWidth/>
						<BooleanInput source="correct" label="Correcta"/>
					</SimpleFormIterator>
				</ArrayInput>
			</SimpleForm>
        </Create>
    );
};

export default ExerciseCreate;
