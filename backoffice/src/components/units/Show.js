import { Show, SimpleShowLayout, TextField, NumberField, ArrayField } from 'react-admin';

import LessonList from '../lessons/List';
import Breadcrumbs from '../Breadcrumbs';
import CreateButton from '../CreateButton';
import ExamExerciseList from "../examExercises/List";

import ExamExerciseList from '../examExercises/List'

const UnitShow = props => {

	const challengeId = props.id.split('-')[1];
	const unitOrderNumber = props.id.split('-')[3];

	return (
	<>
		<div>
			<Breadcrumbs {...props}/>
		</div>
		<Show {...props}>
			<SimpleShowLayout>
				<NumberField source="orderNumber"/>
				<TextField source="name"/>
				<TextField source="description"/>
				<TextField label="Nombre del examen" source="exam.name"/>
				<TextField label="Descripcion del examen" source="exam.description"/>
				<TextField label="Duracion del examen (min)" source="exam.durationInMinutes"/>
				<ArrayField label="Ejercicios del examen" source="examExercises">
					<ExamExerciseList unitId={`${props.id}`}/>
				</ArrayField>
				<CreateButton label="Agregar ejercicio" to={{
					pathname: "/examExercises/create",
					state: {record: { challengeId, unitOrderNumber }}
				}}/>
				<ArrayField label="Lecciones" source="lessons">
					<LessonList unitId={`units-${props.id}`}/>
				</ArrayField>
				<CreateButton label="Agregar Lección" to={{
					pathname: "/lessons/create",
					state: {record: { challengeId, unitOrderNumber }}
				}}/>
			</SimpleShowLayout>
		</Show>
	</>
)
};

export default UnitShow;
