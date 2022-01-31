import axios from 'axios';

const URL = 'http://localhost:3001/persons';

const getPersons = () => {
	return axios.get(URL);
};

const postPerson = (contact) => {
	return axios.post('http://localhost:3001/persons', contact);
};

const deletePerson = (id) => {
	return axios.delete(`http://localhost:3001/persons/${id}`);
};

export default { getPersons, postPerson, deletePerson };
