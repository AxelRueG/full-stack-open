import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
	const [selected, setSelected] = useState(Math.floor(Math.random() * 6));
	const [votes, setVotes] = useState(props.anecdotes.map((x) => 0));
	const [mostVoted, setMostVoted] = useState(0);

	const handleClick = () => {
		let newSelected = Math.floor(Math.random() * 6);
		while (newSelected === selected)
			newSelected = Math.floor(Math.random() * 6);
		setSelected(newSelected);
	};

	const handleVote = () => {
		const copy = [...votes];
		copy[selected] += 1;
		setVotes(copy);
		setMostVoted(copy.indexOf(Math.max(...copy)));
	};

	return (
		<div>
			<h1>Anecdote of the day</h1>
			<p>{props.anecdotes[selected]}</p>
			<button onClick={handleVote}>vote</button>
			<button onClick={handleClick}>next anecdote</button>

			<h1>Anecdote with most votes</h1>
			<p>{props.anecdotes[mostVoted]}</p>
		</div>
	);
};

const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
