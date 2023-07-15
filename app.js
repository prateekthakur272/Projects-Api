const express = require('express');
const {projects} = require('./data.js')
const path = require('path');

const port = 3000;
const app = express()

app.use(express.static('./static'));

app.get('/projects', (req,res)=>{
    res.status(200).json(projects)
})

app.get('/projects-min', (req,res)=>{
    let projectsMin = projects.map((project)=>{
        const {title,description} = project;
        return {title,description};
    });
    res.status(200).json(projectsMin);
})

app.get('/projects/:projectId',(req,res)=>{
    console.log(req.params);
    let project = projects.find((project) => project.id === Number(req.params.projectId));
    if (!project) {
        res.status(404).send('Does not exist')
    }
    console.log(project);
    res.status(200).json(project);
})

app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})
