import { List, Datagrid, EmailField, TextField, BooleanField, EditButton } from 'react-admin';

const UserList = props => (
	<List {...props} pagination={false} bulkActionButtons={false}>
		<Datagrid rowClick="edit">
			<TextField source="id" />
			<EmailField source="email" />
			<TextField source="firstName" />
			<TextField source="lastName" />
			<BooleanField source="enabled" />
			<EditButton />
		</Datagrid>
	</List>
);

export default UserList;
