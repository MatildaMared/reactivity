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
}

function ActivityDashboard({
	activities,
	selectedActivity,
	handleSelectActivity,
	handleCancelSelectActivity,
	editMode,
	handleFormOpen,
	handleFormClose,
}: Props) {
	return (
		<Grid>
			<Grid.Column width="10">
				<ActivityList
					activities={activities}
					handleSelectActivity={handleSelectActivity}
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
					<ActivityForm activity={selectedActivity} handleFormClose={handleFormClose} />
				)}
			</Grid.Column>
		</Grid>
	);
}

export default ActivityDashboard;
