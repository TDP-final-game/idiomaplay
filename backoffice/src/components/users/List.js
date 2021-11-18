import { List, Datagrid, EmailField, TextField, BooleanField, EditButton } from 'react-admin';

const UserList = props => (
	<List {...props} bulkActionButtons={false} exporter={false}>
		<Datagrid rowClick="edit">
			<EmailField source="email" />
			<TextField source="firstName" sortable={false} />
			<TextField source="lastName" sortable={false} />
			<BooleanField source="enabled" sortable={false} />
			<EditButton />
		</Datagrid>
	</List>
);

export default UserList;
