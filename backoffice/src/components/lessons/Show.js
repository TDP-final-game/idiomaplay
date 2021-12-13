import { Show, SimpleShowLayout, TextField, ArrayField } from 'react-admin';

import ExerciseList from '../exercises/List';
import Breadcrumbs from '../Breadcrumbs';
import CreateButton from '../CreateButton';

const LessonShow = props => {

	const challengeId = props.id.split('-')[1];
	const unitOrderNumber = props.id.split('-')[3];
	const lessonOrderNumber = props.id.split('-')[5];

	return (
	<>
		<div>
			<Breadcrumbs {...props}/>
		</div>
		<Show {...props}>
			<SimpleShowLayout>
				<TextField source="orderNumber"/>
				<TextField source="name"/>
				<TextField source="description" />

				<ArrayField label="Ejercicios" source="exercises">
					<ExerciseList lessonId={`${props.id}`}/>
				</ArrayField>
				<CreateButton label="Agregar Ejercicio" to={{
					pathname: '/lessonExercises/create',
					state: {record: { challengeId, unitOrderNumber, lessonOrderNumber } } }
				}/>
			</SimpleShowLayout>
		</Show>
	</>
)};

export default LessonShow;
