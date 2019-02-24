const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
  if(err){
    return console.log('Unable to connect to MongoDB Server: ', err);
  }
  console.log('Connected to MongoDB server');

  // db
  // .collection('Todos')
  // .find({_id: new ObjectID('5c72ba1d13c0151c87acc5f8')})
  // //5c72ba1d13c0151c87acc5f8
  // .toArray()
  // .then((docs)=>{
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err)=>{
  //   console.log('Unable to fetch todos: ', err);
  // });

  db
  .collection('Todos')
  .find()
  //5c72ba1d13c0151c87acc5f8
  .count()
  .then((count)=>{
    console.log(`Todos count: ${count}`);
  }, (err)=>{
    console.log('Unable to fetch todos: ', err);
  });

  db
  .collection('Users')
  .find({name:'Nils'})
  //5c72ba1d13c0151c87acc5f8
  .count()
  .then((count)=>{
    console.log(`Users count: ${count}`);
  }, (err)=>{
    console.log('Unable to fetch users: ', err);
  });

  //db.close();
});