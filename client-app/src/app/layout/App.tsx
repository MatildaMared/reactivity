import { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";

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

	function handleCreateOrEditActivity(activity: Activity) {
		if (!activity.id) {
			activity.id = uuid();
		}
		// Edit activity if activity id exists, else add new activity
		activity.id
			? setActivities([
					...activities.filter((x) => x.id !== activity.id),
					activity,
			  ])
			: setActivities([...activities, activity]);
		setEditMode(false);
		setSelectedActivity(activity);
	}

	function handleDeleteActivity(id: string) {
		setActivities(activities.filter((x) => x.id !== id));
		setSelectedActivity(undefined);
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
					createOrEdit={handleCreateOrEditActivity}
					deleteActivity={handleDeleteActivity}
				/>
			</Container>
		</>
	);
}

export default App;
