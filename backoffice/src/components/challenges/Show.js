import { Show, SimpleShowLayout, TextField, ArrayField } from 'react-admin';

import UnitList from '../units/List';
import Breadcrumbs from '../Breadcrumbs';
import CreateButton from '../CreateButton';

const ChallengeShow = props => (
	<>
		<div>
			<Breadcrumbs {...props}/>
		</div>
		<Show {...props}>
			<SimpleShowLayout>
				<TextField source="name" />
				<TextField source="language" />
				<TextField source="description" />
				<TextField source="difficulty" />
				<ArrayField label="Unidades" source="units">
					<UnitList/>
				</ArrayField>
				<CreateButton label="Agregar unidad" to={{pathname: "/units/create", state: { record: {challengeId: props.id}}}} />
			</SimpleShowLayout>
		</Show>
	</>
);


export default ChallengeShow;
