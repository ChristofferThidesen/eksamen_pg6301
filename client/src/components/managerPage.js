import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ManagerDashboard = () => {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({ name: "", department: "" });
  const [editActivity, setEditActivity] = useState({
    id: null,
    name: "",
    department: "",
  });

  useEffect(() => {
    // Fetch activities from backend
    axios
      .get("/api/activities")
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching activities:", error);
      });
  }, []);

  const handleAddActivity = () => {
    // Send POST request to add new activity
    axios
      .post("/api/activities", newActivity)
      .then((response) => {
        // Refresh activities list
        setActivities([...activities, response.data]);
        setNewActivity({ name: "", department: "" });
      })
      .catch((error) => {
        console.error("Error adding activity:", error);
      });
  };

  const handleEditButtonClick = (activity) => {
    setEditActivity({
      id: activity._id,
      name: activity.name,
      department: activity.department,
    });
  };

  const handleEditFieldChange = (field, value) => {
    setEditActivity((prevActivity) => ({
      ...prevActivity,
      [field]: value,
    }));
  };

  const handleSaveEdit = () => {
    // Send PUT request to update activity
    axios
      .put(`/api/activities/${editActivity.id}`, {
        name: editActivity.name,
        department: editActivity.department,
      })
      .then((response) => {
        const updatedActivities = activities.map((activity) =>
          activity._id === editActivity.id ? response.data : activity
        );
        setActivities(updatedActivities);
        setEditActivity({ id: null, name: "", department: "" });
      })
      .catch((error) => {
        console.error("Error editing activity:", error);
      });
  };

  const handleDeleteActivity = (activityId) => {
    // Send DELETE request to delete activity
    axios
      .delete(`/api/activities/${activityId}`)
      .then(() => {
        // Remove deleted activity from activities list
        const updatedActivities = activities.filter(
          (activity) => activity._id !== activityId
        );
        setActivities(updatedActivities);
      })
      .catch((error) => {
        console.error("Error deleting activity:", error);
      });
  };
  return (
    <div>
      <h2>Manager Dashboard</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity._id}>
            {editActivity.id === activity._id ? (
              <>
                <input
                  type="text"
                  value={editActivity.name}
                  onChange={(e) =>
                    handleEditFieldChange("name", e.target.value)
                  }
                />
                <input
                  type="text"
                  value={editActivity.department}
                  onChange={(e) =>
                    handleEditFieldChange("department", e.target.value)
                  }
                />
                <button onClick={handleSaveEdit}>Save</button>
              </>
            ) : (
              <>
                {activity.name} - {activity.department}
                <button onClick={() => handleEditButtonClick(activity)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteActivity(activity._id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newActivity.name}
          onChange={(e) =>
            setNewActivity({ ...newActivity, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Department"
          value={newActivity.department}
          onChange={(e) =>
            setNewActivity({ ...newActivity, department: e.target.value })
          }
        />
        <button onClick={handleAddActivity}>Add Activity</button>
      </div>
      <Link to="/managerLogin">
        <button>Back to manager Login</button>
      </Link>
    </div>
  );
};

export default ManagerDashboard;
