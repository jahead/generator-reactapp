import React from 'react';
import { List } from 'immutable';

export default class Tasks extends React.PureComponent {
  static propTypes = {
    tasks: React.PropTypes.instanceOf(List).isRequired,
    onToggle: React.PropTypes.func,
  }
  render() {
    const { tasks, onToggle } = this.props;
    return (
      <ul>
        {tasks.map(task => (
          <li key={task.id} >
            <input
              onChange={() => onToggle(task)}
              type="checkbox" checked={task.isDone}
              />
            <span>{task.content}</span>
          </li>
        ))}
      </ul>
    );
  }
}
