import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-admin';
import Typography from '@mui/material/Typography';

const normalizePathname = pathname => {
	let normalized = pathname.split('/').slice(1, 3);
	if (!normalized[1]) {
		return {unit: true}
	}
	const rest = normalized[1].split('-')
	if (rest.length === 1) {
		return {unit: rest[0]}
	}
	if (rest.length === 4) {
		return {unit: rest[1], lesson: rest[3]}
	}
	if (rest.length === 6) {
		return {unit: rest[1], lesson: rest[3], exercise: rest[5]}
	}
	return {}
}
const ABreadcrumb = ({location}) => {
	const path = normalizePathname(location.pathname)
	console.log('path', path)

	if (path.unit === true) {
		return (
			<Breadcrumbs>
				<Typography color="text.primary">Unidades</Typography>
			</Breadcrumbs>
		)
	}

	if (!path.lesson) {
		return (
			<Breadcrumbs>
				<Link underline="hover" color="inherit" to={`/units`}>
					Unidades
				</Link>
				<Typography color="text.primary">Unidad {path.unit}</Typography>
			</Breadcrumbs>
		)
	}

	if (!path.exercise) {
		return (
			<Breadcrumbs>
				<Link underline="hover" color="inherit" to={`/units`}>
					Unidades
				</Link>
				<Link underline="hover" color="inherit" to={`/units/${path.unit}/show`}>
					Unidad {path.unit}
				</Link>
				<Typography color="text.primary">Lección {path.lesson}</Typography>
			</Breadcrumbs>
		)
	}

	return (
		<Breadcrumbs>
			<Link underline="hover" color="inherit" to={`/units`}>
				Unidades
			</Link>
			<Link underline="hover" color="inherit" to={`/units/${path.unit}/show`}>
				Unidad {path.unit}
			</Link>
			<Link underline="hover" color="inherit" to={`/lessons/units-${path.unit}-lessons-${path.lesson}/show`}>
				Lección {path.lesson}
			</Link>
			<Typography color="text.primary">Ejercicio {parseInt(path.exercise, 10) + 1}</Typography>
		</Breadcrumbs>
	)
}

export default ABreadcrumb;
