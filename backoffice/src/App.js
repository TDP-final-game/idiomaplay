import * as React from "react";
import { Admin, Resource } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import spanishMessages from "@blackbox-vision/ra-language-spanish";

import translations from './translations';
import dataProvider from './dataProvider';
import UserList from './components/users/List';
import UserEdit from './components/users/Edit';

const i18nProvider = polyglotI18nProvider(() => ({...spanishMessages, ...translations}), 'es');

const App = () => (
	<Admin dataProvider={dataProvider} i18nProvider={i18nProvider}>
		<Resource name="users" list={UserList} edit={UserEdit} />
	</Admin>
);

export default App;
