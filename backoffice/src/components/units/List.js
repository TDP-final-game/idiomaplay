import {
	Datagrid,
	NumberField,
	TextField,
	ShowButton
} from 'react-admin';

const UnitShowButton = ({record}) => {
	return <ShowButton to={`/units/${record.id}/show`}/>
}

const UnitList = () => (
		<Datagrid rowClick="show">
			<NumberField source="orderNumber"/>
			<TextField source="name"/>
			<TextField source="description"/>
			<UnitShowButton />
		</Datagrid>
);

export default UnitList;
