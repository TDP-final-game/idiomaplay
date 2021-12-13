import {
	Datagrid,
	TextField,
	ShowButton
} from 'react-admin';

const ExerciseShowButton = ({lessonId}) => {
	return <ShowButton to={`/lessonExercises/${lessonId}/show`}/>
}

const ExerciseList = ({lessonId}) => (
	<Datagrid>
		<TextField source="orderNumber"/>
		<TextField source="statement"/>
		<ExerciseShowButton lessonId={lessonId}/>
	</Datagrid>
);

export default ExerciseList;
