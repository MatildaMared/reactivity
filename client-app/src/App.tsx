import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
	const [activities, setActivities] = useState([]);

	async function getActivities() {
		const response = await axios.get("http://localhost:5000/api/activities");
		console.log(response);
		setActivities(response.data);
	}

	useEffect(() => {
		getActivities();
		console.log(activities);
	}, []);

	return (
		<div className="App">
			<ul>
				{activities.map((activity: any) => (
          <div key={activity.id}>
            <h1>{activity.title}</h1>
          </div>
				))}
			</ul>
		</div>
	);
}

export default App;
