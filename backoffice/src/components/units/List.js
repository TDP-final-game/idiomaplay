import {
	List,
	Datagrid,
	NumberField,
  TextField, ShowButton, EditButton
} from 'react-admin';

const UnitList = props => (
	<List {...props}
				bulkActionButtons={false}
				exporter={false}
	>
		<Datagrid rowClick="edit">
			<NumberField source="orderNumber"/>
			<TextField source="name"/>
			<ShowButton/>
			<EditButton/>
		</Datagrid>
	</List>
);

export default UnitList;
