import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaTrash } from 'react-icons/fa';
import { GrHide } from "react-icons/gr";
import axios from 'axios';

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
      const response = await axios.get(`/api/tasks/${id}/`);
      setTask(response.data);
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  const createOrUpdateTask = async () => {
    const url = id === 'new' ? '/api/tasks/' : `/api/tasks/${id}/`;

    try {
      const response = await axios({
        method: id === 'new' ? 'post' : 'put',
        url: url,
        headers: {
          'Content-Type': 'application/json',
        },
        data: task,
      });

      if (response.status === 200 || response.status === 201) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error creating/updating task:', error);
    }
  };

  const deleteTask = async () => {
    try {
      await axios.delete(`/api/tasks/${id}/`, {
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
      const response = await axios.post(`/api/tasks/${id}/`, null, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
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
