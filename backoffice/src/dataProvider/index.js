import CompositeDataProvider from './composite';
import users from './users';
import units from './units';
import lessons from './lessons';
import lessonExercises from './lessonExercises';

export default new CompositeDataProvider([users, units, lessons, lessonExercises])
