import React from "react";
import { Button, ButtonGroup, Card, Icon, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity;
  handleCancelSelectActivity: () => void;
}

function ActivityDetails({ activity, handleCancelSelectActivity }: Props) {
	return (
		<Card fluid>
			<Image src={`./assets/categoryImages/${activity.category}.jpg`} />
			<Card.Content>
				<Card.Header>{activity.title}</Card.Header>
				<Card.Meta>
					<span>{activity.date}</span>
				</Card.Meta>
				<Card.Description>{activity.description}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<ButtonGroup widths="2">
					<Button basic color="blue" content="Edit" />
					<Button basic color="grey" content="Cancel" onClick={handleCancelSelectActivity} />
				</ButtonGroup>
			</Card.Content>
		</Card>
	);
}

export default ActivityDetails;
