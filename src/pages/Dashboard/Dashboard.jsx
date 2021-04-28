import React, {useState, useEffect} from 'react';
import AddCarForm from '../../components/AddCarForm/AddCarForm';
import * as carApi from '../../utils/car-api';
import CarGrid from '../../components/CarGrid/CarGrid';
import {  Grid } from 'semantic-ui-react'

export default function Dashboard(){

    const [cars, setCars] = useState([])

    async function handleAddCar(car){
        try{
            const data = await carApi.create(car)
            setCars(cars => [data.car, ...cars])
            console.log(data.car)
        }catch(err){
            console.log(err, 'err')
        }
    }

    async function deleteCar(carID){
        try{
            const data = await carApi.deleteCar(carID)
            getCars()
        }catch(err){
            console.log(err)
        }
    }

    async function getCars(){
        try{
            const data = await carApi.getAll();
            setCars([...data.cars])
        }catch(err){
            console.log(err, ' error')
        }
    }
    
    useEffect(() => {
        getCars()
    }, [])

    return(
        <Grid centered>
            <Grid.Row>
                <Grid.Column>
                    <AddCarForm handleAddCar={handleAddCar}/>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <CarGrid cars={cars} deleteCar={deleteCar} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}