const modelMessages = {
	resources: {
		users: {
			name: 'Usuario |||| Usuarios',
			fields: {
				firstName: 'Nombre',
				lastName: 'Apellido',
				lastAccess: 'Último acceso',
				enabled: 'Habilitado',
			},
		},
		units: {
			name: 'Unidad |||| Unidades',
			fields: {
				name: 'Nombre de la unidad',
				orderNumber: 'Numero de orden',
				description: 'Descripcion'
			}
		},
		lessons: {
			name: 'Leccion |||| Lecciones',
			fields: {
				name: 'Nombre',
				orderNumber: 'Numero de orden',
				description: 'Descripcion'
			}
		},
		challenges: {
			name: 'Desafio |||| Desafios',
			fields: {
				name: 'Nombre',
				difficulty: 'Dificultad',
				description: 'Descripcion',
				language: 'Idioma'
			}
		},
		lessonExercises: {
			name: 'Ejercio |||| Ejercicios',
			fields: {
				orderNumber: "Numero",
				type: 'Tipo',
				statement: 'Texto',
				options: 'Opciones',
			}
		},
		examExercises: {
			name: 'Ejercicio |||| Ejercicios',
			fields: {
				orderNumber: "Numero",
				type: 'Tipo',
				statement: 'Texto',
				options: 'Opciones',
			}
		},

	}
}

export default modelMessages;
