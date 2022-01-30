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

export default Course;
