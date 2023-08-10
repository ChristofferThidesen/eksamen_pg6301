import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeePage = () => {
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [loggedHours, setLoggedHours] = useState(0);
  const [submittedActivities, setSubmittedActivities] = useState([]);
  const [submittedHours, setSubmittedHours] = useState([]);
  const [loggedHoursData, setLoggedHoursData] = useState([]);

  useEffect(() => {
    // Fetch user data
    axios
      .get("/api/auth/user")
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    // Fetch available activities
    axios
      .get("/api/activities")
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching activities:", error);
      });

    axios
      .get("/api/logged-hours")
      .then((response) => {
        setLoggedHoursData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching logged hours data:", error);
      });
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  const handleActivityChange = (event) => {
    setSelectedActivity(event.target.value);
  };

  const handleLoggedHoursChange = (event) => {
    setLoggedHours(event.target.value);
  };

  const handleLogHoursSubmit = (event) => {
    event.preventDefault();

    const selectedActivityObj = activities.find(
      (activity) => activity._id === selectedActivity
    );

    if (!selectedActivityObj) {
      console.error("Selected activity not found");
      return;
    }

    const data = {
      activityId: selectedActivity,
      loggedHours: loggedHours,
    };

    axios
      .post("/api/log-hours", data)
      .then((response) => {
        console.log(response.data);

        // Update the submitted activities and hours arrays
        setSubmittedActivities((prevActivities) => [
          ...prevActivities,
          selectedActivityObj.name,
        ]);
        setSubmittedHours((prevHours) => [...prevHours, loggedHours]);

        setSelectedActivity(""); // Clear selected activity
        setLoggedHours(0); // Clear logged hours

        // Refresh activities list after successful log
        axios
          .get("/api/activities")
          .then((response) => {
            setActivities(response.data);
          })
          .catch((error) => {
            console.error("Error fetching activities:", error);
          });
      })
      .catch((error) => {
        console.error("Error logging hours:", error);
      });
  };

  return (
    <div>
      <h1>Welcome, {user && user.username}!</h1>
      <h2>Available Activities:</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity._id}>
            {activity.name} - {activity.department}
          </li>
        ))}
      </ul>
      <h2>Log Hours:</h2>
      <form onSubmit={handleLogHoursSubmit}>
        <label>
          Select Activity:
          <select value={selectedActivity} onChange={handleActivityChange}>
            <option value="">Select an activity</option>
            {activities.map((activity) => (
              <option key={activity._id} value={activity._id}>
                {activity.name} - {activity.department}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          <input
            type="number"
            value={loggedHours}
            onChange={handleLoggedHoursChange}
          />
        </label>
        <br />
        <button type="submit">Log Hours</button>
      </form>
      <h2>Logged Hours:</h2>
      {submittedActivities.map((activity, index) => (
        <div
          key={index}
          style={{
            width: "80%",
            border: "2px solid #000",
            margin: "10px",
            marginLeft: "25px",
          }}
        >
          <p>
            {activity} - Dep:{" "}
            {
              activities.find((activityData) => activityData.name === activity)
                ?.department
            }
          </p>
          <p>Hours Logged: {submittedHours[index]}</p>
        </div>
      ))}
    </div>
  );
};

export default EmployeePage;
