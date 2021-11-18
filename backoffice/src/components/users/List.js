import { List, Datagrid, EmailField, TextField, BooleanField, EditButton, TextInput } from 'react-admin';

const UserList = props => (
	<List {...props}
				bulkActionButtons={false}
				exporter={false}
				filters={[<TextInput style={{width: 500}} source="q" label="Filtrar por email, nombre o apellido" alwaysOn />]}
	>
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
