import { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
	const { activityStore } = useStore();

	const [activities, setActivities] = useState<Activity[]>([]);
	const [selectedActivity, setSelectedActivity] = useState<
		Activity | undefined
	>(undefined);
	const [editMode, setEditMode] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	function handleCreateOrEditActivity(activity: Activity) {
		setIsSubmitting(true);

		if (activity.id) {
			agent.Activities.update(activity).then(() => {
				setSelectedActivity(activity);
				setEditMode(false);
				setIsSubmitting(false);
			});
		} else {
			activity.id = uuid();
			agent.Activities.create(activity).then(() => {
				setActivities([...activities, activity]);
				setSelectedActivity(activity);
				setEditMode(false);
				setIsSubmitting(false);
			});
		}
	}

	function handleDeleteActivity(id: string) {
		setIsSubmitting(true);
		agent.Activities.delete(id).then(() => {
			setActivities(activities.filter((x) => x.id !== id));
			setSelectedActivity(undefined);
			setIsSubmitting(false);
		});
	}

	useEffect(() => {
		activityStore.loadActivities();
	}, [activityStore]);

	if (activityStore.loadingInitial)
		return <LoadingComponent content="Loading app..." />;

	return (
		<>
			<NavBar />
			<Container style={{ marginTop: "7em" }}>
				<ActivityDashboard
					activities={activityStore.activities}
					createOrEdit={handleCreateOrEditActivity}
					deleteActivity={handleDeleteActivity}
					submitting={isSubmitting}
				/>
			</Container>
		</>
	);
}

export default observer(App);
