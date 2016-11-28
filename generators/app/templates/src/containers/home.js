import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { action } from '../actions';
import TASK from '../actions/task';
import selector from '../selectors/task';

import Hello from '../components/hello';
import Tasks from '../components/tasks';
import styles from './home.css';

@connect((state, props) => ({
  tasks: selector(state, props),
}))
export default class Home extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    tasks: PropTypes.instanceOf(List).isRequired,
  }
  componentWillMount() {
    this.props.dispatch(action(TASK.GET_LIST.REQUEST));
  }
  onToggle = (task) => {
    this.props.dispatch(action(TASK.UPDATE.REQUEST, task.set('isDone', !task.isDone)));
  }
  onAdd = () => {
    this.props.dispatch(action(TASK.ADD.REQUEST, { content: this.task.value }));
  }
  render() {
    return (
      <div>
        <Hello styles={styles}>
          reactapp
        </Hello>
        <input ref={(ref) => { this.task = ref; }} type="text" placeholder="Enter task" />
        <button onClick={this.onAdd}>Add</button>
        <Tasks tasks={this.props.tasks} onToggle={this.onToggle} />
      </div>
    );
  }
}