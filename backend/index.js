// main server file

// importing express and cors
import express from 'express';
import cors from 'cors';

// defining port and app
const app = express();
const port = 8080;

// configuring cors policy
app.use(cors({
    origin: '*'
}));

// making the server listen
app.listen(port, (req, res) => {
    console.log(`listening to ${port}`);
});

// testing get request
app.get('/test', (req, res) => {
    res.send({msg: "API working"});
});