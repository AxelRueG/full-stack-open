const Contact = ({ person }) => {
	return (
		<p>
			{person.name} {person.number}
		</p>
	);
};

const Contacts = ({ persons, search }) => {
	return (
		<>
			<h2>Numbers</h2>
			{persons
				.filter((elem) =>
					elem.name.toLowerCase().includes(search.toLowerCase())
				)
				.map((elem) => (
					<Contact key={elem.name} person={elem} />
				))}
		</>
	);
};

export default Contacts;
