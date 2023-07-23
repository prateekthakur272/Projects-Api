const express = require('express');
const { projects } = require('./data.js');

const port = 3000;
const app = express();

app.use(express.static('./static'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/api/projects', (req, res) => {
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

app.post('/api/projects', (req, res) => {
    console.log(req.body);
    const { title, id, description } = req.body;
    if (title && id && description) {
        projects.push(req.body);
        res.status(201).json(req.body);
    } else {
        res.status(403).json({ status: false });
    }
})

app.get('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    let item = projects.find((project) => project.id === Number(id));
    if (item) {
        res.json(item);
    } else {
        res.status(404).send('Not found');
    }
})

app.put('/api/projects/:id', (req, res) => {
    console.log(req.body);
    let project = {...(projects.find((project)=>project.id===Number(req.params.id))),...req.body}
    console.log(project);
    res.send(req.body)
})

app.delete('/api/projects/:id', (req, res) => {
    let index = projects.find((project) => project.id === Number(req.params.id));
    if (index) { projects.splice(projects.indexOf(index), 1) }
    console.log(index);
    res.json({
        status: true,
        data: projects
    })
})

app.delete('/api/projects', (req, res) => {
    let index = projects.find((project) => project.id === Number(req.query.id));
    if (index) { projects.splice(projects.indexOf(index), 1) }
    console.log(index);
    res.json({
        status: true,
        data: projects
    })
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
