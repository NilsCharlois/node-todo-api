require('./config/config.js')

const _ = require('lodash');
const express = require('express')
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo')
var {User} = require('./models/user')

// create server
var app = express();

// to get the port created by Heroku
const port = process.env.PORT || 3000;

// add middleware to parse body to json object
app.use(bodyParser.json());

// POST /todos
app
.post('/todos', (req, res)=>{
  var todo = new Todo({text:req.body.text});
  try {
    let doc = await todo.save();
    res.send(doc);
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET /todos
app
.get('/todos', (req,res)=>{
  try {
    const todos = await Todo.find();
    res.send({todos});
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET /todos/:id
app
.get('/todos/:id', (req,res)=> {
  var id = req.params.id;
  if(!ObjectID.isValid(id))
  {
    return res.status(404).send({});
  }
  else {
    try {
      const todo = await Todo.findById(id);
      if(!todo) {
        return res.status(404).send({})
      }
      res.status(200).send({todo})
    } catch (e) {
      res.status(400).send({})
    }
  }
});

// DELETE /todos/:id
app
.delete('/todos/:id', (req,res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id))
  {
    return res.status(404).send();
  }
  else {
    Todo
    .findByIdAndRemove(id)
    .then((todo)=>{
      if(!todo) // if no item was deleted, need to check not null
      {
        return
        res
        .status(404)
        .send({})
      }
      res
      .status(200)
      .send({todo})
    })
    .catch((e)=>res.status(400).send({}))
  }
});

// PATCH /todos/:id
app.patch('/todos/:id', (req,res)=>{
  var id = req.params.id;
  var body = _.pick(req.body, ['text','completed']); // filters to only retrieve them 2 fields

  if(!ObjectID.isValid(id))
  {
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo
  .findByIdAndUpdate(id, {$set: body}, {new: true})
  .then((todo)=>{
    if(!todo) {
      return res.status(404).send();
    }
    res.send({todo})
  })
  .catch((e)=>{
    res.status(400).send()
  });

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

// 'heroku create' to create a heroku project
// h'eroku addons:create mongolab:sandbox' to add the addon with sandbox plan

// start server
app.listen(port, ()=>{
  console.log(`Started on port ${port}`);
})

module.exports = {app};
