import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import * as carApi from '../../utils/car-api';
import CarCard from '../../components/CarCard/CarCard';
import UpdateCarFrom from '../../components/UpdateCarForm/UpdateCarForm';

export default function CarDetails(){
    const {id} = useParams()
    const [car, setCar] = useState({
        name: '',
        make: '',
        model: '',
        year: '',
        imaegURL: '',
    })
    
    useEffect(() => {
        getCar()
    }, [])

    async function getCar(){
        try{
            const data = await carApi.getOne(id)
            console.log(data.car, 'DATACAR')
            setCar(data.car)
        }catch(err){
            console.log(err)
        }
    }

    async function updateCar(formData){
        try{
            const data = await carApi.update(formData, id)
            console.log(data, 'CAR')
            getCar()
        }catch(err){
            console.log(err)
        }
    }

    return(
        <>
            <CarCard car={car}/>
            <UpdateCarFrom car={car} handleUpdateCar={updateCar}/>
            <div>URL: {car.imaegURL}</div>
        </>
    )
}