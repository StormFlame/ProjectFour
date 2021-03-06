const Car = require('../models/car');

const BUCKET_NAME = process.env.BUCKET_NAME


module.exports = {
    create,
    delete: deletePerformanceUpgrade
}

async function create(req, res){
    try{
        const car = await Car.findById(req.params.id); 
        car.performanceUpgrades.push({part: req.body.part, brand: req.body.brand, cost: req.body.cost, carId: req.params.id})
        await car.save()
        res.status(201).json({data: 'performance upgrade added'})
        
        }catch(err){
        res.json({data: err})
    }
}

async function deletePerformanceUpgrade(req, res){
    try{
        const car = Car.findOne({'performanceUpgrades._id': req.params.id}, function(err, car){
            if(err) console.log(err)
            car.performanceUpgrades.remove(req.params.id)
            car.save()
            res.json({data: 'performance upgrade removed'})
        })
    }catch(err){
        console.log(err)
        res.json({error: err})
    }
}