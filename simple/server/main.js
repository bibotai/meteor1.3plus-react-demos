import { Meteor } from 'meteor/meteor';
import Counts from '../api/collections.js';

//发布数据
Meteor.publish('counts.public',function(){
  return Counts.find();
})

//定义 method
Meteor.methods({
  saveCount(count){
    console.log('Received count:',count);
    Counts.update({
      fieldName:"countTest"
    },{
      fieldName:"countTest",
      count:count
    });
  }
})

Meteor.startup(() => {
  // code to run on server at startup
  console.log('Meteor server has started.');

  //每次服务启动重置count为0
  Counts.upsert({
      fieldName: "countTest"
    },{
      fieldName: "countTest",
      count: 0
    });
});
