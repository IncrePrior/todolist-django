import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaTrash  } from 'react-icons/fa';
import { GrHide } from "react-icons/gr";



const TaskPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  let [task, setTask] = useState(null)

  useEffect(() => {
    getTask()
  }, [id])


  let getTask = async () => {
    if (id === 'new') return
    let response = await fetch(`http://localhost:8000/api/tasks/${id}/`)
    let data = await response.json()
    setTask(data)
  }


  let createTask = async () => {
    fetch(`http://localhost:8000/api/tasks/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
  }


  let updateTask = async () => {
    fetch(`http://localhost:8000/api/tasks/${id}/`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
  }



  let deleteTask = async () => {
    fetch(`http://localhost:8000/api/tasks/${id}/`, {
      method: 'DELETE',
      'headers': {
        'Content-Type': 'application/json'
      }
    })
    navigate('/')
  }


  const markAsComplete = async () => {
    const response = await fetch(`http://localhost:8000/api/tasks/${id}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
    setTask({ ...task, completed: true });
  } 
  };


  let handleSubmit = () => {
    if (id !== 'new' && task.body == '') {
      deleteTask()
    } else if (id !== 'new') {
      updateTask()
    } else if (id === 'new' && task.body !== null) {
      createTask()
    }
    navigate('/')
  }


  let handleChange = (value) => {
    setTask(task => ({ ...task, 'body': value }))
  }


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
        {id !== 'new' ? (
          <div>
            <button onClick={markAsComplete}><GrHide /></button>
            <button onClick={deleteTask}><FaTrash /></button>
          </div>
        ) : null}
        
      </div>
      <textarea className={`task-text ${taskTextClass}`} onChange={(e) => { handleChange(e.target.value) }} value={task?.body}></textarea>
    </div>
  );
};

export default TaskPage;
