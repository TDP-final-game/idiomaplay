import * as React from "react";
import { Admin, Resource } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import spanishMessages from "@blackbox-vision/ra-language-spanish";

import UserList from './components/users/List';
import UserEdit from './components/users/Edit';

import UnitList from './components/units/List';
import UnitShow from './components/units/Show';
import UnitEdit from './components/units/Edit';

import LessonShow from './components/lessons/Show';
import LessonEdit from './components/lessons/Edit';

import ExerciseShow from './components/exercises/Show';
import ExerciseEdit from './components/exercises/Edit';

import translations from './translations';
import dataProvider from './dataProvider/index';
import authProvider from './authProvider';

const i18nProvider = polyglotI18nProvider(() => ({...spanishMessages, ...translations}), 'es');

const App = () => (
	<Admin authProvider={authProvider} dataProvider={dataProvider} i18nProvider={i18nProvider}>
		<Resource name="users" list={UserList} edit={UserEdit} />
		<Resource name="units" list={UnitList} show={UnitShow} edit={UnitEdit} />
		<Resource name="lessons" show={LessonShow} edit={LessonEdit}/>
		<Resource name="lessonExercises" show={ExerciseShow} edit={ExerciseEdit}/>
	</Admin>
);

export default App;
