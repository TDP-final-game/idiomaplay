import { Show, SimpleShowLayout, TextField, NumberField, ArrayField } from 'react-admin';

import LessonList from '../lessons/List';
import Breadcrumbs from '../Breadcrumbs';

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
			</SimpleShowLayout>
		</Show>
	</>
);


export default UnitShow;
