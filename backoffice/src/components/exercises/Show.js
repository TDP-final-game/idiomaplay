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
				<ArrayField label="Opciones" source="options">
					<Datagrid>
						<TextField label="Enunciado" source="text"/>
						<BooleanField label="Es correcta" source="correct"/>
					</Datagrid>
				</ArrayField>
			</SimpleShowLayout>
		</Show>
	</>
);

export default ExerciseShow;
