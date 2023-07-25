const express = require('express');

const port = 3000;
const app = express();
const projects = require('./routes/projects.js')

app.use(express.static('./static'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/projects',projects)


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
