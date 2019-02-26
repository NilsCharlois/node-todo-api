const {ObjectID} = require('mongodb');

const {mongoose} = require ('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// delete all the todos
// Todo.remove({}).then((result)=>{
//   console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove


Todo.findByIdAndRemove('5c75c753a339921c902411e2').then((result)=>{
  console.log(result);
});
