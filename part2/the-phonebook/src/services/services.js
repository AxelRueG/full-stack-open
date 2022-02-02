import axios from 'axios';

// const URL = 'http://localhost:3001/persons';
// const URL = 'http://localhost:3001/api/persons';
// const URL = 'https://enigmatic-ridge-69291.herokuapp.com/api/persons';
const URL = '/api/persons';

const getPersons = () => {
	return axios.get(URL);
};

const postPerson = (contact) => {
	return axios.post(URL, contact);
};

const deletePerson = (id) => {
	return axios.delete(`${URL}/${id}`);
};

const updatePerson = (id, newData) => {
	return axios.put(`${URL}/${id}`, newData);
};

const services = { getPersons, postPerson, deletePerson, updatePerson };
export default services;
