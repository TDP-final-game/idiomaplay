import CompositeDataProvider from './composite';
import users from './users';
import challenges from './challenges';
import units from './units';
import lessons from './lessons';
import lessonExercises from './lessonExercises';

export default new CompositeDataProvider([
	users,
	challenges,
	units,
	lessons,
	lessonExercises
])
