import React from 'react';
import { Link } from 'react-router-dom';

const getTime = (task) => new Date(task.updated).toLocaleDateString();

const getTitle = (task) => {
  let title = task.body.split('\n')[0];
  return title.length > 45 ? title.slice(0, 45) : title;
};

const getContent = (task) => {
  const title = getTitle(task);
  let content = task.body.replaceAll('\n', ' ');
  content = content.replaceAll(title, '');

  return content.length > 45 ? content.slice(0, 45) + '...' : content;
};

const ListItem = ({ task }) => {
  return (
    <Link to={`/task/${task.id}`}>
      <div className="tasks-list-item">
        <h3>{getTitle(task)}</h3>
        <p>
          <span>{getTime(task)}</span>
          {getContent(task)}
        </p>
      </div>
    </Link>
  );
};

export default ListItem;
