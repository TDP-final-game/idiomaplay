import React from 'react';
import { Button } from 'react-admin';
import { Link } from 'react-router-dom';

const CreateButton = ({ label = 'Crear', to = '/' }) => (
	<Button
		variant="contained"
		component={Link}
		to={to}
		label={label}
	/>
);

export default CreateButton;
