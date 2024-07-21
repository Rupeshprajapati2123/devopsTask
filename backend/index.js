const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3333;

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(require('./routes'));

app.listen(PORT, () => {
    console.log(`Server started at: http://localhost:${PORT}`);
});