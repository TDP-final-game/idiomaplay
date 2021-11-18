import { List, Datagrid, EmailField, TextField, BooleanField, EditButton } from 'react-admin';

const UserList = props => (
	<List {...props} bulkActionButtons={false} exporter={false}>
		<Datagrid rowClick="edit">
			<EmailField source="email" />
			<TextField source="firstName" />
			<TextField source="lastName" />
			<BooleanField source="enabled" />
			<EditButton />
		</Datagrid>
	</List>
);

export default UserList;
