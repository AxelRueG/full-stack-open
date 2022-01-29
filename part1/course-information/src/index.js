import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => <h1>{props.course}</h1>;

const Part = (props) => (
	<p>
		{props.part} {props.exercises}
	</p>
);

const Content = (props) => {
	return (
		<>
			{props.parts.map((elem) => (
				<Part key={elem.name} part={elem.name} exercises={elem.exercises1} />
			))}
		</>
	);
};
const Total = (props) => <p>Number of exercises {props.total}</p>;

const App = () => {
	const course = 'Half Stack application development';
	const parts = [
		{
			name: 'Fundamentals of React',
			exercises: 10,
		},
		{
			name: 'Using props to pass data',
			exercises: 7,
		},
		{
			name: 'State of a component',
			exercises: 14,
		},
	];

	return (
		<div>
			<Header course={course} />
			<Content parts={parts} />
			<Total total={parts.reduce((tot, elem) => (tot += elem.exercises), 0)} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
