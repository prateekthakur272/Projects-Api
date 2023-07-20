const express = require('express');
const {projects} = require('./data.js')

const port = 3000;
const app = express()

app.use(express.static('./static'));
app.use(express.urlencoded({extended:true}))

app.get('/api/projects',(req,res)=>{
    let responses = projects;
    let {id,title} = req.query;
    console.log(req.query);
    if(id){
        responses = projects.find((project)=>project.id===Number(id));
    }
    if(title){
        responses = projects.filter((project)=>project.title.toLowerCase().startsWith(title.toLowerCase()))
    }
    res.json(responses)
})

app.post('/api/projects',(req,res)=>{
    const {title,id,description} = req.body
    console.log(title,id,description);
    if(title && id && description){
        projects.push(req.body)
        res.status(201).json(req.body)
    }else{
        res.status(403).json({status:false})
    }
})

app.get('/api/projects/:id',(req,res)=>{
    const {id} = req.params;
    console.log(id);
    let item = projects.find((project)=>project.id===Number(id));
    if(item){
        res.json(item);
    }else{
        res.status(404).send('Not found');
    }
})

app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})
