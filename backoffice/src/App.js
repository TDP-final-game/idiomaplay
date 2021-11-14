import * as React from "react";
import { Admin, Resource } from 'react-admin';
import dataProvider from './dataProvider';
import UserList from './components/users/List';
import UserEdit from './components/users/Edit';

const App = () => (
	<Admin dataProvider={dataProvider}>
		<Resource name="users" list={UserList} edit={UserEdit} />
	</Admin>
);

export default App;
