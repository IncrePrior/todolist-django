import React, { useState, useEffect } from 'react';
import ListItem from '../components/ListItem';
import AddButton from '../components/AddButton';
import axios from 'axios';

const TasksListPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const response = await axios.get('/api/tasks/');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <div className="tasks">
      <div className="tasks-header">
        <h2 className="tasks-title">&#8982; Tasks</h2>
        <p className="tasks-count">{tasks.length}</p>
      </div>
      <div className="tasks-list">
        {tasks.map((task) => (
          <ListItem key={task.id} task={task} />
        ))}
      </div>
      <AddButton />
    </div>
  );
};

export default TasksListPage;
