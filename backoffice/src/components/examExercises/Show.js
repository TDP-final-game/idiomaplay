import { Show, SimpleShowLayout, TextField, ArrayField, Datagrid, BooleanField } from 'react-admin';

const ExerciseShow = props => (
	<>
		<Show {...props}>
			<SimpleShowLayout>
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
