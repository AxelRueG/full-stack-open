import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import FormNewNumber from './components/FormNewNumber';
import Contacts from './components/Contacts';
import Service from './services/services';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [search, setSearch] = useState('');

	useEffect(() => {
		Service.getPersons().then((response) => {
			setPersons(response.data);
		});
	}, []);

	const handleChangeName = (e) => setNewName(e.target.value);
	const handleChangeNumber = (e) => setNewNumber(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (persons.find((elem) => elem.name === newName)) {
			alert(`${newName} is already added to phonebook`);
		} else {
			Service.postPerson({
				name: newName,
				number: newNumber,
			})
				.then((response) => response.data)
				.then((response) => setPersons(persons.concat(response)));
		}
		setNewName('');
		setNewNumber('');
	};

	const handleDelete = (id) => {
		Service.deletePerson(id).then(() =>
			setPersons(persons.filter((elem) => elem.id !== id))
		);
	};

	const handleFilter = (e) => setSearch(e.target.value);

	return (
		<div>
			<h2>Phonebook</h2>
			<Search search={search} handleFilter={handleFilter} />
			<FormNewNumber
				name={newName}
				number={newNumber}
				handleName={handleChangeName}
				handleNumber={handleChangeNumber}
				handleSubmit={handleSubmit}
			/>
			<Contacts persons={persons} search={search} handleDelete={handleDelete} />
		</div>
	);
};

export default App;
