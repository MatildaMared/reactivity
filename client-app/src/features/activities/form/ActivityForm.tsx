import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, FormField, Label, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function ActivityForm() {
	const history = useHistory();
	const { activityStore } = useStore();
	const {
		loadActivity,
		createActivity,
		updateActivity,
		loading,
		loadingInitial,
	} = activityStore;
	const { id } = useParams<{ id: string }>();
	const [activity, setActivity] = useState<Activity>({
		id: "",
		title: "",
		category: "",
		description: "",
		date: "",
		city: "",
		venue: "",
	});

	const validationSchema = Yup.object({
		title: Yup.string().required("The activity title is required"),
	});

	useEffect(() => {
		if (id) {
			loadActivity(id).then((activity) => {
				setActivity(activity!);
			});
		}
	}, [id, loadActivity]);

	// async function handleSubmit() {
	// 	try {
	// 		if (activity.id.length === 0) {
	// 			let newActivity = {
	// 				...activity,
	// 				id: uuid(),
	// 			};
	// 			await createActivity(newActivity);
	// 			history.push(`/activities/${newActivity.id}`);
	// 		} else {
	// 			await updateActivity(activity);
	// 			history.push(`/activities/${activity.id}`);
	// 		}
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }

	// function handleChange(
	// 	e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	// ) {
	// 	const { name, value } = e.target;
	// 	setActivity({ ...activity, [name]: value });
	// }

	if (loadingInitial) return <LoadingComponent content="Loading activity..." />;

	return (
		<Segment clearing>
			<Formik
				validationSchema={validationSchema}
				enableReinitialize={true}
				initialValues={activity}
				onSubmit={(values) => console.log(values)}
			>
				{({ handleSubmit }) => (
					<Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
						<FormField>
							<Field placeholder="Title" name="title" />
							<ErrorMessage
								name="title"
								render={(error) => <Label color="red" content={error} />}
							/>
						</FormField>
						<Field placeholder="Description" name="description" />
						<Field placeholder="Category" name="category" />
						<Field type="date" placeholder="Date" name="date" />
						<Field placeholder="City" name="city" />
						<Field placeholder="Venue" name="venue" />
						<Button
							floated="right"
							positive
							type="submit"
							content="Submit"
							loading={loading}
						/>
						<Button
							floated="right"
							type="button"
							content="Cancel"
							as={Link}
							to="/activities"
						/>
					</Form>
				)}
			</Formik>
		</Segment>
	);
}

export default observer(ActivityForm);
