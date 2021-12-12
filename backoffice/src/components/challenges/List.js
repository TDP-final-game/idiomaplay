import {
	List,
	Datagrid,
	TextField,
	ShowButton,
	EditButton
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
			<Datagrid rowClick="edit">
				<TextField source="name" />
				<TextField source="language" />
				<TextField source="difficulty" />
				<ShowButton/>
				<EditButton/>
			</Datagrid>
		</List>
	</>
);

export default ChallengeList;