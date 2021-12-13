import { List, Datagrid, EmailField, TextField, BooleanField, TextInput, DateField } from 'react-admin';

const UserList = props => (
	<List {...props}
				bulkActionButtons={false}
				exporter={false}
				filters={[<TextInput style={{width: 500}} source="q" label="Filtrar por email, nombre o apellido" alwaysOn />]}
	>
		<Datagrid rowClick="show">
			<EmailField source="email" />
			<TextField source="firstName" sortable={false} />
			<TextField source="lastName" sortable={false} />
			<DateField source="lastAccess" />
			<BooleanField source="enabled" sortable={false} />
		</Datagrid>
	</List>
);

export default UserList;
