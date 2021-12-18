import {
	List,
	Datagrid,
	TextField,
	ShowButton,
	DeleteButton
} from 'react-admin';

import Breadcrumbs from '../Breadcrumbs';
import CreateButton from "../CreateButton";

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
				<TextField source="description" />
				<TextField source="difficulty" />
				<ShowButton/>
				<DeleteButton undoable={false} />
			</Datagrid>
		</List>
		<div style={{marginTop: "1%"}}>
		<CreateButton label="Agregar Desafio" to={{
			pathname: '/challenges/create',
		}}/>
		</div>
	</>
);

export default ChallengeList;
