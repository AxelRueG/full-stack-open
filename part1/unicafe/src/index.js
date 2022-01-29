import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ title }) => <h1>{title}</h1>;
const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>{text}</button>
);

const Statistic = ({ text, value }) => (
	<p>
		{text} {value}
	</p>
);

const Statistics = ({ good, neutral, bad }) => {
	const total = good + bad + neutral;
	return (
		<>
			<Header title={'statistics'} />
			{total ? (
				<>
					<Statistic text="good" value={good} />
					<Statistic text="neutral" value={neutral} />
					<Statistic text="bad" value={bad} />
					<Statistic text="all" value={total} />
					<Statistic text="average" value={total ? (good - bad) / total : 0} />
					<Statistic
						text="positive"
						value={total ? (good / total) * 100 + '%' : 0}
					/>
				</>
			) : (
				<p>No feedback given</p>
			)}
		</>
	);
};

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
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
