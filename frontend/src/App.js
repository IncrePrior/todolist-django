import {
  HashRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Header from "./components/Header";
import TasksListPage from "./pages/TasksListPage";
import TaskPage from "./pages/TaskPage";
import { Navigate } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <Router>
      <div className="container light">
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<TasksListPage />} />
            <Route path="/task/:id" element={<TaskPage />} />
            <Route path="/task/" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
