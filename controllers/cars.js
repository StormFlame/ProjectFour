const Car = require('../models/car');
const S3 = require('aws-sdk/clients/s3');
const { v4: uuidv4 } = require('uuid');
const s3 = new S3();

const BUCKET_NAME = process.env.BUCKET_NAME


module.exports = {
    create,
    index,
    deleteCar,
    show: showCar,
    update: updateCar,
    updatePerfStats,
    sharedIndex
}

async function create(req, res){
    try{
        let image = undefined
        if(req.file !== undefined){
            const filePath = `images/${uuidv4()}${req.file.originalname}`;
            const params = { Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer }

            image = await s3.upload(params).promise()
        }
        
        const car = await Car.create({
            name: req.body.name,
            make: req.body.make,
            model: req.body.model,
            submodel: req.body.submodel,
            year: req.body.year,
            imageURL: image ? image.Location : '',
            user: req.user,
            performance: false
        })

        const populatedCar = await car.populate('user').execPopulate();

        res.status(201).json({car: populatedCar})
        
    } catch(err){
        console.log(err);
        res.json({data: err})
    }
}

async function index(req, res){
    try {
        // on a query aka .find({}) you just call .exec() to execulate the .populate('user')
        const cars = await Car.find({'user':req.user._id}).populate('user').exec()
        // userSchema.set('toObject') gets invoked, to delete the password
        // when we populate the user so we don't have to worry about sending over the password!
        res.status(200).json({cars})
    } catch(err){
        res.json(err)
    }
}

async function sharedIndex(req, res){
    try {
        // on a query aka .find({}) you just call .exec() to execulate the .populate('user')
        const cars = await Car.find({'share':true, 'performance':true}).populate('user').exec()
        // userSchema.set('toObject') gets invoked, to delete the password
        // when we populate the user so we don't have to worry about sending over the password!
        res.status(200).json({cars})
    } catch(err){
        res.json(err)
    }
}

async function deleteCar(req, res){
    try{
        const car = Car.findOneAndDelete({'_id':req.params.id}, function(err){
            if(err) console.log(err)
        })
        res.json({data: 'car removed'})
    }catch(err){
        console.log(err)
        res.json({error: err})
    }
}

async function showCar(req, res){
    try{
        Car.findById(req.params.id, function(err, car){
            if(err) console.log(err)
            res.status(200).json({car})
        })
    }catch(err){
        res.json({error: err})
    }
}

async function updateCar(req, res){
    try{
        let image = undefined
        if(req.file !== undefined){
            const filePath = `images/${uuidv4()}${req.file.originalname}`;
            const params = { Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer }

            image = await s3.upload(params).promise()
        }
        const newValues = {$set: {name: req.body.name, imageURL: image ? image.Location : req.body.photo, performance: req.body.performance}}
        Car.findByIdAndUpdate(req.params.id, newValues, function(err, car){
            if(err) console.log(err)
            console.log(car)
            res.status(200).json({car})
        })

    }catch(err){
        res.json({error: err})
    }
}

async function updatePerfStats(req, res){
    try{
        if(req.body.share !== undefined){
            const newValues = {$set: {share: req.body.share} }
            Car.findByIdAndUpdate(req.params.id, newValues, function(err, car){
                if(err) console.log(err)
                res.status(200).json({car})
            })
        }else{
            const newValues = {$set: {hp: req.body.hp, torque: req.body.torque, topSpeed: req.body.topSpeed, zeroSixty: req.body.zeroSixty} }
            Car.findByIdAndUpdate(req.params.id, newValues, function(err, car){
                if(err) console.log(err)
                res.status(200).json({car})
            })
        }

    }catch(err){
        res.json({error: err})
    }
}