import { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
	const [activities, setActivities] = useState<Activity[]>([]);
	const [selectedActivity, setSelectedActivity] = useState<
		Activity | undefined
	>(undefined);
	const [editMode, setEditMode] = useState(false);

	function handleSelectActivity(id: string) {
		setSelectedActivity(activities.find((x) => x.id === id));
	}

	function handleCancelSelectActivity() {
		setSelectedActivity(undefined);
		setEditMode(false);
	}

	function handleFormOpen(id?: string) {
		id ? handleSelectActivity(id) : handleCancelSelectActivity();
		setEditMode(true);
	}

	function handleFormClose() {
		setEditMode(false);
	}

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
			<NavBar handleFormOpen={handleFormOpen} />
			<Container style={{ marginTop: "7em" }}>
				<ActivityDashboard
					activities={activities}
					selectedActivity={selectedActivity}
					handleSelectActivity={handleSelectActivity}
					handleCancelSelectActivity={handleCancelSelectActivity}
					editMode={editMode}
					handleFormOpen={handleFormOpen}
					handleFormClose={handleFormClose}
				/>
			</Container>
		</>
	);
}

export default App;
