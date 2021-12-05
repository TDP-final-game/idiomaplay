import {
	Datagrid,
	TextField,
	EditButton,
	ShowButton
} from 'react-admin';

const ExerciseShowButton = ({record}) => {
	return <ShowButton to={`/lessonExercises/${record.id}/show`}/>
}

const ExerciseEditButton = ({record}) => {
	return <EditButton to={`/lessonExercises/${record.id}`}/>
}

const ExerciseList = ({lessonId}) => (
	<Datagrid>
		<TextField source="orderNumber"/>
		<TextField source="statement"/>
		<ExerciseShowButton/>
		<ExerciseEditButton lessonId={lessonId}/>
	</Datagrid>
);

export default ExerciseList;
