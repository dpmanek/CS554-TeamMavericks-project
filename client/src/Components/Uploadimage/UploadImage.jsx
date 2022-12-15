import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
	const [image, uploadImage] = useState('');

	const setImage = (event) => {
		const data = new FormData();
		data.append('file', event.target.files[0]);
		uploadImage(data);
	};

	const uploadHandle = (event) => {
		axios.post(' http://localhost:8000/data/upload', image).then((res) => {
			console.log('done');
		});
	};

	return (
		<>
			<h1>Upload file</h1>
			<form onSubmit={uploadHandle}>
				<input type="file" name="file" onChange={setImage} />
				<button type="submit">Submit</button>
			</form>
		</>
	);
};

export default App;