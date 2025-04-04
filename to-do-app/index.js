const express = require("express")
const app = express();

app.use(express.json())

let todos = [];

//get all todos
app.get('/todos',(req,res) => {
    res.json(todos)
})

//get a specific todo by ID
app.get('/todos/:id',(req,res) => {
    const todoId = req.query.id;
    const todo = todos.find( t => t.id === todoId)

    if(!todo)
        {
            return res.status(404).json({
                error : 'Todo not found'
            })
        }
    
        res.json(todo)
})

app.post('/todos',(req,res) => {
    const {title,description } = req.body;

    if( !title || !description) 
        {
           res.status(400).json({
               "mssge" : "Title and Description are required"
           })
        }
    
    const newtodo = {
        title : title,
        description : description
    }

    todos.push(newtodo)

    res.status(201).json(newtodo)

})


app.put('/todos/:id',(req,res) => {
    const todoId = req.params.id

    const todo = todos.find(t => t.id === todoId)

    if(!todo)
    {
        return res.status(404).json({
            error : 'Todo not found'
        })
    }

    const {title,description} = req.body

    if (title) todo.title = title;
    if (description) todo.description = description;

    res.json(todo);
})

app.delete('/todos/:id',(req,res) => {
    const todoId = req.params.id;
    const todoIndex = todos.findIndex(t => t.id === todoId)
    if(todoIndex === -1)
        {
            return res.status(404).json({
                error : 'Todo not found'
            });
        }

        todos.splice(todoIndex,1);
})

app.listen(3000);