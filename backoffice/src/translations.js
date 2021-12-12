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
				name: 'Nombre',
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
		}
	}
}

export default modelMessages;
