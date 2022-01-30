import { useEffect, useState } from 'react';
import axios from 'axios';

const Finder = ({ finder, handleChange }) => {
	return (
		<label>
			find countries <input value={finder} onChange={handleChange} />
		</label>
	);
};

const CountriesList = ({ countries }) => {
	return (
		<div>
			{countries.map((countrie) => (
				<p key={countrie.name.common}>{countrie.name.common}</p>
			))}
		</div>
	);
};

const Countrie = ({ countrie }) => {
	return (
		<div>
			<h1>{countrie.name.common}</h1>
			<p>capital {countrie.capital[0]}</p>
			<p>population {countrie.population}</p>
			<h2>languagues</h2>
			<ul>
				{Object.values(countrie.languages).map((language) => (
					<li key={language}>{language}</li>
				))}
			</ul>
			<img src={countrie.flags.png}></img>
		</div>
	);
};

const App = () => {
	const [countries, setCountries] = useState([]);
	const [countriesToShow, setCountriesToShow] = useState([]);
	const [finder, setFinder] = useState('');

	useEffect(() => {
		axios.get('https://restcountries.com/v3.1/all').then((response) => {
			setCountries(response.data);
			setCountriesToShow(response.data);
		});
	}, []);

	const handleChange = (e) => {
		setFinder(e.target.value);
		const countriesFilter = countries.filter((countrie) =>
			countrie.name.common.toLowerCase().includes(finder.toLowerCase())
		);
		setCountriesToShow(countriesFilter);
	};

	return (
		<div className="App">
			<Finder finder={finder} handleChange={handleChange} />
			{countriesToShow.length > 10 ? (
				<p>Too many matches, spesifi another filter</p>
			) : countriesToShow.length === 1 ? (
				<Countrie countrie={countriesToShow[0]} />
			) : (
				<CountriesList countries={countriesToShow} />
			)}
		</div>
	);
};

export default App;
