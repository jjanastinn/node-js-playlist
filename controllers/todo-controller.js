const bodyParser = require('body-parser');
// const data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'clean house'}];
const urlencodedParser = bodyParser.urlencoded({extended: false});
const mongoose = require('mongoose');

mongoose.connect('...');

const todoSchema = new mongoose.Schema({
  item: String
});

const Todo = mongoose.model('Todo', todoSchema);
// const itemOne = Todo({item: 'buy flowers'}).save(function(err) {
//   if (err) throw err;
// });

module.exports = function(app) {

  app.get('/todo', function(req,res) {
    Todo.find({}, function(err, data){
      if (err) throw err;
      res.render('todo', {todos: data});
    })
  });

  app.post('/todo', urlencodedParser, function(req,res) {
    const newTodo = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    })
  });

  app.delete('/todo/:item', function(req,res) {
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
      if (err) throw err;
      res.json(data);
    })
    // data = data.filter(function(todo) {
    //   return todo.item.replace(/ /g, '-') !== req.params.item; 
    // })
    // res.json(data);
  });

};