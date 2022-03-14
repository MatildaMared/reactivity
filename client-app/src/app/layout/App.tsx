import { useState, useEffect } from "react";
import axios from "axios";
import { Header, List } from "semantic-ui-react";
import { Activity } from "../models/activity";

function App() {
	const [activities, setActivities] = useState<Activity[]>([]);

	async function getActivities() {
		const response = await axios.get<Activity[]>("http://localhost:5000/api/activities");
		setActivities(response.data);
	}

	useEffect(() => {
		getActivities();
	}, []);

	return (
		<div>
			<Header as="h2" icon="users" content="Reactivities" />
			<List>
				{activities.map((activity) => (
					<List.Item key={activity.id}>{activity.title}</List.Item>
				))}
			</List>
		</div>
	);
}

export default App;
