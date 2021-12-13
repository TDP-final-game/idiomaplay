import { Datagrid, TextField, EditButton, NumberField, ShowButton } from 'react-admin';

const LessonShowButton = ({record}) => {
	return <ShowButton to={`/lessons/${record.id}/show`}/>
}

const LessonEditButton = ({record}) => {
	return <EditButton to={`/lessons/${record.id}`}/>
}

const LessonList = ({unitId}) => (
	<Datagrid>
		<NumberField source="orderNumber"/>
		<TextField source="name"/>
		<TextField source="description"/>
		<LessonShowButton unitId={unitId}/>
		<LessonEditButton/>
	</Datagrid>
);

export default LessonList;
