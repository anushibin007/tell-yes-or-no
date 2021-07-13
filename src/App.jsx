import React, { useEffect, useState } from "react";
import axios from "axios";
import { loadProgressBar } from "axios-progress-bar";
import { Container, Spinner, Row } from "react-bootstrap";
import "axios-progress-bar/dist/nprogress.css";

function App() {
	const API_URI = "https://yesno.wtf/api";

	const [data, setData] = useState({});
	const [loader, setLoader] = useState(true);

	useEffect(() => {
		fetchData();
		loadProgressBar();
	}, []);

	const fetchData = () => {
		axios.get(API_URI).then((response) => {
			setLoader(true);
			setData({});
			setData(response.data);
		});
	};

	const imageLoaded = () => {
		setLoader(false);
		console.log("image loaded");
	};

	return (
		<Container fluid onClick={fetchData}>
			<Row className="justify-content-center">
				<h1>{data.answer && data.answer.toUpperCase()}</h1>
			</Row>
			{data.image && (
				<Row className="justify-content-center">
					<img onLoad={imageLoaded} id="yes-no-image" alt={`${data.answer}-image`} src={data.image} />
				</Row>
			)}
			{loader && (
				<Row className="justify-content-center">
					<Spinner animation="grow" variant="primary" />
				</Row>
			)}
		</Container>
	);
}

export default App;
