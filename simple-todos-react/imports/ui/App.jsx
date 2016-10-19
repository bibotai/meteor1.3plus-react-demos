import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import {Tasks} from '../api/tasks.js';

import Task from './Task.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

//App component - represents the whole app
class App extends Component {
    //构造函数
    constructor(props) {
        super(props);

        this.state = {
            hideCompleted: false,
            windowWidth: window.innerWidth,
            clickedTaskText: ''
        };
        this.clickedTitleCount = 0;
        console.log(this.clickedTitleCount);
        this.handleResize = this.handleResize.bind(this);
    }

    handleResize() {
        this.setState({windowWidth: window.innerWidth});
        //注意，下面的 this.state.windowWidth 不会保证输出的是更新过的值
        //因为 React 更多是 scheduling，为了性能原因，可能不是立即更新
        console.log(this.state.windowWidth);
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    shouldComponentUpdate() {
        return true
    }

    handleSubmit(event) {
        event.preventDefault(); //取消默认提交表格的动作，不然会自动刷新页面
        //通过 React ref获得输入文本
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        Meteor.call('tasks.insert', text);

        //清空表单
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    toggleHideCompleted() {
        this.setState({
            hideComplete: !this.state.hideComplete
        });
    }

    oneItemClicked(taskText) {
        console.log(taskText);
        this.setState({clickedTaskText: taskText});
    }
    renderTasks() {
        let filteredTasks = this.props.tasks;
        if (this.state.hideCompleted) {
            filteredTasks = filteredTasks.filter(task => !task.checked);
        }
        //遍历task
        return filteredTasks.map((task) => {
            const currentUserId = this.props.currentUser && this.props.currentUser._id;
            const showPrivateButton = task.owner === currentUserId;

            return (<Task key={task._id}
              task={task}
              showPrivateButton={showPrivateButton}
              itemClicked={this.oneItemClicked.bind(this)}/>);
        });
    }

    headerClicked() {
        alert(`你点击了标题 ${++ this.clickedTitleCount} 次`)
    }

    render() {
        const labelStyle = {
            color: 'magenta',
            fontSize: '2em'
        }
        return (
            <div className="container">
                <header>
                    <h1 style={{
                        color: 'green'
                    }} onClick={this.headerClicked.bind(this)}>
                        Todo 列表({this.props.incompleteCount})
                    </h1>
                    <label style={labelStyle} className="hide-completed">
                        <input type="checkbox" readOnly checked={this.state.hideCompleted} onClick={this.toggleHideCompleted.bind(this)}></input>
                        隐藏已完成的任务
                    </label>
                    <AccountsUIWrapper/> {/* 登录框 */}
                    {this.props.currentUser
                        ? <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
                                <input type="text" ref="textInput" placeholder="Type to add new tasks"></input>
                            </form>
                        : ''
}
                </header>
                <ul>
                    {this.renderTasks()}
                </ul>
                <div style={{
                    padding: 10
                }}>当前窗口宽度：{this.state.windowWidth}</div>
                <div style={{
                    padding: 10
                }}>被点击的任务：{this.state.clickedTaskText}</div>
            </div>
        );
    }
}

// container 容器
// Meteor 利用 pub、sub 机制完成了前端数据和后端数据库的自动同步
// React 配合 Meteor，利用 mixin 自动更新同步到的数据
export default createContainer(() => {
    Meteor.subscribe('tasks');

    return {
        tasks: Tasks.find({}, {
            sort: {
                createdAt: -1
            }
        }).fetch(),
        incompleteCount: Tasks.find({
            checked: {
                $ne: true
            }
        }).count(),
        currentUser: Meteor.user()
    }
}, App);
