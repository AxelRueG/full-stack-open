import { useEffect } from 'react';

const messageStyle = {
	border: '2px solid red',
	color: 'red',
	borderRadius: '10px',
	marginTop: '10px',
	padding: '5px',
	backgroundColor: '#aaa',
};

const MessageError = ({ message, handleError }) => {
	useEffect(() => {
		const showTime = setTimeout(() => handleError(), 5000);
		return () => clearTimeout(showTime);
	}, [handleError]);

	return (
		<div style={messageStyle}>
			<h3 style={{ padding: 0, margin: 0 }}>{message}</h3>
		</div>
	);
};

export default MessageError;
