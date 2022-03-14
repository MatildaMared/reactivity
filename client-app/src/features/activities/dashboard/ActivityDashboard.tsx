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
}

function ActivityDashboard({
	activities,
	selectedActivity,
	handleSelectActivity,
	handleCancelSelectActivity,
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
				{selectedActivity && (
					<ActivityDetails
						handleCancelSelectActivity={handleCancelSelectActivity}
						activity={selectedActivity}
					/>
				)}
				<ActivityForm />
			</Grid.Column>
		</Grid>
	);
}

export default ActivityDashboard;
