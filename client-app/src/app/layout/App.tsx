import { useState, useEffect } from "react";
import axios from "axios";
import { Header, List } from "semantic-ui-react";

function App() {
	const [activities, setActivities] = useState([]);

	async function getActivities() {
		const response = await axios.get("http://localhost:5000/api/activities");
		setActivities(response.data);
	}

	useEffect(() => {
		getActivities();
	}, []);

	return (
		<div>
			<Header as="h2" icon="users" content="Reactivities" />
			<List>
				{activities.map((activity: any) => (
					<List.Item key={activity.id}>{activity.title}</List.Item>
				))}
			</List>
		</div>
	);
}

export default App;
