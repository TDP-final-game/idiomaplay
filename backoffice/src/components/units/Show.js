import { Show, SimpleShowLayout, TextField, NumberField, ArrayField } from 'react-admin';

import LessonList from '../lessons/List';

const UnitShow = props => (
	<Show {...props}>
		<SimpleShowLayout>
			<NumberField source="orderNumber"/>
			<TextField source="name"/>
			<ArrayField source="lessons">
				<LessonList unitId={`units-${props.id}`}/>
			</ArrayField>
		</SimpleShowLayout>
	</Show>
);


export default UnitShow;
