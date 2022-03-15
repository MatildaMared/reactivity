import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";

interface Props {
	editMode: boolean;
	handleFormClose: () => void;
}

function ActivityForm({ editMode, handleFormClose }: Props) {
	return (
		<>
			{editMode && (
				<Segment clearing>
					<Form>
						<Form.Input placeholder="Title" />
						<Form.TextArea placeholder="Description" />
						<Form.Input placeholder="Category" />
						<Form.Input placeholder="Date" />
						<Form.Input placeholder="City" />
						<Form.Input placeholder="Venue" />
						<Button floated="right" positive type="submit" content="Submit" />
						<Button
							floated="right"
							type="button"
							content="Cancel"
							onClick={handleFormClose}
						/>
					</Form>
				</Segment>
			)}
		</>
	);
}

export default ActivityForm;
