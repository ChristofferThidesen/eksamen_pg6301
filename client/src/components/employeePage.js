import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeePage = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [hours, setHours] = useState("");
  const [message, setMessage] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(""); // State to store selected department

  useEffect(() => {
    // Fetch activities for the employee's username

    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get("/api/activities", {
        params: {
          department: selectedDepartment, // Pass the selected department as a query parameter
        },
      });
      console.log("Fetched activities:", response.data);
      setActivities(response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };
  const handleLogHours = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/log-hours", {
        activityId: selectedActivity,
        hours,
      });

      setMessage(response.data.message);
      setHours("");
      setSelectedActivity("");
      fetchActivities(); // Fetch activities again to update the logged hours
    } catch (error) {
      setMessage("Error logging hours");
    }
  };

  return (
    <div>
      <h2>Welcome to the Employee Page</h2>
      <div>
        <h3>Available Activities</h3>
        {activities.length === 0 ? (
          <p>No activities available</p>
        ) : (
          <ul>
            {activities.map((activity) => (
              <li key={activity._id}>
                {activity.activity} - Department: {activity.department}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h3>Log Hours</h3>
        <form onSubmit={handleLogHours}>
          <select
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
          >
            <option value="">Select an activity</option>
            {activities.map((activity) => (
              <option key={activity._id} value={activity._id}>
                {activity.activity}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="Logged hours"
          />
          <button type="submit">Log Hours</button>
        </form>
        <p>{message}</p>
      </div>
      <div>
        <h3>Logged Hours</h3>
        <ul>
          {activities.map((activity) => (
            <li key={activity._id}>
              {activity.activity} - Logged Hours: {activity.loggedHours || 0}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmployeePage;
