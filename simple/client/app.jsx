import React,{Component} from 'react';
import CountContainer from './count.jsx';

//App组件 代表整个页面
export default class App extends Component{
  //构造函数，被import时自动执行
constructor(props){
  super(props)//继承父组件的属性
  this.state={//初始化状态
    count:0
  }
}
btnClicked(){
  console.log('The button was clicked,the previous count is:',this.state.count);
  this.setState({//设置新状态
    count:++this.state.count
  })
  Meteor.call('saveCount',this.state.count);
}
render(){
  return(
    <div>
    <header>
      <h1>Click below button to try reactive programming 反应式编程</h1>
    </header>

    <button onClick={this.btnClicked.bind(this)}>Click</button>
    <CountContainer/>
    </div>
  );
}
}
