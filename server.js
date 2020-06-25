const express    = require('express'),
      bodyParser = require('body-parser'),
      app        = express();

app.use(bodyParser.json())

const database = {
    users: [
        {
            id: '123',
            name: 'Seba',
            email: 'seba@gmail.com',
            password: '123',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Meme',
            email: 'meme@gmail.com',
            password: '124',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res)=>{
    res.send(database.users);
})

app.post('/signin', (req, res)=>{
    if(req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json('success');
        } else {
            res.status(400).json('error logging in');
        }
    res.json('signin working');
})

app.post('/register', (req, res)=>{
    let newUser = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        entries: 0,
        joined: new Date()
    }
    database.users.push(newUser);
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res)=>{
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
           return res.json(user);
        }
    })
    if(!found){
        res.status(400).json('no user found');
    }
})

app.post('/image', (req, res)=>{
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries++;
           return res.json(user.entries);
        }
    })
    if(!found){
        res.status(400).json('no user found');
    }
})

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})