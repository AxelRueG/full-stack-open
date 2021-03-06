import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import FormNewNumber from './components/FormNewNumber';
import Contacts from './components/Contacts';
import Service from './services/services';
import MessageAdded from './components/MessageAdded';
import MessageError from './components/MessageError';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [search, setSearch] = useState('');
	const [showMessage, setShowMessage] = useState({
		status: false,
		message: '',
	});
	const [errorMessage, setErrorMessage] = useState({
		status: false,
		message: undefined,
	});

	useEffect(() => {
		Service.getPersons().then((response) => {
			setPersons(response.data);
		});
	}, []);

	const handleChangeName = (e) => setNewName(e.target.value);
	const handleChangeNumber = (e) => setNewNumber(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();
		const existContact = persons.find((elem) => elem.name === newName);

		if (existContact) {
			// confirm if the user will update the phone number
			if (window.confirm(`${newName} is already added to phonebook`)) {
				const contactUpdate = { ...existContact, number: newNumber };

				Service.updatePerson(existContact.id, contactUpdate)
					.then((response) => response.data)
					.then((response) => {
						const rest = persons.filter((elem) => elem.id !== existContact.id);
						setPersons(rest.concat(response));
						setShowMessage({ status: true, message: 'Update number from ' });
					})
					.catch((e) =>
						setErrorMessage({ status: true, message: e.response.data.error })
					);
			}
		} else {
			// Create a new person
			Service.postPerson({
				name: newName,
				number: newNumber,
			})
				.then((response) => response.data)
				.then((response) => {
					setPersons(persons.concat(response));
					setShowMessage({ status: true, message: 'Added ' });
				})
				.catch((e) =>
					setErrorMessage({ status: true, message: e.response.data.error })
				);
		}
		setNewName('');
		setNewNumber('');
	};

	const handleDelete = (id) => {
		Service.deletePerson(id)
			.then(() => setPersons(persons.filter((elem) => elem.id !== id)))
			.catch((e) =>
				setErrorMessage({
					status: true,
					message: e.response.data.error,
				})
			);
	};

	const handleFilter = (e) => setSearch(e.target.value);

	const handleShowMessage = () =>
		setShowMessage({ status: false, message: '' });

	const handleError = () => setErrorMessage({ status: false, message: '' });

	return (
		<div>
			<h2>Phonebook</h2>
			<Search search={search} handleFilter={handleFilter} />
			{showMessage.status ? (
				<MessageAdded
					contact={persons[persons.length - 1]}
					showMessage={handleShowMessage}
					message={showMessage.message}
				/>
			) : (
				<></>
			)}
			{errorMessage.status ? (
				<MessageError
					message={errorMessage.message}
					handleError={handleError}
				/>
			) : (
				<></>
			)}
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
