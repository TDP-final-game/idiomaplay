import { Show, SimpleShowLayout, TextField, ArrayField, Datagrid, BooleanField } from 'react-admin';

import Breadcrumbs from '../Breadcrumbs';

const ExerciseShow = props => (
	<>
		<div>
			<Breadcrumbs {...props}/>
		</div>
		<Show {...props}>
			<SimpleShowLayout>
				<TextField source="orderNumber"/>
				<TextField source="type"/>
				<TextField source="statement"/>
				<ArrayField source="options">
					<Datagrid>
						<TextField source="text"/>
						<BooleanField source="correct"/>
					</Datagrid>
				</ArrayField>
			</SimpleShowLayout>
		</Show>
	</>
);

export default ExerciseShow;
