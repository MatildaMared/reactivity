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
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";

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
		date: null,
		city: "",
		venue: "",
	});

	const validationSchema = Yup.object({
		title: Yup.string().required("The activity title is required"),
		description: Yup.string().required("The activity description is required"),
		category: Yup.string().required(),
		date: Yup.string().required(),
		venue: Yup.string().required(),
		city: Yup.string().required(),
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
						<MyTextInput name="title" placeholder="Title" label="Title" />
						<MyTextArea rows={3} placeholder="Description" name="description" />
						<MySelectInput
							options={categoryOptions}
							placeholder="Category"
							name="category"
						/>
						<MyDateInput dateFormat="MMMM, d, yyyy h:mm:aa" showTimeSelect timeCaption="time" placeholderText="Date" name="date" />
						<MyTextInput placeholder="City" name="city" />
						<MyTextInput placeholder="Venue" name="venue" />
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
