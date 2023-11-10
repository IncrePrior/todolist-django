import React from 'react'
import { Link } from 'react-router-dom'

let getTime = (task) => {
    return new Date(task.updated).toLocaleDateString()
}

let getTitle = (task) => {

    let title = task.body.split('\n')[0]
    if (title.length > 45) {
        return title.slice(0, 45)
    }
    return title
}


let getContent = (task) => {
    let title = getTitle(task)
    let content = task.body.replaceAll('\n', ' ')
    content = content.replaceAll(title, '')

    if (content.length > 45) {
        return content.slice(0, 45) + '...'
    } else {
        return content
    }
}


const ListItem = ({ task }) => {
    return (
        <Link to={`/task/${task.id}`}>
            <div className="tasks-list-item" >
                <h3>{getTitle(task)}</h3>
                <p><span>{getTime(task)}</span>{getContent(task)}</p>
            </div>

        </Link>
    )
}

export default ListItem

