import React, { useEffect, useState } from "react";
import random from "random";
import { Container, Spinner, Row } from "react-bootstrap";
import "axios-progress-bar/dist/nprogress.css";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/performance";

function App() {
	const DOCUMENT_TITLE = "Yes or No 😕";

	const MAX_YES_IMG = 0;
	const MAX_NO_IMG = 1;

	const [data, setData] = useState({});

	/**
	 * Preload data
	 */
	useEffect(() => {
		fetchData();
		initializeFirebase();
	}, []);

	/**
	 * Update page title based on answer
	 */
	useEffect(() => {
		if (data.answer) {
			let emoji = "😕";
			if (data.answer === "yes") {
				emoji = "👍";
			} else if (data.answer === "no") {
				emoji = "👎";
			}
			document.title = emoji + " " + DOCUMENT_TITLE;
		}
	}, [data]);

	/**
	 * Inject data
	 */
	const fetchData = () => {
		const answer = getYesOrNo();
		setData({ answer, image: getImage(answer) });
	};

	/**
	 * Get a random yes or no
	 */
	const getYesOrNo = () => {
		if (random.boolean()) {
			return "yes";
		}
		return "no";
	};

	/**
	 * Get a random yes or no image
	 */
	const getImage = (yesOrNo) => {
		const imageRoot = "/img";
		if (yesOrNo === "yes") {
			return `${imageRoot}/yes/${random.int(1, MAX_YES_IMG)}.gif`;
		} else {
			return `${imageRoot}/no/${random.int(1, MAX_YES_IMG)}.gif`;
		}
	};

	const initializeFirebase = async () => {
		if (!firebase.apps.length) {
			firebase.initializeApp({
				apiKey: "AIzaSyAYcxvEr3ZzeLSqn4fEzQuGxmBtsw0CUQY",
				authDomain: "tell-yes-or-no.firebaseapp.com",
				projectId: "tell-yes-or-no",
				storageBucket: "tell-yes-or-no.appspot.com",
				messagingSenderId: "405724850213",
				appId: "1:405724850213:web:337c9bdb00b8e682aef7cc",
				measurementId: "G-6CLM27Z27F",
			});
			firebase.analytics();
			firebase.performance();
		} else {
			firebase.app();
		}
		return;
	};

	return (
		<Container fluid onClick={fetchData}>
			<Row className="justify-content-center">
				<h1>{data.answer && data.answer.toUpperCase()}</h1>
			</Row>
			{data.image && (
				<Row className="justify-content-center">
					<img id="yes-no-image" alt={`${data.answer}-image`} src={data.image} />
				</Row>
			)}
		</Container>
	);
}

export default App;
