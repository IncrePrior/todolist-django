import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaTrash } from 'react-icons/fa';
import { GrHide } from "react-icons/gr";

const TaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (id !== 'new') {
      getTask();
    }
  }, [id]);

  const getTask = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${id}/`);
      const data = await response.json();
      setTask(data);
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  const createOrUpdateTask = async () => {
    const url = id === 'new' ? 'http://localhost:8000/api/tasks/' : `http://localhost:8000/api/tasks/${id}/`;
    const method = id === 'new' ? 'POST' : 'PUT';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error creating/updating task:', error);
    }
  };

  const deleteTask = async () => {
    try {
      await fetch(`http://localhost:8000/api/tasks/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      navigate('/');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const markAsComplete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setTask((prevTask) => ({ ...prevTask, completed: true }));
      }
    } catch (error) {
      console.error('Error marking task as complete:', error);
    }
  };

  const handleSubmit = () => {
    if (id !== 'new' && task.body === '') {
      deleteTask();
    } else {
      createOrUpdateTask();
    }
  };

  const handleChange = (value) => {
    setTask((prevTask) => ({ ...prevTask, body: value }));
  };

  const taskTextClass = task && task.completed ? 'completed-task' : '';

  return (
    <div className="task">
      <div className="task-header">
        <h3>
          {task && task.body !== '' ? (
            <FaChevronLeft onClick={handleSubmit} />
          ) : (
            <FaChevronLeft />
          )}
        </h3>
        {id !== 'new' && (
          <div>
            <button onClick={markAsComplete}><GrHide /></button>
            <button onClick={deleteTask}><FaTrash /></button>
          </div>
        )}
      </div>
      <textarea
        className={`task-text ${taskTextClass}`}
        onChange={(e) => handleChange(e.target.value)}
        value={task?.body}
      ></textarea>
    </div>
  );
};

export default TaskPage;
