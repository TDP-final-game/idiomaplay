import { Show, SimpleShowLayout, TextField, ArrayField } from 'react-admin';

import UnitList from '../units/List';
import Breadcrumbs from '../Breadcrumbs';

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
			</SimpleShowLayout>
		</Show>
	</>
);


export default ChallengeShow;
