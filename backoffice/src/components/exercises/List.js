import {
	Datagrid,
	TextField,
	ShowButton
} from 'react-admin';

const ExerciseShowButton = ({record}) => {
	return <ShowButton to={`/lessonExercises/${record.id}/show`}/>
}

const ExerciseList = ({lessonId}) => (
	<Datagrid>
		<TextField source="orderNumber"/>
		<TextField source="statement"/>
		<ExerciseShowButton/>
	</Datagrid>
);

export default ExerciseList;
