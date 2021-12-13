import { useEffect, useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Link } from 'react-admin';
import { Skeleton } from '@mui/material';

import challenges from '../dataProvider/challenges'

const getChallengeName = async id => {
	const {data} = await challenges.dataProvider.getOne('challenges', {id})
	return data.name;
}

const normalizePathname = async pathname => {
	let normalized = pathname.split('/').slice(1, 3);
	if (!normalized[1]) {
		return {challenge: true}
	}
	const rest = normalized[1].split('-')
	if (rest.length === 1) {
		return {challenge: {id: rest[0], name: await getChallengeName(rest[0])}}
	}
	if (rest.length === 4) {
		return {challenge: {id: rest[1], name: await getChallengeName(rest[1])}, unit: rest[3]}
	}
	if (rest.length === 6) {
		return {challenge: {id: rest[1], name: await getChallengeName(rest[1])}, unit: rest[3], lesson: rest[5]}
	}
	if (rest.length === 8) {
		return {
			challenge: {id: rest[1], name: await getChallengeName(rest[1])},
			unit: rest[3],
			lesson: rest[5],
			exercise: rest[7]
		}
	}
	return {}
}

const ABreadcrumb = ({location}) => {
	const [path, setPath] = useState();
	useEffect(() => {
		(async () => {
			setPath(await normalizePathname(location.pathname))
		})()
	}, [location.pathname])

	if (!path) {
		return (
			<Skeleton/>
		)
	}

	if (path.challenge === true) {
		return (
			<Breadcrumbs>
				<Typography color="text.primary">Desafíos</Typography>
			</Breadcrumbs>
		)
	}

	if (!path.unit) {
		return (
			<Breadcrumbs>
				<Link underline="hover" color="inherit" to={`/challenges`}>
					Desafíos
				</Link>
				<Typography color="text.primary">{path.challenge.name}</Typography>
			</Breadcrumbs>
		)
	}

	if (!path.lesson) {
		return (
			<Breadcrumbs>
				<Link underline="hover" color="inherit" to={`/challenges`}>
					Desafíos
				</Link>
				<Link underline="hover" color="inherit" to={`/challenges/${path.challenge.id}/show`}>
					{path.challenge.name}
				</Link>
				<Typography color="text.primary">Unidad {path.unit}</Typography>
			</Breadcrumbs>
		)
	}

	if (!path.exercise) {
		return (
			<Breadcrumbs>
				<Link underline="hover" color="inherit" to={`/challenges`}>
					Desafíos
				</Link>
				<Link underline="hover" color="inherit" to={`/challenges/${path.challenge.id}/show`}>
					{path.challenge.name}
				</Link>
				<Link underline="hover" color="inherit" to={`/units/challenges-${path.challenge.id}-units-${path.unit}/show`}>
					Unidad {path.unit}
				</Link>
				<Typography color="text.primary">Lección {path.lesson}</Typography>
			</Breadcrumbs>
		)
	}

	return (
		<Breadcrumbs>
			<Link underline="hover" color="inherit" to={`/challenges`}>
				Desafíos
			</Link>
			<Link underline="hover" color="inherit" to={`/challenges/${path.challenge.id}/show`}>
				{path.challenge.name}
			</Link>
			<Link underline="hover" color="inherit" to={`/units/challenges-${path.challenge.id}-units-${path.unit}/show`}>
				Unidad {path.unit}
			</Link>
			<Link underline="hover" color="inherit"
						to={`/lessons/challenges-${path.challenge.id}-units-${path.unit}-lessons-${path.lesson}/show`}>
				Lección {path.lesson}
			</Link>
			<Typography color="text.primary">Ejercicio {parseInt(path.exercise, 10) + 1}</Typography>
		</Breadcrumbs>
	)
}

export default ABreadcrumb;
