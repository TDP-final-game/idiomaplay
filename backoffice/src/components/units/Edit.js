import { Edit, SimpleForm, TextField, TextInput } from 'react-admin';

const UnitEdit = props => (
	<Edit {...props}>
		<SimpleForm>
			<TextField source="orderNumber" />
			<TextInput source="name" />
		</SimpleForm>
	</Edit>
);

export default UnitEdit;
