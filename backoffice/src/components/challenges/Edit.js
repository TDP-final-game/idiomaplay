import { Edit, SimpleForm, TextInput } from 'react-admin';
import Breadcrumbs from '../Breadcrumbs';

const ChallengeEdit = props => (
	<>
		<div>
			<Breadcrumbs {...props}/>
		</div>

		<Edit {...props}>
			<SimpleForm>
				<TextInput source="name" />
				<TextInput source="language" />
				<TextInput source="difficulty" />
			</SimpleForm>
		</Edit>
	</>
);

export default ChallengeEdit;
