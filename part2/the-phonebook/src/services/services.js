import axios from 'axios';

const URL = 'http://localhost:3001/persons';

const getPersons = () => {
	return axios.get(URL);
};

const postPerson = (contact) => {
	return axios.post('http://localhost:3001/persons', contact);
};

export default { getPersons, postPerson };
