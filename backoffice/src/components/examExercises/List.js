import {
	Datagrid,
	TextField,
	ShowButton
} from 'react-admin';

const ExerciseShowButton = ({record}) => {
	return <ShowButton to={`/examExercises/${record.id}/show`}/>
}

const ExerciseList = ({unitId}) => (
	<Datagrid>
		<TextField source="orderNumber"/>
		<TextField source="statement"/>
		<ExerciseShowButton/>
	</Datagrid>
);

export default ExerciseList;
