import { Show, SimpleShowLayout, TextField, ArrayField } from 'react-admin';

import ExerciseList from '../exercises/List';
import Breadcrumbs from '../Breadcrumbs';

const LessonShow = props => (
	<>
		<div>
			<Breadcrumbs {...props}/>
		</div>
		<Show {...props}>
			<SimpleShowLayout>
				<TextField source="orderNumber"/>
				<TextField source="name"/>
				<ArrayField source="exercises">
					<ExerciseList lessonId={`${props.id}`}/>
				</ArrayField>
			</SimpleShowLayout>
		</Show>
	</>
);


export default LessonShow;
