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
				<Part key={elem.id} part={elem.name} exercises={elem.exercises} />
			))}
		</>
	);
};
const Total = (props) => (
	<p>
		<strong>
			Number of exercises{' '}
			{props.total.reduce((tot, elem) => (tot += elem.exercises), 0)}
		</strong>
	</p>
);

const Course = ({ course }) => {
	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
		</div>
	);
};

const App = () => {
	const course = {
		id: 1,
		name: 'Half Stack application development',
		parts: [
			{
				name: 'Fundamentals of React',
				exercises: 10,
				id: 1,
			},
			{
				name: 'Using props to pass data',
				exercises: 7,
				id: 2,
			},
			{
				name: 'State of a component',
				exercises: 14,
				id: 3,
			},
		],
	};

	return <Course course={course} />;
};

ReactDOM.render(<App />, document.getElementById('root'));
