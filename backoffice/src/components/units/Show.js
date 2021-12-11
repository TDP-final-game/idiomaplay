import { Show, SimpleShowLayout, TextField, NumberField, ArrayField } from 'react-admin';

import LessonList from '../lessons/List';
import Breadcrumbs from '../Breadcrumbs';
import CreateButton from '../CreateButton';

const UnitShow = props => (
	<>
		<div>
			<Breadcrumbs {...props}/>
		</div>
		<Show {...props}>
			<SimpleShowLayout>
				<NumberField source="orderNumber"/>
				<TextField source="name"/>
				<ArrayField source="lessons">
					<LessonList unitId={`units-${props.id}`}/>
				</ArrayField>
				<CreateButton label="Agregar Lección"/>
			</SimpleShowLayout>
		</Show>
	</>
);


export default UnitShow;
