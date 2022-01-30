import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => <h2>{props.course}</h2>;

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
			<Total total={course.parts} />
		</div>
	);
};

const App = () => {
	const courses = [
		{
			name: 'Half Stack application development',
			id: 1,
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
				{
					name: 'Redux',
					exercises: 11,
					id: 4,
				},
			],
		},
		{
			name: 'Node.js',
			id: 2,
			parts: [
				{
					name: 'Routing',
					exercises: 3,
					id: 1,
				},
				{
					name: 'Middlewares',
					exercises: 7,
					id: 2,
				},
			],
		},
	];

	return (
		<div>
			<h1>Web development curriculum</h1>
			{courses.map((course) => (
				<Course course={course} key={course.id} />
			))}
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
