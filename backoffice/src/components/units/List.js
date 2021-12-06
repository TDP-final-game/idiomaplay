import {
	List,
	Datagrid,
	NumberField,
	TextField,
	ShowButton,
	EditButton
} from 'react-admin';

import Breadcrumbs from '../Breadcrumbs';

const UnitList = props => (
	<>
		<div>
			<Breadcrumbs {...props}/>
		</div>
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
	</>
);

export default UnitList;
