const mongoose = require('mongoose');
const schema = mongoose.Schema;

const performanceUpgrade = schema({
    part: String,
    brand: String,
    cost: String,
    date: String,
    carId: {type: schema.Types.ObjectId}
})

const carSchema = new schema({
    user: {type: schema.Types.ObjectId, ref: 'User'},
    name: String,
    make: String,
    model: String,
    submodel: String,
    year: String,
    imageURL: String,
    performance: Boolean,
    performanceUpgrades:[performanceUpgrade]
})

module.exports = mongoose.model('Car', carSchema);