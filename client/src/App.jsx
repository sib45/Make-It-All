import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Dash from "./features/dashboard/Dashboard";
import Topics from "./features/forum/Topics.jsx";
import Posts from "./features/forum/Posts.jsx";
import RegisterPage from "./features/auth/Register.jsx";
import LoginPage from "./features/auth/Login.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        {/*<header >*/}
        {/*  <h1>Make-It-All</h1>*/}
        {/*  <p>The best forum/to-do list thing ever!</p>*/}
        {/*</header>*/}
        <main>
          <Routes>
            {/* default to dashboard */}
            <Route path="/" element={<Dash />} />
            <Route path="/forum" element={<Topics />} />
            <Route path="/forum/:id" element={<Posts />} />
            {/* Add more routes here */}
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/register"} element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
