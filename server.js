// Call Express framework
const express = require('express');
//Take Instance Of Express In My Project
const app = express();

//Call Body-Parser The Middle-ware To Analysis data
const bodyParser = require('body-parser');
//Using The Body-Parser In My Project
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
//Call Cors Middle-ware To easily Communication Between The Server&client Side
const cors = require('cors');
app.use(cors());
//Routing The Server To My Static Files
app.use(express.static('website'));
//define port
const PORT = 8080;
//Create a Server
const server = app.listen(PORT, _ => {
    console.log('Server Is Running...');
    console.log(`Server Is Running In localhost: ${ PORT }`);
});

 projectData = {};

//Set Get Route
app.get('/all', (req, res) => {
    console.log(projectData);
    res.send(projectData);
});

//Set Post Route
app.post('/addWeather', (req, res) => {
    console.log(req.body);
       newEntry = {
        date: req.body.date,
        day: req.body.day,
        temp: req.body.temp,
        feel: req.body.feel,
        newZip: req.body.newZip,
    }
    projectData = newEntry;
    console.log(projectData);
    res.send(projectData);
});