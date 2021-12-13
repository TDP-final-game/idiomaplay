import {
	List,
	Datagrid,
	TextField,
	ShowButton
} from 'react-admin';

import Breadcrumbs from '../Breadcrumbs';

const ChallengeList = props => (
	<>
		<div>
			<Breadcrumbs {...props}/>
		</div>
		<List {...props}
					bulkActionButtons={false}
					exporter={false}
		>
			<Datagrid rowClick="show">
				<TextField source="name" />
				<TextField source="language" />
				<TextField source="difficulty" />
				<ShowButton/>
			</Datagrid>
		</List>
	</>
);

export default ChallengeList;
