import { Edit, SimpleForm, TextField, TextInput } from 'react-admin';
import Breadcrumbs from '../Breadcrumbs';

const LessonEdit = props => (
	<>
		<div>
			<Breadcrumbs {...props}/>
		</div>

		<Edit {...props}>
			<SimpleForm>
				<TextField source="orderNumber"/>
				<TextInput source="name"/>
			</SimpleForm>
		</Edit>
	</>
);

export default LessonEdit;
