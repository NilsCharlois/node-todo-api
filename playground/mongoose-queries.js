const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')

var id = '5c75604b5c825ac008670bd0';

if (!ObjectID.isValid(id)) {
  console.log('Id not valid');
}

Todo.findById(id)
.then((todo)=>{
  if(!todo) {
    return console.log('Id not found');
  }
  console.log('Todo By Id', todo);
})
.catch((e)=>console.log(e));
