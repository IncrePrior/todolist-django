import React, { useState, useEffect } from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'


const TasksListPage = () => {

  let [tasks, setTasks] = useState([])

  useEffect(() => {
    getTasks()
  }, [])


  let getTasks = async () => {

    let response = await fetch('/api/tasks/')
    let data = await response.json()
    setTasks(data)
  }

  return (
    <div className="tasks">
      <div className="tasks-header">
        <h2 className="tasks-title">&#8982; Tasks</h2>
        <p className="tasks-count">{tasks.length}</p>
      </div>

      <div className="tasks-list">
        {tasks.map((task, index) => (
          <ListItem key={index} task={task} />
        ))}
      </div>
      <AddButton />
    </div>
  )
}

export default TasksListPage

