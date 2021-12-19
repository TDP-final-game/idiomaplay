import {
	Datagrid,
	NumberField,
	TextField,
	ShowButton,
	DeleteButton
} from 'react-admin';

const UnitShowButton = ({record}) => {
	return <ShowButton to={`/units/${record.id}/show`}/>
}

const UnitDeleteButton = ({record}) => {
	const challengeId = record.id.split('-')[1];
	return <DeleteButton resource={'units'} undoable={false} record={record} redirect={`/challenges/${challengeId}/show`} />
}

const UnitList = () => {
	return (
		<Datagrid rowClick="show">
			<NumberField source="orderNumber"/>
			<TextField source="name"/>
			<TextField source="description"/>
			<UnitShowButton />
			<UnitDeleteButton />
		</Datagrid>
	);
}

export default UnitList;
