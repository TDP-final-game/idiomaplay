import { Edit, SimpleForm, TextField, TextInput } from 'react-admin';

const LessonEdit = props => (
	<Edit {...props}>
		<SimpleForm>
			<TextField source="orderNumber" />
			<TextInput source="name" />
		</SimpleForm>
	</Edit>
);

export default LessonEdit;
