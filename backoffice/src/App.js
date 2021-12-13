import * as React from "react";
import { Admin, Resource } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import spanishMessages from "@blackbox-vision/ra-language-spanish";

import UserList from './components/users/List';
import UserEdit from './components/users/Edit';
import Dashboard from './components/dashboards/Dashboard'

import ChallengeList from './components/challenges/List';
import ChallengeShow from './components/challenges/Show';

import UnitShow from './components/units/Show';
import UnitCreate from "./components/units/Create";

import LessonShow from './components/lessons/Show';
import LessonCreate from "./components/lessons/Create";

import ExerciseShow from './components/exercises/Show';
import ExerciseCreate from './components/exercises/Create';

import ExamExerciseCreate from './components/examExercises/Create';
import ExamExerciseShow from './components/examExercises/Show';

import translations from './translations';
import dataProvider from './dataProvider/index';
import authProvider from './authProvider';

const i18nProvider = polyglotI18nProvider(() => ({...spanishMessages, ...translations}), 'es');

const App = () => (
	<Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider} i18nProvider={i18nProvider}>
		<Resource name="users" list={UserList} edit={UserEdit}/>
		<Resource name="challenges" list={ChallengeList} show={ChallengeShow} />
		<Resource name="units" show={UnitShow} create={UnitCreate}/>
		<Resource name="lessons" show={LessonShow} create={LessonCreate}/>
		<Resource name="lessonExercises" show={ExerciseShow} create={ExerciseCreate}/>
		<Resource name="examExercises" create={ExamExerciseCreate} show={ExamExerciseShow} />
	</Admin>
);

export default App;
