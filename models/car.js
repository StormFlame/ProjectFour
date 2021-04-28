const mongoose = require('mongoose');
const schema = mongoose.Schema;

const carSchema = new schema({
    user: {type: schema.Types.ObjectId, ref: 'User'},
    name: String,
    make: String,
    model: String,
    year: String,
    imageURL: String
})

module.exports = mongoose.model('Car', carSchema);