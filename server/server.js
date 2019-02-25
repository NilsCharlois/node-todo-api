var express = require('express')
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo')
var {User} = require('./models/user')

// create server
var app = express();

// add middleware to parse body to json object
app.use(bodyParser.json());

// create handler for post request
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



// start server
app.listen(3000, ()=>{
  console.log('Started on port 3000');
})

module.exports = {app};
