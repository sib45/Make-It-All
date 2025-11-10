import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Dashboard component
// Role-based dashboard for managers and technical specialists
// Shows task allocation, project progress, and resource management
export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <p>TODO: Task allocation and project progress overview</p>

              <Link to="/forum">Go to forum</Link> |{" "}
    </div>
  )
}
