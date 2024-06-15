
const data = require('./sql3-data');

const express = require('express');

const router = express.Router();

router.get('/users', async (req, res) => {
    res.writeHead(200);
    res.end(JSON.stringify(await data.getUsers()));
});

router.post('/users', async (req, res) => {

    const name = req.body.name;
    const age = req.body.age;

    if (name && age) {
        const user = { name, age: age };
        const createdUser = await data.addUser(user);
        res.writeHead(201);
        res.end(JSON.stringify(createdUser));
    } else {
        res.writeHead(400);
        res.end(JSON.stringify({ message: 'Name and age are required' }));
    }

});

router.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    const user = await data.getUserById(id);

    if (user) {
        res.writeHead(200);
        res.end(JSON.stringify(user));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'User not found' }));
    }
})


router.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    let user = await data.getUserById(id);

    if (user) {
        user.name = req.body.name ? req.body.name : user.name;
        user.age = req.body.age ? req.body.age : user.age;
        const updatedUser = await data.updateUser(id, user);
        res.writeHead(200);
        res.end(JSON.stringify(updatedUser));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'User not found' }));
    }
})

router.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    
    const success = await data.deleteUser(id);   

    if(success) {
        res.writeHead(204);
        res.end();
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'User not found' }));
    }
});

module.exports = router;
