const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const schedule = require('node-schedule');
const moment = require('moment')
const {crawler} = require('./cralwer.js')
const {getData, search} = require('./db/profileClass')


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'true'}))
app.use(cors());
var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/client-side'));


app.get('/data',  async (req,res) => {
    if (req.query.searchTerm) {
        try {
            const tempData = await search(req.query.searchTerm);
            res.json(tempData) 
        } catch (e) {
            res.status(500).send(e)
        }

    } else {
        try {
            const tempData = await getData();
            res.json(tempData)
        } catch (e) {
            res.status(500).send(e)
        }
    }

})

app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname + '/dist/client-side/index.html'));
})

//The crawler will run every day at 7:00 am.
schedule.scheduleJob('0 0 7 * *', function(fireDate){
    crawler()
    console.log(`The crawler ran at ${moment(fireDate).format('MMMM Do YYYY, h:mm:ss a')}`);
});


app.listen(port,'0.0.0.0',() => console.log(`The Server is running on port ${port}.`) )



