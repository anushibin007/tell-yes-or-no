import React, { useEffect, useState } from "react";
import axios from "axios";
import { loadProgressBar } from "axios-progress-bar";
import { Container, Row } from "react-bootstrap";
import "axios-progress-bar/dist/nprogress.css";

function App() {
	const API_URI = "https://yesno.wtf/api";

	const [data, setData] = useState({});

	useEffect(() => {
		fetchData();
		loadProgressBar();
	}, []);

	const fetchData = () => {
		axios.get(API_URI).then((response) => {
			setData(response.data);
		});
	};

	return (
		<Container fluid onClick={fetchData}>
			<Row className="justify-content-center">
				<h1>{data.answer && data.answer.toUpperCase()}</h1>
			</Row>
			<Row className="justify-content-center align-items-stretch">{data.image && <img id="yes-no-image" alt={`${data.answer}-image`} src={data.image} />}</Row>
		</Container>
	);
}

export default App;
