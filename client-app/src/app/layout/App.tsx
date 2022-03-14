import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Header, List } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";

function App() {
	const [activities, setActivities] = useState<Activity[]>([]);

	async function getActivities() {
		const response = await axios.get<Activity[]>(
			"http://localhost:5000/api/activities"
		);
		setActivities(response.data);
	}

	useEffect(() => {
		getActivities();
	}, []);

	return (
		<>
			<NavBar />
			<Container style={{ marginTop: "7em" }}>
				<List>
					{activities.map((activity) => (
						<List.Item key={activity.id}>{activity.title}</List.Item>
					))}
				</List>
			</Container>
		</>
	);
}

export default App;
