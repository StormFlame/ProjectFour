const mongoose = require('mongoose');
const schema = mongoose.Schema;

const serviceSchema = new schema({
    car: {type: schema.Types.ObjectId, ref: 'Car'},
    name: String,
    cost: String,
    date: Date,
})

module.exports = mongoose.model('Service', serviceSchema);