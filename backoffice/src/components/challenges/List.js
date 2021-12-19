import {
	List,
	Datagrid,
	TextField,
	ShowButton,
	DeleteButton,
	CardActions
} from 'react-admin';

import Breadcrumbs from '../Breadcrumbs';
import CreateButton from "../CreateButton";

const NoneActions = props => (
	<CardActions />
);

const ChallengeList = props => (
	<>
		<div>
			<Breadcrumbs {...props}/>
		</div>
		<List {...props}
					bulkActionButtons={false}
					exporter={false}
			  		actions={<NoneActions/>}
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
