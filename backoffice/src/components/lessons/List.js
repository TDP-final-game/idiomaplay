import { Datagrid, TextField, NumberField, ShowButton } from 'react-admin';

const LessonShowButton = ({record}) => {
	return <ShowButton to={`/lessons/${record.id}/show`}/>
}

const LessonList = ({unitId}) => (
	<Datagrid>
		<NumberField source="orderNumber"/>
		<TextField source="name"/>
		<TextField source="description"/>
		<LessonShowButton unitId={unitId}/>
	</Datagrid>
);

export default LessonList;
