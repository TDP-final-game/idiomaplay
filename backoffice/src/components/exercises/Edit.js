import {
	Edit,
	SimpleForm,
	TextInput,
	RadioButtonGroupInput,
	ArrayInput,
	SimpleFormIterator,
	BooleanInput
} from 'react-admin';

const ExerciseEdit = props => (
	<Edit {...props}>
		<SimpleForm>
			<TextInput source="statement" fullWidth/>
			<RadioButtonGroupInput source="type" choices={[
				{id: 'listening', name: 'Listening'},
				{id: 'complete_sentence', name: 'Complete Sentence'},
				{id: 'translate_to_native', name: 'Translate to native'},
				{id: 'translate_to_foreign', name: 'Translate to foreign'},
			]}/>
			<ArrayInput source="options">
				<SimpleFormIterator disableReordering>
					<TextInput source="text"/>
					<BooleanInput source="correct" label="Correcta"/>
				</SimpleFormIterator>
			</ArrayInput>
		</SimpleForm>
	</Edit>
);


export default ExerciseEdit
