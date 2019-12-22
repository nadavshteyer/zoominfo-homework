const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


mongoose.connect('mongodb+srv://nadavsh:1234@zoominfodata-huncf.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    db.collections.profiles.createIndex({"$**":"text"})
    console.log('conncect to db!')
});


module.exports = {mongoose}