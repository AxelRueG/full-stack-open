import React, { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' },
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [search, setSearch] = useState('');

	const handleChangeName = (e) => setNewName(e.target.value);
	const handleChangeNumber = (e) => setNewNumber(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (persons.find((elem) => elem.name === newName)) {
			alert(`${newName} is already added to phonebook`);
		} else {
			setPersons(persons.concat({ name: newName, number: newNumber }));
		}
		setNewName('');
		setNewNumber('');
	};

	const handleFilter = (e) => setSearch(e.target.value);

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				filter shown with <input onChange={handleFilter} value={search} />
			</div>
			<h2>add a new</h2>
			<form>
				<div>
					name: <input onChange={handleChangeName} value={newName} />
				</div>
				<div>
					number: <input onChange={handleChangeNumber} value={newNumber} />
				</div>
				<div>
					<button type="submit" onClick={handleSubmit}>
						add
					</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons
				.filter((elem) =>
					elem.name.toLowerCase().includes(search.toLowerCase())
				)
				.map((elem) => (
					<p key={elem.name}>
						{elem.name} {elem.number}
					</p>
				))}
		</div>
	);
};

export default App;
