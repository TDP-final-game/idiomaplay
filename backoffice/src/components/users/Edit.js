import { Edit, SimpleForm, BooleanInput, TextField, EmailField, Toolbar, SaveButton, DateField } from 'react-admin';

const CustomToolbar = props => (
	<Toolbar {...props}>
		<SaveButton />
	</Toolbar>
);

const UserEdit = props => (
	<Edit {...props} >
		<SimpleForm toolbar={<CustomToolbar />}>
			<BooleanInput source="enabled" />
			<EmailField source="email" />
			<TextField source="firstName" />
			<TextField source="lastName" />
			<DateField source="lastAccess" showTime={true} />
		</SimpleForm>
	</Edit>
);

export default UserEdit;
