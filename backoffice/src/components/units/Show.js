import { Show, SimpleShowLayout, TextField, NumberField, ArrayField } from 'react-admin';

import LessonList from '../lessons/List';
import Breadcrumbs from '../Breadcrumbs';
import CreateButton from '../CreateButton';

const UnitShow = props => {
	console.log(props.id)
	
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
