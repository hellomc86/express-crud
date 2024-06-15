const express = require('express');

const router = require('./router');

const app = express();

const PORT = 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use("/", router);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
