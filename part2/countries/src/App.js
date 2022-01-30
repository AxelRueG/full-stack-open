import { useEffect, useState } from 'react';
import axios from 'axios';

const Finder = ({ finder, handleChange }) => {
	return (
		<label>
			find countries <input value={finder} onChange={handleChange} />
		</label>
	);
};

const Weather = ({ capital }) => {
	const [data, setData] = useState({
		location: { name: '' },
		current: {
			temperature: '',
			weather_icons: '',
			wind_dir: '',
			wind_speed: '',
		},
	});

	useEffect(() => {
		axios
			.get(
				`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`
			)
			.then((response) => setData(response.data));
	}, []);

	return (
		<div>
			<h2>Weather in {data.location.name}</h2>
			<p>
				<strong>temperature:</strong> {data.current.temperature} celcius
			</p>
			<img src={data.current.weather_icons[0]} tag="weather icon"></img>
			<p>
				<strong>wind: </strong>
				{data.current.wind_speed} mph direccion {data.current.wind_dir}
			</p>
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
			<Weather capital={countrie.capital[0]} />
		</div>
	);
};

const CountriLi = ({ countrie }) => {
	const [showStatus, setShowStatus] = useState(false);

	const handleClick = () => setShowStatus(!showStatus);

	return showStatus ? (
		<>
			<Countrie countrie={countrie} />
			<button onClick={handleClick}>hide</button>
		</>
	) : (
		<div>
			<p>{countrie.name.common}</p>
			<button onClick={handleClick}>show</button>
		</div>
	);
};

const CountriesList = ({ countries }) => {
	return (
		<div>
			{countries.map((countrie) => (
				<CountriLi key={countrie.name.common} countrie={countrie} />
			))}
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
