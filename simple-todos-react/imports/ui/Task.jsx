import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import classnames from 'classnames';

// Task component - 每条 task
//用到的props：
//task
//showPrivateButton
//itemClicked
export default class Task extends Component {
    toggleChecked() {
        //调用后端methods，设置选中
        Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
    }

    deleteThisTask() {
        Meteor.call('tasks.remove', this.props.task._id);
    }

    togglePrivate() {
        Meteor.call('tasks.setPrivate', this.props.task._id, !this.props.task.checked)
    }

    render() {
        // Give tasks a different className when they are checked off,
        // so that we can style them nicely in CSS
        const taskClassName = classnames({checked: this.props.task.checked, private: this.props.task.private});
        /*?*/
        return (
          // 子组件向父组件传递
            <li className={taskClassName}
                onClick={this.props.itemClicked.bind(this, this.props.task.text)}>
                <button className="delete" onClick={this.deleteThisTask.bind(this)}>
                    &times;
                </button>

                <input type="checkbox" readOnly checked={this.props.task.checked} onClick={this.toggleChecked.bind(this)}/> {this.props.showPrivateButton
                    ? (
                        <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
                            {this.props.task.private
                                ? 'Private'
                                : 'Public'}
                        </button>
                    )
                    : ''}
                <span className="text">
                    <strong>{this.props.task.username}</strong>:{this.props.task.text}
                    <span style={{color:'red'}}>{this.props.task._id.valueOf()}</span>
                    {/* <span style={{color:'blue'}}>{timestamp}</span> */}
                </span>
            </li>
        );
    }
}
/*?*/
Task.propTypes = {
    //验证组件属性是否合格
    task: PropTypes.object.isRequired,
    showPrivateButton: React.PropTypes.bool.isRequired
}
