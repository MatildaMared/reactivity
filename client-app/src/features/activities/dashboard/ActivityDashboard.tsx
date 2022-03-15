import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
	activities: Activity[];
	selectedActivity: Activity | undefined;
	handleSelectActivity: (id: string) => void;
	handleCancelSelectActivity: () => void;
	editMode: boolean;
	handleFormOpen: (id?: string) => void;
	handleFormClose: () => void;
	createOrEdit: (activity: Activity) => void;
	deleteActivity: (id: string) => void;
	submitting: boolean;
}

function ActivityDashboard({
	activities,
	selectedActivity,
	handleSelectActivity,
	handleCancelSelectActivity,
	editMode,
	handleFormOpen,
	handleFormClose,
	createOrEdit,
	deleteActivity,
	submitting,
}: Props) {
	return (
		<Grid>
			<Grid.Column width="10">
				<ActivityList
					activities={activities}
					handleSelectActivity={handleSelectActivity}
					deleteActivity={deleteActivity}
					submitting={submitting}
				/>
			</Grid.Column>
			<Grid.Column width="6">
				{selectedActivity && !editMode && (
					<ActivityDetails
						handleCancelSelectActivity={handleCancelSelectActivity}
						activity={selectedActivity}
						handleFormOpen={handleFormOpen}
					/>
				)}
				{editMode && (
					<ActivityForm
						submitting={submitting}
						activity={selectedActivity}
						handleFormClose={handleFormClose}
						createOrEdit={createOrEdit}
					/>
				)}
			</Grid.Column>
		</Grid>
	);
}

export default ActivityDashboard;
