const {ObjectID} = require('mongodb');

const {mongoose} = require ('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// check if id is valid
// var todoId = '5c7580ea3dd0d07416256a82'
//
// if(!ObjectID.isValid(id))
// {
//   console.log('ID is not valid');
// }

// Todo
// .find({_id: id})
// .then((todos)=>{
//   console.log('Todos ', todos);
// })
//
// Todo
// .findOne({_id:id})
// .then((todo)=>{
//   console.log('Todo ', todo);
// })

// Todo
// .findById(id)
// .then((todo)=>{
//   if(!todo){
//     return console.log('Id not found');
//   }
//   console.log('Todo By Id ', todo);
// })
// .catch((e)=>console.log(e))

// create user based on model
// var user = new User({email:'nils.charlois@tst.com'})
//
// user.save().then((doc)=>{
//   console.log('Saved user ', user);
// },(e)=>console.log(e));

//
var userId = '5c75bc69b78b06571727d4b2';

User
.findById(userId)
.then((user)=>{
  if(!user){
    return console.log('Id not found');
  }
  console.log('User By Id ', user);
})
.catch((e)=>console.log(e))
