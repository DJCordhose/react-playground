import mongoose from 'mongoose';
//const url = require('./remote-mongo-url');
import url from './local-mongo-url';
mongoose.connect(url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log("Successfully connected to mongo db"));

const greetingSchema = mongoose.Schema({
    greeting: String
});
const Greeting = mongoose.model('Greeting', greetingSchema);

function save(greeting, callback) {
    var greeting = new Greeting({greeting});
    greeting.save(callback);
}

function load(id, callback) {
    Greeting.find({_id: id}, callback);
}

export default {
    save,
    load
};