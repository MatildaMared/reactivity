import { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

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
				<ActivityDashboard activities={activities} />
			</Container>
		</>
	);
}

export default App;
