import { useState, useEffect } from "react";
import { getCurrentUser, getUserRole } from "../../services/auth";
import {
  getProjectTasks,
  updateProjectTask,
  getUsers,
  createProjectTask,
} from "../../services/tasks";
import { useNavigate } from "react-router-dom";
import "../../styles/index.css";

import "../../styles/Tasks.css";
export default function ProjectTasks() {
  const nav = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        let us = await getCurrentUser();
        console.log("Current user in ProjectTasks:", us);
        const role = us.accountType; // Assume this function fetches the user's role
        if (mounted) setUserRole(role);

        const userTasks = await getProjectTasks(); // Fetch project tasks
        if (mounted) setTasks(userTasks);

        // Fetch users for assignment dropdown (only for managers/admins)
        if (role === "manager" || role === "admin") {
          const allUsers = await getUsers();
          if (mounted) setUsers(allUsers);
        }
      } catch (err) {
        if (err?.message === "401") {
          nav("/login");
          return;
        }
        if (mounted) setError(err?.message || String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  // For Managers: show all tasks they've created
  // For users: show tasks assigned to them

  const handleAssignedToChange = async (taskId, newUserId) => {
    try {
      const userIdValue = parseInt(newUserId);
      if (isNaN(userIdValue)) {
        setError("Please select a valid user");
        return;
      }
      await updateProjectTask(taskId, { UserID: userIdValue });
      // Update local state to reflect the change
      setTasks(
        tasks.map((task) =>
          task.TaskID === taskId ? { ...task, UserID: userIdValue } : task
        )
      );
    } catch (err) {
      console.error("Failed to update task assignment:", err);
      setError("Failed to update task assignment");
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateProjectTask(taskId, { Status: newStatus });
      // Update local state to reflect the change
      setTasks(
        tasks.map((task) =>
          task.TaskID === taskId ? { ...task, Status: newStatus } : task
        )
      );
    } catch (err) {
      console.error("Failed to update task status:", err);
      setError("Failed to update task status");
    }
  };

  const handleTimeSpentChange = async (taskId, timeSpent) => {
    try {
      const timeValue = parseFloat(timeSpent);
      if (isNaN(timeValue) || timeValue < 0) {
        setError("Please enter a valid time value");
        return;
      }
      await updateProjectTask(taskId, { TimeSpent: timeValue });
      // Update local state to reflect the change
      setTasks(
        tasks.map((task) =>
          task.TaskID === taskId ? { ...task, TimeSpent: timeValue } : task
        )
      );
    } catch (err) {
      console.error("Failed to update time spent:", err);
      setError("Failed to update time spent");
    }
  };

  const handleCreateTask = async () => {
    try {
      const title = document.querySelector("#new-task-title").value;
      const description = document.querySelector("#new-task-description").value;
      const assignedTo = document.querySelector("#new-task-assigned").value;
      const priority = document.querySelector("#new-task-priority").value;
      const dueDate = document.querySelector("#new-task-due").value;

      if (!title || !assignedTo || !dueDate) {
        setError("Please fill in all required fields");
        return;
      }

      const userIdValue = parseInt(assignedTo);
      if (isNaN(userIdValue)) {
        setError("Please select a valid user");
        return;
      }

      const newTask = await createProjectTask({
        UserID: userIdValue,
        Title: title,
        Description: description,
        Priority: priority || "medium",
        DueDate: dueDate,
        Status: "pending",
      });

      // Refresh tasks after creation
      const userTasks = await getProjectTasks();
      setTasks(userTasks);

      // Clear form fields
      document.querySelector("#new-task-title").value = "";
      document.querySelector("#new-task-description").value = "";
      document.querySelector("#new-task-assigned").value = "";
      document.querySelector("#new-task-priority").value = "medium";
      document.querySelector("#new-task-due").value = "";

      setError(null);
    } catch (err) {
      console.error("Failed to create task:", err);
      setError("Failed to create task");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
      <div className={"tasks-page"}>
        {userRole === "manager" || userRole === "admin" ? (
            // Use a Fragment instead of an extra <div>
            <>
              <h2>All Tasks</h2>
              <div className="tasks-container">
                {tasks.map((task) => (
                    <div key={task.TaskID} className="task-card">
                      <h3>{task.Title}</h3>
                      <p>{task.Description}</p>
                      <p>Priority: {task.Priority}</p>
                      <div>
                        <label htmlFor={`assigned-${task.TaskID}`}>
                          Assigned To:{" "}
                        </label>
                        <select
                            id={`assigned-${task.TaskID}`}
                            value={task.UserID}
                            onChange={(e) =>
                                handleAssignedToChange(task.TaskID, e.target.value)
                            }
                        >
                          {users.map((user) => (
                              <option key={user.UserID} value={user.UserID}>
                                {user.Email} ({user.Role})
                              </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor={`status-${task.TaskID}`}>Status: </label>
                        <select
                            id={`status-${task.TaskID}`}
                            value={task.Status}
                            onChange={(e) =>
                                handleStatusChange(task.TaskID, e.target.value)
                            }
                        >
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor={`time-${task.TaskID}`}>
                          Time Spent (hours):{" "}
                        </label>
                        <input
                            type="number"
                            id={`time-${task.TaskID}`}
                            min="0"
                            step="0.5"
                            value={task.TimeSpent || 0}
                            onChange={(e) =>
                                handleTimeSpentChange(task.TaskID, e.target.value)
                            }
                            placeholder="0"
                        />
                      </div>
                      <p>Due: {new Date(task.DueDate).toLocaleDateString()}</p>
                    </div>
                ))}
              </div>

              <div id={"create-task-card"} className={"task-card"}>
                <h3>Create New Task</h3>
                <div>
                  {/*<label htmlFor="new-task-title">Title: *</label>*/}
                  <input
                      type="text"
                      id="new-task-title"
                      placeholder="Task title"
                      required
                  />
                </div>
                <div>
                  {/*<label htmlFor="new-task-description">Description:</label>*/}
                  <textarea
                      id="new-task-description"
                      placeholder="Task description"
                      rows="3"
                  />
                </div>
                <div>
                  {/*<label htmlFor="new-task-assigned">Assigned To: *</label>*/}
                  <select id="new-task-assigned" required>
                    <option value="">Select a user</option>
                    {users.map((user) => (
                        <option key={user.UserID} value={user.UserID}>
                          {user.Email} ({user.Role})
                        </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="new-task-priority">Priority:</label>
                  <select id="new-task-priority" defaultValue="medium">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="new-task-due">Due Date: *</label>
                  <input type="date" id="new-task-due" required />
                </div>
                <button onClick={handleCreateTask}>Create Task</button>
              </div>
            </>
        ) : userRole === "technical_specialist" ? (
            // Also use a Fragment here for consistency
            <>
              <h2>Assigned Tasks </h2>
              <button onClick={() => nav(-1)}>Go Back</button>

              <div className="tasks-container">
                {tasks.map((task) => (
                    <div key={task.TaskID} className="task-card">
                      <h3>{task.Title}</h3>
                      <p>{task.Description}</p>
                      <p>Priority: {task.Priority}</p>
                      <div>
                        <label htmlFor={`status-${task.TaskID}`}>Status: </label>
                        <select
                            id={`status-${task.TaskID}`}
                            value={task.Status}
                            onChange={(e) =>
                                handleStatusChange(task.TaskID, e.target.value)
                            }
                        >
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor={`time-${task.TaskID}`}>
                          Time Spent (hours):{" "}
                        </label>
                        <input
                            type="number"
                            id={`time-${task.TaskID}`}
                            min="0"
                            step="0.5"
                            value={task.TimeSpent || 0}
                            onChange={(e) =>
                                handleTimeSpentChange(task.TaskID, e.target.value)
                            }
                            placeholder="0"
                        />
                      </div>
                      <p>Due: {new Date(task.DueDate).toLocaleDateString()}</p>
                    </div>
                ))}
              </div>
            </>
        ) : (
            <p>You do not have access to view tasks.</p>
        )}
      </div>
  );
}
