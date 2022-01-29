import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ title }) => <h1>{title}</h1>;
const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>{text}</button>
);

const App = () => {
	const [good, setGood] = useState(0);
	const [bad, setBad] = useState(0);
	const [neutral, setNeutral] = useState(0);

	const handleGood = () => setGood(good + 1);
	const handleNeutral = () => setNeutral(neutral + 1);
	const handleBad = () => setBad(bad + 1);

	return (
		<div>
			<Header title={'give feedback'} />
			<Button handleClick={handleGood} text={'good'} />
			<Button handleClick={handleNeutral} text={'neutral'} />
			<Button handleClick={handleBad} text={'bad'} />
			<Header title={'statistics'} />
			<p>good {good}</p>
			<p>neutral {neutral}</p>
			<p>bad {bad}</p>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
