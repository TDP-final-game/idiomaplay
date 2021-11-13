import * as React from "react";
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { PostList } from './PostList';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
const App = () => (
	<Admin dataProvider={dataProvider}>
		<Resource name="users" list={ListGuesser}/>
		<Resource name="posts" list={PostList}/>
	</Admin>
);

export default App;
