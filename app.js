const express = require('express');

const port = 3000;
const app = express();

app.use(express.static('./static'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/projects')


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
