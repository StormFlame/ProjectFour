const Car = require('../models/car');
const S3 = require('aws-sdk/clients/s3');
const { v4: uuidv4 } = require('uuid');
const s3 = new S3();

const BUCKET_NAME = process.env.BUCKET_NAME


module.exports = {
    create,
    index,
    deleteCar
}

async function create(req, res){
    try{
        let image = undefined
        if(req.file !== undefined){
            const filePath = `${uuidv4()}/${req.file.originalname}`;
            const params = { Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer }

            image = await s3.upload(params).promise()
        }
        
        const car = await Car.create({
            name: req.body.name,
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            imageURL: image ? image.Location : '',
            user: req.user
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
        const cars = await Car.find().populate('user').exec()
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