const express = require('express');
const route = express.Router()
const { projects } = require('../data.js');

route.get('/', (req, res) => {
    let responses = projects;
    let { id, title } = req.query;
    console.log(req.query);
    if (id) {
        responses = projects.find((project) => project.id === Number(id));
    }
    if (title) {
        responses = projects.filter((project) => project.title.toLowerCase().startsWith(title.toLowerCase()));
    }
    res.json(responses);
})

route.post('/', (req, res) => {
    console.log(req.body);
    const { title, id, description } = req.body;
    if (title && id && description) {
        projects.push(req.body);
        res.status(201).json(req.body);
    } else {
        res.status(403).json({ status: false });
    }
})

route.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    let item = projects.find((project) => project.id === Number(id));
    if (item) {
        res.json(item);
    } else {
        res.status(404).send('Not found');
    }
})

route.put('/:id', (req, res) => {
    console.log(req.body);
    let project = {...(projects.find((project)=>project.id===Number(req.params.id))),...req.body}
    console.log(project);
    res.send(req.body)
})

route.delete('/id', (req, res) => {
    let index = projects.find((project) => project.id === Number(req.params.id));
    if (index) { projects.splice(projects.indexOf(index), 1) }
    console.log(index);
    res.json({
        status: true,
        data: projects
    })
})

route.delete('/', (req, res) => {
    let index = projects.find((project) => project.id === Number(req.query.id));
    if (index) { projects.splice(projects.indexOf(index), 1) }
    console.log(index);
    res.json({
        status: true,
        data: projects
    })
})

module.exports = route;