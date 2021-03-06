const Service = require('../models/service');

const BUCKET_NAME = process.env.BUCKET_NAME


module.exports = {
    create,
    index,
    delete: deleteService
}

async function create(req, res){
    try{
        const service = await Service.create({
            car: req.body.car,
            name: req.body.name,
            servicer: req.body.servicer,
            cost: req.body.cost,
            date: req.body.date
        })

        const populatedService = await service.populate('car').execPopulate();
        
        res.status(201).json({service: populatedService})
        
        }catch(err){
        console.log(err);
        res.json({data: err})
    }
}

async function index(req, res){
    try {
        const services = await Service.find({'car': req.params.id})
        console.log(services, 'SERVICES')
        res.status(200).json({services})
    } catch(err){
        res.json(err)
    }
}

async function deleteService(req, res){
    try{
        const service = Service.findOneAndDelete({'_id':req.params.id}, function(err){
            if(err) console.log(err)
        })
        res.json({data: 'service removed'})
    }catch(err){
        console.log(err)
        res.json({error: err})
    }
}