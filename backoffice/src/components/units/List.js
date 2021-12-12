import {
	Datagrid,
	NumberField,
	TextField,
	ShowButton,
	EditButton
} from 'react-admin';

const UnitShowButton = ({record}) => {
	return <ShowButton to={`/units/${record.id}/show`}/>
}

const UnitEditButton = ({record}) => {
	return <EditButton to={`/units/${record.id}`}/>
}

const UnitList = () => (
		<Datagrid rowClick="edit">
			<NumberField source="orderNumber"/>
			<TextField source="name"/>
			<TextField source="description"/>
			<UnitShowButton />
			<UnitEditButton />
		</Datagrid>
);

export default UnitList;
