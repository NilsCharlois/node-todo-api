var express = require('express')
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo')
var {User} = require('./models/user')

// create server
var app = express();

// add middleware to parse body to json object
app.use(bodyParser.json());

// POST /todos
app.post('/todos', (req, res)=>{
  var todo = new Todo({
    text:req.body.text
  });
  todo.save().then((doc)=>{
    res.send(doc)
  }, (err)=>{
    res.status(400).send(err);
  });
});

// GET /todos
app.get('/todos', (req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  }, (e)=>{
    res.status(400).send(e)
  });
});

// GET /todos/:id
app
.get('/todos/:id', (req,res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id))
  {
    return res.status(404).send({});
  }
  else {
    Todo
    .findById(id)
    .then((todo)=>{
      if(!todo)
      {
        res
        .status(404)
        .send({})
      } else {
        res
        .status(200)
        .send({todo})
      }
    })
    .catch((e)=>res.status(400).send({}))
  }
});

// POST /users
app.post('/users', (req, res)=>{
  var user = new User({
    email:req.body.email
  });
  user.save().then((doc)=>{
    res.send(doc)
  }, (err)=>{
    res.status(400).send(err);
  });
});


// GET /users
app.get('/users', (req,res)=>{
  User.find().then((users)=>{
    res.send({users});
  }, (e)=>{
    res.status(400).send(e)
  });
});



// start server
app.listen(3000, ()=>{
  console.log('Started on port 3000');
})

module.exports = {app};
