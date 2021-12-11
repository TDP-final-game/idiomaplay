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
				<TextField source="difficulty" />
				<ArrayField source="units">
					<UnitList/>
				</ArrayField>
				<CreateButton label="Agregar unidad" to={"/units/create"}/>
			</SimpleShowLayout>
		</Show>
	</>
);


export default ChallengeShow;
