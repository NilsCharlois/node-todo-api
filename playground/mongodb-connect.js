const {MongoClient, ObjectID} = require('mongodb');

// destructuring : extract field from object
// var user = {name:'Nils', age: 31};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    return console.log('Unable to connect to MongoDB Server: ', err);
  }
  console.log('Connected to MongoDB server');


// add new document object to Todos collection
// db.collection('Todos').insertOne({
//   text:'Something to do',
//   completed: false
// }, (err, result)=>{
//   if(err) {
//     return console.log('Unable to insert todo: ', err);
//   }
//   console.log(JSON.stringify(result.ops, undefined, 2));
// });

// add new document object to Users collection 
// db.collection('Users').insertOne({
//   name:'Nils',
//   age: 31,
//   location:'Dublin'
// }, (err, result)=>{
//   if(err) {
//     return console.log('Unable to insert todo: ', err);
//   }
//   console.log(result.ops[0]._id.getTimestamp());
// });
//
  db.close();
});
