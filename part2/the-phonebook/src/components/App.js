import React, { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
	const [newName, setNewName] = useState('');

	const handleChange = (e) => setNewName(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (persons.find((elem) => elem.name === newName)) {
			alert(`${newName} is already added to phonebook`);
		} else {
			setPersons(persons.concat({ name: newName }));
		}
		setNewName('');
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form>
				<div>
					name: <input onChange={handleChange} value={newName} />
				</div>
				<div>
					<button type="submit" onClick={handleSubmit}>
						add
					</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((elem) => (
				<p key={elem.name}>{elem.name}</p>
			))}
		</div>
	);
};

export default App;
